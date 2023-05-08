import { InputManager, Key } from "../game/inputManager";
import { colorBlack, colorLightGray, colorWhite, colorYellow } from "../utility/colors";
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
    colorLightGray, 
    colorWhite, 
    colorLightGray, 
    colorWhite,
    () => { }
  ));

  m.addText(new Text(x+3, y+3, "WASD or arrow keys to move.", colorWhite, colorBlack));
  m.addText(new Text(x+3, y+4, "I to inspect.", colorWhite, colorBlack));

  return m;
}

export function mainMenu(width: number, height: number, callback: ()=>void) : Menu {
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
  m.addText(new Text(width/2-title.length/2, height/2 - 10, title, colorYellow, colorBlack));

  const attribution = "by Colan F. Biemer"
  m.addText(new Text(width/2-attribution.length/2, height/2 - 8, attribution, colorLightGray, colorBlack));

  const instructions = "Press space to start or h for instructions."
  m.addText(new Text(width/2-instructions.length/2, height/2, instructions, colorWhite, colorBlack));

  return m;
}

export function gameOverMenu(width: number, height: number, callback: ()=>void): Menu {
  const x = width/4;
  const y = 5;
  let m = new Menu(x, y, width/2, height/5, "GAME OVER", true, true, () => {
    if (InputManager.isKeyDown(Key.H, Key.ENTER, Key.ESCAPE)) {
      InputManager.clear();
      callback();
    }
  });

  m.addButton(new Button(
    width/2-4, 
    y + height/5 - 4, 
    8, 
    3, 
    "Ok", 
    colorLightGray, 
    colorWhite, 
    colorLightGray, 
    colorWhite,
    callback
  ));
  
  const text = 'You failed.'
  m.addText(new Text(width/2 - text.length/2, y + 2, text, colorWhite, colorBlack));

  return m;
}