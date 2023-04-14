export class Tile {
  char: string
  walkable: boolean
  inViewFG: [number, number, number] // foreground
  inViewBG: [number, number, number] // background
  outOfViewFG: [number, number, number] // foreground
  outOfViewBG: [number, number, number] // background

  constructor(
    char: string, 
    walkable: boolean,
    inViewFG: [number, number, number], 
    inViewBG: [number, number, number],
    outOfViewFG: [number, number, number], 
    outOfViewBG: [number, number, number],
  ) {
    this.char = char;
    this.walkable = walkable;
    this.inViewFG = inViewFG;
    this.inViewBG = inViewBG;
    this.outOfViewFG = outOfViewFG;
    this.outOfViewBG = outOfViewBG;
  }
}