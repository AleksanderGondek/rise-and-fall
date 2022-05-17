use rand::Rng;
use tokio::runtime;

async fn yeet(milis: u64) {
  println!("yeet for {} ms - enter", milis);
  tokio::time::sleep(std::time::Duration::from_millis(milis)).await;
  println!("yeet for {} ms - exit", milis);
}

fn main() {
  let main_loop: runtime::Runtime = match runtime::Builder::new_current_thread()
    .enable_time()
    .enable_io()
    .build() {
      Ok(x) => x,
      Err(_) => return
  };

  main_loop.block_on(async move {
    let mut interval = tokio::time::interval(std::time::Duration::from_secs(1));
    
    loop {
      println!("Entering loop..");
      let mut rng = rand::thread_rng();

      let _ = tokio::join!(
        interval.tick(),
        tokio::spawn(yeet(rng.gen_range(200..2000))),
        tokio::spawn(yeet(rng.gen_range(200..2000))),
        tokio::spawn(yeet(rng.gen_range(200..2000))),
      );     

      println!("Exiting loop..");
    }
  });
}

