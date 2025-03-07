use serde_json::{json, Error};
use tauri::{utils::config::WindowConfig, App, WindowEvent};
use tauri_plugin_store::StoreExt;

// handle something when start app
pub async fn resolve_setup(app: &mut App) -> Result<(), Error> {
    let app_handle = app.handle();
    // 获取记录窗口大小
    let store = app.store("app_data.json").unwrap();
    let window_size: Option<serde_json::Value> = store.get("window_size");
    println!("windows_size: {:?}", window_size);
    // 示例 JSON 字符串
    let window_json = r#"
        {
            "title": "PakePlus",
            "center": true
        }
    "#
    .to_string();
    let mut width = 800.0;
    let mut height = 600.0;
    if let Some(window_size) = window_size {
        let size = window_size.as_object().unwrap();
        width = size["width"].as_f64().unwrap();
        height = size["height"].as_f64().unwrap();
        println!("width: {:?}", width);
        println!("height: {:?}", height);
    }
    // 解析 JSON 字符串为 WindowConfig 类型
    let config: WindowConfig = serde_json::from_str(&window_json).unwrap();
    // 打印解析结果
    // println!("{:#?}", config);
    let window = tauri::WebviewWindowBuilder::from_config(app_handle, &config)
        .unwrap()
        .build()
        .unwrap();
    // 设置窗口大小
    window
        .set_size(tauri::PhysicalSize::new(width, height))
        .unwrap();
    // 监听窗口大小变化
    window.on_window_event(move |event| {
        if let WindowEvent::Resized(size) = event {
            // println!("window_size: {:?}", size);
            let _ = store.set(
                "window_size",
                json!({
                    "width": size.width,
                    "height": size.height
                }),
            );
        }
    });

    // 显示窗口
    window.show().unwrap();
    Ok(())
}
