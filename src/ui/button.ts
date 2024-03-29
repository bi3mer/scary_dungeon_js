import { InputManager, Key } from "../game/inputManager"
import { colorBlack } from "../utility/colors"

export class Button {
  public highlighted: boolean

  private x: number      
  private y: number      
  private width: number  
  private height: number 
  private text: string
  private textColor: string
  private textHighlightedColor: string
  private frameColor: string
  private frameHighlightedColor: string
  private renderFunction: (ctx: CanvasRenderingContext2D) => void
  private callback: () => void

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
    this.callback = callback;

    if (centered) {
      this.renderFunction = this.renderCenter;
    } else {
      this.renderFunction = this.renderRegular;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.font = `20px monospace`
    this.renderFunction(ctx);
  }

  private renderCenter(ctx: CanvasRenderingContext2D): void {
    const frameColor  = this.highlighted ? this.frameHighlightedColor : this.frameColor;
    const textColor = this.highlighted ? this.textHighlightedColor : this.textColor;

    const measurements = ctx.measureText(this.text);
    const fontHeight = measurements.fontBoundingBoxAscent + measurements.fontBoundingBoxDescent
    // const charLength = measurements.width/this.text.length; // only works because we are using monospace

    ctx.fillStyle = colorBlack;
    ctx.strokeStyle = frameColor;

    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    const textX = (this.x + this.x + this.width ) /2;
    const textY = this.y + this.height/2 + fontHeight/4; // /4 looked right

    ctx.fillStyle = textColor;
    ctx.strokeStyle = colorBlack;
    ctx.fillText(this.text, textX, textY);
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