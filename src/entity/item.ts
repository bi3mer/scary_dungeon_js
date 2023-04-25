import { Entity } from "./entity";
import { RenderOrder } from "../utility/renderOrder";
import { colorBlack, colorWhite } from "../utility/colors";

export class Item extends Entity {
  constructor(
    x: number = 0, 
    y: number = 0, 
    blocksMovement: boolean = false,
    char: string = "?", 
    fg: string = colorWhite,
    bg: string = colorBlack,
    renderOrder: RenderOrder = RenderOrder.Corpse
  ) {
    super(x, y, blocksMovement, char, fg, bg, renderOrder);
  }
}