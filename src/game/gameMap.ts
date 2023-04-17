import { Tile } from "../tile/tile";
import tileFactory from "../tile/tileFactory";
import { Display } from "rot-js";
import { assert } from "../utility/error";
import { Entity } from "../entity/entity";

export class GameMap {
  private width: number
  private height: number
  private tiles: Tile[]
  private visible: boolean[]
  private explored: boolean[]
  private entities: Entity[]

  constructor(width: number, height:number) {
    this.width = width;
    this.height = height;

    this.tiles = Array(this.width*this.height).fill(tileFactory.wall);
    this.visible = Array(this.width*this.height).fill(true);  // TODO: set to false
    this.explored = Array(this.width*this.height).fill(true); // TODO: set to false

    this.entities = [];
  }

  private inBounds(x: number, y: number): boolean {
    return y * this.height + x <= this.width * this.height + this.width;
  }

  setTile(x: number, y: number, tile: Tile) {
    assert(this.inBounds(x, y));
    this.tiles[y * this.width + x] = tile;
  }

  render(display: Display) {
    let y: number;
    let x: number;
    let index: number = 0;

    for (y = 0; y < this.height; ++y) {
      for (x = 0; x < this.width; ++x) {
        const tile = this.tiles[index];
        if (this.visible[index]) {
          display.draw(x, y, tile.char, tile.inViewFG, tile.inViewBG);
        } else if (this.explored[index]) {
          display.draw(x, y, tile.char, tile.outOfViewFG, tile.outOfViewBG);
        }

        // else draw nothing
        index++;
      }
    }
  }

  entityAtLocation(x: number, y: number): Entity | null {
    for(var entity of this.entities) {
      if (entity.x == x && entity.y == y) {
        return entity;
      }
    }

    return null;
  }
}