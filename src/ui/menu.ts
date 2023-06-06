import { Display } from "rot-js"
import { Button } from "./button"
import { drawFrameWithTitle } from "./util"
import { InputManager, Key } from "../game/inputManager"
import { Text } from "./text"
import { colorBlack, colorRed, colorWhite } from "../utility/colors"
import { MessageLog } from "../utility/messageLog"
import { Config } from "../config"

export class Menu {
  x: number
  y: number
  width: number
  height: number
  title: string
  exitOnEscape: boolean
  drawOutline: boolean
  buttons: Button[]
  buttonIndex: number
  text: Text[]
  shouldRender: boolean
  shouldExit: boolean
  buttonsLeftToRight: boolean
  updateCallback: ()=>void

  childMenu: Menu | null

  constructor(
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    title: string,
    drawOutline: boolean,
    exitOnEscape: boolean,
    buttonsLeftToRight: boolean,
    updateCallback: ()=>void
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.title = title;
    
    this.drawOutline = drawOutline;
    this.exitOnEscape = exitOnEscape;
    this.buttons = [];
    this.buttonIndex = 0;
    this.text = [];

    this.buttonsLeftToRight = buttonsLeftToRight;

    this.shouldRender = true;
    this.shouldExit = false;

    this.updateCallback = updateCallback;
    this.childMenu = null;
  }

  addButton(button: Button): void {
    this.buttons.push(button);
    if (this.buttons.length === 1) {
      this.buttons[0].highlighted = true;
    }
  }

  addText(text: Text): void {
    this.text.push(text);
  }

  render(ctx: CanvasRenderingContext2D): void {
    // drawFrameWithTitle(ctx, this.title, this.x, this.y, this.width, this.height);

    if (this.childMenu) {
      this.childMenu.render(ctx);
    } else {
      MessageLog.addErrorMessage('menu rendering disabled', true);
      // for (let b of this.buttons) {
      //   b.render(display);
      // }

      for (let t of this.text) {
        t.render(ctx);
      }
    }
    this.shouldRender = false;
  }

  update(): void {
    if (this.childMenu) {
      this.childMenu.update();

      if (this.childMenu.shouldExit) {
        this.childMenu = null;
        this.shouldRender = true;
        InputManager.clear();
      } else {
        return;
      }
    }

    if (this.buttons.length > 0) {
      if (this.buttonsLeftToRight) {
        if (InputManager.isKeyDown(Key.RIGHT) || InputManager.isKeyDown(Key.D)) {
          this.buttons[this.buttonIndex].highlighted = false;
          this.buttonIndex = Math.min(this.buttons.length - 1, this.buttonIndex + 1);
          this.buttons[this.buttonIndex].highlighted = true;
          this.shouldRender = true;
          InputManager.clear();
        } else if (InputManager.isKeyDown(Key.LEFT) || InputManager.isKeyDown(Key.A)) {
          this.buttons[this.buttonIndex].highlighted = false;
          this.buttonIndex = Math.max(0, this.buttonIndex - 1);
          this.buttons[this.buttonIndex].highlighted = true;
          this.shouldRender = true;
          InputManager.clear();
        }
      } else {
        if (InputManager.isKeyDown(Key.DOWN) || InputManager.isKeyDown(Key.S)) {
          this.buttons[this.buttonIndex].highlighted = false;
          this.buttonIndex = Math.min(this.buttons.length - 1, this.buttonIndex + 1);
          this.buttons[this.buttonIndex].highlighted = true;
          this.shouldRender = true;
          InputManager.clear();
        } else if (InputManager.isKeyDown(Key.UP) || InputManager.isKeyDown(Key.W)) {
          this.buttons[this.buttonIndex].highlighted = false;
          this.buttonIndex = Math.max(0, this.buttonIndex - 1);
          this.buttons[this.buttonIndex].highlighted = true;
          this.shouldRender = true;
          InputManager.clear();
        }
      }

      this.buttons[this.buttonIndex].update();
    }

    if (this.exitOnEscape && InputManager.isKeyDown(Key.ESCAPE)) {
      this.shouldExit = true;
      InputManager.clear();
    } else {
      this.updateCallback();
    }
  }
}