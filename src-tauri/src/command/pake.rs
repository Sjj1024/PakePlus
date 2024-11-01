use base64::prelude::*;
use std::io::Read;
use std::time::Instant;
use tauri::{AppHandle, Manager};

#[tauri::command]
pub async fn open_window(
    handle: AppHandle,
    app_url: String,
    app_name: String,
    platform: String,
    user_agent: String,
    width: f64,
    height: f64,
) {
    let window_label = "previewWeb";
    if let Some(existing_window) = handle.get_window(window_label) {
        existing_window.close().unwrap();
        println!("Existing window closed.");
        let start = Instant::now();
        while handle.get_window(window_label).is_some() {
            if start.elapsed().as_secs() > 2 {
                println!("Window close took too long. Aborting.");
                return;
            }
            std::thread::yield_now();
        }
    }
    println!("Opening docs in external window: {}, {}", app_url, platform);
    let docs_window = tauri::WindowBuilder::new(
        &handle,
        "previewWeb", /* the unique window label */
        tauri::WindowUrl::External(app_url.parse().unwrap()),
    )
    .title(app_name)
    .inner_size(width, height)
    .user_agent(user_agent.as_str())
    .position(200.4, 100.4)
    .build()
    .unwrap();
    let theme = docs_window.theme().expect("failed to get theme");
    println!("Theme: {}", theme);
}

#[tauri::command]
pub async fn update_build_file(handle: tauri::AppHandle, name: String, body: String) -> String {
    let resource_path = handle
        .path_resolver()
        .resolve_resource("data/appbuild.yml")
        .expect("failed to resolve resource");
    let mut build_file = std::fs::File::open(&resource_path).unwrap();
    let mut contents = String::new();
    build_file.read_to_string(&mut contents).unwrap();
    contents = contents
        .replace("PROJECTNAME", name.as_str())
        .replace("RELEASEBODY", body.as_str());
    // println!("Updated build file: {}", contents);
    // The new file content, using Base64 encoding
    let encoded_contents = BASE64_STANDARD.encode(contents);
    return encoded_contents;
}

#[tauri::command]
pub async fn update_config_file(
    handle: tauri::AppHandle,
    name: String,
    version: String,
    url: String,
    id: String,
    width: String,
    height: String,
    ascii: bool,
) -> String {
    let resource_path = handle
        .path_resolver()
        .resolve_resource("data/appconfig.json")
        .expect("failed to resolve resource");
    let mut config_file = std::fs::File::open(&resource_path).unwrap();
    let mut contents = String::new();
    config_file.read_to_string(&mut contents).unwrap();
    contents = contents
        .replace("PROJECTNAME", name.as_str())
        .replace("PROJECTVERSION", version.as_str())
        .replace("PROJECTURL", url.as_str())
        .replace("PROJECTID", id.as_str())
        .replace("-1", width.as_str())
        .replace("-2", height.as_str());
    if ascii {
        contents = contents.replace("-3", r#""all""#);
    } else {
        contents = contents.replace(
            "-3",
            r#"["deb", "appimage", "nsis", "app", "dmg", "updater"]"#,
        );
    }
    // println!("Updated config file: {}", contents);
    // The new file content, using Base64 encoding
    let encoded_contents = BASE64_STANDARD.encode(contents);
    return encoded_contents;
}

#[tauri::command]
pub async fn update_cargo_file(
    handle: tauri::AppHandle,
    name: String,
    version: String,
    desc: String,
    ascii: bool,
) -> String {
    let resource_path = handle
        .path_resolver()
        .resolve_resource("data/Cargo.toml")
        .expect("failed to resolve resource");
    let mut config_file = std::fs::File::open(&resource_path).unwrap();
    let mut contents = String::new();
    config_file.read_to_string(&mut contents).unwrap();
    contents = contents
        .replace("PROJECTNAME", name.as_str())
        .replace("PROJECTVERSION", version.as_str())
        .replace("PROJECTDESC", desc.as_str());
    if ascii {
        // "shell-open", "devtools"]
        contents = contents.replace("-3", r#""all""#);
    } else {
        contents = contents.replace(
            "-3",
            r#"["deb", "appimage", "nsis", "app", "dmg", "updater"]"#,
        );
    }
    // println!("Updated config file: {}", contents);
    // The new file content, using Base64 encoding
    let encoded_contents = BASE64_STANDARD.encode(contents);
    return encoded_contents;
}
