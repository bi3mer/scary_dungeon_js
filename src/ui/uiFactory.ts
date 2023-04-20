import { InputManager, Key } from "../game/inputManager";
import colors from "../utility/colors";
import { Button } from "./button";
import { Menu } from "./menu";
import { Text } from "./text";

export function helpMenu(width: number, height: number) : Menu {
  const x = width/4;
  const y = height/4;
  let m = new Menu(x, y, width/2, height/2, "Help", true, true, () => {
    if (InputManager.isKeyDown(Key.H, Key.ENTER, Key.ESCAPE)) {
      m.shouldExit = true;
    }
  });

  m.addButton(new Button(
    width/2-4, 
    height - height/4 - 4, 
    8, 
    3, 
    "Ok", 
    colors.lightGray, 
    colors.white, 
    colors.lightGray, 
    colors.white,
    () => { }
  ));

  m.addText(new Text(x+3, y+3, "WASD or arrow keys to move.", colors.white, colors.black));
  m.addText(new Text(x+3, y+4, "I to inspect.", colors.white, colors.black));

  return m;
}

interface mainMenuCallback {
  (): void
}

export function mainMenu(width: number, height: number, callback: mainMenuCallback) : Menu {
  let m = new Menu(0, 0, width, height, "Main Menu", true, false, () => {
    if (InputManager.isKeyDown(Key.SPACE, Key.ENTER)) {
      m.shouldExit = true;
      callback();
    } else if (InputManager.isKeyDown(Key.H)) {
      m.childMenu = helpMenu(width, height);
      m.shouldRender = true;
      InputManager.clear();
    }
  });

  const title = "Scary Dungeon";
  m.addText(new Text(width/2-title.length/2, height/2 - 10, title, colors.yellow, colors.black));

  const attribution = "by Colan F. Biemer"
  m.addText(new Text(width/2-attribution.length/2, height/2 - 8, attribution, colors.lightGray, colors.black));

  const instructions = "Press space to start or h for instructions."
  m.addText(new Text(width/2-instructions.length/2, height/2, instructions, colors.white, colors.black));

  return m;
}