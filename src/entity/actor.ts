import { Entity } from "./entity";
import { RenderOrder } from "../utility/renderOrder";

export class Actor extends Entity {
  constructor(
    x: number = 0, 
    y: number = 0, 
    blocksMovement: boolean = false,
    char: string = "?", 
    fg: [number, number, number] = [255, 255, 255],
    bg: [number, number, number] = [0, 0, 0],
    renderOrder: RenderOrder = RenderOrder.Corpse
  ) {
    super(x, y, blocksMovement, char, fg, bg, renderOrder);
  }
}