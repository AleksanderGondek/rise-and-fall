import { Loader, Texture } from "excalibur";
import * as _ from "lodash";

export const Resources = {
  textures: {
    floorTile: new Texture("/assets/walls/floor_tile.png"),
    wallTop: new Texture("/assets/walls/border_top.png"),
    wallCornerTopLeft: new Texture("/assets/walls/border_top_left.png"),
    wallCornerTopRight: new Texture("/assets/walls/border_top_right.png"),
    wallMiddle: new Texture("/assets/walls/border_middle.png"),
    wallCornerBottom: new Texture("/assets/walls/border_top.png"),
    wallCornerBottomLeft: new Texture("/assets/walls/border_bottom_left.png"),
    wallCornerBottomRight: new Texture("/assets/walls/border_bottom_right.png"),
  }
};

export const GfxLoader = new Loader(_.flatMap(Resources.textures));
GfxLoader.playButtonText = "Descend into darkness..";
GfxLoader.backgroundColor = "darkgrey";
