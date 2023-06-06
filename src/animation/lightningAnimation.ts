import { Config } from "../config";
import { colorLightningScroll } from "../utility/colors";
import { Point } from "../utility/point";
import { Sound } from "../utility/sound";
import { Animation } from "./animation";

export class LightningAnimation extends Animation {
  private elapsed: number = 0;
  private lightningAnimationTime: number = 0.25;
  private flashAnimationTime: number = 0.55;
  private lightningPath: Point[] = [];
  private playedSound = false;

  constructor(target: Point, playerPosition: Point, onCompleteCallback: () => void) {
    super(onCompleteCallback);

    target = target.copy();
    target.x = (Math.round(Config.width/2) + target.x - playerPosition.x) * Config.tileWidth + Config.tileWidth/2;
    target.y = (Math.round(Config.height/2) + target.y - playerPosition.y) * Config.tileHeight + Config.tileHeight/2;

    const SIZE = 4
    this.lightningPath.push(target);

    let turnedLeft = false;
    let turnedRight = false;

    while (target.y > 0) {
      target = target.copy()
      if (turnedLeft) {
        if (target.x > SIZE && Math.random() < 0.5) {
          target.x -= SIZE;
        } else {
          target.y -= SIZE;
          turnedLeft = false;
        }
      } else if (turnedRight) {
        if (target.x < Config.width - SIZE && Math.random() < 0.5) {
          target.x += SIZE;
        } else {
          target.y -= SIZE;
          turnedRight = false;
        }
      } else {
        const r = Math.random();
        if (target.x > SIZE && r < 0.33) {
          target.x -= SIZE;
          turnedLeft = true;
        } else if (target.x < Config.width - SIZE && r < 0.66) {
          target.x += SIZE;
          turnedRight = true;
        } else {
          target.y -= SIZE;
        }
      }

      this.lightningPath.push(target);
    } 
  }

  animationUpdate(dt: number, ctx: CanvasRenderingContext2D): boolean {
    this.elapsed += dt;
    ctx.strokeStyle = colorLightningScroll;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.lightningPath[0].x, this.lightningPath[0].y);
    
    if (!this.playedSound) {
      Sound.playThunder();
      this.playedSound = true;
    }

    if (this.elapsed < this.lightningAnimationTime) {
      ctx.strokeStyle = `rgba(255, 255, 255, 1)`;
      for(let i = 1; i < this.lightningPath.length; ++i) {
        ctx.lineTo(this.lightningPath[i].x, this.lightningPath[i].y);
      }

      ctx.stroke();
      ctx.closePath();

      return false;
    } 

    if (this.elapsed < this.lightningAnimationTime + this.flashAnimationTime) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${1 - this.elapsed / (this.lightningAnimationTime + this.flashAnimationTime)})`;
      for(let i = 1; i < this.lightningPath.length; ++i) {
        ctx.lineTo(this.lightningPath[i].x, this.lightningPath[i].y);
      }

      ctx.stroke();
      ctx.closePath();
      
      return false;
    }

    return true;
  }
}