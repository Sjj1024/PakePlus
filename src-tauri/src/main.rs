// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// 对command单独管理
mod command;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            command::preview::open_docs,
            command::preview::read_json_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
