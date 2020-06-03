export enum GameEntityType {
  Background = 0,
  Npc = 1
}

export interface IGameEntityPayload {
  id: string;
  imageId: string;
  position: {
    x: number;
    y: number;
  };
  entityType: GameEntityType;
}

export interface IGameCell {
  imageId: string;
  x: number;
  y: number;
}

export interface IGameMap {
  cells: IGameCell[];
  hash: string;
  width: number;
  height: number;
  tileWidth: number;
  tileHeight: number;
}

export interface IServerResponse {
  gameMap: IGameMap;
  gameEntities: IGameEntityPayload[];
}
