import { Entity } from "../entity/entity";

export abstract class BaseComponent {
  parent: Entity

  constructor(parent: Entity) {
    this.parent = parent;
  }
}