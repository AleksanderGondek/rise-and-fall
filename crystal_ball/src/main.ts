import { pipe } from "fp-ts/lib/pipeable";
import * as E from 'fp-ts/lib/Either';
import * as TE from 'fp-ts/lib/TaskEither';
import { fold } from 'fp-ts/lib/TaskEither';

import { createDisplayEngine, startDisplayEngine } from "./displayEngine";
import { createConnection, handleServerConnection } from "./serverConnection";
import { GfxLoader } from "./gfx";

const main = async function(): Promise<void> {
  const program = pipe(
    createDisplayEngine(),
    fold(
      error => TE.left(error),
      displayEngine => startDisplayEngine(displayEngine, GfxLoader)
    ),
    TE.chain(
      () => {
        console.log("Cheerio! displayEngine is ready!");
        return TE.right(0);
      }
    ),
    TE.chain(
      () => createConnection("wss://localhost:2137")
    ),
    TE.chain(
      (wsConnection) => handleServerConnection(
        wsConnection,
        () => E.left(new Error("To be implemented.")) 
      )
    )
  );
  await program();
}

main()
