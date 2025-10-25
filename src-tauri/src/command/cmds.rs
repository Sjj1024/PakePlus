use crate::command::model::ServerState;
use base64::prelude::*;
use futures::StreamExt;
use notify_rust::Notification;
use reqwest::Client;
use serde::Serialize;
use std::env;
use std::fs;
use std::fs::File;
use std::io;
use std::io::Read;
use std::io::Write;
use std::net::TcpListener;
use std::path::Path;
use std::path::PathBuf;
use std::process::Command;
use std::sync::{Arc, Mutex};
use std::time::Instant;
use tauri::WindowEvent;
use tauri::{
    path::BaseDirectory, utils::config::WindowConfig, AppHandle, Emitter, LogicalSize, Manager,
};
use tauri_plugin_http::reqwest;
use walkdir::WalkDir;
use warp::Filter;
use zip::write::FileOptions;
use zip::ZipArchive;
use zip::ZipWriter;

#[tauri::command]
pub async fn start_server(
    state: tauri::State<'_, Arc<Mutex<ServerState>>>,
    path: String,
) -> Result<u16, String> {
    let mut state = state.lock().unwrap();
    if state.server_handle.is_some() {
        return Err("Server is already running".into());
    }
    let path_clone = path.clone();
    let port = find_port().unwrap();
    // println!("port: {}", port);
    let server_handle = tokio::spawn(async move {
        let route = warp::fs::dir(path_clone)
            .map(|reply| {
                warp::reply::with_header(
                    reply,
                    "Cache-Control",
                    "no-store, no-cache, must-revalidate, max-age=0",
                )
            })
            .map(|reply| warp::reply::with_header(reply, "Vary", "*"))
            .map(|reply| warp::reply::with_header(reply, "Surrogate-Control", "no-store"))
            .map(|reply| warp::reply::with_header(reply, "Pragma", "no-cache"))
            .map(|reply| warp::reply::with_header(reply, "Expires", "0"));
        warp::serve(route).run(([127, 0, 0, 1], port)).await;
    });
    state.server_handle = Some(server_handle);
    Ok(port)
}

#[tauri::command]
pub async fn stop_server(state: tauri::State<'_, Arc<Mutex<ServerState>>>) -> Result<(), String> {
    let mut state = state.lock().unwrap();
    if let Some(handle) = state.server_handle.take() {
        handle.abort();
        Ok(())
    } else {
        Err("Server is not running".into())
    }
}

#[tauri::command]
pub async fn preview_from_config(
    handle: AppHandle,
    resize: bool,
    config: WindowConfig,
    js_content: String,
    devbug: bool,
    icon_base64: String,
) {
    let window_label = "PreView";
    if let Some(existing_window) = handle.get_webview_window(window_label) {
        if resize {
            let new_size = LogicalSize::new(config.width, config.height);
            match existing_window.set_size(new_size) {
                Ok(_) => println!("Window resized to {}x{}", config.width, config.height),
                Err(e) => eprintln!("Failed to resize window: {}", e),
            }
        } else {
            // existing_window.eval(js)
            existing_window.close().unwrap();
            let start = Instant::now();
            while handle.get_webview_window(window_label).is_some() {
                if start.elapsed().as_secs() > 2 {
                    println!("Window close took too long. Aborting.");
                    return;
                }
                std::thread::yield_now();
            }
        }
    }
    let mut contents = String::new();
    // custom js
    contents += js_content.as_str();
    if !resize {
        let pre_window = tauri::WebviewWindowBuilder::from_config(&handle, &config)
            .unwrap()
            .title(config.title)
            .initialization_script_for_all_frames(contents.as_str())
            .build()
            .unwrap();
        if icon_base64.len() > 0 {
            use tauri::image::Image;
            let icon_decode =
                BASE64_STANDARD.decode(icon_base64.replace("data:image/png;base64,", "").trim());
            let icon_bytes = icon_decode.unwrap();
            let png_image = Image::from_bytes(&icon_bytes).unwrap();
            pre_window.set_icon(png_image).unwrap();
        }
        if devbug {
            pre_window.open_devtools();
        }
        pre_window.on_window_event(move |event| {
            if let WindowEvent::Destroyed = event {
                handle.emit("stop_server", "0").unwrap();
            }
        });
    }
}

#[tauri::command]
pub async fn open_url(_: tauri::AppHandle, url: String) {
    open::that(url).unwrap();
}

// open devtools
#[tauri::command]
pub async fn open_devtools(handle: AppHandle) {
    if let Some(_) = handle.get_webview_window("main") {
        println!("open devtools");
        // existing_window.open_devtools();
    }
}

#[tauri::command]
pub async fn update_init_rs(handle: tauri::AppHandle, config: String, state: bool) -> String {
    let resource_path = handle
        .path()
        .resolve("data/init.rs", BaseDirectory::Resource)
        .expect("failed to resolve resource");
    let mut main_rust = std::fs::File::open(&resource_path).unwrap();
    let mut contents = String::new();
    main_rust.read_to_string(&mut contents).unwrap();
    contents = contents.replace("WINDOWCONFIG", config.as_str());
    // 替换state
    if state {
        println!("state: true");
    } else {
        contents = contents.replace("if true {", "if false {");
    }
    // The new file content, using Base64 encoding
    let encoded_contents = BASE64_STANDARD.encode(contents);
    return encoded_contents;
}

#[tauri::command]
pub async fn run_command(command: String) -> Result<String, String> {
    #[cfg(target_os = "windows")]
    let output = tokio::process::Command::new("powershell")
        .arg("-Command")
        .arg(&command)
        .creation_flags(0x08000000)
        .output()
        .await
        .map_err(|e| e.to_string())?;

    #[cfg(not(target_os = "windows"))]
    let output = tokio::process::Command::new("sh")
        .arg("-c")
        .arg(&command)
        .output()
        .await
        .map_err(|e| e.to_string())?;

    if output.status.success() {
        #[cfg(target_os = "windows")]
        {
            use encoding_rs::GBK;
            let (decoded, _, _) = GBK.decode(&output.stdout);
            Ok(decoded.into_owned())
        }
        #[cfg(not(target_os = "windows"))]
        {
            Ok(String::from_utf8_lossy(&output.stdout).to_string())
        }
    } else {
        #[cfg(target_os = "windows")]
        {
            use encoding_rs::GBK;
            let (decoded, _, _) = GBK.decode(&output.stderr);
            Err(decoded.into_owned())
        }
        #[cfg(not(target_os = "windows"))]
        {
            Err(String::from_utf8_lossy(&output.stderr).to_string())
        }
    }
}

#[tauri::command]
pub fn get_machine_uid() -> String {
    let uid: String = machine_uid::get().unwrap();
    uid
}

fn zip_folder(src_path: &str, dst_path: &str) -> std::io::Result<()> {
    let file = File::create(dst_path)?;
    let mut zip = ZipWriter::new(file);
    print!("src_path = {src_path}");
    print!("dst_path = {dst_path}");
    let options: FileOptions<()> =
        FileOptions::default().compression_method(zip::CompressionMethod::Deflated);

    let src_path = Path::new(src_path);
    let walkdir = WalkDir::new(src_path);
    let it = walkdir.into_iter();

    for entry in it.filter_map(|e| e.ok()) {
        let path = entry.path();
        let name = path.strip_prefix(src_path).unwrap().to_str().unwrap();

        if path.is_file() {
            zip.start_file(name, options)?;
            let mut f = File::open(path)?;
            std::io::copy(&mut f, &mut zip)?;
        } else if !name.is_empty() {
            zip.add_directory(name, options)?;
        }
    }

    zip.finish()?;
    Ok(())
}

fn unzip_file(src_path: &str, dst_path: &str) -> std::io::Result<()> {
    let file = File::open(src_path)?;
    let mut archive = ZipArchive::new(file)?;
    let dst_path = Path::new(dst_path);

    for i in 0..archive.len() {
        let mut file = archive.by_index(i)?;
        let outpath = dst_path.join(file.mangled_name());

        if file.name().ends_with('/') {
            std::fs::create_dir_all(&outpath)?;
        } else {
            if let Some(p) = outpath.parent() {
                if !p.exists() {
                    std::fs::create_dir_all(p)?;
                }
            }
            let mut outfile = File::create(&outpath)?;
            std::io::copy(&mut file, &mut outfile)?;
        }
    }

    Ok(())
}

#[tauri::command]
pub async fn compress_folder(source: String, destination: String) -> Result<(), String> {
    zip_folder(&source, &destination).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn decompress_file(source: String, destination: String) -> Result<(), String> {
    unzip_file(&source, &destination).map_err(|e| e.to_string())
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct DownloadProgress {
    file_id: String,
    downloaded: u64,
    total: u64,
}

#[tauri::command]
pub async fn download_file(
    app: AppHandle,
    url: String,
    save_path: String,
    file_id: String,
) -> Result<(), String> {
    let client = Client::new();
    let resp = client.get(&url).send().await.map_err(|e| e.to_string())?;
    // if save path is empty
    let mut save_path = save_path;
    let file_name = url.split('/').last().unwrap();
    if save_path.is_empty() {
        let file_path = app
            .path()
            .resolve(file_name, BaseDirectory::Download)
            .expect("failed to resolve resource");
        save_path = file_path.to_str().unwrap().to_string();
    }
    let total_size = resp.content_length();
    let mut stream = resp.bytes_stream();
    let mut file = File::create(&save_path).map_err(|e| e.to_string())?;
    let mut downloaded: u64 = 0;

    while let Some(chunk) = stream.next().await {
        let chunk = chunk.map_err(|e| e.to_string())?;
        file.write_all(&chunk).map_err(|e| e.to_string())?;
        downloaded += chunk.len() as u64;
        app.emit(
            "download_progress",
            DownloadProgress {
                file_id: file_id.clone(),
                downloaded,
                total: total_size.unwrap_or(0),
            },
        )
        .unwrap();
    }
    Ok(())
}

#[derive(serde::Deserialize)]
pub struct NotificationParams {
    title: String,
    body: String,
    icon: String,
}

#[tauri::command]
pub fn notification(app: AppHandle, params: NotificationParams) -> Result<(), String> {
    let mut notifi_app = Notification::new();
    #[cfg(target_os = "macos")]
    {
        let _ = notify_rust::set_application(if tauri::is_dev() {
            "com.apple.Terminal"
        } else {
            &app.config().identifier
        });
    }
    #[cfg(windows)]
    {
        use std::path::MAIN_SEPARATOR as SEP;
        let curr_dir = get_exe_dir(true);
        // set the notification's System.AppUserModel.ID only when running the installed app
        if !(curr_dir.ends_with(format!("{SEP}target{SEP}debug").as_str())
            || curr_dir.ends_with(format!("{SEP}target{SEP}release").as_str()))
        {
            notifi_app.app_id(&app.config().identifier);
        }
    }
    if !params.icon.is_empty() {
        notifi_app.icon(&params.icon);
    } else {
        notifi_app.auto_icon();
    }
    tauri::async_runtime::spawn(async move {
        let _ = notifi_app
            .summary(&params.title)
            .body(&params.body)
            .show()
            .expect("show notification failed");
    });
    Ok(())
}

#[tauri::command]
pub fn get_exe_dir(parent: bool) -> String {
    let exe_dir = env::current_exe().unwrap();
    if parent {
        exe_dir.parent().unwrap().to_str().unwrap().to_string()
    } else {
        exe_dir.to_str().unwrap().to_string()
    }
}

// load man.json
pub fn load_man(base_dir: &str) -> Result<String, io::Error> {
    let mut man_path = PathBuf::from(base_dir);
    man_path.push("config");
    man_path.push("man");
    match fs::read_to_string(&man_path) {
        Ok(man_base64) => match BASE64_STANDARD.decode(man_base64.trim()) {
            Ok(decoded_bytes) => match String::from_utf8(decoded_bytes) {
                Ok(decoded_str) => Ok(decoded_str),
                Err(e) => Err(io::Error::new(io::ErrorKind::InvalidData, e)),
            },
            Err(e) => Err(io::Error::new(io::ErrorKind::InvalidData, e)),
        },
        Err(e) if e.kind() == io::ErrorKind::NotFound => Ok(String::new()),
        Err(e) => Err(e),
    }
}

// server config www dir
#[tauri::command]
pub fn get_www_dir(base_dir: &str) -> Result<String, io::Error> {
    let mut www_dir = PathBuf::from(base_dir);
    www_dir.push("config");
    www_dir.push("www");
    if fs::metadata(&www_dir).is_ok() {
        let files = fs::read_dir(&www_dir)?;
        if files.count() > 0 {
            let port = find_port().unwrap();
            let route = warp::fs::dir(www_dir);
            tokio::spawn(async move {
                warp::serve(route).run(([127, 0, 0, 1], port)).await;
            });
            return Ok(format!("http://127.0.0.1:{}", port));
        } else {
            return Ok(String::new());
        }
    }
    Ok(String::new())
}

// get config custom js
#[tauri::command]
pub fn get_config_js(base_dir: &str) -> Result<String, io::Error> {
    let mut config_dir = PathBuf::from(base_dir);
    config_dir.push("config");
    config_dir.push("inject");
    config_dir.push("custom.js");
    if fs::metadata(&config_dir).is_ok() {
        let content = fs::read_to_string(&config_dir)?;
        Ok(content)
    } else {
        Ok(String::new())
    }
}

#[tauri::command]
pub fn get_env_var(name: String) -> Result<String, String> {
    std::env::var(name).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn find_port() -> Result<u16, String> {
    let listener = TcpListener::bind("127.0.0.1:0").unwrap();
    let port = listener.local_addr().unwrap().port();
    Ok(port)
}

// copy dir all
#[tauri::command]
pub fn copy_dir(src: &Path, dst: &Path) -> Result<(), String> {
    if dst.starts_with(src) {
        return Err("Destination cannot be inside source directory".into());
    }
    if !dst.exists() {
        fs::create_dir_all(dst).expect("create dst dir failed");
    }
    for entry in fs::read_dir(src).expect("read src dir failed") {
        let entry = entry.expect("read src dir entry failed");
        let ty = entry
            .file_type()
            .expect("read src dir entry file type failed");
        if ty.is_symlink() {
            // skip symlink
            continue;
        }
        if ty.is_dir() {
            copy_dir(&entry.path(), &dst.join(entry.file_name()))?;
        } else {
            fs::copy(entry.path(), dst.join(entry.file_name())).expect("copy file failed");
        }
    }
    Ok(())
}

#[tauri::command]
pub async fn windows_build(
    base_dir: &str,
    exe_name: &str,
    config: String,
    custom_js: String,
    html_path: String,
    script_path: String,
) -> Result<(), String> {
    let base_path = Path::new(base_dir).join(exe_name);
    if !base_path.exists() {
        fs::create_dir_all(&base_path).map_err(|e| e.to_string())?;
    }
    let config_dir = base_path.join("config").join("inject");
    if !config_dir.exists() {
        fs::create_dir_all(&config_dir).map_err(|e| e.to_string())?;
    }
    let www_dir = base_path.join("config").join("www");
    if !html_path.is_empty() {
        let html_dir = Path::new(&html_path);
        if html_dir.exists() {
            copy_dir(html_dir, &www_dir).expect("copy html dir failed");
        }
    }
    let custom_js_path = config_dir.join("custom.js");
    fs::write(custom_js_path, custom_js).map_err(|e| e.to_string())?;
    let man_path = base_path.join("config").join("man");
    fs::write(man_path, config).map_err(|e| e.to_string())?;
    let www_dir = base_path.join("config").join("www");
    if !html_path.is_empty() {
        let html_dir = Path::new(&html_path);
        if html_dir.exists() {
            copy_dir(html_dir, &www_dir).expect("copy html dir failed");
        }
    }
    let exe_path = env::current_exe().unwrap();
    let exe_dir = exe_path.parent().unwrap();
    let rhexe_dir = exe_dir.join("data").join("rh.exe");
    let rh_command = format!(
        "& \"{}\" -script \"{}\"",
        rhexe_dir.to_str().unwrap(),
        script_path
    );
    run_command(rh_command).await?;
    Ok(())
}

#[tauri::command]
pub async fn macos_build(
    base_dir: &str,
    exe_name: &str,
    config: String,
    base64_png: String,
    custom_js: String,
    html_path: String,
) -> Result<(), String> {
    let base_path = Path::new(base_dir).join(exe_name);
    let app_dir = base_path.join("Contents");
    if !app_dir.exists() {
        fs::create_dir_all(&app_dir).expect("create app dir failed");
    }
    let config_dir = base_path.join("Contents/MacOS/config/inject");
    let resources_dir = base_path.join("Contents/Resources");
    if !config_dir.exists() {
        fs::create_dir_all(&config_dir).expect("create config dir failed");
    }
    if !resources_dir.exists() {
        fs::create_dir_all(&resources_dir).expect("create resources dir failed");
    }
    let www_dir = base_path.join("Contents/MacOS/config/www");
    if !html_path.is_empty() {
        let html_dir = Path::new(&html_path);
        if html_dir.exists() {
            copy_dir(html_dir, &www_dir).expect("copy html dir failed");
        }
    }
    let custom_js_path = config_dir.join("custom.js");
    fs::write(custom_js_path, custom_js).expect("write custom.js failed");
    let exe_path = env::current_exe().unwrap();
    let exe_dir = exe_path.parent().unwrap();
    let exe_parent_dir = exe_dir.parent().unwrap();
    let info_plist_source = exe_parent_dir.join("Info.plist");
    let info_plist_target = base_path.join("Contents/Info.plist");
    fs::copy(&info_plist_source, &info_plist_target).expect("copy info.plist failed");
    let pp_app_target = base_path.join("Contents/MacOS/PakePlus");
    fs::copy(&exe_path, &pp_app_target).expect("copy PakePlus app failed");
    let man_path = base_path.join("Contents/MacOS/config/man");
    fs::write(man_path, config).expect("write man failed");
    if !base64_png.is_empty() {
        let _ = png_to_icns(
            base64_png.replace("data:image/png;base64,", ""),
            resources_dir.to_str().unwrap().to_string(),
        )
        .expect("convert png to icns failed");
    }
    let base_app = Path::new(base_dir).join(format!("{}.app", exe_name));
    if base_app.exists() {
        fs::remove_dir_all(&base_app).expect("delete old app failed");
    }
    fs::rename(base_path, base_app).expect("rename app failed");
    Ok(())
}

#[tauri::command]
pub async fn linux_build(
    base_dir: &str,
    exe_name: &str,
    config: String,
    base64_png: String,
    custom_js: String,
    html_path: String,
) -> Result<(), String> {
    println!("base_dir: {}", base_dir);
    println!("exe_name: {}", exe_name);
    println!("config: {}", config);
    println!("base64_png: {}", base64_png);
    println!("custom_js: {}", custom_js);
    println!("html_path: {}", html_path);
    Ok(())
}

#[tauri::command]
pub async fn build_local(
    handle: AppHandle,
    target_dir: &str,
    project_name: &str,
    exe_name: &str,
    config: WindowConfig,
    base64_png: String,
    debug: bool,
    custom_js: String,
    html_path: String,
) -> Result<(), String> {
    handle.emit("local-progress", "10").unwrap();
    let resource_path = handle
        .path()
        .resolve("data/man.json", BaseDirectory::Resource)
        .expect("failed to resolve resource");
    handle.emit("local-progress", "20").unwrap();
    let man_json = fs::read_to_string(&resource_path).expect("read man.json failed");
    handle.emit("local-progress", "30").unwrap();
    let mut man_json =
        serde_json::from_str::<serde_json::Value>(&man_json).expect("parse man.json failed");
    man_json["window"] = serde_json::to_value(config).unwrap();
    man_json["debug"] = serde_json::to_value(debug).unwrap();
    man_json["name"] = serde_json::to_value(project_name).unwrap();
    man_json["visible"] = serde_json::to_value(false).unwrap();
    #[cfg(target_os = "windows")]
    {
        if !base64_png.is_empty() {
            man_json["icon"] =
                serde_json::to_value(base64_png.replace("data:image/png;base64,", "")).unwrap();
        }
    }
    let man_json_base64 = BASE64_STANDARD.encode(man_json.to_string());
    handle.emit("local-progress", "40").unwrap();
    #[cfg(target_os = "windows")]
    {
        let script_path = handle
            .path()
            .resolve("rhscript.txt", BaseDirectory::AppData)
            .expect("failed to resolve resource");
        windows_build(
            target_dir,
            exe_name,
            man_json_base64,
            custom_js,
            html_path,
            script_path.to_str().unwrap().to_string(),
        )
        .await?;
    }
    handle.emit("local-progress", "60").unwrap();
    #[cfg(target_os = "macos")]
    macos_build(
        target_dir,
        exe_name,
        man_json_base64,
        base64_png,
        custom_js,
        html_path,
    )
    .await?;
    handle.emit("local-progress", "80").unwrap();
    #[cfg(target_os = "linux")]
    linux_build(
        target_dir,
        exe_name,
        man_json_base64,
        base64_png,
        custom_js,
        html_path,
    )
    .await?;
    handle.emit("local-progress", "100").unwrap();
    Ok(())
}

#[tauri::command]
pub fn png_to_icns(base64_png: String, output_dir: String) -> Result<(), String> {
    let iconset_path = format!("{}/temp.iconset", output_dir);
    if Path::new(&iconset_path).exists() {
        fs::remove_dir_all(&iconset_path)
            .map_err(|e| format!("delete old iconset dir failed: {}", e))?;
    }
    fs::create_dir_all(&iconset_path).map_err(|e| format!("create iconset dir failed: {}", e))?;
    let png_data = BASE64_STANDARD
        .decode(&base64_png)
        .map_err(|e| format!("decode base64 png failed: {}", e))?;
    let input_png_path = format!("{}/icon.png", output_dir);
    let mut png_file =
        File::create(&input_png_path).map_err(|e| format!("write png failed: {}", e))?;
    png_file
        .write_all(&png_data)
        .map_err(|e| format!("write png content failed: {}", e))?;
    let sizes = vec![16, 32, 128, 256, 512];
    for size in sizes {
        let double = size * 2;
        let filename = format!("{}/icon_{}x{}.png", iconset_path, size, size);
        let filename2x = format!("{}/icon_{}x{}@2x.png", iconset_path, size, size);
        let status1 = Command::new("sips")
            .args([
                "-z",
                &size.to_string(),
                &size.to_string(),
                &input_png_path,
                "--out",
                &filename,
            ])
            .status()
            .map_err(|e| format!("execute sips failed: {}", e))?;
        let status2 = Command::new("sips")
            .args([
                "-z",
                &double.to_string(),
                &double.to_string(),
                &input_png_path,
                "--out",
                &filename2x,
            ])
            .status()
            .map_err(|e| format!("execute sips 2x failed: {}", e))?;
        if !status1.success() || !status2.success() {
            return Err("sips convert failed".into());
        }
    }
    let icns_path = format!("{}/icon.icns", output_dir);
    let status = Command::new("iconutil")
        .args(["-c", "icns", &iconset_path, "-o", &icns_path])
        .status()
        .map_err(|e| format!("execute iconutil failed: {}", e))?;
    if !status.success() {
        return Err("iconutil convert failed".into());
    }
    let _ = fs::remove_file(&input_png_path);
    let _ = fs::remove_dir_all(&iconset_path);
    Ok(())
}
