import { assert } from "../utility/error";
import { RenderOrder } from "../utility/renderOrder";
import { Display } from "rot-js";
import { euclideanDistance } from "../utility/distance";
import { colorBlack, colorTransparent, colorWhite } from "../utility/colors";
import { Point } from "../utility/point";
import { interpolate } from "rot-js/lib/color";

export class Entity {
  id: number
  pos: Point
  name: string
  blocksMovement: boolean
  char: string
  fg: string // foreground
  bg: string // background
  renderOrder: RenderOrder

  constructor(
    pos: Point, 
    name: string = "Unknown", 
    blocksMovement: boolean = false,
    char: string = "?", 
    fg: string = colorWhite,
    bg: string = colorBlack,
    renderOrder: RenderOrder = RenderOrder.Corpse
  ) {
    this.id = -1;

    this.pos = pos.copy();
    this.name = name;
    this.blocksMovement = blocksMovement;
    this.char = char;
    this.fg = fg;
    this.bg = bg;
    this.renderOrder = renderOrder;

    assert(this.char.length === 1);
  }

  move(dPos: Point) {
    this.pos.x += dPos.x;
    this.pos.y += dPos.y;
  }

  render(display: Display, playerPos: Point, midX: number, midY: number, visibility: number, maxDist: number): void {
    const x = midX + this.pos.x-playerPos.x;
    const y = midY + this.pos.y-playerPos.y;

    // TODO: It would be better to use visibility
    if (playerPos.equals(this.pos)) {
      // 234,165,108 is the base color for tiles
      display.draw(x, y, this.char, colorTransparent, 'rgba(234,165,108,1');
    } else {
      const dist = playerPos.unSquaredEuclideanDistance(this.pos);
      const M = dist/maxDist;
      const fg = `rgba(0,0,0,${M})`;
      const bg = interpolate([234,165,108], [0,0,0], M); // interpolate between case color and transparent
      const bgRGBA = `rgba(${bg[0]},${bg[1]},${bg[2]},${1-M})`;

      display.draw(x, y, this.char, fg, bgRGBA);
    }
  }

  euclideanDistance(pos: Point): number {
    return euclideanDistance(this.pos.x, this.pos.y, pos.x, pos.y);
  }
}