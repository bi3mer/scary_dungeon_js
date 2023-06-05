import { AnimationManager } from "../animation/animationManager";
import { LightningAnimation } from "../animation/lightningAnimation";
import { Actor } from "../entity/actor";
import { spawnCorpse } from "../entity/entityFactory";
import { nameAltar, nameLightningCorpse, nameLightningScroll } from "../entity/names";
import { GameMap } from "../game/gameMap";
import { colorLightGray, colorLightningScroll } from "../utility/colors";
import { MessageLog } from "../utility/messageLog";
import { Action } from "./action";

export class LightningAction extends Action {

  // This action interacts with the inventory, so the boolean represents whether
  // the scroll that activated this action should be consumed.
  execute(actor: Actor, map: GameMap): boolean {
    const a = map.nearestActor(actor.pos);
    if (a === null) {
      MessageLog.addMessage(`You don't see anything to strike with your ${nameLightningScroll}.`, colorLightGray, true);
      return false; // do not consume the item
    }

    if (a.name === nameAltar) {
      let l = new LightningAnimation(a.pos, map.player().pos, () => {
        MessageLog.addMessage(
          `The lightning struck the altar! But, it didn't do anything. Maybe find the gems.`,
          colorLightGray,
          true);
      });
      AnimationManager.setAnimation(l);
      return true; // Consume the item
    }

    if (map.positionVisible(a.pos)){
      map.removeActor(a);
      spawnCorpse(map, a.pos, nameLightningCorpse);
      let l = new LightningAnimation(a.pos, map.player().pos, () => {
        MessageLog.addMessage(`${a.name} was slain by lightning!`, colorLightningScroll, false);
      });

      AnimationManager.setAnimation(l);
      return true; // consume the item
    } 

    MessageLog.addMessage(`You don't see anything to strike with your ${nameLightningScroll}.`, colorLightGray, true);
    return false; // do not consume the item
  }
}