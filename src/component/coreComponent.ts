import { Color, toRGB } from "rot-js/lib/color";
import { RenderOrder } from "../utility/renderOrder";
import { BaseComponent } from "./baseComponent";
import { assert } from "../utility/error";

export class CoreComponent extends BaseComponent {
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
    super();
    this.x = x;
    this.y = y;
    this.blocksMovement = blocksMovement;
    this.char = char;
    this.fg = toRGB(fg);
    this.bg = toRGB(bg);
    this.renderOrder = renderOrder;

    assert(this.char.length === 1);
  }
}