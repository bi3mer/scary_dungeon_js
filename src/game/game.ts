import { Display } from "rot-js";

import { GameMap } from "./gameMap";
import { InputManager, Key } from "./inputManager";
import { Menu } from "../ui/menu";
import { gameOverMenu, helpMenu, inventoryMenu, mainMenu } from "../ui/uiFactory";
import { spawnPlayer } from "../entity/entityFactory";
import { MessageLog } from "../utility/messageLog";
import { MainGenerator } from "../generation/mainGenerator";
import { Config } from "../config";
import { AnimationManager } from "../animation/animationManager";
import { background, colorBlack } from "../utility/colors";

export class Game {
  private level: number
  private gameDisplay: Display

  private uiCanvas: HTMLCanvasElement
  private uiCtx: CanvasRenderingContext2D

  private map: GameMap
  private config: { roomCols: number, roomRows: number }
  private delta: number
  private mapGenerating: boolean

  constructor(tileSet: HTMLImageElement) {
    this.config = { roomCols: 5, roomRows: 5 };

    this.uiCanvas = document.createElement("canvas");
    this.uiCanvas.setAttribute('id', 'uiCanvas');
    this.uiCtx = this.uiCanvas.getContext('2d')!;

    this.gameDisplay = new Display({
      width: Config.width,
      height: Config.height,
      // layout: 'tile',
      layout: "tile-gl",
      tileWidth: 32,
      tileHeight: 32,
      bg: colorBlack,
      tileSet: tileSet,
      tileColorize: true,
      tileMap: {
        '@': [128, 224],
        's': [160, 224],  // Goes to a chest that can be opened... idk
        'c': [224, 224], // opened chest
        '#': [128, 96],  // enemy
        '.': [0, 128],   // ground
        ',': [192, 96],  // decorated ground
        'g': [224, 32],
        'G': [256, 32],
        'a': [224, 64],
        'A': [256, 64],
        'E': [64, 320],  // spider enemy
        '*': [192, 288], // green potion
        '%': [0, 288],   // ghost
        'X': [64, 192],  // anvil
        'T': [128, 160], // tombstone
        't': [160, 160], // grave
        '~': [64, 64],   // bottom wall, middle in sequence, nothing above it
        '┐': [160, 0],   // bottom wall corner with empty spaces n, ne, e
        '┌': [128, 0],   // botoom wall corner with empty spaces n, nw, w
      },
    });

    this.map = new GameMap(Config.width, Config.height);
    this.gameDisplay.getContainer()!.setAttribute('id', 'gameCanvas');

    document.getElementById('game')!.appendChild(this.uiCanvas);
    document.getElementById('game')!.appendChild(this.gameDisplay.getContainer()!);

    this.delta = 0;
    this.mapGenerating = false;
    this.level = 1;
  }

  private generateMap() {
    this.mapGenerating = true;
    let generator = new MainGenerator(this.config.roomRows, this.config.roomRows);

    generator.generate(this.level, (playerPos) => {
      generator.decorate();
      if (this.level === 1) {
        this.map = generator.map;
        spawnPlayer(this.map, playerPos);
      } else {
        generator.map.player().pos = playerPos;
        generator.map.player().inventory = this.map.player().inventory;
        this.map = generator.map;
      }

      this.render(null, true);
      this.mapGenerating = false;
    });
  }

  private setUISize(): void {
    const log = document.getElementById('messages')!;
    // @ts-ignore
    const gameCanvas = document.getElementById('gameCanvas')!;
    Config.canvasOffsetLeft = gameCanvas.offsetLeft;
    Config.canvasOffsetTop = gameCanvas.offsetTop;

    log.style.left = `${gameCanvas.offsetLeft}px`;

    // @ts-ignore
    log.style.width = `${gameCanvas.width}px`;

    // @ts-ignore
    Config.screenHeight = gameCanvas.height;
    // @ts-ignore
    Config.screenWidth = gameCanvas.width;
    // @ts-ignore
    Config.tileHeight = gameCanvas.height / Config.height;
    // @ts-ignore
    Config.tileWidth = gameCanvas.width / Config.width;

    // UI canvas is absolute so it's position is set completely based
    // on the games position.
    this.uiCanvas.width = Config.screenWidth;
    this.uiCanvas.height = Config.screenHeight;

    // Since the game canvas is centered, we need to set the margins exactly
    // to guarantee a correct overlay.
    const style = window.getComputedStyle(gameCanvas)!;
    this.uiCanvas.style.marginLeft = style.marginLeft;
    this.uiCanvas.style.marginRight = style.marginRight;
    this.uiCanvas.style.marginTop = style.marginTop;
    this.uiCanvas.style.marginBottom = style.marginBottom;

  }

  render(menu: Menu | null, computeFOV: boolean): void {
    this.gameDisplay.clear();
    this.uiCtx.clearRect(0, 0, Config.screenWidth, Config.screenHeight);

    if (computeFOV) {
      this.map.computeFOV();
    }

    this.map.render(this.gameDisplay);

    if (menu !== null) {
      menu.render(this.uiCtx);
    }
  }

  start(): void {
    // GUI set up for the browser
    document.getElementById('game')!.appendChild(this.gameDisplay.getContainer()!);
    this.setUISize();

    let oldTimeStamp: number;
    let fps: number;
    let handlingAnimation = true;

    // we start at the main menu
    let menu: Menu | null = mainMenu(() => {
      this.generateMap();
    });

    addEventListener('resize', () => {
      this.setUISize();
      this.render(menu, false);
    });

    // the loop is a callback handled by window.requestAnimationFrame
    const gameLoop = (timeStamp: number) => {
      // Calculate the number of seconds passed since the last frame
      this.delta = (timeStamp - oldTimeStamp) / 1000;
      oldTimeStamp = timeStamp;
      fps = Math.round(1 / this.delta);

      if (handlingAnimation === true && !AnimationManager.animationIsRunning()) {
        // NOTE: I don't love this solution, but I'm starting to not like this
        // game loop, so it may end up being time to refactor it pretty soon.
        handlingAnimation = false;
        this.uiCtx.clearRect(0, 0, Config.screenWidth, Config.screenHeight);
        if (AnimationManager.getShouldRender()) {
          this.render(menu, true);
        }
      }

      if (this.mapGenerating) {
        // Nothing to do while map is generating
      } else if (AnimationManager.animationIsRunning()) {
        if (AnimationManager.getShouldRender()) {
          this.render(null, AnimationManager.shouldComputeFOV);
        }

        AnimationManager.update(this.delta, this.uiCtx);
        handlingAnimation = true;
      } else if (menu !== null) {
        // if there is a menu then it handles input
        menu.update(this.uiCtx);

        if (menu.shouldExit) {
          menu.clear(this.uiCtx);
          menu = null;
          // this.render(menu, false);
          InputManager.clear();
        } else if (menu.shouldRender) {
          this.render(menu, false);
        }
      } else if (InputManager.isKeyDown(Key.H)) {
        // Create the help menu
        menu = helpMenu();
        this.render(menu, false);
        InputManager.clear();
      } else if (InputManager.isKeyDown(Key.Q)) {
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



// let fontTileMap: {[name: string]:  [number, number]} = {
//   '┌': [160,208],
//   '┐': [240,176],
//   '└': [0,192],
//   '┘': [144,208],
//   '│': [48,176],
//   '─': [64,192],
//   '┤': [64,176],
//   '├': [48,192],
//   ' ': [0, 0],
//   ',': [192,32],
//   '-': [208,32],
//   '.': [224,32],
//   '#': [48,64]
// };

// // lower case letters
// let x = 16;
// let y = 96;
// for(let i = 0; i < 26; ++i,x+=16) {
//   const char = String.fromCharCode(97+i);
//   fontTileMap[char] = [x, y];

//   if (i == 14) {
//     x = -16;
//     y+=16;
//   }
// }

// // upper case letters
// x = 16;
// y = 64;
// for(let i = 0; i < 26; ++i, x+=16) {
//   const char = String.fromCharCode(65+i);
//   fontTileMap[char] = [x, y];

//   if (i == 14) {
//     x = -16;
//     y+=16;
//   }
// }
// this.uiDisplay = new Display({
//   width: Config.width,
//   height: Config.height,
//   fontSize: 16
//   // layout: 'tile',
//   // tileWidth: 16,
//   // tileHeight: 16,
//   // bg: colorBlack,
//   // tileSet: font,
//   // tileColorize: true,
//   // tileMap: fontTileMap
// });
