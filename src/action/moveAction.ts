import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { DirectionAction } from "./directionAction"

export class MoveAction extends DirectionAction {
  constructor(dx: number, dy: number) {
    super(dx, dy);

  }
  
  execute(actor: Actor, map: GameMap): void {
    let [x, y] = this.destination(actor);

    if (map.entityAtLocation(x, y) != null) {
      
    }

    throw new Error("Method not implemented.");
  }
}