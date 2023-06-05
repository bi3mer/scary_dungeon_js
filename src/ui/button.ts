import { Display } from "rot-js"
import { drawFrame } from "./util"
import { InputManager, Key } from "../game/inputManager"

export class Button {
  x: number      
  y: number      
  width: number  
  height: number 
  text: string
  textColor: string
  textHighlightedColor: string
  frameColor: string
  frameHighlightedColor: string
  highlighted: boolean
  callback: () => void

  constructor(
    x: number, 
    y: number, 
    width: number,
    height: number,
    text: string, 
    textColor: string, 
    textHighlightedColor: string, 
    frameColor: string,
    frameHighlightedColor: string,
    callback: () => void
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.text = text;
    this.textColor = textColor;
    this.textHighlightedColor = textHighlightedColor;
    this.frameColor = frameColor;
    this.frameHighlightedColor = frameHighlightedColor;
    this.highlighted = false;
    this.callback = callback;
  }

  render(display: Display) {
    // choose colors based on whether or not the button is highlighted
    const frameColor  = this.highlighted ? this.frameHighlightedColor : this.frameColor;
    const textColor = this.highlighted ? this.textHighlightedColor : this.textColor;

    // draw frame
    drawFrame(display, this.x, this.y, this.width, this.height, frameColor);
    // drawFrame(display, this.x, this.y, this.width, this.height);

    // draw text in the center of the button
    let center = this.width / 2;
    display.drawText(this.x + center - this.text.length/2, this.y + 1, `%c{${textColor}}${this.text}`);
  }

  update() {
    if(this.highlighted && InputManager.isKeyDown(Key.ENTER, Key.SPACE)) {
      this.callback();
    }
  }
}