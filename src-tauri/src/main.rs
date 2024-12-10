// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// 对command单独管理
mod command;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Make the docker NOT to have an active app when started
            #[cfg(target_os = "macos")]
            app.set_activation_policy(tauri::ActivationPolicy::Accessory);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            command::pakeplus::open_window,
            command::pakeplus::preview_from_config,
            command::pakeplus::update_build_file,
            command::pakeplus::update_config_file,
            command::pakeplus::update_cargo_file,
            command::pakeplus::update_main_rust,
            command::pakeplus::update_custom_js,
            command::pakeplus::content_to_base64,
            command::pakeplus::update_config_json,
            command::pakeplus::rust_main_window,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
