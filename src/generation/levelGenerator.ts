import { Config } from "../config";
import { spawnAltar, spawnConfusionScroll, spawnEnemy, spawnPotion, spawnLightningScroll, spawnReturnToAltarScroll, spawnStunScroll } from "../entity/entityFactory";
import { GameMap } from "../game/gameMap";
import tileFactory from "../tile/tileFactory";
import { Point } from "../utility/point";
import { choice } from "../utility/random";
import { LEVELS } from "./levels";
import { Room } from "./room";

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
    this.roomWidth  = LEVELS['0_0_0'][0].length; // room width
    this.roomHeight = LEVELS['0_0_0'].length;    // room height
    this.levelNames = Object.keys(LEVELS);

    this.roomWidth = START_ROOM[0].length;
    this.roomHeight = START_ROOM.length;
    
    // create the map with the correct number of tiles
    this.widthMultiplier = this.roomWidth+Config.padding;
    this.heightMultiplier = this.roomHeight+Config.padding;
    this.map = new GameMap(width*this.widthMultiplier, height*this.heightMultiplier);
  }

  setTile(pos: Point, tile: string): void {
    switch(tile) {
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

  runWallRuleUpdates(): void {
    // let p = new Point(0,0);
    // for (let y = 0; y < this.map.height(); ++y) {
    //   p.y = y;
    //   for (let x = 0; x < this.map.height(); ++x) {
    //     p.x = x;

    //     // Nothing to do if this is not a wall
    //     if (this.map.isWalkable(p)) {
    //       continue;
    //     }
        
    //     // get neighbors for if it is wall or not
    //     const [up, down, left, right] = this.map.getWallNeighbors(p);

    //     if (up || down || left || right) {
    //       // top middle 
    //       this.setTile(p, '#');
    //     } else {
    //       this.setTile(p, choice(['T','t','x']));
    //     }
    //   }
    // }
  }
  
  abstract generate(level: number, callback: (playerPos: Point) => void): void;
}