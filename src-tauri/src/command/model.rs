pub struct ServerState {
    pub server_handle: Option<tokio::task::JoinHandle<()>>,
}

// #[derive(serde::Serialize)]
// pub struct ProgressPayload {
//     pub file_id: String,
//     pub downloaded: u64,
//     pub total: Option<u64>,
// }
