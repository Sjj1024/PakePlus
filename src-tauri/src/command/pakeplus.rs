use base64::prelude::*;
use std::io::Read;
use std::time::Instant;
use tauri::{utils::config::WindowConfig, AppHandle, LogicalSize, Manager, WindowBuilder};

#[tauri::command]
pub async fn open_window(
    handle: AppHandle,
    app_url: String,
    app_name: String,
    platform: String,
    user_agent: String,
    resize: bool,
    width: f64,
    height: f64,
    js_content: String,
) {
    let window_label = "previewWeb";
    if let Some(existing_window) = handle.get_window(window_label) {
        if resize {
            let new_size = LogicalSize::new(width, height);
            match existing_window.set_size(new_size) {
                Ok(_) => println!("Window resized to {}x{}", width, height),
                Err(e) => eprintln!("Failed to resize window: {}", e),
            }
        } else {
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
    }
    println!("Opening docs in external window: {}, {}", app_url, platform);
    // println!("js_content: {}", js_content);
    let resource_path = handle
        .path_resolver()
        .resolve_resource("data/custom.js")
        .expect("failed to resolve resource");
    let mut custom_js = std::fs::File::open(&resource_path).unwrap();
    let mut contents = String::new();
    custom_js.read_to_string(&mut contents).unwrap();
    contents += js_content.as_str();
    // println!("js file contents: {}", contents);
    if !resize {
        let _window = tauri::WindowBuilder::new(
            &handle,
            "previewWeb", /* the unique window label */
            tauri::WindowUrl::External(app_url.parse().unwrap()),
        )
        .title(app_name)
        .inner_size(width, height)
        .user_agent(user_agent.as_str())
        .center()
        .initialization_script(contents.as_str())
        .build()
        .unwrap();
    }
}

#[tauri::command]
pub async fn preview_from_config(
    handle: AppHandle,
    resize: bool,
    config: WindowConfig,
    js_content: String,
) {
    let window_label = config.label.clone();
    if let Some(existing_window) = handle.get_window(window_label.as_str()) {
        if resize {
            let new_size = LogicalSize::new(config.width, config.height);
            match existing_window.set_size(new_size) {
                Ok(_) => println!("Window resized to {}x{}", config.width, config.height),
                Err(e) => eprintln!("Failed to resize window: {}", e),
            }
        } else {
            existing_window.close().unwrap();
            println!("Existing window closed.");
            let start = Instant::now();
            while handle.get_window(window_label.as_str()).is_some() {
                if start.elapsed().as_secs() > 2 {
                    println!("Window close took too long. Aborting.");
                    return;
                }
                std::thread::yield_now();
            }
        }
    }
    // println!("tauri config: {:?}", config);
    let resource_path = handle
        .path_resolver()
        .resolve_resource("data/custom.js")
        .expect("failed to resolve resource");
    let mut custom_js = std::fs::File::open(&resource_path).unwrap();
    let mut contents = String::new();
    custom_js.read_to_string(&mut contents).unwrap();
    contents += js_content.as_str();
    // println!("js file contents: {}", contents);
    if !resize {
        let _window = WindowBuilder::from_config(&handle, config)
            .initialization_script(contents.as_str())
            .build()
            .unwrap();
    }
}

#[tauri::command]
pub async fn update_build_file(handle: tauri::AppHandle, name: String, body: String) -> String {
    let resource_path = handle
        .path_resolver()
        .resolve_resource("data/build.yml")
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
    user_agent: String,
    ascii: bool,
) -> String {
    let resource_path = handle
        .path_resolver()
        .resolve_resource("data/config.json")
        .expect("failed to resolve resource");
    let mut config_file = std::fs::File::open(&resource_path).unwrap();
    let mut contents = String::new();
    config_file.read_to_string(&mut contents).unwrap();
    contents = contents
        .replace("PROJECTNAME", name.as_str())
        .replace("PROJECTVERSION", version.as_str())
        .replace("PROJECTURL", url.as_str())
        .replace("PROJECTID", id.as_str())
        .replace("PROJECTUSERAGENT", user_agent.as_str())
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
pub async fn update_config_json(
    handle: tauri::AppHandle,
    name: String,
    version: String,
    url: String,
    id: String,
    width: String,
    height: String,
    user_agent: String,
    ascii: bool,
) -> String {
    let resource_path = handle
        .path_resolver()
        .resolve_resource("data/config.json")
        .expect("failed to resolve resource");
    let mut config_file = std::fs::File::open(&resource_path).unwrap();
    let mut contents = String::new();
    config_file.read_to_string(&mut contents).unwrap();
    contents = contents
        .replace("PROJECTNAME", name.as_str())
        .replace("PROJECTVERSION", version.as_str())
        .replace("PROJECTURL", url.as_str())
        .replace("PROJECTID", id.as_str())
        .replace("PROJECTUSERAGENT", user_agent.as_str())
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
    debug: bool,
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
    if debug {
        // "shell-open", "devtools"
        contents = contents.replace("-3", r#""shell-open", "devtools""#);
    } else {
        contents = contents.replace("-3", r#""shell-open""#);
    }
    // println!("Updated config file: {}", contents);
    // The new file content, using Base64 encoding
    let encoded_contents = BASE64_STANDARD.encode(contents);
    return encoded_contents;
}

#[tauri::command]
pub async fn update_main_rust(
    handle: tauri::AppHandle,
    app_url: String,
    app_name: String,
    user_agent: String,
    width: f64,
    height: f64,
) -> String {
    let resource_path = handle
        .path_resolver()
        .resolve_resource("data/main.rs")
        .expect("failed to resolve resource");
    let mut main_rust = std::fs::File::open(&resource_path).unwrap();
    let mut contents = String::new();
    main_rust.read_to_string(&mut contents).unwrap();
    contents = contents
        .replace("PROJECTNAME", app_name.as_str())
        .replace("PROJECTURL", app_url.as_str())
        .replace("PROJECTUSERAGENT", user_agent.as_str())
        .replace("-1", width.to_string().as_str())
        .replace("-2", height.to_string().as_str());
    // println!("Updated config file: {}", contents);
    // The new file content, using Base64 encoding
    let encoded_contents = BASE64_STANDARD.encode(contents);
    return encoded_contents;
}

#[tauri::command]
pub async fn rust_main_window(handle: tauri::AppHandle, config: String) -> String {
    let resource_path = handle
        .path_resolver()
        .resolve_resource("data/main.rs")
        .expect("failed to resolve resource");
    let mut main_rust = std::fs::File::open(&resource_path).unwrap();
    let mut contents = String::new();
    main_rust.read_to_string(&mut contents).unwrap();
    contents = contents.replace("WINDOWCONFIG", config.as_str());
    // println!("Updated config file: {}", contents);
    // The new file content, using Base64 encoding
    let encoded_contents = BASE64_STANDARD.encode(contents);
    return encoded_contents;
}

#[tauri::command]
pub async fn update_custom_js(handle: tauri::AppHandle, js_content: String) -> String {
    let resource_path = handle
        .path_resolver()
        .resolve_resource("data/custom.js")
        .expect("failed to resolve resource");
    let mut custom_js = std::fs::File::open(&resource_path).unwrap();
    let mut contents = String::new();
    custom_js.read_to_string(&mut contents).unwrap();
    contents += js_content.as_str();
    // println!("Updated config file: {}", contents);
    // The new file content, using Base64 encoding
    let encoded_contents = BASE64_STANDARD.encode(contents);
    return encoded_contents;
}

#[tauri::command]
pub async fn content_to_base64(_: tauri::AppHandle, content: String) -> String {
    // println!("Updated config file: {}", contents);
    // The new file content, using Base64 encoding
    let encoded_contents = BASE64_STANDARD.encode(content);
    return encoded_contents;
}
