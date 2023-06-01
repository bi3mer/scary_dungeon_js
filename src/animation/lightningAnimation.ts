import { height, width } from "../config";
import { Game } from "../game/game";
import { colorLightningScroll } from "../utility/colors";
import { Point } from "../utility/point";
import { Sound } from "../utility/sound";
import { Animation } from "./animation";

export class LightningAnimation extends Animation {
  private animationTime: number = 0;
  private lightningAnimationTime: number = 0.2;
  private flashAnimationTime: number = 0.7;
  private lightningPath: Point[] = [];
  private playedSound = false;

  constructor(target: Point, playerPosition: Point, onCompleteCallback: () => void) {
    super(onCompleteCallback);

    target = target.copy();
    target.x = (Math.round(width/2) + target.x - playerPosition.x) * Game.tileWidth + Game.tileWidth/2;
    target.y = (Math.round(height/2) + target.y - playerPosition.y) * Game.tileHeight + Game.tileHeight/2;

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
        if (target.x < this.width - SIZE && Math.random() < 0.5) {
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
        } else if (target.x < this.width - SIZE && r < 0.66) {
          target.x += SIZE;
          turnedRight = true;
        } else {
          target.y -= SIZE;
        }
      }

      this.lightningPath.push(target);
    } 

    this.lightningPath.reverse();
  }

  animationUpdate(dt: number): boolean {
    this.animationTime += dt;
    this.ctx.strokeStyle = colorLightningScroll;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.lightningPath[0].x, this.lightningPath[0].y);
    
    if (!this.playedSound) {
      Sound.playThunder();
      this.playedSound = true;
    }

    if (this.animationTime < this.lightningAnimationTime) {
      this.ctx.strokeStyle = `rgba(255, 255, 255, 1)`;
      for(let i = 1; i < this.lightningPath.length; ++i) {
        this.ctx.lineTo(this.lightningPath[i].x, this.lightningPath[i].y);
      }

      this.ctx.stroke();
      this.ctx.closePath();

      return false;
    } 

    if (this.animationTime < this.lightningAnimationTime + this.flashAnimationTime) {
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${1 - this.animationTime / (this.lightningAnimationTime + this.flashAnimationTime)})`;
      for(let i = 1; i < this.lightningPath.length; ++i) {
        this.ctx.lineTo(this.lightningPath[i].x, this.lightningPath[i].y);
      }

      this.ctx.stroke();
      this.ctx.closePath();
      
      return false;
    }

    return true;
  }
}