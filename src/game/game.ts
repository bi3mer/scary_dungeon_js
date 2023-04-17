import { Display, Map, RNG } from "rot-js";
import { Entity } from "../entity/entity";
import { Actor } from "../entity/actor";

import entityFactory from "../entity/entityFactory";
import { GameMap } from "./gameMap";
import tileFactory from "../tile/tileFactory";

export class Game {
  private display: Display
  private map: GameMap
  private config: { width: number, height: number };
  private player: Actor;
  private entities: Entity[]

  constructor() {
    this.config = { width: 40, height: 40};
    this.display = new Display({
      width: this.config.width,
      height: this.config.height,
    });

    this.map = new GameMap(this.config.width, this.config.height);
    document.body.appendChild(this.display.getContainer()!);

    this.player = entityFactory.player.spawn(0, 0);
    this.entities = [];
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

    // console.warn('boxes not placed yet!');
    // for (var i = 0; i < 10; ++i) {
    //   const index = Math.floor(RNG.getUniform() * freeCells.length);
    //   const key = freeCells.splice(index, 1)[0]; // get key and remove it 
    //   this.map[key] = "*";
    // }
  }

  start() {
    this.generateMap();
    this.map.render(this.display);
  }

  addMessage(message: string) {
    // TODO: use an actual message log
    console.warn(message);
  }
}