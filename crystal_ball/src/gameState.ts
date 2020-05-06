import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';

import { Engine } from "excalibur";

export const syncGameState = function(engineOption: O.Option<Engine>): (data: string) => E.Either<Error,boolean> {
  const onNoEngine = () => E.left(new Error("Engine has not been created."));
  const sync = function(_: string): E.Either<Error,boolean>  {
    // TODO: To be implemented
    return E.right(true);
  };
  return O.isSome(engineOption) ? sync : onNoEngine;
};
