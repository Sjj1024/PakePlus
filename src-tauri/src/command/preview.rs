#[tauri::command]
pub async fn open_docs(
    handle: tauri::AppHandle,
    app_url: String,
    app_name: String,
    platform: String,
) {
    println!("Opening docs in external window: {}, {}", app_url, platform);
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

#[tauri::command]
pub async fn read_json_file(handle: tauri::AppHandle) -> String {
    let resource_path = handle
        .path_resolver()
        .resolve_resource("data/example.json")
        .expect("failed to resolve resource");
    let file = std::fs::File::open(&resource_path).unwrap();
    let lang_de: serde_json::Value = serde_json::from_reader(file).unwrap();
    return lang_de.to_string();
}
