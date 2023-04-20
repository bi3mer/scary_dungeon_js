import { RNG } from "rot-js";
import { GameMap } from "../game/gameMap";
import { BaseLineGenerator } from "./baselineGenerator";

import { LEVELS } from "./levels";
import tileFactory from "../tile/tileFactory";

class Rectangle {
  x1: number
  y1: number
  x2: number
  y2: number

  constructor(x: number, y: number, width: number, height: number) {
    this.x1 = x;
    this.x2 = x + width;
    this.y1 = y;
    this.y2 = y + height;
  }

  center(): [x: number, y: number] {
    return [Math.round((this.x1 + this.x2)/2), Math.round((this.y1 + this.y2)/2)]
  }

  intersects(others: Rectangle[]): boolean {
    for(let other of others) {
      if (
        this.x1-1 <= other.x2 && 
        this.x2+1 >= other.x1 && 
        this.y1-1 <= other.y2 &&
        this.y2+1 >= other.y1
      ) {
        return true;
      }
    }
    return false;
  }
}

export class RoomGenerator extends BaseLineGenerator {
  generate(): [map: GameMap, x: number, y: number] {
    let map = new GameMap(this.width, this.height);
    let playerX = 0;
    let playerY = 0;

    // We know every room in this dataset has the same dimensions
    const w = LEVELS['0_0_0'][0].length; // room width
    const h = LEVELS['0_0_0'].length;    // room height

    // generate rectangles to fill in
    let rooms: Rectangle[] = [];
    for(let i = 0; i < 30; ++i) {
      // position for the room
      const xPos = 1+Math.round(RNG.getUniform()*(this.width-w-2));
      const yPos = 1+Math.round(RNG.getUniform()*(this.height-h-2));
      let newRoom = new Rectangle(xPos, yPos, w, h);

      // check for intersections
      if (newRoom.intersects(rooms)) {
        continue;
      }

      // if no intersection, place the room in the map
      rooms.push(newRoom)
      for (let y = yPos; y <= newRoom.y2; ++y) {
        for (let x = xPos; x <= newRoom.x2; ++x) {
          map.setTile(x, y, tileFactory.floor);
          console.log(x,y);
        }
      } 
    }
    
    return [map, playerX, playerY];
  }
}