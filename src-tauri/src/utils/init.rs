use base64::{prelude::BASE64_STANDARD, Engine};
use serde_json::{json, Error, Value};
use tauri::{utils::config::WindowConfig, App, WindowEvent};
use tauri_plugin_store::StoreExt;

pub fn append_param(original_url: &str, value: &str) -> String {
    let separator = if original_url.contains('?') { "&" } else { "?" };
    format!("{}{}args={}", original_url, separator, url_encode(value))
}

pub fn url_encode(input: &str) -> String {
    input
        .bytes()
        .map(|b| match b {
            b'-' | b'_' | b'.' | b'~' | b'a'..=b'z' | b'A'..=b'Z' | b'0'..=b'9' => {
                (b as char).to_string()
            }
            _ => format!("%{:02X}", b),
        })
        .collect()
}

// handle something when start app
pub async fn resolve_setup(app: &mut App) -> Result<(), Error> {
    let args: Vec<String> = std::env::args().collect();
    let args_str = args[1..].join("|");
    let args_base64 = BASE64_STANDARD.encode(args_str.as_bytes());
    let app_handle = app.handle();
    let window_json = r#"
        {
            "title": "PakePlus",
            "visible": false,
            "url": "index.html"
        }
    "#;
    let mut json_value: Value = serde_json::from_str(window_json)?;
    if !args_base64.is_empty() {
        if let Some(url) = json_value.get_mut("url") {
            if let Some(original_url) = url.as_str() {
                let new_url = append_param(original_url, args_base64.as_str());
                *url = Value::String(new_url);
            }
        }
    }
    let config: WindowConfig = serde_json::from_value(json_value).unwrap();
    let window = tauri::WebviewWindowBuilder::from_config(app_handle, &config)
        .unwrap()
        .build()
        .unwrap();
    let store = app.store("app_data.json").unwrap();
    let window_fullscreen: Option<serde_json::Value> = store.get("window_fullscreen");
    // println!("windows_fullscreen: {:?}", window_fullscreen);
    let window_size: Option<serde_json::Value> = store.get("window_size");
    // println!("windows_size: {:?}", window_size);
    let mut width = 960.0;
    let mut height = 720.0;
    if let Some(window_size) = window_size {
        let size = window_size.as_object().unwrap();
        width = size["width"].as_f64().unwrap();
        height = size["height"].as_f64().unwrap();
        // println!("width: {:?}", width);
        // println!("height: {:?}", height);
    }

    let window_position: Option<serde_json::Value> = store.get("window_position");
    let mut x = 0.0;
    let mut y = 0.0;
    // println!("windows_position: {:?}", window_position);
    if let Some(window_position) = window_position {
        let position = window_position.as_object().unwrap();
        x = position["x"].as_f64().unwrap();
        y = position["y"].as_f64().unwrap();
        // println!("x: {:?}", x);
        // println!("y: {:?}", y);
    }

    if let Some(window_fullscreen) = window_fullscreen {
        let fullscreen = window_fullscreen.as_object().unwrap();
        // println!("fullscreen: {:?}", fullscreen);
        if config.fullscreen || fullscreen["fullscreen"].as_bool().unwrap() {
            window.set_fullscreen(true).unwrap();
            // println!("window fullscreen");
        } else {
            window
                .set_size(tauri::PhysicalSize::new(width, height))
                .unwrap();
            if config.center || (x == 0.0 && y == 0.0) {
                window.center().unwrap();
            } else {
                window
                    .set_position(tauri::PhysicalPosition::new(x, y))
                    .unwrap();
            }
        }
    }

    let window_clone = window.clone();

    window.on_window_event(move |event| {
        if let WindowEvent::Resized(size) = event {
            // println!("window_size: {:?}", size);
            if size.width > 0 && size.height > 0 {
                let _ = store.set(
                    "window_size",
                    json!({
                        "width": size.width,
                        "height": size.height
                    }),
                );
            }
            if window_clone.is_fullscreen().unwrap_or(false) {
                // println!("Window entered fullscreen mode.");
                let _ = store.set(
                    "window_fullscreen",
                    json!({
                        "fullscreen": true
                    }),
                );
            } else {
                let _ = store.set(
                    "window_fullscreen",
                    json!({
                        "fullscreen": false
                    }),
                );
            }
        } else if let WindowEvent::Moved(position) = event {
            // println!("window_position: {:?}", position);
            if position.x > 0 && position.y > 0 {
                let _ = store.set(
                    "window_position",
                    json!({ "x": position.x, "y": position.y }),
                );
            }
        } else if let WindowEvent::DragDrop(drag_drop) = event {
            println!("drag_drop: {:?}", drag_drop);
        } else if let WindowEvent::Destroyed = event {
            println!("window destroyed");
        }
    });
    window.show().unwrap();
    window.set_focus().unwrap();
    Ok(())
}