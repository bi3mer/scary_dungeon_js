import { RNG } from "rot-js";
import { GameMap } from "../game/gameMap";

import { LEVELS } from "./levels";
import tileFactory from "../tile/tileFactory";
import { bresenham, straightLineConnection } from "./generationUtility";
import { START_ROOM, ROOMS, GEM_ROOMS } from "./rooms";
import { LevelGenerator } from "./levelGenerator";
import { Room } from "./room";
import { ClingoSolver } from "../utility/clingoSolver";
import { MessageLog } from "../utility/messageLog";


export class MainGenerator extends LevelGenerator {
  private fillInLayout(
    layout: [number, number, string][], 
    callback: (map: GameMap, x: number, y: number) => void): void
  {
    let playerX = 0;
    let playerY = 0;

    for(let i = 0; i < layout.length; ++i) {
      let [x, y, type] = layout[i];

      // get a room matching the defined type
      let room: string[];
      switch(type) {
        case 'gem': {
          room = GEM_ROOMS[RNG.getUniformInt(0, GEM_ROOMS.length-1)];
          break;
        }
        case 'altar': {
          playerX = Math.round(x*this.widthMultiplier + this.roomWidth/2 + 1);
          playerY = Math.round(y*this.heightMultiplier + this.roomHeight/2);
          room = START_ROOM;
          break;
        }
        case 'room': {
          room = ROOMS[RNG.getUniformInt(0, ROOMS.length-1)];
          break;
        }
        case 'wall': {
          continue;
        }
        default: {
          MessageLog.addErrorMessage(`Unhandled room type for generation "${type}". Please contact admin.`, true);
          continue;
        }
      }

      // put it into the world
      this.setRoom(
        room, 
        x*this.widthMultiplier+RNG.getUniformInt(0, this.padding-1), 
        y*this.heightMultiplier+RNG.getUniformInt(0, this.padding-1)
      );
    }
      
    callback(this.map, playerX, playerY);
  }


  generate(callback: (map: GameMap, x: number, y: number) => void): void {
    console.log('running the solver...');
    ClingoSolver.get(this.width, this.height, 1).then((result) => {
      console.log('building result...')

      if (result[0]) {
        // Error, generation failed, increase the map size.
        this.width++;
        this.height++;
        this.generate(callback);
      } else {
        // No error, use the layout to fill out the results.
        this.fillInLayout(result[1], callback);
      }
    });

    // // Where we store the rooms 
    // let rooms: Room[] = [];

    // // The first room is the base room for the player, so we add it to the list
    // // to check for collisions...
    // const baseRoomX = Math.round((this.width - BASE_ROOM[0].length)/2);
    // const baseRoomY = Math.round((this.height - BASE_ROOM.length)/2);
    // rooms.push(new Room(baseRoomX, baseRoomY, BASE_ROOM[0].length,BASE_ROOM.length));

    // ... and then draw the base room
    // for (let y = 0; y < BASE_ROOM.length; ++y) {
    //   for (let x = 0; x < BASE_ROOM[0].length; ++x) {
    //     this.drawTile(map, baseRoomX + x, baseRoomY + y, BASE_ROOM[y][x]);
    //   }
    // }

    // // generate Rooms to fill in
    // for(let i = 0; i < 30; ++i) {
    //   // position for the room
    //   const xPos = 1+Math.round(RNG.getUniform()*(this.width-w-2));
    //   const yPos = 1+Math.round(RNG.getUniform()*(this.height-h-2));
    //   let newRoom = new Room(xPos, yPos, w, h);

    //   // check for intersections
    //   if (newRoom.intersects(rooms)) {
    //     continue;
    //   }

    //   // if no intersection, place the room in the map
    //   rooms.push(newRoom);

    //   // get a room and draw it.
    //   // NOTE: right now we aren't guaranteeing a path between the room because
    //   // the room itself may be blocking
    //   const roomIndex = Math.floor(RNG.getUniform()*levelNames.length);
    //   const room = LEVELS[levelNames[roomIndex]];
    //   for (let y = 0; y < h; ++y) {
    //     for (let x = 0; x < w; ++x) {
    //       this.drawTile(map, x + xPos, y + yPos, room[y][x]);
    //     }
    //   } 

    //   // draw a path between the two rooms
    //   if (rooms.length > 1) {
    //     // get the two points in each room to use to connect to each other
    //     let [x1, y1] = rooms[rooms.length-2].getConnectionPoint(newRoom);
    //     let [x2, y2] = newRoom.getConnectionPoint(rooms[rooms.length-2]);

    //     // randomly decide how to dig a path to the next room
    //     if (RNG.getUniform() > 0.8) {
    //       // unlikely to draw a jagged line
    //       bresenham(x1, y1, x2, y2, (x, y) => {
    //         map.setTile(x, y, tileFactory.floor);
    //       });
    //     } else {
    //       // likely to draw a straight line
    //       straightLineConnection(x1, y1, x2, y2, (x, y) => {
    //         map.setTile(x, y, tileFactory.floor);
    //       });
    //     }
    //   }
    // }
    
    // // Altar is at the center, so the player position is offset by 1
    // const center = rooms[0].center();
    // callback(map, center[0] + 1, center[1]);
  }
}