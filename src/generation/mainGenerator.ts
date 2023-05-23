import { RNG } from "rot-js";
import { GameMap } from "../game/gameMap";

import tileFactory from "../tile/tileFactory";
import { straightLineConnection } from "./generationUtility";
import { START_ROOM, ROOMS, GEM_ROOMS } from "./rooms";
import { LevelGenerator } from "./levelGenerator";
import { Room } from "./room";
import { ClingoSolver } from "../utility/clingoSolver";
import { MessageLog } from "../utility/messageLog";
import { padding } from "../config";


export class MainGenerator extends LevelGenerator {
  private getRoom(type: string): string[] | undefined {
    switch(type) {
      case 'gem': {
        return GEM_ROOMS[RNG.getUniformInt(0, GEM_ROOMS.length-1)];
      }
      case 'altar': {
        return START_ROOM;
      }
      case 'room': {
        return ROOMS[RNG.getUniformInt(0, ROOMS.length-1)];
      }
      case 'wall': {
        return undefined;
      }
      default: {
        MessageLog.addErrorMessage(`Unhandled room type for generation "${type}". Please contact admin.`, true);
        return undefined;
      }
    }
  }  

  private fillInLayout(
    layout: [number, number, string][], 
    callback: (map: GameMap, x: number, y: number) => void): void
  {
    let playerX = 0;
    let playerY = 0;

    let rooms: {[name: string]: Room } = {};

    // build the rooms
    for(let i = 0; i < layout.length; ++i) {
      let [x, y, type] = layout[i];

      // get a room matching the defined type
      let room = this.getRoom(type);
      if (room === undefined) {
        continue;
      }  
      
      // put it into the world
      const roomX = x*this.widthMultiplier+RNG.getUniformInt(2, padding-2);
      const roomY = y*this.heightMultiplier+RNG.getUniformInt(2, padding-2)
      this.setRoom(room, roomX, roomY); 
      
      rooms[`${x},${y}`] = new Room(roomX, roomY, this.roomWidth, this.roomHeight)

      // set player position
      if (type === 'altar') {
        const center = rooms[`${x},${y}`].center()
        playerX = center.x;
        playerY = center.y-1;
      }
    }

    // build the connections for rooms
    for (let key in rooms) {
      // get key
      let [_x,_y] = key.split(',');
      let x = parseInt(_x);
      let y = parseInt(_y);

      // get possible connections that are up and to the right, the other two 
      // directions are handled implicitly.
      // up:
      let newK = `${x},${y+1}`;
      if (newK in rooms) {
        let p1 = rooms[key].down();
        let p2 = rooms[newK].up();

        straightLineConnection(p1, p2, (drawX, drawY) => {
          this.map.setTile(drawX, drawY, tileFactory.floor);
        });
      }

      // right:
      newK = `${x+1},${y}`;
      if (newK in rooms) {
        let p1 = rooms[key].right();
        let p2 = rooms[newK].left();

        straightLineConnection(p1, p2, (drawX, drawY) => {
          this.map.setTile(drawX, drawY, tileFactory.floor);
        });
      }
    }
      
    callback(this.map, playerX, playerY);
  }

  generate(callback: (map: GameMap, x: number, y: number) => void): void {
    ClingoSolver.get(this.width, this.height, 1).then((result) => {
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
  }
}