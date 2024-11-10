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
                tauri::WindowUrl::App("PROJECTURL".into()),
            )
            .initialization_script(include_str!("./extension/custom.js"))
            .title("PROJECTNAME")
            .inner_size(-1.0, -2.0)
            .center()
            .user_agent("PROJECTUSERAGENT")
            .build()?;
            Ok(())
        })
        .menu(Menu::new().add_submenu(edit_menu))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
