import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { MessageLog } from "../utility/messageLog";
import { Action } from "./action";

export class DropItemAction extends Action {
  
  /**
   * Drop item back onto the map.
   * @param actor 
   * @param map 
   * @returns whether to render.
   */
  execute(actor: Actor, map: GameMap): boolean {
    // actor.inventory.drop(item, actor, map);
    MessageLog.addErrorMessage('Drop Item not implemented.', true);
    
    return false;
  }
}