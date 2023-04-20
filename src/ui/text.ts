import { Display } from "rot-js";

export class Text {
  x: number
  y: number
  text: string
  fg: string
  bg: string

  constructor(x: number, y: number, text: string, fg: string, bg: string) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.fg = fg;
    this.bg = bg;
  }

  render(display: Display) {
    // for(let c of this.text) {
    //   display.drawOver(this.x, this.y, c, this.fg, this.bg);
    // }
    display.drawText(this.x, this.y, `%c{${this.fg}}%b{${this.bg}}${this.text}`);
  }
}