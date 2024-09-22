use base64::prelude::*;
use std::io::Read;

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

#[tauri::command]
pub async fn update_build_file(handle: tauri::AppHandle, branch: String) -> String {
    let resource_path = handle
        .path_resolver()
        .resolve_resource("data/appbuild.yml")
        .expect("failed to resolve resource");
    let mut build_file = std::fs::File::open(&resource_path).unwrap();
    let mut contents = String::new();
    build_file.read_to_string(&mut contents).unwrap();
    contents = contents.replace("PROJECTNAME", branch.as_str());
    // println!("Updated build file: {}", contents);
    // The new file content, using Base64 encoding
    let encoded_contents = BASE64_STANDARD.encode(contents);
    return encoded_contents;
}
