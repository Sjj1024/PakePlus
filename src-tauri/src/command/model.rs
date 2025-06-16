use std::net::TcpListener;

pub struct ServerState {
    pub server_handle: Option<tokio::task::JoinHandle<()>>,
}

pub fn find_port() -> std::io::Result<u16> {
    // 绑定到端口 0，让系统自动分配可用端口
    let listener = TcpListener::bind("127.0.0.1:0")?;
    let port = listener.local_addr()?.port();
    Ok(port)
}

#[derive(serde::Serialize)]
pub struct ProgressPayload {
    pub file_id: String,
    pub downloaded: u64,
    pub total: Option<u64>,
}