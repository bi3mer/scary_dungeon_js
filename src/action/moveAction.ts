import { Actor } from "../entity/actor";
import { nameAltar } from "../entity/names";
import { GameMap } from "../game/gameMap";
import { colorIndigo, colorLightGray, colorWhite } from "../utility/colors";
import { MessageLog } from "../utility/messageLog";
import { DirectionAction } from "./directionAction"

export class MoveAction extends DirectionAction {
  constructor(dx: number, dy: number) {
    super(dx, dy);
  }
  
  execute(actor: Actor, map: GameMap): boolean {
    let [x, y] = this.destination(actor);
    
    if (!map.isWalkable(x, y)) {
      MessageLog.addMessage("That way is blocked", colorLightGray, true);
      return false;
    } else {
      actor.move(this.dx, this.dy);
      return true;
    }
  }
}