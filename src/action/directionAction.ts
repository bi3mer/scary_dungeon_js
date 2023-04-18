import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { Action } from "./action"

export class DirectionAction implements Action {
  dx: number
  dy: number
  cost: number;

  constructor(dx: number, dy: number) {
    this.dx = dx;
    this.dy = dy;
    this.cost = 1;
  }

  execute(actor: Actor, map: GameMap): void {
    console.error("DirectionAction.execute should not be possible!");
    console.trace();
  }

  destination(actor: Actor): [number, number] {
    return [actor.x + this.dx, actor.y + this.dy];
  }
}