import { RNG } from "rot-js";
import { GameMap } from "../game/gameMap";

import { LEVELS } from "./levels";
import tileFactory from "../tile/tileFactory";
import { bresenham, straightLineConnection } from "./generationUtility";
import { START_ROOM } from "./rooms";
import { LevelGenerator } from "./levelGenerator";
import { Room } from "./room";


export class NoLayoutGenerator extends LevelGenerator {
  generate(callback: (map: GameMap, x: number, y: number) => void): void {
    let map = new GameMap(this.width, this.height);

    // We know every room in this dataset has the same dimensions
    const w = LEVELS['0_0_0'][0].length; // room width
    const h = LEVELS['0_0_0'].length;    // room height
    const levelNames = Object.keys(LEVELS);
    
    // Where we store the rooms 
    let rooms: Room[] = [];

    // The first room is the base room for the player, so we add it to the list
    // to check for collisions...
    const baseRoomX = Math.round((this.width - START_ROOM[0].length)/2);
    const baseRoomY = Math.round((this.height - START_ROOM.length)/2);
    rooms.push(new Room(baseRoomX, baseRoomY, START_ROOM[0].length,START_ROOM.length));

    // ... and then draw the base room
    this.drawRoom(START_ROOM, baseRoomX, baseRoomY);

    // generate Rooms to fill in
    for(let i = 0; i < 30; ++i) {
      // position for the room
      const xPos = 1+Math.round(RNG.getUniform()*(this.width-w-2));
      const yPos = 1+Math.round(RNG.getUniform()*(this.height-h-2));
      let newRoom = new Room(xPos, yPos, w, h);

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
      this.drawRoom(room, xPos, yPos);

      // draw a path between the two rooms
      if (rooms.length > 1) {
        // get the two points in each room to use to connect to each other
        let [x1, y1] = rooms[rooms.length-2].getConnectionPoint(newRoom);
        let [x2, y2] = newRoom.getConnectionPoint(rooms[rooms.length-2]);

        // randomly decide how to dig a path to the next room
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
    
    // Altar is at the center, so the player position is offset by 1
    const center = rooms[0].center();
    callback(map, center[0] + 1, center[1]);
  }
}