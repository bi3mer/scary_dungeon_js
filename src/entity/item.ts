import { Entity } from "./entity";
import { RenderOrder } from "../utility/renderOrder";
import { colorBlack, colorWhite } from "../utility/colors";
import { Point } from "../utility/point";

export class Item extends Entity {
  id: number
  
  constructor(
    pos: Point, 
    name: string = "Unknown Item",
    blocksMovement: boolean = false,
    char: string = "?", 
    fg: string = colorWhite,
    bg: string = colorBlack,
    renderOrder: RenderOrder = RenderOrder.Corpse,
    consumable: null = null,
    id: number=-1,
  ) {
    super(pos, name, blocksMovement, char, fg, bg, renderOrder);

    this.id = id;
  }
}