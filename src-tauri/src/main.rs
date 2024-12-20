// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use serde_json::Error;
use tauri::{utils::config::WindowConfig, Menu, MenuItem, Submenu, WindowBuilder};

fn json_to_window_config(window_json: &str) -> Result<WindowConfig, Error> {
    serde_json::from_str(window_json)
}

fn main() {
    #[cfg(any(target_os = "linux", target_os = "windows"))]
    let menu = Menu::new();
    #[cfg(target_os = "macos")]
    let menu = Menu::new().add_submenu(Submenu::new(
        "Edit",
        Menu::new()
            .add_native_item(MenuItem::Undo)
            .add_native_item(MenuItem::Redo)
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Cut)
            .add_native_item(MenuItem::Paste)
            .add_native_item(MenuItem::SelectAll)
            .add_native_item(MenuItem::CloseWindow)
            .add_native_item(MenuItem::Quit),
    ));
    tauri::Builder::default()
        .setup(|app| {
            let app_handle = app.handle();
            let window_json = r#"{"label":"NiKaAI","url":"https://nika-public.com/","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36","fileDropEnabled":true,"center":true,"width":1400,"height":850,"minWidth":1400,"minHeight":850,"maxWidth":null,"maxHeight":null,"resizable":true,"maximizable":true,"minimizable":true,"closable":true,"title":"NikaAI","fullscreen":false,"focus":false,"transparent":false,"maximized":false,"visible":true,"decorations":true,"alwaysOnTop":false,"contentProtected":false,"skipTaskbar":false,"titleBarStyle":"Visible","hiddenTitle":false,"acceptFirstMouse":false,"tabbingIdentifier":"","additionalBrowserArgs":""}"#;
            match json_to_window_config(window_json) {
                Ok(config) => {
                    println!("Parsed WindowConfig: {:?}", config);
                    let _main_window = WindowBuilder::from_config(&app_handle, config)
                        .build()
                        .unwrap();
                }
                Err(err) => {
                    eprintln!("Failed to parse JSON: {}", err);
                }
            }
            Ok(())
        })
        .menu(menu)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
