use config::{ConfigError, File};
use serde_derive::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Settings {
    debug: bool,
}

impl Settings {
  pub fn new() -> Result<Settings, ConfigError> {
    let settings = config::Config::builder()
      .set_default(
        "debug",
        true
      )?
      .add_source(
        File::with_name("config.toml")
      )
      .build()?;

    settings.try_deserialize()
  }
}

fn main() {
  match Settings::new() {
    Ok(settings) => println!(
      "Configuration debug flag value: {:?}", settings.debug
    ),
    _ => {
      println!("Could not read configuration file!")
    }
  }
}
