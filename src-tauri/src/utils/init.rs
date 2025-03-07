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
    let mut window_json = r#"
        {
            "width": 890,
            "height": 700,
            "title": "PakePlus",
            "center": true
        }
    "#
    .to_string();
    if let Some(window_size) = window_size {
        let size = window_size.as_object().unwrap();
        let width = size["width"].to_string();
        let height = size["height"].to_string();
        println!("width: {:?}", width);
        println!("height: {:?}", height);
        window_json = window_json.replace("890", &width);
        window_json = window_json.replace("700", &height);
    }
    // 解析 JSON 字符串为 WindowConfig 类型
    let config: WindowConfig = serde_json::from_str(&window_json).unwrap();
    // 打印解析结果
    // println!("{:#?}", config);
    let window = tauri::WebviewWindowBuilder::from_config(app_handle, &config)
        .unwrap()
        .build()
        .unwrap();

    // 监听窗口大小变化
    window.on_window_event(move |event| {
        if let WindowEvent::Resized(size) = event {
            println!("window_size: {:?}", size);
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
