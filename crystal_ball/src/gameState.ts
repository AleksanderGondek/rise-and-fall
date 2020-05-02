import * as A from "fp-ts/lib/Array";

import { Actor, Engine } from "excalibur";

import { Resources } from "./gfx";
import { IGameEntity } from "./model";


export function updateDisplayedState(displayEngine: Engine) {
  const currentDisplayEngine = displayEngine;
  
  return function(newState: IGameEntity[]) {
    A.array.map(newState, (gameEntity: IGameEntity) => {
      const displayBlock = new Actor(
        gameEntity.position.x * 16, 
        gameEntity.position.y * 16, 
        16, 
        16
      );
      displayBlock.addDrawing(Resources.textures.floorTile);
      currentDisplayEngine.add(displayBlock);
    });
  };
}
