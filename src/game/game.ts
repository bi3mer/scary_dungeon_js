import { Display, Map, RNG } from "rot-js";
import { Actor } from "../entity/actor";

import entityFactory from "../entity/entityFactory";
import { GameMap } from "./gameMap";
import tileFactory from "../tile/tileFactory";
import { InputManager, Key } from "./inputManager";
import actorFactory from "../entity/actorFactory";
import { Menu } from "../ui/menu";
import { helpMenu, mainMenu } from "../ui/uiFactory";
import { RoomGenerator } from "../generation/roomGenerator";


export class Game {
  private display: Display
  private map: GameMap
  private config: { width: number, height: number }
  private player: Actor
  private delta: number;

  constructor() {
    this.config = { width: 80, height: 40};
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
    let temp = new RoomGenerator(this.config.width, this.config.height);
    let res = temp.generate();

    this.map = res[0];
    this.player.x = res[1];
    this.player.y = res[2];
    this.map.addActor(this.player);
    
    // let digger = new Map.Digger(this.config.width, this.config.height);
    // let freeCells: [number, number][] = new Array();

    // let callback = (x: number, y: number, value: number) => {
    //   if (value) return; // do not store walls

    //   freeCells.push([x, y]);
    //   this.map.setTile(x, y, tileFactory.floor);
    // }

    // digger.create(callback);

    // let [x,y] = freeCells[0];
    // this.player.x = x;
    // this.player.y = y;

    // console.warn('boxes not placed yet!');
    // for (var i = 0; i < 10; ++i) {
    //   const index = Math.floor(RNG.getUniform() * freeCells.length);
    //   const key = freeCells.splice(index, 1)[0]; // get key and remove it 
    //   this.map[key] = "*";
    // }
  }

  private setUISize(): void {
    const canvas = document.querySelector('canvas')?.getContext('2d')!.canvas!;
    const log = document.getElementById('messages')!;
    log.style.left = `${canvas.offsetLeft}px`;
    log.style.width = `${canvas.width}px`;
  }
  
  render(menu: Menu | null, computeFOV: boolean): void {
    this.display.clear();
    if (computeFOV) {
      this.map.computeFOV(this.player.x, this.player.y);
    }

    this.map.render(this.display);

    if (menu !== null) {
      menu.render(this.display);
    }
  }

  start(): void {
    // GUI set up for the browser
    document.getElementById('game')!.appendChild(this.display.getContainer()!);
    this.setUISize();
    addEventListener('resize', this.setUISize);

    // initialize game engine details
    InputManager.init();

    let oldTimeStamp : number;
    let fps : number;

    let turnNumber = 1;

    // we start at the main menu
    let menu: Menu | null = mainMenu(this.config.width, this.config.height, () => {
      this.generateMap();
      this.render(null, true);
    });

    // the loop is a callback handled by window.requestAnimationFrame
    const gameLoop = (timeStamp : number) => {
      // Calculate the number of seconds passed since the last frame
      this.delta = (timeStamp - oldTimeStamp) / 1000;
      oldTimeStamp = timeStamp;
      fps = Math.round(1 / this.delta);

      if (menu !== null) {
        // if there is a menu then it handles input
        menu.update();

        if (menu.shouldExit) {
          menu = null;
          this.render(menu, false);
        } else if (menu.shouldRender) {
          this.render(menu, false);
        }
      } else if (InputManager.isKeyDown(Key.H)) {
        // Create the help menu
        menu = helpMenu(this.config.width, this.config.height);
      } else if (turnNumber % 3 == 0) {
        // AI turn
        turnNumber = 1;
      } else {
        // player turn
        const cost = this.player.act(this.map);
        if (cost > 0) {
          InputManager.clear();
          this.render(menu, true);
        }
      }

      window.requestAnimationFrame(gameLoop);
    }

    window.requestAnimationFrame(gameLoop);
  }
}