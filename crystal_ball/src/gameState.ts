import * as A from 'fp-ts/lib/Array';
import * as O from 'fp-ts/lib/Option';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';

import { Engine } from "excalibur";
 
import { GameEntity } from "./gameEntity";
import { GameMap } from "./gameMap";
import { IGameEntityPayload, IGameMap, IServerResponse } from "./model";


export class GameState {
  private engineOption: O.Option<Engine>;
  private entities: {[key: string]: GameEntity}
  private gameMap?: GameMap;

  constructor(engineOption: O.Option<Engine>) {
    this.engineOption = engineOption;
    this.entities = {};
  };

  upsertMap(gameMap: IGameMap): boolean {
    return O.isSome(
      pipe(
        this.engineOption,
        O.fold(
          () => O.none,
          (engine: Engine) => O.tryCatch(() => {
            if(this.gameMap === undefined) {
              this.gameMap = new GameMap(engine, gameMap);
              return;
            }
            if(this.gameMap.hash() === gameMap.hash) {
              return;
            }
            this.gameMap.upsert(gameMap);
          }),
        )
      )
    );
  };

  private upsertEntity(entityData: IGameEntityPayload): boolean {
    return O.isSome(O.tryCatch(() => {
      if(entityData.id in this.entities) {
        this.entities[entityData.id].updateInPlace(entityData);
      } else {
        this.entities[entityData.id] = new GameEntity(entityData);
        pipe(
          this.engineOption,
          O.fold(
            () => {},
            engine => {
              engine.add(this.entities[entityData.id])
            }
          )
        );
      }
    }));
  };

  upsertEntities(entitiesData: IGameEntityPayload[]): boolean {
    return A.array.reduce(
      entitiesData,
      true,
      (prev: boolean, entity: IGameEntityPayload) => {
        return prev && this.upsertEntity(entity);
      }
    )
  };
};


const deserialize = function<T>(data: string): O.Option<T> {
  // TODO: There is no validation!
  return O.tryCatch(() => JSON.parse(data));
}

const updateGameState = function(currState: GameState) {
  const _currentState: GameState = currState;
  return function(serverResponse: IServerResponse) {
    const gameMapProcessed = _currentState.upsertMap(serverResponse.gameMap);
    const gameEntitiesProcessed = _currentState.upsertEntities(serverResponse.gameEntities);
    return O.some(gameMapProcessed && gameEntitiesProcessed);
  };
}

export const syncGameState = function(engineOption: O.Option<Engine>): (data: string) => E.Either<Error,boolean> {
  // TODO: Need to do it nicer, this is abomination
  const _currentState = new GameState(engineOption);
  
  const onNoEngine = () => E.left(new Error("Engine has not been created."));
  const sync = function(text: string): E.Either<Error,boolean>  {
    return pipe(
      deserialize<IServerResponse>(text),
      O.fold(
        () => O.none,
        updateGameState(_currentState)
      ),
      O.fold(
        () => E.left(new Error("Have been unable to parse server response")),
        (shouldContinue: boolean) => E.right(shouldContinue)
      )
    );
  };
  return O.isSome(engineOption) ? sync : onNoEngine;
};
