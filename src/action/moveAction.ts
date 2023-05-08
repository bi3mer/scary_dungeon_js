import { Actor } from "../entity/actor";
import { nameAltar } from "../entity/names";
import { GameMap } from "../game/gameMap";
import { colorIndigo, colorWhite } from "../utility/colors";
import { MessageLog } from "../utility/messageLog";
import { DirectionAction } from "./directionAction"

export class MoveAction extends DirectionAction {
  constructor(dx: number, dy: number) {
    super(dx, dy);
  }
  
  execute(actor: Actor, map: GameMap): boolean {
    let [x, y] = this.destination(actor);
    const actorAtLocation = map.actorAtLocation(x, y);
    if (!map.isWalkable(x, y)) {
      MessageLog.addErrorMessage("That way is blocked.", true);
      return false;
    } else if (actorAtLocation != null) {
      if (actorAtLocation.name == nameAltar) {
        MessageLog.addMessage('Create a gem action!', colorIndigo, false);
        return false;
      } else {
        MessageLog.addMessage('Bumped into enemy, you should be dead!', colorWhite, true);
        return false;
      }
    } else {
      actor.move(this.dx, this.dy);
      return true;
    }
  }
}