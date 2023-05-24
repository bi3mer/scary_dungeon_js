import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { Point } from "../utility/point";
import { Action } from "./action"

export class DirectionAction implements Action {
  dPos: Point

  constructor(dPos: Point) {
    this.dPos = dPos;
  }

  execute(actor: Actor, map: GameMap): boolean {
    console.error("DirectionAction.execute should not be possible!");
    console.trace();
    return false;
  }

  destination(actor: Actor): Point {
    return new Point(actor.pos.x + this.dPos.x, actor.pos.y + this.dPos.y);
  }
}