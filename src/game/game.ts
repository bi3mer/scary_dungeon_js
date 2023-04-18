import { Display, Map, RNG } from "rot-js";
import { Entity } from "../entity/entity";
import { Actor } from "../entity/actor";

import entityFactory from "../entity/entityFactory";
import { GameMap } from "./gameMap";
import tileFactory from "../tile/tileFactory";
import { InputManager, Key } from "./inputManager";
import actorFactory from "../entity/actorFactory";

export class Game {
  private display: Display
  private map: GameMap
  private config: { width: number, height: number }
  private player: Actor
  private delta: number;

  constructor() {
    this.config = { width: 40, height: 40};
    this.display = new Display({
      width: this.config.width,
      height: this.config.height,
    });

    this.map = new GameMap(this.config.width, this.config.height);
    document.body.appendChild(this.display.getContainer()!);

    this.player = actorFactory.player.spawn(0, 0, this.map);
    this.delta = 0;
  }

  private generateMap() {
    let digger = new Map.Digger(this.config.width, this.config.height);
    let freeCells: [number, number][] = new Array();

    let callback = (x: number, y: number, value: number) => {
      if (value) return; // do not store walls

      freeCells.push([x, y]);
      this.map.setTile(x, y, tileFactory.floor);
    }

    digger.create(callback);

    let [x,y] = freeCells[0];
    this.player.x = x;
    this.player.y = y;

    // console.warn('boxes not placed yet!');
    // for (var i = 0; i < 10; ++i) {
    //   const index = Math.floor(RNG.getUniform() * freeCells.length);
    //   const key = freeCells.splice(index, 1)[0]; // get key and remove it 
    //   this.map[key] = "*";
    // }
  }

  start() {
    InputManager.init();
    this.generateMap();
    this.map.render(this.display);

    let oldTimeStamp : number;
    let fps : number;

    const gameLoop = (timeStamp : number) => {
      // Calculate the number of seconds passed since the last frame
      this.delta = (timeStamp - oldTimeStamp) / 1000;
      oldTimeStamp = timeStamp;
      fps = Math.round(1 / this.delta);

      if (this.player.act(this.map)) {
        // TODO: AI act the next frame;
      }

      this.map.render(this.display);

      // // Draw FPS
      // if (this.displayFPS && this.clearBackground) {
      //   const tempSize = this.fontSize;
      //   const tempFont = this.font;

      //   this.setFont(8, 'Courier New');
      //   this.drawText(this.width - 60, 15, `FPS: ${fps}`, 'red');
      //   this.setFont(tempSize, tempFont);
      // }

      window.requestAnimationFrame(gameLoop);
    }

    window.requestAnimationFrame(gameLoop);
  }

  addMessage(message: string) {
    // TODO: use an actual message log
    console.warn(message);
  }
}