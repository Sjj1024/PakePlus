use tauri::{
  plugin::{Builder, TauriPlugin},
  Manager, Runtime,
};

pub use models::*;

#[cfg(desktop)]
mod desktop;
#[cfg(mobile)]
mod mobile;

mod commands;
mod error;
mod models;

pub use error::{Error, Result};

#[cfg(desktop)]
use desktop::Pakeplus;
#[cfg(mobile)]
use mobile::Pakeplus;

/// Extensions to [`tauri::App`], [`tauri::AppHandle`] and [`tauri::Window`] to access the pakeplus APIs.
pub trait PakeplusExt<R: Runtime> {
  fn pakeplus(&self) -> &Pakeplus<R>;
}

impl<R: Runtime, T: Manager<R>> crate::PakeplusExt<R> for T {
  fn pakeplus(&self) -> &Pakeplus<R> {
    self.state::<Pakeplus<R>>().inner()
  }
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("pakeplus")
    .invoke_handler(tauri::generate_handler![commands::ping])
    .setup(|app, api| {
      #[cfg(mobile)]
      let pakeplus = mobile::init(app, api)?;
      #[cfg(desktop)]
      let pakeplus = desktop::init(app, api)?;
      app.manage(pakeplus);
      Ok(())
    })
    .build()
}
