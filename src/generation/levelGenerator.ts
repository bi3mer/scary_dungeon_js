import { Config } from "../config";
import { spawnAltar, spawnConfusionScroll, spawnEnemy, spawnPotion, spawnLightningScroll, spawnReturnToAltarScroll, spawnStunScroll } from "../entity/entityFactory";
import { GameMap } from "../game/gameMap";
import tileFactory from "../tile/tileFactory";
import { Point } from "../utility/point";
import { choice } from "../utility/random";
import { LEVELS } from "./levels";
import { START_ROOM } from "./rooms";

export abstract class LevelGenerator {
  map: GameMap

  width: number
  height: number

  roomWidth: number
  roomHeight: number
  levelNames: string[]

  widthMultiplier: number
  heightMultiplier: number

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    // We know every room in this dataset has the same dimensions
    this.roomWidth = LEVELS['0_0_0'][0].length; // room width
    this.roomHeight = LEVELS['0_0_0'].length;    // room height
    this.levelNames = Object.keys(LEVELS);

    this.roomWidth = START_ROOM[0].length;
    this.roomHeight = START_ROOM.length;

    // create the map with the correct number of tiles
    this.widthMultiplier = this.roomWidth + Config.padding;
    this.heightMultiplier = this.roomHeight + Config.padding;
    this.map = new GameMap(width * this.widthMultiplier, height * this.heightMultiplier);
  }

  setTile(pos: Point, tile: string): void {
    switch (tile) {
      case 'X': {
        // default is wall.
        break;
      }
      case 'T':
        this.map.setTile(pos, tileFactory.tombstone);
        break;
      case 't':
        this.map.setTile(pos, tileFactory.grave);
        break;
      case 'x':
        this.map.setTile(pos, tileFactory.anvil);
        break;
      case '#': {
        this.map.setTile(pos, tileFactory.floor);
        spawnEnemy(this.map, pos);
        break;
      }
      case '-': {
        this.map.setTile(pos, tileFactory.floor);
        break;
      }
      case '/': {
        this.map.setTile(pos, tileFactory.forwardSlash);
        break;
      }
      case '\\': {
        this.map.setTile(pos, tileFactory.backwardSlash);
        break;
      }
      case '*': {
        this.map.setTile(pos, tileFactory.floor);
        spawnPotion(this.map, pos);
        break;
      }
      case 'a': {
        this.map.setTile(pos, tileFactory.floor);
        spawnAltar(this.map, pos);
        break;
      }
      case '&': {
        this.map.setTile(pos, tileFactory.floor);

        // randomly choose a spawn function and call it
        choice([
          spawnStunScroll,
          spawnConfusionScroll,
          spawnLightningScroll,
          spawnReturnToAltarScroll
        ])(this.map, pos);
        break;
      }
      default: {
        this.map.setTile(pos, tileFactory.floor);
        console.warn(`Unhandled tile type: ${tile}`);
        break;
      }
    }
  }

  setRoom(room: string[], startX: number, startY: number): void {
    for (let y = 0; y < room.length; ++y) {
      for (let x = 0; x < room[0].length; ++x) {
        const char = room[y][x];
        this.setTile(new Point(startX + x, startY + y), char);
      }
    }
  }

  decorate(): void {
    let p = new Point(0, 0);
    for (let y = 0; y < this.map.height(); ++y) {
      p.y = y;
      for (let x = 0; x < this.map.height(); ++x) {
        p.x = x;

        // Wall decoration, if location is not walkable
        if (!this.map.isWalkablePoint(p)) {
          const bitmask = this.map.getNeighborBitMask(p);
        } else if (Math.random() < 0.08) {
          // random chance to decorate the ground with some cobblestones or spots
          if (Math.random() < 0.7) {
            this.map.setTile(p, tileFactory.decoratedFloor2);
          } else {
            this.map.setTile(p, tileFactory.decoratedFloor1);
          }
        }
      }
    }
  }

  abstract generate(level: number, callback: (playerPos: Point) => void): void;
}

/*

          // get neighbors for if it is wall or not
          const [nw, n, ne, e, se, s, sw, w] = this.map.getEightWallNeighbors(p);

          // we avoid setTile to save some execution time because we know exactly 
          // what we want to happen when decorating in this context
          if (!n && s && w && e) {
            this.map.setTile(p, tileFactory.bottomMiddleWall);
          } else if (!n && !s && !e && !w) { // TODO: I thinkt this conditional is wrong 
            // nothing around this tile
            this.setTile(p, choice(['T', 't', 'x']));
          } else if (!n && !e && s && sw && w) {
            this.map.setTile(p, tileFactory.bottomEastCornerWall);
          } else if (!n && !w && s && se && e) {
            this.map.setTile(p, tileFactory.bottomWestCornerWall);
          } else if (n && w && s && !e) {
            this.map.setTile(p, tileFactory.sideWestWall);
          } else if (n && e && s && !w) {
            this.map.setTile(p, tileFactory.sideEastWall);
          } else if (n && !nw && w) {
            this.map.setTile(p, tileFactory.cornerSouthEastWall);
          } else if (n && !ne && e) {
            this.map.setTile(p, tileFactory.cornerSouthWestWall);
          } else if (n && e && w && ne && nw) {
            this.map.setTile(p, tile)
          }
*/
