pub fn get_download_message(message_type: MessageType) -> String {
    let default_start_message = "Start downloading~";
    let chinese_start_message = "开始下载中~";

    let default_success_message = "Download successful, saved to download directory~";
    let chinese_success_message = "下载成功，已保存到下载目录~";

    let default_failure_message = "Download failed, please check your network connection~";
    let chinese_failure_message = "下载失败，请检查你的网络连接~";

    env::var("LANG")
        .map(|lang| {
            if lang.starts_with("zh") {
                match message_type {
                    MessageType::Start => chinese_start_message,
                    MessageType::Success => chinese_success_message,
                    MessageType::Failure => chinese_failure_message,
                }
            } else {
                match message_type {
                    MessageType::Start => default_start_message,
                    MessageType::Success => default_success_message,
                    MessageType::Failure => default_failure_message,
                }
            }
        })
        .unwrap_or_else(|_| match message_type {
            MessageType::Start => default_start_message,
            MessageType::Success => default_success_message,
            MessageType::Failure => default_failure_message,
        })
        .to_string()
}
