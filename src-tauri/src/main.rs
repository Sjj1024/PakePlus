// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, Menu, MenuItem, Submenu};
// 对command单独管理
mod command;

fn main() {
    let edit_menu = Submenu::new(
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
    );
    tauri::Builder::default()
        // .setup(|app| {
        //     let _window = tauri::WindowBuilder::new(
        //         app,
        //         "PakePlus",
        //         tauri::WindowUrl::App("https://juejin.cn/".into()),
        //     )
        //     // .initialization_script(include_str!("./extension/event.js"))
        //     // .initialization_script(include_str!("./extension/style.js"))
        //     // .initialization_script(include_str!("./extension/component.js"))
        //     .initialization_script(include_str!("./extension/custom.js"))
        //     .title("PakePlus")
        //     .build()?;
        //     Ok(())
        // })
        .setup(|app| {
            let main_window = app.get_window("main").unwrap();
            // 在窗口加载时注入脚本
            main_window
                .eval(include_str!("./extension/custom.js"))
                .unwrap();
            Ok(())
        })
        .menu(Menu::new().add_submenu(edit_menu))
        .invoke_handler(tauri::generate_handler![
            command::pake::open_window,
            command::pake::update_build_file,
            command::pake::update_config_file,
            command::pake::update_cargo_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
