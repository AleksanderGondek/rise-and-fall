import * as A from 'fp-ts/lib/Array';

import { Engine, Scene, SpriteSheet, 
  Sprite, TileMap, TileSprite } from "excalibur";

import { Resources } from "./gfx";
import { IGameCell, IGameMap } from "./model";


export class GameMap extends Scene {
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

  public hash(): string {
    return this._mapDef.hash;
  }

  // @ts-ignore
  public upsert(mapDef: IGameMap): void {
    // TODO: Implement upsertion
  }

  // TODO: Refactor, hairy implementation
  public onInitialize() {
    const textureNames = Object.getOwnPropertyNames(Resources.textures);

    let nameToIndexMap: { [name: string]: number } = {};
    textureNames.forEach((name: string, index: number) => {
      nameToIndexMap[name] = index;
    });

    var sprites: Sprite[] = A.array.map(
      textureNames,
      (textureName: string) => {
        return Resources.textures[textureName].asSprite();
    });

    this._tileMap.registerSpriteSheet(
      this._mapDef.hash,
      new SpriteSheet(sprites)
    );

    this._mapDef.cells.forEach((gc: IGameCell) => {
      this._tileMap.getCell(gc.x, gc.y).pushSprite(
        new TileSprite(
          this._mapDef.hash,
          nameToIndexMap[gc.imageId]
        )
      );
    });
  }

}
