import { GameMap } from "../game/gameMap";

export abstract class BaseLineGenerator {
  width: number
  height: number

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  
  abstract generate(width: number, height: number): [map: GameMap, x: number, y: number];
}