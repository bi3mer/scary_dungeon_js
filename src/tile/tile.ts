export class Tile {
  char: string
  walkable: boolean
  blockFoV: boolean

  constructor(char: string, walkable: boolean, blockFoV: boolean) {
    this.char = char;
    this.walkable = walkable;
    this.blockFoV = blockFoV
  }
}