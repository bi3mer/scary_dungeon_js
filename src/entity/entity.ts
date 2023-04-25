import { assert } from "../utility/error";
import { RenderOrder } from "../utility/renderOrder";
import { Display } from "rot-js";
import { euclideanDistance } from "../utility/distance";
import { colorBlack, colorWhite } from "../utility/colors";

export class Entity {
  id: number
  x: number
  y: number
  name: string
  blocksMovement: boolean
  char: string
  fg: string // foreground
  bg: string // background
  renderOrder: RenderOrder

  constructor(
    x: number = 0, 
    y: number = 0, 
    name: string = "Unknown", 
    blocksMovement: boolean = false,
    char: string = "?", 
    fg: string = colorWhite,
    bg: string = colorBlack,
    renderOrder: RenderOrder = RenderOrder.Corpse
  ) {
    this.id = -1;

    this.x = x;
    this.y = y;
    this.name = name;
    this.blocksMovement = blocksMovement;
    this.char = char;
    this.fg = fg;
    this.bg = bg;
    this.renderOrder = renderOrder;

    assert(this.char.length === 1);
  }

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  render(display: Display) {
    display.draw(this.x, this.y, this.char, this.fg, this.bg);
  }

  euclideanDistance(x: number, y: number): number {
    return euclideanDistance(this.x, this.y, x, y);
  }
}