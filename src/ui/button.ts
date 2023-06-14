import { InputManager, Key } from "../game/inputManager"
import { colorBlack, colorWhite } from "../utility/colors"

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
  centered: boolean
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
    centered: boolean,
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
    this.centered = centered;
    this.callback = callback;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.font = `20px monospace`
    if (this.centered) {
      this.renderCenter(ctx);
    } else {
      this.renderRegular(ctx);
    }
  }

  private renderCenter(ctx: CanvasRenderingContext2D): void {
    const frameColor  = this.highlighted ? this.frameHighlightedColor : this.frameColor;
    const textColor = this.highlighted ? this.textHighlightedColor : this.textColor;

    const measurements = ctx.measureText(this.text);
    const fontHeight = measurements.fontBoundingBoxAscent + measurements.fontBoundingBoxDescent
    const charLength = measurements.width/this.text.length; // only works because we are using monospace

    ctx.fillStyle = colorBlack;
    ctx.strokeStyle = frameColor;
    ctx.fillRect(this.x-charLength*2.5, this.y-fontHeight, this.width+4.5*charLength, this.height+1.5*fontHeight);
    ctx.strokeRect(this.x-charLength*2.5, this.y-fontHeight, this.width+4.5*charLength, this.height+1.5*fontHeight);

    ctx.fillStyle = textColor;
    ctx.strokeStyle = colorBlack;
    ctx.fillText(this.text, this.x, this.y+ fontHeight*0.05);
  }

  private renderRegular(ctx: CanvasRenderingContext2D): void {
    const frameColor  = this.highlighted ? this.frameHighlightedColor : this.frameColor;
    const textColor = this.highlighted ? this.textHighlightedColor : this.textColor;

    ctx.fillStyle = colorBlack;
    ctx.strokeStyle = frameColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = textColor;
    ctx.strokeStyle = colorBlack;
    ctx.fillText(this.text, this.x, this.y);
  }

  update() {
    if(this.highlighted && InputManager.isKeyDown(Key.ENTER, Key.SPACE)) {
      this.callback();
    }
  }
}