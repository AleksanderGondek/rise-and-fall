use rand::Rng;
use tokio::{runtime, sync::oneshot::error::RecvError};

async fn fibonacci(n: u64) -> Result<u64, RecvError> {
  let (send, recv) = tokio::sync::oneshot::channel();

  rayon::spawn(move || {
    fn fibonacci_lr(n: u64, a: u64, b: u64) -> u64 {
      match n {
          0 => a,
          _ => fibonacci_lr(n - 1, a + b, a),
      }
    }
    let number = fibonacci_lr(n, 1, 0);
    let _ = send.send(number);
  });
  
  recv.await
}

async fn yeet(n: u64) {
  println!("yeet for {} - enter", n);
  let _ = fibonacci(n).await;
  println!("yeet for {} - exit", n);
}

fn main() {
  let main_loop: runtime::Runtime = match runtime::Builder::new_multi_thread()
    .enable_time()
    .enable_io()
    .build() {
      Ok(x) => x,
      Err(_) => return
  };

  main_loop.block_on(async move {
    let mut interval = tokio::time::interval(std::time::Duration::from_secs(1));
    let mut counter: u64 = 0;
    
    loop {
      println!("Entering loop..");
      counter+=1;
      if counter > 10 {
        return;
      }
      let mut rng = rand::thread_rng();

      let _ = tokio::join!(
        interval.tick(),
        tokio::spawn(yeet(rng.gen_range(20..90))),
        tokio::spawn(yeet(rng.gen_range(20..90))),
        tokio::spawn(yeet(rng.gen_range(20..90))),
      );     

      println!("Exiting loop..");
    }
  });
}

