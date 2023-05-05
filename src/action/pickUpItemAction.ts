import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { ItemAction } from "./itemAction";

export class PickUpItemAction extends ItemAction {
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
    if (actor.inventory.addItem(this.item)) {
      map.removeEntity(this.item);
      return true;
    }

    return false;
  }
}