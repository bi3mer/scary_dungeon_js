import { AnimationManager } from "../animation/animationManager";
import { ReturnToAltarAnimation } from "../animation/returnToAltarAnimation";
import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { colorViolet } from "../utility/colors";
import { MessageLog } from "../utility/messageLog";
import { Action } from "./action";

export class ReturnToAltarAction extends Action {
  // This action interacts with the inventory, so the boolean represents whether
  // the scroll that activated this action should be consumed.
  execute(actor: Actor, map: GameMap): boolean {
    MessageLog.addMessage('You activate the scroll...', colorViolet, false);
      const animation = new ReturnToAltarAnimation(() => {
        actor.pos = map.altar().pos.copy();
        ++actor.pos.x;
      }, () => {
        MessageLog.addMessage('You teleported back to the altar!', colorViolet, false);
      });

      AnimationManager.setAnimation(animation);
      return true;
  }
}