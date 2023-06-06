export abstract class Animation {
  protected onComplete: () => void

  constructor(onCompleteCallback: () => void) {
    this.onComplete = onCompleteCallback;
  }

  /**
   * Return true when animation is done
   */
  protected abstract animationUpdate(dt: number, ctx: CanvasRenderingContext2D): boolean;

  /**
   * Return true when animation is done
   */
  update(dt: number, ctx: CanvasRenderingContext2D): boolean {
    if (this.animationUpdate(dt, ctx)) {
      this.onComplete();
      return true;
    }

    return false;
  }
}