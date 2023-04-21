import { Display } from "rot-js"
import { Button } from "./button"
import { drawFrameWithTitle } from "./util"
import { InputManager, Key } from "../game/inputManager"
import { Text } from "./text"

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

  render(display: Display): void {
    drawFrameWithTitle(display, this.title, this.x, this.y, this.width, this.height);

    if (this.childMenu) {
      this.childMenu.render(display);
    } else {
      for (let b of this.buttons) {
        b.render(display);
      }

      for (let t of this.text) {
        t.render(display);
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
      if (InputManager.isKeyDown(Key.RIGHT) || InputManager.isKeyDown(Key.D)) {
        this.buttons[this.buttonIndex].highlighted = false;
        this.buttonIndex = Math.min(this.buttons.length - 1, this.buttonIndex + 1);
        this.buttons[this.buttonIndex].highlighted = true;
        this.shouldRender = true;
      } else if (InputManager.isKeyDown(Key.LEFT) || InputManager.isKeyDown(Key.A)) {
        this.buttons[this.buttonIndex].highlighted = false;
        this.buttonIndex = Math.max(0, this.buttonIndex - 1);
        this.buttons[this.buttonIndex].highlighted = true;
        this.shouldRender = true;
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