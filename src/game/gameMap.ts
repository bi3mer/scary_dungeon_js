import tileFactory from "../tile/tileFactory";
import { Tile } from "../tile/tile";
import { Display } from "rot-js";
import { assert } from "../utility/error";
import { Entity } from "../entity/entity";
import { Actor } from "../entity/actor";


export class GameMap {
  private width: number
  private height: number
  private tiles: Tile[]
  private visible: boolean[]
  private explored: boolean[]
  private entities: Entity[]
  private actors: Actor[]

  constructor(width: number, height:number) {
    this.width = width;
    this.height = height;

    this.tiles = Array(this.width*this.height + this.width).fill(tileFactory.wall);
    this.visible = Array(this.width*this.height + this.width).fill(true);  // TODO: set to false
    this.explored = Array(this.width*this.height + this.width).fill(true); // TODO: set to false

    this.entities = [];
    this.actors = [];
  }

  inBounds(x: number, y: number): boolean {
    return y * this.width + x < this.tiles.length;
  }

  isWalkable(x: number, y: number): boolean {
    if (!this.inBounds(x, y)) {
      return false;
    }
    
    return this.tiles[y*this.width + x].walkable;
  }

  setTile(x: number, y: number, tile: Tile) {
    assert(this.inBounds(x, y));
    this.tiles[y * this.width + x] = tile;
  }

  render(display: Display) {
    let y: number;
    let x: number;
    let index: number = 0;

    // render the map
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

    // render entities
    this.entities.sort((a, b) => {return a.renderOrder.valueOf() - b.renderOrder.valueOf()});
    for (let e of this.entities) {
      e.render(display);
    }

    // render actors
    this.entities.sort((a, b) => {return a.renderOrder.valueOf() - b.renderOrder.valueOf()});
    for (let a of this.actors) {
      a.render(display);
    }
  }

  addEntity(entity: Entity) {
    assert(this.entityAtLocation(entity.x, entity.y) == null);
    assert(this.actorAtLocation(entity.x, entity.y) == null);
    this.entities.push(entity);
  }

  entityAtLocation(x: number, y: number): Entity | null {
    for(var entity of this.entities) {
      if (entity.x == x && entity.y == y) {
        return entity;
      }
    }

    return null;
  }

  addActor(actor: Actor) {
    assert(this.entityAtLocation(actor.x, actor.y) == null);
    assert(this.actorAtLocation(actor.x, actor.y) == null);
    this.actors.push(actor);
  }

  actorAtLocation(x: number, y: number): Actor | null {
    for(var actor of this.actors) {
      if (actor.x == x && actor.y == y) {
        return actor;
      }
    }

    return null;
  }

  locationOccupied(x: number, y: number): boolean {
    return this.entityAtLocation(x, y) != null || this.actorAtLocation(x, y) != null;
  }
}