use crate::command::cmds::{get_config_js, get_exe_dir, get_www_dir, load_man};
use base64::{prelude::BASE64_STANDARD, Engine};
use serde::{Deserialize, Serialize};
use serde_json::{json, Error, Value};
use tauri::{utils::config::WindowConfig, App, Url, WebviewUrl, WindowEvent};
use tauri_plugin_store::StoreExt;

#[derive(Debug, Serialize, Deserialize)]
pub struct Man {
    pub name: String,
    pub version: String,
    pub description: String,
    pub author: String,
    pub license: String,
    pub window: WindowConfig,
    pub debug: bool,
    pub icon: String,
}

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
            "url": "index.html",
            "width": 1024,
            "height": 720
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
    let mut store_name = "app_data.json".to_string();
    let mut config: WindowConfig = serde_json::from_value(json_value).unwrap();
    // load man
    let startup_dir = get_exe_dir(true);
    let man = load_man(&startup_dir);
    let man_content = man.unwrap();
    // custom js
    let mut contents = String::new();
    #[cfg(target_os = "windows")]
    let mut icon_bytes: Vec<u8> = Vec::new();
    // let mut ico_byte =
    if man_content.len() > 0 {
        let mut man_config: Man = serde_json::from_str(&man_content).unwrap();
        let www_dir = get_www_dir(&startup_dir);
        let www_dir_str = www_dir.unwrap();
        man_config.window.label = "main".to_string();
        man_config.window.visible = false;
        store_name = format!("{}.json", man_config.name.as_str());
        if www_dir_str.len() > 0 {
            man_config.window.url = WebviewUrl::External(Url::parse(&www_dir_str).unwrap());
        }
        config = man_config.window;
        // custom js
        let custom_js = get_config_js(&startup_dir);
        if custom_js.is_ok() {
            contents = custom_js.unwrap();
        }
        // debug
        if man_config.debug {
            contents += "var vConsole = new window.VConsole();";
        }
        // icon
        #[cfg(target_os = "windows")]
        if man_config.icon.len() > 0 {
            let icon_base64 = BASE64_STANDARD.decode(man_config.icon.trim());
            icon_bytes = icon_base64.unwrap();
        }
    }
    // init window
    let window = tauri::WebviewWindowBuilder::from_config(app_handle, &config)
        .unwrap()
        .initialization_script(contents.as_str())
        .build()
        .unwrap();
    let store = app.store(store_name).unwrap();
    // store.clear();
    let window_size: Option<serde_json::Value> = store.get("window_size");
    let mut width = 0.0;
    let mut height = 0.0;
    if let Some(window_size) = window_size {
        let size = window_size.as_object().unwrap();
        width = size["width"].as_f64().unwrap();
        height = size["height"].as_f64().unwrap();
    }

    #[cfg(target_os = "windows")]
    if icon_bytes.len() > 0 {
        use tauri::image::Image;
        let png_image = Image::from_bytes(&icon_bytes).unwrap();
        window.set_icon(png_image).unwrap();
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
    if config.fullscreen
        || store
            .get("window_fullscreen")
            .is_some_and(|x| x.as_object().unwrap()["fullscreen"].as_bool().unwrap())
    {
        window.set_fullscreen(true).unwrap();
    } else if width > 0.0 && height > 0.0 {
        window
            .set_size(tauri::PhysicalSize::new(width, height))
            .unwrap();
    } else {
        window
            .set_size(tauri::PhysicalSize::new(1024, 720))
            .unwrap();
    }
    // position
    if config.center || x <= 0.0 || y <= 0.0 {
        window.center().unwrap();
    } else {
        window
            .set_position(tauri::PhysicalPosition::new(x, y))
            .unwrap();
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
            let _ = store.set(
                "window_position",
                json!({ "x": position.x, "y": position.y }),
            );
        } else if let WindowEvent::DragDrop(drag_drop) = event {
            println!("drag_drop: {:?}", drag_drop);
        }
    });
    window.show().unwrap();
    window.set_focus().unwrap();
    Ok(())
}
