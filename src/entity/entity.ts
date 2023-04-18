import { Color, toRGB } from "rot-js/lib/color";
import { Action } from "../action/action";
import { ActionPass } from "../action/actionPass";
import { assert } from "../utility/error";
import { RenderOrder } from "../utility/renderOrder";
import { Display } from "rot-js";
import { GameMap } from "../game/gameMap";

export class Entity {
  x: number
  y: number
  blocksMovement: boolean
  char: string
  fg: string // foreground
  bg: string // background
  renderOrder: RenderOrder

  constructor(
    x: number = 0, 
    y: number = 0, 
    blocksMovement: boolean = false,
    char: string = "?", 
    fg: Color = [255, 255, 255],
    bg: Color = [0, 0, 0],
    renderOrder: RenderOrder = RenderOrder.Corpse
  ) {
    this.x = x;
    this.y = y;
    this.blocksMovement = blocksMovement;
    this.char = char;
    this.fg = toRGB(fg);
    this.bg = toRGB(bg);
    this.renderOrder = renderOrder;

    assert(this.char.length === 1);
  }

  // => Entity
  spawn(x: number, y: number, map: GameMap): Entity  {
    let clone = new Entity(
      x,
      y,
      this.blocksMovement,
      this.char,
      undefined, // fg set after the fact
      undefined, // bg set after the fact
      this.renderOrder
    );

    clone.fg = this.fg;
    clone.bg = this.bg;

    map.addEntity(clone);

    return clone;
  }

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
    console.log(this.x, this.y);
  }

  render(display: Display) {
    display.draw(this.x, this.y, this.char, this.fg, this.bg);
  }
}