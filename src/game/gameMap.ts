import tileFactory from "../tile/tileFactory";
import { Tile } from "../tile/tile";
import { Display } from "rot-js";
import { assert } from "../utility/error";
import { Entity } from "../entity/entity";
import { Actor } from "../entity/actor";
import PreciseShadowcasting from "rot-js/lib/fov/precise-shadowcasting";
import { RenderOrder } from "../utility/renderOrder";
import { PlayerBehavior } from "../behavior/playerBehavior";
import { colorBlack, colorDarkGray, colorTransparent, colorWhite } from "../utility/colors";
import { Item } from "../entity/item";
import { nameAltar, namePotion, namePlayer } from "../entity/names";
import { START_ROOM } from "../generation/rooms";
import { Config } from "../config";
import { Point } from "../utility/point";
import { EmptyBehavior } from "../behavior/emptyBehavior";
import { MessageLog } from "../utility/messageLog";


export class GameMap {
  private rows: number
  private cols: number

  private roomRows: number
  private roomCols: number

  private tiles: Tile[]
  private visible: number[]
  private explored: boolean[]

  private potionCount: number = 0

  private entities: (Entity | null)[] = []
  private items: (Item | null)[] = []
  private actors: (Actor | null)[] = []

  private entityIds: number[] = []
  private itemIds: number[] = []
  private actorIds: number[] = []

  private actorIndex: number = 0;
  private playerWon: boolean = false;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;

    this.roomRows = START_ROOM.length + Config.padding;
    this.roomCols = START_ROOM[0].length + Config.padding;

    this.tiles = Array(this.rows * this.cols * this.roomRows * this.roomCols).fill(tileFactory.wall);
    this.visible = Array(this.tiles.length).fill(0);
    this.explored = Array(this.tiles.length).fill(false);

    this.actors.push(new Actor(
      new Point(0, 0),
      namePlayer,
      true,
      '@',
      colorWhite,
      colorBlack,
      RenderOrder.Actor,
      new PlayerBehavior())
    );

    this.actors.push(new Actor(
      new Point(0, 0),
      nameAltar,
      true,
      'A',
      colorDarkGray,
      colorBlack,
      RenderOrder.Actor,
      new EmptyBehavior()
    ));
  }

  /**
   * Get Width
   * @returns width of the map
   */
  width(): number {
    return this.cols * this.roomCols;
  }

  /**
   * Get Height
   * @returns height of the map
   */
  height(): number {
    return this.rows * this.roomRows;
  }

  reset(): void {
    this.tiles = Array(this.rows * this.cols * this.roomRows * this.roomCols).fill(tileFactory.wall);
    this.visible = Array(this.tiles.length).fill(0);
    this.explored = Array(this.tiles.length).fill(false);

    this.potionCount = 0;

    this.player().char = '@';
    this.player().fg = colorWhite;
    this.player().bg = colorBlack;
    this.player().behavior = new PlayerBehavior();

    this.altar().fg = colorDarkGray;
    this.altar().bg = colorBlack;
    this.altar().behavior = new EmptyBehavior();
  }

  /**
   * Get the player
   * @remarks
   * Player is always at the first index of the actors
   * 
   * @returns - Actor for the player
   */
  player(): Actor {
    return this.actors[0]!;
  }

  /**
   * Get the player
   * 
   * @remarks
   * Altar is always the second index of the actors.
   * 
   * @returns - altar 
   */
  altar(): Actor {
    return this.actors[1]!;
  }

  /**
   * Player is alive
   * 
   * @remarks
   * The death character is always '%' so that's what we check for since the game
   * doesn't include something like health.
   * 
   * @returns true if the player is alive else false
   * @beta
   */
  playerIsAlive(): boolean {
    return this.player().char != '%';
  }

  /**
   * Get the number of potions in the map for the altar to unlock.
   * @returns number
   */
  requiredPotions(): number {
    return this.potionCount;
  }

  /**
   * Converts (x,y) coordinates to an index into the 1d array of the game map.
   * @param pos - x y coordinates 
   * @returns corresponding index of xy coordinate to 1 d
   */
  private indexPoint(pos: Point): number {
    return pos.y * (this.cols * this.roomCols) + pos.x;
  }

  private index(x: number, y: number): number {
    return y * (this.cols * this.roomCols) + x;
  }

  /**
   * Test if a point is within the bounds of the game map
   * @param pos - position to test
   * @returns true if in bounds else false
   */
  inBounds(pos: Point): boolean {
    return pos.y * (this.cols * this.roomCols) + pos.x < this.tiles.length;
  }

  /**
   * Tests if a position can be walked on by an entity
   * @param pos - position to test
   * @returns true if the (x,y) coordinate is not blocked by a tile (e.g. wall)
   */
  isWalkablePoint(pos: Point): boolean {
    const index = this.indexPoint(pos);
    if (index >= this.tiles.length || index < 0) {
      return false;
    }

    return this.tiles[index].walkable;
  }


  isWalkable(x: number, y: number): boolean {
    const index = this.index(x, y);
    if (index >= this.tiles.length || index < 0) {
      return false;
    }

    return this.tiles[index].walkable;
  }

  /**
   * Set a position in the game map to a specific position
   * @param pos - position to test
   * @param tile - tile to set hte position to
   */
  setTile(pos: Point, tile: Tile): void {
    const index = this.indexPoint(pos);
    assert(index < this.tiles.length);
    this.tiles[index] = tile;
  }

  render(display: Display): void {
    const maxDist = Config.sightRadius * Config.sightRadius;
    let y: number;
    let x: number;

    const playerPosition = this.player().pos;

    const midX = Math.round(Config.width / 2);
    const midY = Math.round(Config.height / 2);
    let worldPosition = new Point(0, 0);

    // render the map
    for (y = -midY; y < midY; ++y) {
      const worldY = playerPosition.y + y;
      if (worldY < 0) {
        continue;
      }

      worldPosition.y = worldY

      for (x = -midX; x < midX; ++x) {
        const worldX = playerPosition.x + x;

        if (worldX < 0) {
          continue;
        }

        worldPosition.x = worldX;

        let index = this.indexPoint(worldPosition);
        // let index = this.index(drawX, drawY);
        if (index >= this.visible.length) {
          continue;
        }

        // draw tiles in relative position 
        const tile = this.tiles[index];
        const visibility = this.visible[index];

        const p = new Point(worldX, worldY);
        if (visibility > 0.1) {
          if (playerPosition.equals(p)) {
            display.draw(x + midX, y + midY, tile.char, `rgba(0,0,0,0})`, colorTransparent);
          } else {
            const dist = playerPosition.unSquaredEuclideanDistance(p);
            const color = `rgba(0,0,0,${Math.min(0.9, dist / maxDist)})`;
            display.draw(x + midX, y + midY, tile.char, color, color);
          }
        } else if (this.explored[index]) {
          display.draw(x + midX, y + midY, tile.char, `rgba(0,0,0,${0.9})`, colorTransparent);
        }
      }
    }

    // render entities
    // this.entities.sort((a, b) => {return a.renderOrder.valueOf() - b.renderOrder.valueOf()});
    let e: Entity | null;
    let i: number;
    const entitiesLength = this.entities.length;
    for (i = 0; i < entitiesLength; ++i) {
      e = this.entities[i];
      if (e !== null && this.positionVisible(e.pos)) {
        e.render(display, playerPosition, midX, midY, this.visible[this.indexPoint(e.pos)], maxDist);
      }
    }

    // render items
    let item: Item | null;
    const itemsLength = this.items.length;
    for (i = 0; i < itemsLength; ++i) {
      item = this.items[i];
      if (item !== null && this.positionVisible(item.pos)) {
        item.render(display, playerPosition, midX, midY, this.visible[this.indexPoint(item.pos)], maxDist);
      }
    }

    // render actors
    let actor: Actor | null;
    const actorsLength = this.actors.length;
    for (i = 0; i < actorsLength; ++i) {
      actor = this.actors[i];
      if (actor !== null && this.positionVisible(actor.pos)) {
        actor.render(display, playerPosition, midX, midY, this.visible[this.indexPoint(actor.pos)], maxDist);
      }
    }
  }

  // ---------- Add
  addEntity(entity: Entity): void {
    assert(this.locationOccupied(entity.pos) === false);

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
    assert(this.locationOccupied(actor.pos) === false);

    if (this.actorIds.length > 0) {
      const id = this.actorIds.pop()!;
      actor.id = id;
      this.actors[id] = actor;
    } else {
      actor.id = this.actors.length;
      this.actors.push(actor);
    }
  }

  addItem(item: Item): void {
    assert(this.locationOccupied(item.pos) === false);

    if (item.name === namePotion) {
      ++this.potionCount;
    }

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

  // ---------- Location
  entityAtLocation(pos: Point): Entity | null {
    const size = this.entities.length;
    let e: Entity | null;

    for (let i = 0; i < size; ++i) {
      e = this.entities[i];
      if (e !== null && e.pos.equals(pos)) {
        return e;
      }
    }

    return null;
  }

  actorAtLocation(pos: Point): Actor | null {
    const size = this.actors.length;
    let a: Actor | null;

    for (let i = 0; i < size; ++i) {
      a = this.actors[i];
      if (a !== null && a.pos.equals(pos)) {
        return a;
      }
    }

    return null;
  }

  itemAtLocation(pos: Point): Item | null {
    const size = this.items.length;
    let item: Item | null;

    for (let i = 0; i < size; ++i) {
      item = this.items[i];
      if (item !== null && item.pos.equals(pos)) {
        return item;
      }
    }

    return null;
  }

  locationOccupied(pos: Point): boolean {
    return this.entityAtLocation(pos) !== null ||
      this.actorAtLocation(pos) !== null ||
      this.itemAtLocation(pos) !== null;
  }

  /**
   * Find the nearest actor.
   * 
   * @remarks 
   * This search excludes any actor found at that exact position.
   * 
   * @param pos - position to find nearest actor. 
   * @returns the closest actor or null if none was found
   */
  nearestActor(pos: Point): Actor | null {
    let closestActor: Actor | null = null;
    let closestDistance = 1000000;
    let a: Actor | null
    let dist: number;
    const size = this.actors.length;

    for (let i = 0; i < size; ++i) {
      a = this.actors[i];
      if (a !== null && !a.pos.equals(pos)) {
        dist = pos.euclideanDistance(a.pos);
        if (dist < closestDistance) {
          closestDistance = dist;
          closestActor = a;
        }
      }
    }

    return closestActor;
  }

  /**
   * Find the nearest actor that is visible
   * 
   * @remarks 
   * This search excludes any actor found at that exact position.
   * 
   * @param pos - position to find nearest actor. 
   * @returns the closest actor or null if none was found
   */
  nearestActorInVision(pos: Point): Actor | null {
    let closestActor: Actor | null = null;
    let closestDistance = 1000000;
    let dist: number;
    let a: Actor | null;
    let size = this.actors.length;

    for (let i = 0; i < size; ++i) {
      a = this.actors[i];
      if (a !== null && !a.pos.equals(pos) && this.positionVisible(a.pos)) {
        dist = pos.euclideanDistance(a.pos);
        if (dist < closestDistance) {
          closestActor = a;
          closestDistance = dist;
        }
      }
    }

    return closestActor;
  }

  /**
   * Test if a position is visible to the player.
   * @param pos - position
   * @returns true if the position is visible to the player else false
   */
  positionVisible(pos: Point): boolean {
    const index = this.indexPoint(pos);
    if (index < 0 || index >= this.visible.length) {
      return false;
    }

    return this.visible[index] !== 0;
  }

  // ---------- 
  computeFOV(): void {
    const fov = new PreciseShadowcasting((x, y) => {
      const index = this.indexPoint(new Point(x, y));
      if (index < this.tiles.length && index >= 0) {
        return !this.tiles[index].blockFoV;
      }

      return false;
    });

    this.visible.fill(0);

    fov.compute(
      this.player().pos.x,
      this.player().pos.y,
      Config.sightRadius,
      (x: number, y: number, r: number, visibility: number) => {
        const index = this.indexPoint(new Point(x, y));
        this.visible[index] = visibility;
        if (visibility === 1.0) {
          this.explored[index] = true;
        }
      }
    );
  }

  /**
   * Run actors in the game.
   * @returns whether a render is required
   */
  runActors(): boolean {
    let shouldRender = false;
    for (; this.actorIndex < this.actors.length; ++this.actorIndex) {
      if (this.actors[this.actorIndex] === null) {
        continue;

      }
      const [requestAnotherTurn, requiresRender] = this.actors[this.actorIndex]!.act(this);
      shouldRender ||= requiresRender;

      if (requestAnotherTurn) {
        // if true, then the act is telling us that the behavior wants another 
        // turn and the loop should end here before other actors can act.
        return shouldRender;
      } else if (!this.playerIsAlive()) {
        // if the player is dead, end the loop.
        break;
      }
    }

    this.actorIndex = 0;
    return shouldRender;
  }

  markLevelComplete(): void {
    this.playerWon = true;
  }

  levelComplete(): boolean {
    return this.playerWon;
  }

  /**
   * Get if there are wall neighbors in the four cardinal directions.
   * @param point - point to check neighbor for
   * @returns if wall exists in up, down left, and right positions
   */
  getCardinalWallNeighbors(point: Point): [boolean, boolean, boolean, boolean] {
    return [
      !this.isWalkable(point.x, point.y - 1), // North
      !this.isWalkable(point.x + 1, point.y), // East
      !this.isWalkable(point.x, point.y + 1), // South
      !this.isWalkable(point.x - 1, point.y), // West
    ];
  }

  // NOTE: this would be better if it returned a bit map and we operated on that
  // instead.
  getEightWallNeighbors(point: Point): [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean] {
    return [
      !this.isWalkable(point.x - 1, point.y - 1), // North-West
      !this.isWalkable(point.x, point.y - 1),     // North
      !this.isWalkable(point.x + 1, point.y - 1), // North-East
      !this.isWalkable(point.x + 1, point.y),     // East
      !this.isWalkable(point.x + 1, point.y + 1), // South East
      !this.isWalkable(point.x, point.y + 1),     // South
      !this.isWalkable(point.x - 1, point.y + 1), // South-West
      !this.isWalkable(point.x - 1, point.y),     // West
    ];
  }

  /**
   * Returns a 8 bit mask (2^8 possibilities) where each bit is true or false for 
   * al eight directions for any point.
   *
   * 1 2 3
   * 4 . 5
   * 6 7 8
   * 
   * So the result when unwrapped is: 8 7 6 5 4 3 2 1
   *
   * Also, typescript doesn't want me doing bit operations with bools, but I 
   * don't care which is why I am using ts-ignore for every line below.
   */
  getNeighborBitMask(p: Point): number {
    return 0
      // @ts-ignore
      | (this.isWalkable(p.x - 1, p.y - 1))       // 1. North-West
      // @ts-ignore
      | (this.isWalkable(p.x, p.y - 1) << 1)      // 2. North
      // @ts-ignore
      | (this.isWalkable(p.x + 1, p.y - 1) << 2)  // 3. North-East
      // @ts-ignore
      | (this.isWalkable(p.x - 1, p.y) << 3)      // 4. West
      // @ts-ignore
      | (this.isWalkable(p.x + 1, p.y) << 4)      // 5. East
      // @ts-ignore
      | (this.isWalkable(p.x - 1, p.y + 1) << 5)  // 6. South-West
      // @ts-ignore
      | (this.isWalkable(p.x, p.y + 1) << 6)      // 7. South
      // @ts-ignore
      | (this.isWalkable(p.x + 1, p.y + 1) << 7)  // 8. South-East
  }
}

/**
Wanted to do a bitmap for get eight wall neighbors but I don't think we saved that much
overall

    return 0
      // @ts-ignore
      | (!this.isWalkable(point.x - 1, point.y - 1) << 1) // North-West 
      // @ts-ignore
      | (!this.isWalkable(point.x, point.y - 1) << 2) // North 
      // @ts-ignore
      | (!this.isWalkable(point.x + 1, point.y - 1) << 3) // North-East 
      // @ts-ignore
      | (!this.isWalkable(point.x + 1, point.y) << 4) // East 
      // @ts-ignore
      | (!this.isWalkable(point.x + 1, point.y + 1) << 5) // South-East 
      // @ts-ignore
      | (!this.isWalkable(point.x, point.y + 1) << 6) // South 
      // @ts-ignore
      | (!this.isWalkable(point.x - 1, point.y + 1) << 7) // South-West 
      // @ts-ignore
      | (!this.isWalkable(point.x - 1, point.y) << 8); // West 

  */
