import { Config } from "../config";
import { Point } from "../utility/point";
import { Sound } from "../utility/sound";
import { Animation } from "./animation";

export class StunAnimation extends Animation {
  private elapsed: number = 0;
  private animationTime: number = 0.3;
  private start: Point;
  private end: Point

  constructor(playerPosition: Point, target: Point, onCompleteCallback: () => void) {
    super(onCompleteCallback);

    this.start = new Point(
      (Math.round(Config.width/2) + target.x - playerPosition.x) * Config.tileWidth + Config.tileWidth/2,
      (Math.round(Config.height/2) + target.y - playerPosition.y) * Config.tileHeight + Config.tileHeight/2
    )
    
    this.end = new Point(
      (Math.round(Config.width/2)) * Config.tileWidth + Config.tileWidth/2,
      (Math.round(Config.height/2)) * Config.tileHeight + Config.tileHeight/2
    );
    
    Sound.playStun();
  }

  animationUpdate(dt: number, ctx: CanvasRenderingContext2D): boolean {
    this.elapsed += dt;
    ctx.lineWidth = 4;
    ctx.strokeStyle = `rgba(255, 255, 255, 1)`;

    ctx.beginPath();
    ctx.lineTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();

    return this.elapsed > this.animationTime;
  }
}