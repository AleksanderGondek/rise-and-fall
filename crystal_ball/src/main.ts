import * as ex from "excalibur";
import * as _ from "lodash";
import { Color, DisplayMode } from "excalibur";

import { array } from "fp-ts/es6/Array";

import { GfxLoader, Resources } from "./gfx";
import { GameStateWindow } from "./gameState";

const game = new ex.Engine({
  displayMode: DisplayMode.FullScreen,
  backgroundColor: Color.fromRGB(0,0,0,1)
})

const gameState = new GameStateWindow();

game.start(GfxLoader).then(() => {

  array.mapWithIndex(gameState.board, (y: number, xs: boolean[]) => {
    array.mapWithIndex(xs, (x: number, _: boolean) => { 
      const displayBlock = new ex.Actor(x * 16, y * 16, 16, 16);
      if(true === gameState.board[y][x]) {
        displayBlock.addDrawing(Resources.textures.floorTile);
        game.add(displayBlock);
      }
    });
  });

  console.log(_.padStart("Hello TypeScript!", 20, ">"));
});
