import { Display, Map, RNG } from "rot-js";

import { GameMap } from "./gameMap";
import { InputManager, Key } from "./inputManager";
import { Menu } from "../ui/menu";
import { gameOverMenu, helpMenu, mainMenu } from "../ui/uiFactory";
import { spawnPlayer } from "../entity/entityFactory";
import { MessageLog } from "../utility/messageLog";
import { NoLayoutGenerator } from "../generation/noLayoutGenerator";
import { MainGenerator } from "../generation/mainGenerator";
import { height, width } from "../config";


export class Game {
  private display: Display
  private map: GameMap
  private config: { roomCols: number, roomRows: number }
  private delta: number;
  private mapGenerating: boolean;

  constructor() {
    this.config = { roomCols: 5, roomRows: 5};
    this.display = new Display({
      width: width,
      height: height,
    });

    this.map = new GameMap(width, height);
    document.body.appendChild(this.display.getContainer()!);

    this.delta = 0;
    this.mapGenerating = false;
  }

  private generateMap() {
    this.mapGenerating = true;
    // let generator = new NoLayoutGenerator(this.config.width, this.config.height);
    let generator = new MainGenerator(this.config.roomRows, this.config.roomRows);
    generator.generate((map, playerX, playerY) => {
      this.map = map;
      spawnPlayer(this.map, playerX, playerY);
      this.mapGenerating = false;
      this.render(null, true);
    });
  }

  private setUISize(): void {
    const canvas = document.querySelector('canvas')?.getContext('2d')!.canvas!;
    const log = document.getElementById('messages')!;
    log.style.left = `${canvas.offsetLeft}px`;
    log.style.width = `${canvas.width}px`;
  }
  
  render(menu: Menu | null, computeFOV: boolean): void {
    this.display.clear();
    const playerX = this.map.player().x;
    const playerY = this.map.player().y;

    if (computeFOV) {
      this.map.computeFOV(playerX, playerY);
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

    // we start at the main menu
    let menu: Menu | null = mainMenu(() => {
      this.generateMap();
    });

    // the loop is a callback handled by window.requestAnimationFrame
    const gameLoop = (timeStamp : number) => {
      // Calculate the number of seconds passed since the last frame
      this.delta = (timeStamp - oldTimeStamp) / 1000;
      oldTimeStamp = timeStamp;
      fps = Math.round(1 / this.delta);

      if (this.mapGenerating) {
        // Nothing to do while this is happening
      } else if (menu !== null) {
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
        menu = helpMenu();
      } else {
        // run game and render if requested by the map
        if (this.map.runActors()) {
          this.render(null, true);

          if (!this.map.playerIsAlive()) {
            menu = gameOverMenu(() => {
              this.map.reset();
              MessageLog.clear();
              
              menu = mainMenu(() => {
                this.generateMap();
                this.render(null, true);
              });
            });
          }
        }
      }

      window.requestAnimationFrame(gameLoop);
    }

    window.requestAnimationFrame(gameLoop);
  }
}