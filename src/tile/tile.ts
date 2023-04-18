import { Color, toRGB } from "rot-js/lib/color";

export class Tile {
  char: string
  walkable: boolean
  inViewFG: string // foreground
  inViewBG: string // background
  outOfViewFG: string // foreground
  outOfViewBG: string // background

  constructor(
    char: string, 
    walkable: boolean,
    inViewFG: Color, 
    inViewBG: Color,
    outOfViewFG: Color, 
    outOfViewBG: Color,
  ) {
    this.char = char;
    this.walkable = walkable;
    this.inViewFG = toRGB(inViewFG);
    this.inViewBG = toRGB(inViewBG);
    this.outOfViewFG = toRGB(outOfViewFG);
    this.outOfViewBG = toRGB(outOfViewBG);
  }
}