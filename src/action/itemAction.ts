import { Item } from "../entity/item";
import { Action } from "./action";

export abstract class ItemAction extends Action {
  item: Item

  constructor(item: Item) {
    super();
    this.item = item;
  }
}