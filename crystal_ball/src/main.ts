import { pipe } from "fp-ts/lib/pipeable";
import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';

import { createDisplayEngine, startDisplayEngine } from "./displayEngine";
import { createGfxLoader } from "./gfx";
import { syncGameState } from "./gameState";
import { createConnection, handleServerConnection } from "./serverConnection";


import { Engine } from "excalibur";

const main = async function(): Promise<void> {
  // Ugly variable bleed-through
  // No idea, how to approach this
  // more gracefully.
  let displayEngine: O.Option<Engine>;

  const program = pipe(
    createDisplayEngine(),
    TE.chain(
      (engine) => {
        displayEngine = O.some(engine);
        return startDisplayEngine(
          engine,
          createGfxLoader()
        );
      }
    ),
    TE.chain(
      () => {
        console.log("Cheerio! displayEngine is ready!");
        return TE.right(0);
      }
    ),
    TE.chain(
      () => createConnection("ws://localhost:2137")
    ),
    TE.chain(
      (wsConnection) => handleServerConnection(
        wsConnection,
        syncGameState(displayEngine)
      ),
    )
  );
  await program();
}

main();
