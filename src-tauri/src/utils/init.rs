use serde_json::{json, Error};
use tauri::{utils::config::WindowConfig, App, AppHandle, Manager, WindowEvent};
use tauri_plugin_store::StoreExt;

// handle something when start app
pub async fn resolve_setup(app: &mut App) -> Result<(), Error> {
    let app_handle = app.handle();
    let window_json = r#"{"url": "index.html"}"#;
    let config: WindowConfig = serde_json::from_str(window_json).unwrap();
    let window = tauri::WebviewWindowBuilder::from_config(app_handle, &config)
        .unwrap()
        .initialization_script(include_str!("../../data/analytics.js"))
        .initialization_script(include_str!("../../data/custom.js"))
        .build()
        .unwrap();

    if true {
        let store = app.store("app_data.json").unwrap();
        let window_size: Option<serde_json::Value> = store.get("window_size");
        let mut width = 0.0;
        let mut height = 0.0;
        if let Some(window_size) = window_size {
            let size = window_size.as_object().unwrap();
            width = size["width"].as_f64().unwrap();
            height = size["height"].as_f64().unwrap();
        }
        let window_position: Option<serde_json::Value> = store.get("window_position");
        let mut x = 0.0;
        let mut y = 0.0;

        // println!("windows_position: {:?}", window_position);
        if let Some(window_position) = window_position {
            let position = window_position.as_object().unwrap();
            x = position["x"].as_f64().unwrap();
            y = position["y"].as_f64().unwrap();
        }
        // position
        if config.center || x <= 0.0 || y <= 0.0 {
            window.center().unwrap();
        } else {
            window
                .set_position(tauri::PhysicalPosition::new(x, y))
                .unwrap();
        }

        if config.fullscreen
            || store
                .get("fullscreen")
                .unwrap_or(serde_json::Value::Bool(false))
                .as_bool()
                .unwrap()
        {
            window.set_fullscreen(true).unwrap();
        } else if config.maximized
            || store
                .get("maximized")
                .unwrap_or(serde_json::Value::Bool(false))
                .as_bool()
                .unwrap()
        {
            window.maximize().unwrap();
        } else if width > 0.0 && height > 0.0 {
            window
                .set_size(tauri::PhysicalSize::new(width, height))
                .unwrap();
        }

        let window_clone = window.clone();
        window.on_window_event(move |event| {
            if let WindowEvent::Resized(size) = event {
                // println!("window_size: {:?}", size);
                if window_clone.is_maximized().unwrap_or(false) {
                    let _ = store.set("maximized", true);
                } else if size.width > 0
                    && size.height > 0
                    && !window_clone.is_minimized().unwrap_or(false)
                {
                    let _ = store.set(
                        "window_size",
                        json!({
                            "width": size.width,
                            "height": size.height
                        }),
                    );
                    let _ = store.set("maximized", false);
                }
                if window_clone.is_fullscreen().unwrap_or(false) {
                    // println!("Window entered fullscreen mode.");
                    let _ = store.set("fullscreen", true);
                } else {
                    let _ = store.set("fullscreen", false);
                }
            } else if let WindowEvent::Moved(position) = event {
                // println!("window_position: {:?}", position);
                if position.x > 0
                    && position.y > 0
                    && !window_clone.is_minimized().unwrap_or(false)
                    && !window_clone.is_maximized().unwrap_or(false)
                {
                    let _ = store.set(
                        "window_position",
                        json!({ "x": position.x, "y": position.y }),
                    );
                }
            }
        });
    }

    window.show().unwrap();

    window.set_focus().unwrap();

    Ok(())
}

pub fn show_window(app: &AppHandle) {
    let main = app.get_webview_window("main");
    if let Some(main) = main {
        main.unminimize().expect("Sorry, can't unminimize window");
        main.set_focus().expect("Sorry, can't focus window");
    } else {
        app.webview_windows()
            .values()
            .next()
            .expect("Sorry, no window found")
            .set_focus()
            .expect("Can't Bring Window to Focus");
    }
}
