import { Config } from "../config";
import { Sound } from "../utility/sound";
import { Animation } from "./animation";
import { AnimationManager } from "./animationManager";

export class ReturnToAltarAnimation extends Animation {
  private middleCallback: null | (() => void);
  private animationTime: number = 0;
  private totalAnimationTime: number = 0.8;

  constructor(middleCallback: () => void, onCompleteCallback: () => void) {
    super(onCompleteCallback);

    this.middleCallback = middleCallback;
    Sound.playTeleport();
  }

  animationUpdate(dt: number): boolean {
    if (this.animationTime >= this.totalAnimationTime) {
      return true;
    }

    this.animationTime += dt;
    const x = this.animationTime/this.totalAnimationTime;
    const opacity = -Math.pow(2*x-1,2)+1; // inverse U 0 -> 1 -> 0

    if (this.middleCallback !== null && x >= 0.49 && x <= 0.51 ) {
      this.middleCallback();
      AnimationManager.shouldComputeFOV = true;
      this.middleCallback = null;
    }

    this.ctx.beginPath();
    this.ctx.strokeStyle = `rgba(0,0,0,${opacity})`;
    this.ctx.fillStyle = `rgba(0,0,0,${opacity})`;
    this.ctx.fillRect(0,0, Config.screenWidth, Config.screenHeight);
    this.ctx.stroke();

    return false;
  }
}