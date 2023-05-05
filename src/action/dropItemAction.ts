import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { ItemAction } from "./itemAction";

export class DropItemAction extends ItemAction {
  
  /**
   * Drop item back onto the map.
   * @param actor 
   * @param map 
   * @returns whether to render.
   */
  execute(actor: Actor, map: GameMap): boolean {
    actor.inventory.drop(this.item, actor, map);
    return true;
  }
}