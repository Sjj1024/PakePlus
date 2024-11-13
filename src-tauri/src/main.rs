// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Menu, MenuItem, Submenu};

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
        .setup(|app| {
            let _window = tauri::WindowBuilder::new(
                app,
                "PakePlus",
                tauri::WindowUrl::App("https://juejin.cn/".into()),
            )
            .initialization_script(include_str!("./extension/custom.js"))
            .title("掘金")
            .inner_size(1300.0, 900.0)
            .center()
            .user_agent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36")
            .build()?;
            Ok(())
        })
        .menu(Menu::new().add_submenu(edit_menu))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
