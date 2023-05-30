import { Actor } from "../entity/actor";
import { Entity } from "../entity/entity";
import { Item } from "../entity/item";
import { GameMap } from "../game/gameMap";
import { MessageLog } from "../utility/messageLog";
import { BaseComponent } from "./baseComponent";

export class InventoryComponent extends BaseComponent {
  capacity: number
  items: Item[]

  constructor(parent: Entity, capacity: number) {
    super(parent);
    this.capacity = capacity;
    this.items = [];
  }

  /**
   * Add item to the inventory.
   * 
   * @remarks
   * If item added, a nice message is added to the message og. If the inventory
   * is full, then an error message is printed for the player.
   * 
   * @param item
   * @returns true if the item was added, else false
   */
  public addItem(item: Item): boolean {
    if (this.items.length >= this.capacity) {
      MessageLog.addErrorMessage("Inventory full.", true);
      return false;
    }

    this.items.push(item);
    return true;
  }

  /**
   * Drop the item back onto the map.
   * 
   * @remark
   * If the item has an id of -1, an error message is added to the message log.
   * 
   * @param item 
   * @param actor 
   * @param map 
   */
  drop(item: Item, actor: Actor, map: GameMap): void {
    if (item.id !== -1) {
      this.items.splice(item.id, 1);
      item.pos.x = actor.pos.x;
      item.pos.y = actor.pos.y;

      map.addItem(item);
    } else {
      MessageLog.addErrorMessage(`${item.name} had invalid id of -1. Contact admin.`, true);
    }
  }

  /**
   * Get the number of items with a given name  are in the inventory.
   * 
   * @remarks
   * I don't see this being used outside of the altar for checking how many gem
   * that the player has collected.
   * 
   * @param name - name of the item
   * @returns number
   * @beta
   */
  getCount(name: string): number {
    let count = 0;
    for (let item of this.items) {
      count += Number(item.name == name); // avoid branching
    }

    return count;
  }

  /**
   * Remove all items from inventory with a given name.
   * @param name - name of item to destroy
   */
  destroyItemsWithName(name: string): void {
    this.items = this.items.filter((i) => {
      return i.name !== name;
    });
  }

  destroyItemWithID(id: number): void {
    this.items = this.items.filter((item) => {
      return item.id !== id;
    })
  }
}