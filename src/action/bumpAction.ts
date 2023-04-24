import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { MessageLog } from "../utility/messageLog";
import { DirectionAction } from "./directionAction"

export class BumpAction extends DirectionAction {
  constructor(dx: number, dy: number) {
    super(dx, dy);
  }
  
  execute(actor: Actor, map: GameMap): boolean {
    let [x, y] = this.destination(actor);
    if (!map.isWalkable(x, y) || map.actorAtLocation(x, y) !== null) {
      MessageLog.addErrorMessage("That way is blocked.", true);
      return false;
    } else {
      actor.move(this.dx, this.dy);
      return true;
    }
  }
}