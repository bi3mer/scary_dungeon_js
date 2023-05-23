import { height, width } from "../config";
import { Actor } from "../entity/actor";
import { InputManager, Key } from "../game/inputManager";
import { colorBlack, colorDarkGray, colorLightGray, colorWhite, colorYellow } from "../utility/colors";
import { Button } from "./button";
import { Menu } from "./menu";
import { Text } from "./text";

export function helpMenu() : Menu {
  const x = width/4;
  const y = height/4;
  let m = new Menu(x, y, width/2, height/2, "Help", true, true, false, () => {
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

export function mainMenu(callback: ()=>void) : Menu {
  let m = new Menu(0, 0, width, height, "Main Menu", true, false, false, () => {
    if (InputManager.isKeyDown(Key.SPACE, Key.ENTER)) {
      m.shouldExit = true;
      callback();
    } else if (InputManager.isKeyDown(Key.H)) {
      m.childMenu = helpMenu();
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

export function gameOverMenu(callback: ()=>void): Menu {
  const x = width/4;
  const y = 5;
  let m = new Menu(x, y, width/2, height/5, "GAME OVER", true, true, false, () => {
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

export function inventoryMenu(player: Actor): Menu {
  const inventory = player.inventory;
  const size = inventory.items.length;
  let m: Menu;

  if (size === 0) {
    const x = width/4;
    const y = 5;
    m = new Menu(x, y, width/2, y, "Inventory", true, true, true, () => {
      if (InputManager.isKeyDown(Key.I, Key.ESCAPE)) {
        InputManager.clear();
        m.shouldExit = true;
      }
    });

    m.addText(new Text(x+12, y+y/2, 'Inventory empty.', colorWhite, colorBlack));
  } else {
    const x = width/4;
    const y = 5;
    
    m = new Menu(x, y, width/2, 3+size*3, "Inventory", true, true, false, () => {
      if (InputManager.isKeyDown(Key.I, Key.ESCAPE)) {
        InputManager.clear();
        m.shouldExit = true;
      }
    });
    
    let curY = 2;
    for (let item of inventory.items) {
      m.addButton(new Button(
        x+4,
        y+curY,
        width/2 - 8,
        3,
        item.name,
        colorDarkGray,
        colorWhite,
        colorDarkGray,
        colorWhite, 
        () => {
          console.log('selected!');
        }
      ));

      curY += 3;
    }
  }

  return m;
}