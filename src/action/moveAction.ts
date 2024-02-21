import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { colorLightGray } from "../utility/colors";
import { MessageLog } from "../utility/messageLog";
import { Point } from "../utility/point";
import { DirectionAction } from "./directionAction"

export class MoveAction extends DirectionAction {
  constructor(dPos: Point) {
    super(dPos);
  }

  execute(actor: Actor, map: GameMap): boolean {
    let pos = this.destination(actor);

    if (!map.isWalkablePoint(pos)) {
      MessageLog.addMessage("That way is blocked", colorLightGray, true);
      return false;
    } else {
      actor.move(this.dPos);
      return true;
    }
  }
}
