import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import tileFactory from "../tile/tileFactory";
import { colorLightGray } from "../utility/colors";
import { MessageLog } from "../utility/messageLog";
import { Point } from "../utility/point";
import { Action } from "./action";

export class OpenChestAction extends Action {
  private chestPos: Point

  constructor(chestPos: Point) {
    super();
    this.chestPos = chestPos;
  }

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
    const item = map.itemAtLocation(this.chestPos);
    if (item === null) {
      console.error('OpenChestAction called on invalid chest.')
    } else if (actor.inventory.addItem(item)) {
      map.removeItem(item);
      map.setTile(this.chestPos, tileFactory.openedChest);

      MessageLog.addMessage(`Picked up ${item.name}.`, colorLightGray, true);
      
      return true;
    }

    return false;
  }
}