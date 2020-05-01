import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";

import { Engine } from "excalibur";

import { updateDisplayedState, GameState } from "./gameState";

function createGameServerConnection(serverURI: string): E.Either<Error, WebSocket> {
  return E.tryCatch<Error, WebSocket>(
    () => new WebSocket(serverURI),
    reason => new Error(String(reason))
  )
}

function parseServerResponse(data: string): E.Either<Error, GameState> {
  return E.tryCatch<Error, GameState>(
    () => JSON.parse(data),
    reason => new Error(String(reason))
  )
}

const onServerConnectionOpen = function(event: Event) {
  console.log("Connection opened!");
  console.log(event);
};

const onServerConnectionError = function(displayEngine: Engine) {
  return function(event: Event) {
    console.log("Connection error!");
    console.log(event);
    displayEngine.stop();
  };
};

const onServerConnectionClosed = function(displayEngine: Engine) {
  return function(event: CloseEvent) {
    console.log("Connection closed! Code: " + event.code);
    displayEngine.stop();
  };
};


const onServerMessage = function(displayEngine: Engine) {
  return function(event: MessageEvent) {
    console.log("Message received!");
    pipe(
      parseServerResponse(event.data),
      E.fold(
        parseError => {
          console.log("Error parsing server response!");
          console.log(parseError);
        },
        gameState => updateDisplayedState(displayEngine)(gameState),
      )
    );
  };
}

export function syncGameState(serverURI: string, displayEngine: Engine) {
  return pipe(
    createGameServerConnection(serverURI),
    E.fold(
      error => {
        console.log("Unable to create connection!");
        console.log(error);
        displayEngine.stop();
      },
      connection => {
        connection.onopen = onServerConnectionOpen;
        connection.onmessage = onServerMessage(displayEngine);
        connection.onerror = onServerConnectionError(displayEngine);
        connection.onclose = onServerConnectionClosed(displayEngine);
      },
    )
  )
}
