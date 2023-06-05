import { AnimationManager } from "../animation/animationManager";
import { ConfusionAnimation } from "../animation/confusionAnimation";
import { ConfusionBehavior } from "../behavior/confusionBehavior";
import { Actor } from "../entity/actor";
import { nameAltar, nameConfusionScroll } from "../entity/names";
import { GameMap } from "../game/gameMap";
import { colorConfusionScroll } from "../utility/colors";
import { MessageLog } from "../utility/messageLog";
import { Action } from "./action";

export class ConfusionScrollAction extends Action {
  // This action interacts with the inventory, so the boolean represents whether
  // the scroll that activated this action should be consumed.
  execute(actor: Actor, map: GameMap): boolean {
    const a = map.nearestActorInVision(actor.pos);
    if (a === null) {
      MessageLog.addMessage(`You don't see anything to confuse with your ${nameConfusionScroll}.`, colorConfusionScroll, true);
      return false; // do not consume the item
    }

    if (a.name === nameAltar) {
      MessageLog.addMessage(`The ${nameConfusionScroll} doesn't effect the ${nameAltar}!`, colorConfusionScroll, true);
      return false; // Consume the item
    }

    new ConfusionBehavior(a, 6);

    let animation = new ConfusionAnimation(map.player().pos, a.pos, () => {

    });
    AnimationManager.setAnimation(animation);

    return true;
  }
}