import { Color, DisplayMode, Engine } from "excalibur";

import { GfxLoader } from "./gfx";
import { syncGameState } from "./serverConnection";

const game = new Engine({
  displayMode: DisplayMode.FullScreen,
  backgroundColor: Color.fromRGB(0,0,0,1)
})

game.start(GfxLoader).then(() => {
  syncGameState("wss://localhost:2137", game);
});
