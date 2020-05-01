import * as A from "fp-ts/lib/Array";

import { Actor, Engine } from "excalibur";

import { Resources } from "./gfx";


export interface GameState {
  readonly board: boolean[][]
}

export function updateDisplayedState(displayEngine: Engine) {
  const currentDisplayEngine = displayEngine;
  
  return function(newState: GameState) {
    A.array.mapWithIndex(newState.board, (y: number, xs: boolean[]) => {
      A.array.mapWithIndex(xs, (x: number, _: boolean) => {
        
        const displayBlock = new Actor(x * 16, y * 16, 16, 16);
        displayBlock.addDrawing(Resources.textures.floorTile);
        currentDisplayEngine.add(displayBlock);

      });
    });
  };
}
