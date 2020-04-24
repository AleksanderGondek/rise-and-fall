import * as ex from "excalibur";
import * as _ from "lodash";
import { Color, DisplayMode } from "excalibur";

import { GfxLoader, Resources } from "./gfx";

const game = new ex.Engine({
  displayMode: DisplayMode.FullScreen,
  backgroundColor: Color.fromRGB(0,0,0,1)
})

game.start(GfxLoader).then(() => {
  _.each(_.range(60, 252, 16), x => {
    _.each(_.range(60, 252, 16), y => {
      const entity = new ex.Actor({
        pos: new ex.Vector(x, y)
      })
      
      if(x == 60 && y == 60) {
        entity.addDrawing(Resources.textures.wallCornerTopLeft);
      } else if (x == 236 && y == 60) {
        entity.addDrawing(Resources.textures.wallCornerTopRight);
      } else if ( x == 60 && y == 236) {
        entity.addDrawing(Resources.textures.wallCornerBottomLeft);
      } else if ( x == 236 && y == 236) {
        entity.addDrawing(Resources.textures.wallCornerBottomRight);
      } else if (x > 60 && x < 236 && y == 60) {
        entity.addDrawing(Resources.textures.wallTop);
      } else if (x > 60 && x < 236 && y == 236) {
        entity.addDrawing(Resources.textures.wallTop);
      } else if (x == 60 && y > 60 && y < 236) {
        entity.addDrawing(Resources.textures.wallMiddle);
      } else if (x == 236 && y > 60 && y < 236) {
        entity.addDrawing(Resources.textures.wallMiddle);
      } else {
        entity.addDrawing(Resources.textures.floorTile);
      }
      game.add(entity);
    });
  });

  console.log(_.padStart("Hello TypeScript!", 20, ">"));
});
