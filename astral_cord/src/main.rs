#[macro_use]
extern crate log;

use std::net::SocketAddr;

use futures_util::SinkExt;
use serde::{Serialize, Deserialize};
use tokio::net::{TcpListener, TcpStream};
use tokio_tungstenite::{accept_async, tungstenite::Error};
use tungstenite::Result;

#[derive(Serialize, Deserialize, Debug)]
struct Position {
    x: u32,
    y: u32
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
struct GameEntity {
    // TODO: Use uuid crate
    id: String,
    image_id: String,
    position: Position,
    game_entity_type: u8
}


async fn accept_connection(peer: SocketAddr, stream: TcpStream) {
    if let Err(e) = handle_connection(peer, stream).await {
        match e {
            Error::ConnectionClosed | Error::Protocol(_) | Error::Utf8 => (),
            err => error!("Error processing connection: {}", err),
        }
    }
}

async fn handle_connection(peer: SocketAddr, stream: TcpStream) -> Result<()> {
    let mut ws_stream = accept_async(stream).await.expect("Failed to accept");

    info!("New WebSocket connection: {}", peer);

    let mut counter = 10;
    while counter > 0 {
        let game_entities = vec![GameEntity { 
            id: "936DA01F9ABD4d9d80C702AF85C822A8".to_string(), 
            image_id: "/assets/something.png".to_string(),
            position: Position { x: (counter * 16), y: (counter * 16) },
            game_entity_type: 0
        }];

        let msg = tungstenite::Message::Text(
            serde_json::to_string_pretty(&game_entities).unwrap()
        );
        ws_stream.send(msg).await?;
        counter -= 1;
    }

    Ok(())
}

#[tokio::main]
async fn main() {
    env_logger::init();

    let addr = "127.0.0.1:2137";
    let mut listener = TcpListener::bind(&addr).await.expect("Can't listen");
    info!("Listening on: {}", addr);

    while let Ok((stream, _)) = listener.accept().await {
        let peer = stream
            .peer_addr()
            .expect("connected streams should have a peer address");
        info!("Peer address: {}", peer);

        tokio::spawn(accept_connection(peer, stream));
    }
}
