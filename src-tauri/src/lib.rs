mod command;
use serde_json::json;
use tauri::{menu::*, WindowEvent};
use tauri_plugin_store::StoreExt;

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
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_store::Builder::default().build())
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
            command::pakeplus::rust_lib_window,
            command::pakeplus::rust_main_window,
        ])
        .setup(|app| {
            let app_handle = app.handle();
            let main_window = tauri::WebviewWindowBuilder::from_config(
                app_handle,
                &app.config().app.windows.get(0).unwrap().clone(),
            )
            .unwrap()
            .initialization_script(include_str!("./extension/event.js"))
            .initialization_script(include_str!("./extension/custom.js"))
            .build()
            .unwrap();
            let store = app.store("app_data.json")?;
            let window_size: Option<serde_json::Value> = store.get("window_size");
            if let Some(window_size) = window_size {
                let size = window_size.as_object().unwrap();
                let width = size["width"].as_f64().unwrap();
                let height = size["height"].as_f64().unwrap();
                // println!("window size init: {:?}", size);
                main_window
                    .set_size(tauri::PhysicalSize::new(width, height))
                    .unwrap();
            }
            main_window.on_window_event(move |event| {
                if let WindowEvent::Resized(size) = event {
                    // println!("window resized: {:?}", size);
                    let _ = store.set(
                        "window_size",
                        json!({
                            "width": size.width,
                            "height": size.height
                        }),
                    );
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
