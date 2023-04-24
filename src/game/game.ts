import { Display, Map, RNG } from "rot-js";
import { Actor } from "../entity/actor";

import { GameMap } from "./gameMap";
import { InputManager, Key } from "./inputManager";
import { Menu } from "../ui/menu";
import { helpMenu, mainMenu } from "../ui/uiFactory";
import { RoomGenerator } from "../generation/roomGenerator";
import { spawnPlayer } from "../entity/entityFactory";


export class Game {
  private display: Display
  private map: GameMap
  private config: { width: number, height: number }
  private delta: number;

  constructor() {
    this.config = { width: 80, height: 40};
    this.display = new Display({
      width: this.config.width,
      height: this.config.height,
    });

    this.map = new GameMap(this.config.width, this.config.height);
    document.body.appendChild(this.display.getContainer()!);

    this.delta = 0;
  }

  private generateMap() {
    let temp = new RoomGenerator(this.config.width, this.config.height);
    let res = temp.generate();

    this.map = res[0];
    spawnPlayer(this.map, res[1], res[2]);
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
      this.map.computeFOV(this.map.player.x, this.map.player.y);
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
        this.map.runActors();
        turnNumber = 1;
      } else {
        // player turn
        const cost = this.map.player.act(this.map);
        if (cost > 0) {
          InputManager.clear();
          this.render(menu, true);
          ++turnNumber;
        }
      }

      window.requestAnimationFrame(gameLoop);
    }

    window.requestAnimationFrame(gameLoop);
  }
}