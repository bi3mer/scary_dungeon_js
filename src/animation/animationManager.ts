import { InputManager } from "../game/inputManager";
import { Animation } from "./animation";

/**
 * This is a pretty lazy implementation right now. It supports one animation and 
 * it is handled through a callback which returns a true when it is done. It will
 * be blocking so you can't have background animations running.
 */
export class AnimationManager {
  private static animation: Animation | null = null

  static shouldComputeFOV: boolean = false;

  static setAnimation(animation: Animation): void {  
    this.animation = animation
  }

  static animationIsRunning(): boolean {
    return this.animation !== null;
  }

  static update(dt: number, ctx: CanvasRenderingContext2D): void {
    AnimationManager.shouldComputeFOV = false;
    if(this.animation !== null &&this.animation.update(dt, ctx)) {
      this.animation = null;
      InputManager.clear();
    } 
  }
}