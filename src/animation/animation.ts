export abstract class Animation {
  protected onComplete: () => void
  protected ctx: CanvasRenderingContext2D
  protected width: number

  constructor(onCompleteCallback: () => void) {
    this.onComplete = onCompleteCallback;

    const canvas = document.querySelector('canvas')!
    this.width = canvas.width;
    this.ctx = canvas.getContext('2d')!;
  }

  /**
   * Return true when animation is done
   */
  protected abstract animationUpdate(dt: number): boolean;

  /**
   * Return true when animation is done
   */
  update(dt: number): boolean {
    if (this.animationUpdate(dt)) {
      this.onComplete();
      return true;
    }

    return false;
  }
}