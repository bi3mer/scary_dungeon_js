import { Action } from "../action/action";
import { ActionPass } from "../action/actionPass";
import { assert } from "../utility/error";
import { RenderOrder } from "../utility/renderOrder";

export class Entity {
  x: number
  y: number
  blocksMovement: boolean
  char: string
  fg: [number, number, number] // foreground
  bg: [number, number, number] // background
  renderOrder: RenderOrder

  constructor(
    x: number = 0, 
    y: number = 0, 
    blocksMovement: boolean = false,
    char: string = "?", 
    fg: [number, number, number] = [255, 255, 255],
    bg: [number, number, number] = [0, 0, 0],
    renderOrder: RenderOrder = RenderOrder.Corpse
  ) {
    this.x = x;
    this.y = y;
    this.blocksMovement = blocksMovement;
    this.char = char;
    this.fg = fg;
    this.bg = bg;
    this.renderOrder = renderOrder;

    assert(this.char.length === 1);
  }

  // => Entity
  spawn(x: number, y: number): Entity  {
    let clone = new Entity(
      x,
      y,
      this.blocksMovement,
      this.char,
      this.fg,
      this.bg,
      this.renderOrder
    );

    return clone;
  }

  update(): Action {
    console.error('Base update call on entity not allowed.')
    console.trace();

    return new ActionPass();
  }

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }
}