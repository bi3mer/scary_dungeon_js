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
    inViewFG: string, 
    inViewBG: string,
    outOfViewFG: string, 
    outOfViewBG: string,
  ) {
    this.char = char;
    this.walkable = walkable;
    this.inViewFG = inViewFG;
    this.inViewBG = inViewBG;
    this.outOfViewFG = outOfViewFG;
    this.outOfViewBG = outOfViewBG;
  }
}