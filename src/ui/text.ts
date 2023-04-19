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

  render(displaY: Display) {
    displaY.drawText(this.x, this.y, `%c{${this.fg}}%b{${this.bg}}${this.text}`);
  }
}