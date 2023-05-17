import { spawnAltar, spawnEnemy, spawnGem } from "../entity/entityFactory";
import { GameMap } from "../game/gameMap";
import tileFactory from "../tile/tileFactory";

export abstract class LevelGenerator {
  width: number
  height: number

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
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