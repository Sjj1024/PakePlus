// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// 对command单独管理
mod command;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            command::pake::open_window,
            command::pake::update_build_file,
            command::pake::update_config_file,
            command::pake::update_cargo_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
