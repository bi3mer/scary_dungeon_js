export class Text {
  x: number
  y: number
  text: string
  color: string
  font: string
  center: boolean

  constructor(
    x: number, 
    y: number, 
    text: string, 
    color: string, 
    center: boolean,
    fontSize: number = 12,
    maxLength: undefined | number = undefined
  ) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.font = `${fontSize}px monospace`
    this.center = center;

    if (maxLength !== undefined) {
      console.error('Max length not implemented!')
    }
  }
  
  render(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    
    if (this.center) {
      const temp = ctx.measureText(this.text);
      const x = this.x - temp.width / 2;
      ctx.fillText(this.text, x, this.y);
    } else {
      ctx.fillText(this.text, this.x, this.y);
    }
  }
}