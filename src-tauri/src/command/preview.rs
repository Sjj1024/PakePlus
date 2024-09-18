#[tauri::command]
pub async fn open_docs(handle: tauri::AppHandle) {
    let docs_window = tauri::WindowBuilder::new(
        &handle,
        "externaltauri", /* the unique window label */
        tauri::WindowUrl::External("https://tauri.app/".parse().unwrap()),
    )
    .title("预览")
    .position(200.4, 100.4)
    .build()
    .unwrap();
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
