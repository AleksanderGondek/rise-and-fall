import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';

import { Engine } from "excalibur";

import { GameEntityData } from "./serverConnection";


const deserialize = function<T>(data: string): O.Option<Array<T>> {
  return O.tryCatch(() => JSON.parse(data));
}

export const syncGameState = function(engineOption: O.Option<Engine>): (data: string) => E.Either<Error,boolean> {
  const onNoEngine = () => E.left(new Error("Engine has not been created."));
  const sync = function(text: string): E.Either<Error,boolean>  {
    return pipe(
      deserialize<GameEntityData>(text),
      O.fold(
        () => O.none,
        (_: Array<GameEntityData>) => O.none
      ),      
      () => E.right(true)
    );
  };
  return O.isSome(engineOption) ? sync : onNoEngine;
};
