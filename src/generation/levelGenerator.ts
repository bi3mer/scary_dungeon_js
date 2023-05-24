import { padding } from "../config";
import { spawnAltar, spawnEnemy, spawnGem, spawnLightningScroll } from "../entity/entityFactory";
import { GameMap } from "../game/gameMap";
import tileFactory from "../tile/tileFactory";
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
    this.widthMultiplier = this.roomWidth+padding;
    this.heightMultiplier = this.roomHeight+padding;
    this.map = new GameMap(width*this.widthMultiplier, height*this.heightMultiplier);
  }

  setTile(x: number, y: number, tile: string): void {
    switch(tile) {
      case 'X': { 
        // default is wall.
        break;
      }
      case '#': {
        this.map.setTile(x, y, tileFactory.floor);
        spawnEnemy(this.map, x, y);
        break;
      }
      case '-': {
        this.map.setTile(x, y, tileFactory.floor);
        break;
      }
      case '/': {
        this.map.setTile(x, y, tileFactory.forwardSlash);
        break;
      }
      case '\\': {
        this.map.setTile(x, y, tileFactory.backwardSlash);
        break;
      }
      case '*': {
        this.map.setTile(x, y, tileFactory.floor);
        spawnGem(this.map, x, y);
        break;
      }
      case 'A': {
        this.map.setTile(x, y, tileFactory.floor);
        spawnAltar(this.map, x, y);
        break;
      }
      case '&': {
        // TODO: support multiple items
        this.map.setTile(x, y, tileFactory.floor);
        spawnLightningScroll(this.map, x, y);
        break;
      }
      default: {
        this.map.setTile(x, y, tileFactory.floor);
        console.warn(`Unhandled tile type: ${tile}`);
        break;
      }
    }
  }

  setRoom(room: string[], startX: number, startY: number): void {
    for (let y = 0; y < room.length; ++y) {
      for (let x = 0; x < room[0].length; ++x) {
        this.setTile(startX + x, startY + y, room[y][x]);
      }
    }
  }
  
  abstract generate(level: number, callback: (map: GameMap, x: number, y: number) => void): void;
}