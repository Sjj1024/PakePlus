use serde_json::{json, Error};
use tauri::{utils::config::WindowConfig, App, AppHandle, Manager, WindowEvent};
use tauri_plugin_store::StoreExt;

// handle something when start app
pub async fn resolve_setup(app: &mut App) -> Result<(), Error> {
    let app_handle = app.handle();
    // 示例 JSON 字符串
    let window_json = r#"{"url": "index.html"}"#;
    // 解析 JSON 字符串为 WindowConfig 类型
    let mut config: WindowConfig = serde_json::from_str(window_json).unwrap();
    config.label = "main".to_string();
    let window = tauri::WebviewWindowBuilder::from_config(app_handle, &config)
        .unwrap()
        .initialization_script(include_str!("../../data/custom.js"))
        .build()
        .unwrap();

    // 是否记录窗口位置和大小
    if true {
        // 获取记录窗口大小
        let store = app.store("app_data.json").unwrap();

        // 获取记录窗口全屏
        let window_fullscreen: Option<serde_json::Value> = store.get("window_fullscreen");

        // 获取记录窗口大小
        let window_size: Option<serde_json::Value> = store.get("window_size");
        let mut width = 800.0;
        let mut height = 600.0;
        // 如果window_size存在，则设置窗口大小
        if let Some(window_size) = window_size {
            let size = window_size.as_object().unwrap();
            width = size["width"].as_f64().unwrap();
            height = size["height"].as_f64().unwrap();
        }

        // 获取记录窗口位置
        let window_position: Option<serde_json::Value> = store.get("window_position");
        let mut x = 0.0;
        let mut y = 0.0;
        // 如果window_position存在，则设置窗口位置
        if let Some(window_position) = window_position {
            let position = window_position.as_object().unwrap();
            x = position["x"].as_f64().unwrap();
            y = position["y"].as_f64().unwrap();
        }

        // 如果window_fullscreen存在，则设置全屏
        if let Some(window_fullscreen) = window_fullscreen {
            let fullscreen = window_fullscreen.as_object().unwrap();
            if fullscreen["fullscreen"].as_bool().unwrap() {
                window.set_fullscreen(true).unwrap();
            } else {
                // 设置窗口大小
                window
                    .set_size(tauri::PhysicalSize::new(width, height))
                    .unwrap();
                // 设置窗口位置
                // 如果xy为0，则窗口为中心位置
                if x == 0.0 && y == 0.0 {
                    window.center().unwrap();
                } else {
                    window
                        .set_position(tauri::PhysicalPosition::new(x, y))
                        .unwrap();
                }
            }
        }

        // 用于监听窗口是否全屏
        let window_clone = window.clone();

        // 监听窗口大小变化
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
            }
            // 监听窗口位置变化
            if let WindowEvent::Moved(position) = event {
                if position.x > 0 && position.y > 0 {
                    let _ = store.set(
                        "window_position",
                        json!({ "x": position.x, "y": position.y }),
                    );
                }
            }
        });
    }

    // 显示窗口
    window.show().unwrap();

    // 设置窗口聚焦
    window.set_focus().unwrap();

    Ok(())
}

// 单例模式，当二次启动时聚焦
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
