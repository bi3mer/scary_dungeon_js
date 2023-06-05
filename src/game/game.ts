import { Display, Map, RNG } from "rot-js";

import { GameMap } from "./gameMap";
import { InputManager, Key } from "./inputManager";
import { Menu } from "../ui/menu";
import { gameOverMenu, helpMenu, inventoryMenu, mainMenu } from "../ui/uiFactory";
import { spawnPlayer } from "../entity/entityFactory";
import { MessageLog } from "../utility/messageLog";
import { MainGenerator } from "../generation/mainGenerator";
import { Config } from "../config";
import { AnimationManager } from "../animation/animationManager";
import { Sound } from "../utility/sound";

export class Game {
  private level: number
  private display: Display
  private map: GameMap
  private config: { roomCols: number, roomRows: number }
  private delta: number
  private mapGenerating: boolean


  constructor() {
    this.config = { roomCols: 5, roomRows: 5};
    this.display = new Display({
      width: Config.width,
      height: Config.height,
    });

    this.map = new GameMap(Config.width, Config.height);
    document.body.appendChild(this.display.getContainer()!);

    this.delta = 0;
    this.mapGenerating = false;
    this.level = 1;
  }

  private generateMap() {
    this.mapGenerating = true;
    let generator = new MainGenerator(this.config.roomRows, this.config.roomRows);

    generator.generate(this.level, (map, playerPos) => {
      if (this.level === 1) {
        this.map = map;
        spawnPlayer(this.map, playerPos);
      } else {
        map.player().pos = playerPos;
        map.player().inventory = this.map.player().inventory;
        this.map = map;
      }
      
      this.render(null, true);
      this.mapGenerating = false;
    });
  }

  private setUISize(): void {
    const canvas = document.querySelector('canvas')?.getContext('2d')!.canvas!;
    const log = document.getElementById('messages')!;
    log.style.left = `${canvas.offsetLeft}px`;
    log.style.width = `${canvas.width}px`;

    Config.screenHeight = canvas.height;
    Config.screenWidth = canvas.width;
    Config.tileHeight = canvas.height / Config.height;
    Config.tileWidth = canvas.width / Config.width;
  }
  
  render(menu: Menu | null, computeFOV: boolean): void {
    this.display.clear();

    if (computeFOV) {
      this.map.computeFOV();
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


    let oldTimeStamp : number;
    let fps : number;
    let handlingAnimation = true;

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

      if (handlingAnimation === true && !AnimationManager.animationIsRunning()) {
        // NOTE: I don't love this solution, but I'm starting to not like this
        // game loop, so it may end up being time to refactor it pretty soon.
        handlingAnimation = false;
      }

      if (this.mapGenerating) {
        // Nothing to do while map is generating
      } else if (AnimationManager.animationIsRunning()) {
        this.render(null, AnimationManager.shouldComputeFOV);
        AnimationManager.update(this.delta);
        handlingAnimation = true;
      } else if (menu !== null) {
        // if there is a menu then it handles input
        menu.update();

        if (menu.shouldExit) {
          menu = null;
          this.render(menu, false);
          InputManager.clear();
        } else if (menu.shouldRender) {
          this.render(menu, false);
        }
      } else if (InputManager.isKeyDown(Key.H)) {
        // Create the help menu
        menu = helpMenu();
        this.render(menu, false);
        InputManager.clear();
      } else if (InputManager.isKeyDown(Key.I)) {
        menu = inventoryMenu(this.map, this.map.player());
        this.render(menu, false);
        InputManager.clear();
      } else if (this.map.levelComplete()) { 
        ++this.level;
        this.generateMap();
      } else {
        // run game and render if requested by the map
        if (this.map.runActors()) {
          this.render(null, true);

          if (!this.map.playerIsAlive()) {
            this.level = 1;
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