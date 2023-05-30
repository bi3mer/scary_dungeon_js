import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { colorLightGray } from "../utility/colors";
import { MessageLog } from "../utility/messageLog";
import { Action } from "./action";

export class PickUpItemAction extends Action {
  /**
   * Pick up an item from the game map.
   * 
   * @remarks
   * Only render if the item was picked up from the map
   * 
   * @param actor 
   * @param map 
   * @returns whether re-render is required
   */
  execute(actor: Actor, map: GameMap): boolean {
    const item = map.itemAtLocation(actor.pos);
    if (item === null) {
      let entity = map.entityAtLocation(actor.pos);
      if (entity === null) {
        MessageLog.addMessage('Nothing to pick up.', colorLightGray, true);
      } else if (entity.name.includes('Corpse')) {
        MessageLog.addMessage(`You are on top of a ${entity.name}.`, colorLightGray, true);
      } else {
        MessageLog.addMessage('Nothing to pick up.', colorLightGray, true);
      }
    } else if (actor.inventory.addItem(item)) {
      map.removeItem(item);
      MessageLog.addMessage(`Picked up ${item.name}.`, colorLightGray, true);
      return true;
    }

    return false;
  }
}