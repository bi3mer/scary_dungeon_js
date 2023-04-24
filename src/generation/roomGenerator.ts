import { RNG } from "rot-js";
import { GameMap } from "../game/gameMap";
import { BaseLineGenerator } from "./baselineGenerator";

import { LEVELS } from "./levels";
import tileFactory from "../tile/tileFactory";
import { bresenham, straightLineConnection } from "./generationUtility";
import { BASE_ROOM } from "./baseRoom";

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

function drawTile(map: GameMap, x: number, y: number, tile: string): void {
  switch(tile) {
    case 'X': { 
      // default is wall.
      break;
    }
    case '-': {
      map.setTile(x, y, tileFactory.floor);
      break;
    }
    default: {
      map.setTile(x, y, tileFactory.floor);
      console.warn(`Unhandled tile type: ${tile}`);
      break;
    }
  }
}

export class RoomGenerator extends BaseLineGenerator {
  generate(): [map: GameMap, x: number, y: number] {
    let map = new GameMap(this.width, this.height);

    // We know every room in this dataset has the same dimensions
    const w = LEVELS['0_0_0'][0].length; // room width
    const h = LEVELS['0_0_0'].length;    // room height
    const levelNames = Object.keys(LEVELS);
    
    // Where we store the rooms 
    let rooms: Rectangle[] = [];

    // The first room is the base room for the player, so we add it to the list
    // to check for collisions
    const baseRoomX = Math.round((this.width - BASE_ROOM[0].length)/2);
    const baseRoomY = Math.round((this.height - BASE_ROOM.length)/2);
    rooms.push(new Rectangle(baseRoomX, baseRoomY, BASE_ROOM[0].length,BASE_ROOM.length));

    // and then draw it
    for (let y = 0; y < BASE_ROOM.length; ++y) {
      for (let x = 0; x < BASE_ROOM[0].length; ++x) {
        drawTile(map, baseRoomX + x, baseRoomY + y, BASE_ROOM[y][x]);
      }
    }

    // generate rectangles to fill in
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
      rooms.push(newRoom);

      // get a room and draw it.
      // NOTE: right now we aren't guaranteeing a path between the room because
      // the room itself may be blocking
      const roomIndex = Math.floor(RNG.getUniform()*levelNames.length);
      const room = LEVELS[levelNames[roomIndex]];
      for (let y = 0; y < h; ++y) {
        for (let x = 0; x < w; ++x) {
          drawTile(map, x + xPos, y + yPos, room[y][x]);
        }
      } 

      // draw a path between the two rooms
      if (rooms.length > 1) {
        let [x1,y1] = rooms[rooms.length-2].center();
        let [x2,y2] = newRoom.center();

        if (RNG.getUniform() > 0.8) {
          // unlikely to draw a jagged line
          bresenham(x1, y1, x2, y2, (x, y) => {
            map.setTile(x, y, tileFactory.floor);
          });
        } else {
          // likely to draw a straight line
          straightLineConnection(x1, y1, x2, y2, (x, y) => {
            map.setTile(x, y, tileFactory.floor);
          });
        }
      }
    }
    
    const center = rooms[0].center();
    return [map, center[0], center[1]];
  }
}