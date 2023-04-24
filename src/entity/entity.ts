import { assert } from "../utility/error";
import { RenderOrder } from "../utility/renderOrder";
import { Display } from "rot-js";
import { GameMap } from "../game/gameMap";
import colors from "../utility/colors";
import { euclideanDistance } from "../utility/distance";

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
    fg: string = colors.white,
    bg: string = colors.black,
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