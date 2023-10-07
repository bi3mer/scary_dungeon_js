import { Config } from "../config";
import { Point } from "../utility/point";

export enum Key {
  LEFT = 0,
  RIGHT,
  DOWN,
  UP,
  A,
  D,
  E,
  G,
  H,
  I,
  Q,
  R,
  S,
  W,
  SPACE,
  ESCAPE,
  ENTER,
  INVALID
}


// static class to handle input
export class InputManager {
  private static _keys: boolean[] = []

  private static mousePosition: Point = new Point(0,0);

  public static init(): void {
    for(let i = 0; i < Object.keys(Key).length; ++i) {
      InputManager._keys.push(false);
    }

    window.addEventListener("keydown", InputManager.onKeyDown);
    window.addEventListener("keyup", InputManager.onKeyUp);

    window.addEventListener('mousemove', (ev) => {
      this.mousePosition.x = ev.clientX - Config.canvasOffsetLeft;
      this.mousePosition.y = ev.clientY - Config.canvasOffsetTop;
    });
  }

  public static isKeyDown(...keys: Key[]): boolean {
    const size = keys.length;
    for(let i = 0; i < size; ++i) {
      if (InputManager._keys[keys[i]]) {
        return true;
      }
    }

    return false;
  }
  
  private static keyStrToKey(key: string): Key {
    switch(key) {
      case 'Down': 
      case 'ArrowDown': 
        return Key.DOWN;
      case 'Up': 
      case 'ArrowUp': 
        return Key.UP;
      case 'Right': 
      case 'ArrowRight': 
        return Key.RIGHT;
      case 'Left': 
      case 'ArrowLeft':
        return Key.LEFT;
      case ' ':
      case 'Space':
        return Key.SPACE;
      case 'Escape':
        return Key.ESCAPE;
      case 'a':
        return Key.A;
      case 'e':
        return Key.E;
      case 's':
        return Key.S;
      case 'd':
        return Key.D;
      case 'w': 
        return Key.W;
      case 'r':
        return Key.R;
      case 'q': 
        return Key.Q;
      case 'g': 
        return Key.G;
      case 'h': 
        return Key.H;
      case 'i':
        return Key.I;
      case 'Enter':
        return Key.ENTER;
      default:
        console.warn(`Unhandled key: ${key}.`); 
        return Key.INVALID;
    }
  }

  private static onKeyDown(event: KeyboardEvent): boolean {
    const k = InputManager.keyStrToKey(event.key);
    InputManager._keys[k] = true;

    if(k == Key.DOWN || k == Key.UP || k == Key.LEFT || k == Key.RIGHT) {
      event.preventDefault();
    }

    return false;
  }

  private static onKeyUp(event: KeyboardEvent): boolean {
    InputManager._keys[InputManager.keyStrToKey(event.key)] = false;

    return false;
  }

  static clear() {
    for(let i = 0; i < InputManager._keys.length; ++i) {
      InputManager._keys[i] = false;
    }
  }

  static onMouseMove(ev: MouseEvent): void {

  }
}