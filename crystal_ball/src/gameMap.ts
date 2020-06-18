import { Engine, Scene, TileMap } from "excalibur";

import { IGameMap } from "./model";


class GameMap extends Scene {
  private _mapDef: IGameMap;
  private _tileMap: TileMap;

  constructor(engine: Engine, mapDef: IGameMap) {
    super(engine);

    this._mapDef = mapDef;
    this._tileMap = new TileMap(
      0, 
      0, 
      this._mapDef.tileWidth, 
      this._mapDef.tileHeight,
      this._mapDef.width / this._mapDef.tileWidth, 
      this._mapDef.height / this._mapDef.tileHeight
    );
  }

  public onInitialize() {
  }
}
