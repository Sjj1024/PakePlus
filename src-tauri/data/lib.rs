// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

mod command;
use serde_json::Error;
use tauri::{menu::*, utils::config::WindowConfig};

fn json_to_window_config(window_json: &str) -> Result<WindowConfig, Error> {
    serde_json::from_str(window_json)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .menu(|handle| {
            let menu = Menu::with_items(
                handle,
                &[
                    #[cfg(target_os = "macos")]
                    &Submenu::with_items(
                        handle,
                        "Edit",
                        true,
                        &[
                            &PredefinedMenuItem::undo(handle, None)?,
                            &PredefinedMenuItem::redo(handle, None)?,
                            &PredefinedMenuItem::cut(handle, None)?,
                            &PredefinedMenuItem::copy(handle, None)?,
                            &PredefinedMenuItem::paste(handle, None)?,
                            &PredefinedMenuItem::select_all(handle, None)?,
                        ],
                    )?,
                ],
            );
            menu
        })
        .setup(|app| {
            let app_handle = app.handle();
            // get window size store
            // let store = app.store("app_data.json")?;
            // let window_size: Option<serde_json::Value> = store.get("window_size");
            let window_json = r#"WINDOWCONFIG"#;
            match json_to_window_config(window_json) {
                Ok(config) => {
                    // println!("Parsed WindowConfig: {:?}", config);
                    // if let Some(window_size) = window_size {
                    //     let size = window_size.as_object().unwrap();
                    //     let width = size["width"].as_f64().unwrap();
                    //     let height = size["height"].as_f64().unwrap();
                    //     window
                    //         .set_size(tauri::PhysicalSize::new(width, height))
                    //         .unwrap();
                    // }
                    let _main_window =
                        tauri::WebviewWindowBuilder::from_config(app_handle, &config)
                            .unwrap()
                            .initialization_script(include_str!("./extension/event.js"))
                            .initialization_script(include_str!("./extension/custom.js"))
                            .build()
                            .unwrap();
                }
                Err(err) => {
                    eprintln!("Failed to parse JSON: {}", err);
                }
            }
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .invoke_handler(tauri::generate_handler![
            command::pakeplus::open_window,
            command::pakeplus::preview_from_config,
            command::pakeplus::update_build_file,
            command::pakeplus::update_config_file,
            command::pakeplus::update_cargo_file,
            command::pakeplus::update_main_rust,
            command::pakeplus::update_custom_js,
            command::pakeplus::content_to_base64,
            command::pakeplus::update_config_json,
            command::pakeplus::rust_main_window,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
