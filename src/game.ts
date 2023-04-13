import { Display, Map, RNG } from "rot-js";
import { Entity } from "./entity/entity";

export class Game {
  private display: Display
  private map: { [name: string]: string }
  private config: { width: number, height: number };

  constructor() {
    this.config = { width: 40, height: 40};
    this.display = new Display({
      width: this.config.width,
      height: this.config.height,
    });

    this.map = {};
    document.body.appendChild(this.display.getContainer()!);
  }

  private generateMap() {
    let digger = new Map.Digger(this.config.width, this.config.height);
    let freeCells: string[] = new Array();

    let callback = (x: number, y: number, value: number) => {
      if (value) return; // do not store walls

      const key = `${x},${y}`;
      freeCells.push(key);
      this.map[key] = ".";
    }

    digger.create(callback);
    for (var i = 0; i < 10; ++i) {
      const index = Math.floor(RNG.getUniform() * freeCells.length);
      const key = freeCells.splice(index, 1)[0]; // get key and remove it 
      this.map[key] = "*";
    }
  }

  private drawWholeMap() {
    for (var key in this.map) {
      const parts = key.split(",");
      const x = parseInt(parts[0]);
      const y = parseInt(parts[1]);
      this.display.draw(x, y, this.map[key], null, null);
    }
  }

  start() {
    let player = new Entity();
    let test = player.spawn(0, 0);
    this.generateMap();
    this.drawWholeMap();
  }
}