import { BaseComponent } from "./baseComponent";

export class InventoryComponent extends BaseComponent {
  capacity: number
  items: []

  constructor(capacity: number) {
    super();
    this.capacity = capacity;
    this.items = [];
  }

  drop() {
    
  }
}