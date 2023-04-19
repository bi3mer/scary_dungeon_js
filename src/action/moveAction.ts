import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import colors from "../utility/colors";
import { MessageLog } from "../utility/messageLog";
import { DirectionAction } from "./directionAction"

export class MoveAction extends DirectionAction {
  constructor(dx: number, dy: number) {
    super(dx, dy);
  }
  
  execute(actor: Actor, map: GameMap): void {
    let [x, y] = this.destination(actor);
    if (!map.isWalkable(x, y) || map.actorAtLocation(x, y) !== null) {
      MessageLog.addErrorMessage("That way is blocked.", true);
    } else {
      MessageLog.addMessage('You moved.', colors.lightGray, true);
      actor.move(this.dx, this.dy);
    }
  }
}