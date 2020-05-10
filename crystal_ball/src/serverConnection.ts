import * as E from 'fp-ts/lib/Either';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';


export enum GameEntityType {
  Terrain = 0
}

export interface GameEntityPayload {
  id: string;
  imageId: string;
  position: {
    x: number;
    y: number;
  };
  entityType: GameEntityType;
}

export const createConnection = function(serverURI: string): TE.TaskEither<Error, WebSocket> {
  return TE.tryCatch(
    () => {
      try {
        return Promise.resolve(
          new WebSocket(serverURI)
        );
      }
      catch(error) {
        return Promise.reject(error);
      }
    },
    rejectionReason => new Error(String(rejectionReason))
  );
};

export const handleServerConnection = function(
  connection: WebSocket,
  handleServerMsg: (data: string) => E.Either<Error,boolean>,
  onOpen?: (event: Event) => void,
  onError?: (event: Event) => void,
  onClose?: (event: CloseEvent) => void,
  ): TE.TaskEither<Error, void> {
    return TE.tryCatch(
      () => new Promise((_, reject) => {
        // On WebSocket connection open
        connection.onopen = (event: Event) => {
          console.log("WebSocket connection opened.");
          if(onOpen) { onOpen(event); }
        };

        // On WebSocket connection error
        connection.onerror = (event: Event) => {
          console.log("WebSocket connection error.");
          if(onError) { onError(event); }
        };

        // On WebSocket connection closed
        connection.onclose = function(event: CloseEvent) {
          console.log("WebSocket connection closed.");
          if(onClose)  { onClose(event); }
          reject("Connection closed.");
        }

        // On receiving message from server
        connection.onmessage = function(event: MessageEvent) {
          pipe(
            handleServerMsg(event.data),
            E.fold(
              (_) => reject("Error while processing server message."),
              (result) => {
                if(result) {
                  return;
                }
                reject("Error while processing server message.")
              }
            )
          )
        };
      }),
      rejectionReason => new Error(String(rejectionReason))
    );
};
