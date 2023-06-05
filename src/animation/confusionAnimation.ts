import { Config } from "../config";
import { colorConfusionScroll } from "../utility/colors";
import { Point } from "../utility/point";
import { Sound } from "../utility/sound";
import { Animation } from "./animation";

export class ConfusionAnimation extends Animation {
  private elapsed: number = 0;
  private animationTime: number = 0.5;
  private start: Point;

  constructor(playerPosition: Point, target: Point, onCompleteCallback: () => void) {
    super(onCompleteCallback);

    this.start = new Point(
      (Math.round(Config.width/2) + target.x - playerPosition.x) * Config.tileWidth + Config.tileWidth/2,
      (Math.round(Config.height/2) + target.y - playerPosition.y) * Config.tileHeight + Config.tileHeight/2
    )
    
    Sound.playConfusion();
  }

  animationUpdate(dt: number): boolean {
    this.elapsed += dt;
    const temp = this.ctx.font;
    
    this.ctx.font = `${Math.round(42*this.elapsed/this.animationTime)}px serif`;
    this.ctx.fillStyle = colorConfusionScroll;
    this.ctx.fillText('?', this.start.x+Config.tileWidth, this.start.y, 100);
    this.ctx.fillText('?', this.start.x-Config.tileWidth, this.start.y, 100);
    this.ctx.fillText('?', this.start.x, this.start.y-Config.tileHeight, 100);

    this.ctx.font = temp;

    return this.elapsed > this.animationTime;
  }
}