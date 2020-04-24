import * as ex from "excalibur";
import * as _ from "lodash";
import { Color, DisplayMode } from "excalibur";

const resources = {
  floorTile: new ex.Texture("/assets/walls/floor_tile.png"),
  wallTop: new ex.Texture("/assets/walls/border_top.png"),
  wallCornerTopLeft: new ex.Texture("/assets/walls/border_top_left.png"),
  wallCornerTopRight: new ex.Texture("/assets/walls/border_top_right.png"),
  wallMiddle: new ex.Texture("/assets/walls/border_middle.png"),
  wallCornerBottom: new ex.Texture("/assets/walls/border_top.png"),
  wallCornerBottomLeft: new ex.Texture("/assets/walls/border_bottom_left.png"),
  wallCornerBottomRight: new ex.Texture("/assets/walls/border_bottom_right.png"),
};

const loader = new ex.Loader(_.flatMap(resources));
loader.playButtonText = "Descend into darkness..";
loader.backgroundColor = "darkgrey";

const game = new ex.Engine({
  displayMode: DisplayMode.FullScreen,
  backgroundColor: Color.fromRGB(0,0,0,1)
})

game.start(loader).then(() => {
  _.each(_.range(60, 252, 16), x => {
    _.each(_.range(60, 252, 16), y => {
      const entity = new ex.Actor({
        pos: new ex.Vector(x, y)
      })
      
      if(x == 60 && y == 60) {
        entity.addDrawing(resources.wallCornerTopLeft);
      } else if (x == 236 && y == 60) {
        entity.addDrawing(resources.wallCornerTopRight);
      } else if ( x == 60 && y == 236) {
        entity.addDrawing(resources.wallCornerBottomLeft);
      } else if ( x == 236 && y == 236) {
        entity.addDrawing(resources.wallCornerBottomRight);
      } else if (x > 60 && x < 236 && y == 60) {
        entity.addDrawing(resources.wallTop);
      } else if (x > 60 && x < 236 && y == 236) {
        entity.addDrawing(resources.wallTop);
      } else if (x == 60 && y > 60 && y < 236) {
        entity.addDrawing(resources.wallMiddle);
      } else if (x == 236 && y > 60 && y < 236) {
        entity.addDrawing(resources.wallMiddle);
      } else {
        entity.addDrawing(resources.floorTile);
      }
      game.add(entity);
    });
  });

  console.log(_.padStart("Hello TypeScript!", 20, ">"));
});
