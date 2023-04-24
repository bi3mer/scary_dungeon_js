import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { Action } from "./action"

export class DirectionAction implements Action {
  dx: number
  dy: number

  constructor(dx: number, dy: number) {
    this.dx = dx;
    this.dy = dy;
  }

  execute(actor: Actor, map: GameMap): boolean {
    console.error("DirectionAction.execute should not be possible!");
    console.trace();
    return false;
  }

  destination(actor: Actor): [number, number] {
    return [actor.x + this.dx, actor.y + this.dy];
  }
}