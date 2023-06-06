import { Display } from "rot-js";

export class Text {
  x: number
  y: number
  text: string
  color: string
  font: string
  maxLength: number | undefined

  constructor(
    x: number, 
    y: number, 
    text: string, 
    color: string, 
    center: boolean,
    fontSize: number = 12,
    maxLength: number|undefined=undefined
  ) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.font = `${fontSize}px monospace`
    this.maxLength = maxLength;

    if (center) {
      this.x -= this.text.length / 2;
    }
  }
  
  render(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }
}