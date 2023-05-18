import { spawnAltar, spawnEnemy, spawnGem } from "../entity/entityFactory";
import { GameMap } from "../game/gameMap";
import tileFactory from "../tile/tileFactory";
import { LEVELS } from "./levels";

export abstract class LevelGenerator {
  map: GameMap

  width: number
  height: number

  roomWidth: number
  roomHeight: number
  levelNames: string[]

  padding: number = 4

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    // We know every room in this dataset has the same dimensions
    this.roomWidth  = LEVELS['0_0_0'][0].length; // room width
    this.roomHeight = LEVELS['0_0_0'].length;    // room height
    this.levelNames = Object.keys(LEVELS);
    
    // create the map with the correct number of tiles
    this.map = new GameMap(
      width*(this.roomWidth + this.padding), 
      height*(this.roomHeight + this.padding)
    );
  }

  drawTile(map: GameMap, x: number, y: number, tile: string): void {
    switch(tile) {
      case 'X': { 
        // default is wall.
        break;
      }
      case '#': {
        map.setTile(x, y, tileFactory.floor);
        spawnEnemy(map, x, y);
        break;
      }
      case '-': {
        map.setTile(x, y, tileFactory.floor);
        break;
      }
      case '/': {
        map.setTile(x, y, tileFactory.forwardSlash);
        break;
      }
      case '\\': {
        map.setTile(x, y, tileFactory.backwardSlash);
        break;
      }
      case '*': {
        map.setTile(x, y, tileFactory.floor);
        spawnGem(map, x, y);
        break;
      }
      case 'A': {
        map.setTile(x, y, tileFactory.floor);
        spawnAltar(map, x, y);
        break;
      }
      default: {
        map.setTile(x, y, tileFactory.floor);
        console.warn(`Unhandled tile type: ${tile}`);
        break;
      }
    }
  }
  
  abstract generate(callback: (map: GameMap, x: number, y: number) => void): void;
}