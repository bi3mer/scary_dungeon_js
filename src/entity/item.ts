import { Entity } from "./entity";
import { RenderOrder } from "../utility/renderOrder";
import { colorBlack, colorWhite } from "../utility/colors";

export class Item extends Entity {
  id: number
  
  constructor(
    x: number = 0, 
    y: number = 0, 
    name: string = "Unknown Item",
    blocksMovement: boolean = false,
    char: string = "?", 
    fg: string = colorWhite,
    bg: string = colorBlack,
    renderOrder: RenderOrder = RenderOrder.Corpse,
    consumable: null = null,
    id: number=-1,
  ) {
    super(x, y, name, blocksMovement, char, fg, bg, renderOrder);

    this.id = id;
  }
}