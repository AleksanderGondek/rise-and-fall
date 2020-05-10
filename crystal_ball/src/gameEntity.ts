import { Actor } from "excalibur";

import { GameEntityPayload } from "./serverConnection";


export class GameEntity extends Actor {
  private payloadData: GameEntityPayload;

  updateInPlace(newData: GameEntityPayload): void {
    // Update only things that are allowed to change
    this.payloadData.position.x = newData.position.x;
    this.payloadData.position.y = newData.position.y;

    // Move to new pos
    this.actions.moveTo(
      this.payloadData.position.x,
      this.payloadData.position.y,
      16
    );
  }

  constructor(entityData: GameEntityPayload) {
    super(
      entityData.position.x,
      entityData.position.y,
      16,
      16
    );
    this.payloadData = entityData;
  }
}