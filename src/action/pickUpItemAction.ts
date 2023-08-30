import { Actor } from "../entity/actor";
import { Entity } from "../entity/entity";
import { GameMap } from "../game/gameMap";
import tileFactory from "../tile/tileFactory";
import { colorLightGray, colorTransparent } from "../utility/colors";
import { MessageLog } from "../utility/messageLog";
import { RenderOrder } from "../utility/renderOrder";
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
      map.addEntity(new Entity(
        actor.pos,
        'Opened Chest',
        false,
        'c',
        colorTransparent,
        colorTransparent,
        RenderOrder.Corpse
      ));
      // map.setTile(actor.pos, tileFactory.openedChest);
      MessageLog.addMessage(`Picked up ${item.name}.`, colorLightGray, true);
      return true;
    }

    return false;
  }
}