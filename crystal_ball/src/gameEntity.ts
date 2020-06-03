import { Actor, Texture } from "excalibur";

import { IGameEntityPayload } from "./model";
import { Resources } from "./gfx";

export class GameEntity extends Actor {
  private payloadData: IGameEntityPayload;

  updateInPlace(newData: IGameEntityPayload): void {
    // Update only things that are allowed to change
    this.payloadData.position.x = newData.position.x;
    this.payloadData.position.y = newData.position.y;

    this.actions.moveTo(
      this.payloadData.position.x,
      this.payloadData.position.y,
      16
    );
  }

  public onInitialize(_: ex.Engine) {
    // TODO: This should happen only if imageId exists in texture
    let entityTexture: Texture = Resources.textures[this.payloadData.imageId];
    this.addDrawing(entityTexture);
  }

  constructor(entityData: IGameEntityPayload) {
    super(
      entityData.position.x,
      entityData.position.y,
      16,
      16
    );
    this.payloadData = entityData;
  }
}