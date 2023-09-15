import { ReturnToAltarAnimation } from "../animation/returnToAltarAnimation";
import { AnimationManager } from "../animation/animationManager";
import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { colorViolet } from "../utility/colors";
import { MessageLog } from "../utility/messageLog";
import { Action } from "./action";

export class ReturnToAltarAction extends Action {
  execute(actor: Actor, map: GameMap): boolean {
    MessageLog.addMessage('You activated the scroll...', colorViolet, false);

    AnimationManager.setAnimation(new ReturnToAltarAnimation(
      () => { // animationMiddleCallback
        actor.pos = map.altar().pos.copy();
        ++actor!.pos.y;
      }, 
      () => { // animationEndCallback
        AnimationManager.requestRender();
        MessageLog.addMessage('You teleported back to the altar!', colorViolet, false);
      }
    ));

    return true;
  }
}