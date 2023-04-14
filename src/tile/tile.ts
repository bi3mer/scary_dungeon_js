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
    inViewFG: [number, number, number, number], 
    inViewBG: [number, number, number, number],
    outOfViewFG: [number, number, number, number], 
    outOfViewBG: [number, number, number, number],
  ) {
    this.char = char;
    this.walkable = walkable;
    this.inViewFG = `rgba(${inViewFG[0]},${inViewFG[1]},${inViewFG[2]},${inViewFG[3]})`;
    this.inViewBG = `rgba(${inViewBG[0]},${inViewBG[1]},${inViewBG[2]},${inViewBG[3]})`;;
    this.outOfViewFG = `rgba(${outOfViewFG[0]},${outOfViewFG[1]},${outOfViewFG[2]},${outOfViewFG[3]})`;;
    this.outOfViewBG = `rgba(${outOfViewBG[0]},${outOfViewBG[1]},${outOfViewBG[2]},${outOfViewBG[3]})`;;
  }
}