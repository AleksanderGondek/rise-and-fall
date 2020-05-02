export enum GameEntityType {
  Terrain = 0,
  Object = 1
}

export interface IPosition {
  readonly x: number;
  readonly y: number;
}

export interface IGameEntity {
  readonly type: GameEntityType;
  readonly position: IPosition;
}
