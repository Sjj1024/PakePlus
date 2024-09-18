#[tauri::command]
pub async fn open_docs(
    handle: tauri::AppHandle,
    app_url: String,
    app_name: String,
    platform: String,
) {
    println!("Opening docs in external window: {}", app_url);
    let docs_window = tauri::WindowBuilder::new(
        &handle,
        "externaltauri", /* the unique window label */
        tauri::WindowUrl::External(app_url.parse().unwrap()),
    )
    .title(app_name)
    .position(200.4, 100.4)
    .build()
    .unwrap();
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
