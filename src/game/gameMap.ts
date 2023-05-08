import tileFactory from "../tile/tileFactory";
import { Tile } from "../tile/tile";
import { Display } from "rot-js";
import { assert } from "../utility/error";
import { Entity } from "../entity/entity";
import { Actor } from "../entity/actor";
import PreciseShadowcasting from "rot-js/lib/fov/precise-shadowcasting";
import { RenderOrder } from "../utility/renderOrder";
import { PlayerBehavior } from "../behavior/playerBehavior";
import { colorBlack, colorWhite } from "../utility/colors";
import { Item } from "../entity/item";


export class GameMap {
  private width: number
  private height: number
  private tiles: Tile[]
  private visible: boolean[]
  private explored: boolean[]

  private entities: (Entity|null)[] = []
  private items: (Item|null)[] = []
  private actors: (Actor|null)[] = []

  private entityIds: number[] = []
  private itemIds: number[] = []
  private actorIds: number[] = []

  private actorIndex: number = 0;
  
  constructor(width: number, height:number) {
    this.width = width;
    this.height = height;

    this.tiles = Array(this.width*this.height + this.width).fill(tileFactory.wall);
    this.visible = Array(this.width*this.height + this.width).fill(false);  
    this.explored = Array(this.width*this.height + this.width).fill(true); 

    this.actors.push(new Actor(
      0,
      0,
      "Player",
      true,
      '@', 
      colorWhite, 
      colorBlack, 
      RenderOrder.Actor, 
      new PlayerBehavior()));
  }

  player() {
    // player is always at the first index of actors
    return this.actors[0]!;
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
      if (e == null) {
        continue;
      }

      if (this.visible[this.index(e.x, e.y)]) {
        e.render(display);
      }
    }

    // render items
    for (let e of this.items) {
      if (e == null) {
        continue;
      }

      if (this.visible[this.index(e.x, e.y)]) {
        e.render(display);
      }
    }

    // render actors
    // this.entities.sort((a, b) => {return a.renderOrder.valueOf() - b.renderOrder.valueOf()});
    for (let a of this.actors) {
      if ( a == null) {
        continue;
      }

      if (this.visible[this.index(a.x, a.y)]) {
        a.render(display);
      }
    }
  }

  // ---------- Add
  addEntity(entity: Entity): void {
    assert(this.locationOccupied(entity.x, entity.y) == false);
    
    if (this.entityIds.length > 0) {
      const id = this.entityIds.pop()!;
      entity.id = id;
      this.entities[id] = entity;
    } else {
      entity.id = this.entities.length;
      this.entities.push(entity);
    }
  }

  addActor(actor: Actor): void {
    assert(this.locationOccupied(actor.x, actor.y) == false);

    if(this.actorIds.length > 0) {
      const id = this.actorIds.pop()!;
      actor.id = id;
      this.actors[id] = actor;
    } else {
      actor.id = this.actors.length;
      this.actors.push(actor);
    }
  }

  addItem(item: Item): void {
    assert(this.locationOccupied(item.x, item.y) == false);

    if (this.itemIds.length > 0) {
      const id = this.itemIds.pop()!;
      item.id = id;
      this.items[id] = item;
    } else {
      item.id = this.items.length;
      this.items.push(item);
    }
  }

  // ---------- Remove
  removeEntity(entity: Entity) {
    this.entities[entity.id] = null;
    this.entityIds.push(entity.id);
  }

  removeActor(actor: Actor) {
    this.actors[actor.id] = null;
    this.actorIds.push(actor.id);
  }

  removeItem(item: Item) {
    this.items[item.id] = null;
    this.itemIds.push(item.id);
  }

  // ---------- At Location
  entityAtLocation(x: number, y: number): Entity | null {
    for(var entity of this.entities) {
      if (entity == null) {
        continue;
      }
      if (entity.x == x && entity.y == y) {
        return entity;
      }
    }

    return null;
  }

  actorAtLocation(x: number, y: number): Actor | null {
    for(var actor of this.actors) {
      if (actor == null) {
        continue;
      }

      if (actor.x == x && actor.y == y) {
        return actor;
      }
    }

    return null;
  }

  itemAtLocation(x: number, y: number): Item | null {
    for (var item of this.items) {
      if (item == null) {
        continue;
      }

      if (item.x == x && item.y == y) {
        return item;
      }
    }
    
    return null;
  }


  locationOccupied(x: number, y: number): boolean {
    return this.entityAtLocation(x, y) != null || 
           this.actorAtLocation(x, y) != null ||
           this.itemAtLocation(x,y) != null;
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
  
  /**
   * Run actors in the game.
   * @returns whether a render is required
   */
  runActors(): boolean {
    let shouldRender = false;
    for(; this.actorIndex < this.actors.length; ++this.actorIndex) {
      if (this.actors[this.actorIndex] == null) {
        continue;
        
      }
      const [requestAnotherTurn, requiresRender] = this.actors[this.actorIndex]!.act(this);
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