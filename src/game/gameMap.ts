import tileFactory from "../tile/tileFactory";
import { Tile } from "../tile/tile";
import { Display } from "rot-js";
import { assert } from "../utility/error";
import { Entity } from "../entity/entity";
import { Actor } from "../entity/actor";
import PreciseShadowcasting from "rot-js/lib/fov/precise-shadowcasting";
import colors from "../utility/colors";
import { RenderOrder } from "../utility/renderOrder";
import { PlayerBehavior } from "../behavior/playerBehavior";


export class GameMap {
  private width: number
  private height: number
  private tiles: Tile[]
  private visible: boolean[]
  private explored: boolean[]
  private entities: Entity[]
  private actors: Actor[]

  private actorIndex: number = 0;
  
  constructor(width: number, height:number) {
    this.width = width;
    this.height = height;

    this.tiles = Array(this.width*this.height + this.width).fill(tileFactory.wall);
    this.visible = Array(this.width*this.height + this.width).fill(false);  
    this.explored = Array(this.width*this.height + this.width).fill(false); 

    this.entities = [];
    this.actors = [];

    this.actors.push(new Actor(
      0,
      0,
      true,
      '@', 
      colors.white, 
      colors.black, 
      RenderOrder.Actor, 
      new PlayerBehavior()));
  }

  player() {
    // player is always at the first index of actors
    return this.actors[0];
  }

  private index(x: number, y: number): number {
    return y*this.width + x;
  }

  inBounds(x: number, y: number): boolean {
    return y * this.width + x < this.tiles.length;
  }

  isWalkable(x: number, y: number): boolean {
    const index = this.index(x, y);
    if (index >= this.tiles.length || index < 0) {
      return false;
    }

    return this.tiles[index].walkable;
  }

  setTile(x: number, y: number, tile: Tile) {
    const index = this.index(x, y);
    assert(index < this.tiles.length);
    this.tiles[index] = tile;
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
    // this.entities.sort((a, b) => {return a.renderOrder.valueOf() - b.renderOrder.valueOf()});
    for (let e of this.entities) {
      if (this.visible[this.index(e.x, e.y)]) {
        e.render(display);
      }
    }

    // render actors
    // this.entities.sort((a, b) => {return a.renderOrder.valueOf() - b.renderOrder.valueOf()});
    for (let a of this.actors) {
      if (this.visible[this.index(a.x, a.y)]) {
        a.render(display);
      }
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

  computeFOV(x: number, y: number): void {
    const SIGHT_RADIUS = 10;
    const fov = new PreciseShadowcasting((x, y) => {
      const index = this.index(x, y);
      if (index < this.tiles.length && index >= 0) {
        return this.tiles[index].walkable;
      }

      return false;
    });

    this.visible.fill(false);

    fov.compute(x, y, SIGHT_RADIUS, (x: number, y: number, r: number, visibility: number) => {
      const index = this.index(x, y);
      if (visibility > 0.0) {
        this.explored[index] = true;
        this.visible[index] = true;
      } else {
        this.visible[index] = false;
      }
    });
  }
  
  // returns if there should be a render 
  runActors(): boolean {
    let shouldRender = false;
    for(; this.actorIndex < this.actors.length; ++this.actorIndex) {
      const [requestAnotherTurn, requiresRender] = this.actors[this.actorIndex].act(this);
      console.log(requestAnotherTurn, requiresRender);
      shouldRender ||= requiresRender;
      if(requestAnotherTurn) {
        // if true, then the act is telling us that the behavior wants another 
        // turn and the loop should end here before other actors can act.
        return shouldRender;
      }
    }

    this.actorIndex = 0;
    return shouldRender;
  }
}