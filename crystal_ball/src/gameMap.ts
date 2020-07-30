import * as A from 'fp-ts/lib/Array';

import { Engine, Scene, SpriteSheet, 
  Sprite, TileMap, TileSprite } from "excalibur";

import { Resources } from "./gfx";
import { IGameCell, IGameMap } from "./model";


export class GameMap extends Scene {
  private _mapDef: IGameMap;
  private _tileMap: TileMap;
  private _nameToIndexMap: { [name: string]: number };
  private _sprites: Sprite[];

  constructor(engine: Engine, mapDef: IGameMap) {
    super(engine);

    this._mapDef = mapDef;
    this._nameToIndexMap = {};
    this._tileMap = new TileMap(
      0, 
      0, 
      this._mapDef.tileWidth, 
      this._mapDef.tileHeight,
      this._mapDef.width / this._mapDef.tileWidth, 
      this._mapDef.height / this._mapDef.tileHeight
    );

    const textureNames = Object.getOwnPropertyNames(Resources.textures);
    textureNames.forEach((name: string, index: number) => {
      this._nameToIndexMap[name] = index;
    });

    this._sprites = A.array.map(
      textureNames,
      (textureName: string) => {
        return Resources.textures[textureName].asSprite();
    });
  }

  public hash(): string {
    return this._mapDef.hash;
  }
  
  public upsert(mapDef: IGameMap): void {
    this._mapDef.cells.forEach((gc: IGameCell) => {
      this._tileMap.getCell(gc.x, gc.y).clearSprites();
    });

    // TODO: Find cleaner way of approaching this
    this._mapDef = mapDef;    
    this._tileMap.registerSpriteSheet(
      this._mapDef.hash,
      new SpriteSheet(this._sprites)
    );

    this._mapDef.cells.forEach((gc: IGameCell) => {
      this._tileMap.getCell(gc.x, gc.y).pushSprite(
        new TileSprite(
          this._mapDef.hash,
          this._nameToIndexMap[gc.imageId]
        )
      );
    });
  }

  // TODO: Refactor, hairy implementation
  public onInitialize() {
    this._tileMap.registerSpriteSheet(
      this._mapDef.hash,
      new SpriteSheet(this._sprites)
    );

    this._mapDef.cells.forEach((gc: IGameCell) => {
      this._tileMap.getCell(gc.x, gc.y).pushSprite(
        new TileSprite(
          this._mapDef.hash,
          this._nameToIndexMap[gc.imageId]
        )
      );
    });
  }

}
