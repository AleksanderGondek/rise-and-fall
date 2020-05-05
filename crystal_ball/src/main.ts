import { pipe } from "fp-ts/lib/pipeable";
import * as TE from 'fp-ts/lib/TaskEither';
import { fold } from 'fp-ts/lib/TaskEither';

import { createDisplayEngine, startDisplayEngine } from "./displayEngine";
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
    )
  );
  await program();
}

main()
