pub struct ServerState {
    pub server_handle: Option<tokio::task::JoinHandle<()>>,
}
