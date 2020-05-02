import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";

import { Engine } from "excalibur";

import { updateDisplayedState } from "./gameState";
import { IGameEntity } from "./model";

const createConnection = function(serverURI: string): E.Either<Error, WebSocket> {
  return E.tryCatch<Error, WebSocket>(
    () => new WebSocket(serverURI),
    reason => new Error(String(reason))
  )
};

const parseResponse = function(data: string): E.Either<Error, IGameEntity[]> {
  return E.tryCatch<Error, IGameEntity[]>(
    () => JSON.parse(data),
    reason => new Error(String(reason))
  )
};

const onConnectionOpen = function(_: Engine) {
  return function(event: Event) {
    console.log("Connection opened!");
    console.log(event);
  };
};

const onConnectionError = function(displayEngine: Engine) {
  return function(event: Event) {
    console.log("Connection error!");
    console.log(event);
    displayEngine.stop();
  };
};

const onConnectionClosed = function(displayEngine: Engine) {
  return function(event: CloseEvent) {
    console.log("Connection closed! Code: " + event.code);
    displayEngine.stop();
  };
};


const onMessageReceived = function(displayEngine: Engine) {
  return function(event: MessageEvent) {
    console.log("Message received!");
    pipe(
      parseResponse(event.data),
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
    createConnection(serverURI),
    E.fold(
      error => {
        console.log("Unable to create connection!");
        console.log(error);
        displayEngine.stop();
      },
      connection => {
        connection.onopen = onConnectionOpen(displayEngine);
        connection.onmessage = onMessageReceived(displayEngine);
        connection.onerror = onConnectionError(displayEngine);
        connection.onclose = onConnectionClosed(displayEngine);
      },
    )
  )
}
