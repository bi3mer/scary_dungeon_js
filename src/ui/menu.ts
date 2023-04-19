import { Display } from "rot-js"
import { Button } from "./button"
import { drawFrameWithTitle, drawFrame } from "./util"
import { InputManager, Key } from "../game/inputManager"

export class Menu {
  x: number
  y: number
  width: number
  height: number
  title: string
  exitOnEscape: boolean
  drawOutline: boolean
  backgroundColor: string
  buttons: Button[]
  buttonIndex: number
  shouldRender: boolean

  constructor(
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    title: string,
    drawOutline: boolean,
    backgroundColor: string,
    exitOnEscape: boolean) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.title = title;
    
    this.drawOutline = drawOutline;
    this.backgroundColor = backgroundColor;
    this.exitOnEscape = exitOnEscape;
    this.buttons = [];
    this.buttonIndex = 0;

    this.shouldRender = true;
  }

  addButton(button: Button) {
    this.buttons.push(button);
    if (this.buttons.length === 1) {
      this.buttons[0].highlighted = true;
    }
  }

  render(display: Display) {
    drawFrameWithTitle(display, this.title, this.x, this.y, this.width, this.height);

    // now we can draw the buttons and text
    for (let b of this.buttons) {
      b.render(display);
    }

    this.shouldRender = false;
  }

  update() {
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
    }
  }
}