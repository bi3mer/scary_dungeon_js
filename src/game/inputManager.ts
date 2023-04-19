export enum Key {
  LEFT = 0,
  RIGHT,
  DOWN,
  UP,
  W,
  A,
  S,
  D,
  Q,
  R,
  H,
  SPACE,
  ESCAPE,
  ENTER,
  INVALID
}


// static class to handle input
export class InputManager {
  private static _keys: boolean[] = []

  public static init(): void {
    for(let i = 0; i < Object.keys(Key).length; ++i) {
      InputManager._keys.push(false);
    }

    window.addEventListener("keydown", InputManager.onKeyDown);
    window.addEventListener("keyup", InputManager.onKeyUp);
  }

  public static isKeyDown(k: Key): boolean {
    return InputManager._keys[k];
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
      case 'h': 
        return Key.H;
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
}