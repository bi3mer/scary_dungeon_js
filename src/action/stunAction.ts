import { AnimationManager } from "../animation/animationManager";
import { StunAnimation } from "../animation/stunAnimation";
import { StunBehavior } from "../behavior/stunBehavior";
import { Actor } from "../entity/actor";
import { nameAltar, nameStunScroll } from "../entity/names";
import { GameMap } from "../game/gameMap";
import { colorStunScroll } from "../utility/colors";
import { MessageLog } from "../utility/messageLog";
import { Action } from "./action";

export class StunAction extends Action {
  // This action interacts with the inventory, so the boolean represents whether
  // the scroll that activated this action should be consumed.
  execute(actor: Actor, map: GameMap): boolean {
    const a = map.nearestActor(actor.pos);
    if (a === null) {
      MessageLog.addMessage(`You don't see anything to strike with your ${nameStunScroll}.`, colorStunScroll, true);
      return false; // do not consume the item
    }

    if (a.name === nameAltar) {
      MessageLog.addMessage(`The ${nameStunScroll} doesn't effect the ${nameAltar}!`, colorStunScroll, true);
      return false; // Consume the item
    }

    const stunBehavior = new StunBehavior(a, 4);
    a.behavior = stunBehavior;
    a.bg = colorStunScroll;

    let animation = new StunAnimation(map.player().pos, a.pos, () => {

    });
    AnimationManager.setAnimation(animation);

    return true;
  }
}