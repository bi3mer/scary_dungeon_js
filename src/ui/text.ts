export class Text {
  x: number
  y: number
  text: string | undefined
  color: string
  font: string
  center: boolean
  splitText: string[] | undefined

  constructor(
    x: number, 
    y: number, 
    text: string, 
    color: string, 
    center: boolean,
    fontSize: number = 12,
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = `${fontSize}px monospace`
    this.center = center;

    if (text.includes('\n')) {
      this.splitText = text.split('\n')
    } else {
      this.text = text;
    }
  }
  
  render(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;

    if (this.text !== undefined) {
      if (this.center) {
        // text and center
        const width = ctx.measureText(this.text).width;
        const x = this.x - width / 2;
        ctx.fillText(this.text, x, this.y)
      } else {
        // Just text
        ctx.fillText(this.text, this.x, this.y);
      }
    } else if (this.center) {
      // multi-line and center
      for(let i = 0; i < this.splitText!.length; ++i) {
        const measurements = ctx.measureText(this.splitText![i]);
        const yIncrement = measurements.fontBoundingBoxAscent + measurements.fontBoundingBoxDescent;
        ctx.fillText(this.splitText![i], this.x - measurements.width/2, this.y+yIncrement*i);
      }
    }  else {
      // multi-line without centering
      const measurements = ctx.measureText('A');
      const yIncrement = measurements.fontBoundingBoxAscent + measurements.fontBoundingBoxDescent;
      for(let i = 0; i < this.splitText!.length; ++i) {
        ctx.fillText(this.splitText![i], this.x, this.y+yIncrement*i);
      }
    }
  }
}