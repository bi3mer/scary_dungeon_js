import { Config } from "../config";
import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { InputManager, Key } from "../game/inputManager";
import { colorDarkGray, colorLightGray, colorWhite, colorYellow } from "../utility/colors";
import { Sound } from "../utility/sound";
import { Button } from "./button";
import { Menu } from "./menu";
import { Text } from "./text";

export function helpMenu() : Menu {
  const x = Config.screenWidth/4;
  const y = Config.screenHeight/4;
  let m = new Menu(x, y, Config.screenWidth/2, Config.screenHeight/2, "Help Menu", true, true, false, () => {
    if (InputManager.isKeyDown(Key.H, Key.ENTER, Key.ESCAPE)) {
      m.shouldExit = true;
    }
  });

  m.addButton(new Button(
    Config.screenWidth/2-4, 
    Config.screenHeight - Config.height/4 - 4, 
    8, 
    3, 
    "Ok", 
    colorLightGray, 
    colorWhite, 
    colorLightGray, 
    colorWhite,
    () => { }
  ));

  const startY = y+70
  m.addText(new Text(x+20, startY, "- WASD or arrow keys to move.", colorWhite, false, 15));
  m.addText(new Text(x+20, startY+15, "- E to interact.", colorWhite, false, 15));
  m.addText(new Text(x+20, startY+30, "- Q to open your inventory.", colorWhite, false, 15));

  m.addText(new Text(
    x+20, 
    startY+60, 
    "Your goal is to collect gems to get to the next level in\nthe prison.", 
    colorWhite, 
    false,
    15));

  m.addText(new Text(
    x+20, 
    startY + 105, 
    "Make sure to avoid the enemies, they move every third turn\nand kill you on contact.", 
    colorWhite, 
    false,
    15));

  return m;
}

export function mainMenu(callback: ()=>void) : Menu {
  let m = new Menu(0, 0, Config.screenWidth, Config.screenHeight, "", true, false, false, () => {
    if (InputManager.isKeyDown(Key.SPACE, Key.ENTER)) {
      Sound.playGameStart();
      m.shouldExit = true;
      callback();
    } else if (InputManager.isKeyDown(Key.H)) {
      m.childMenu = helpMenu();
      m.shouldRender = true;
      InputManager.clear();
    }
  });

  const title = "Scary Dungeon";
  m.addText(new Text(Config.screenWidth/2, Config.screenHeight/4, title, colorYellow, true, 50));

  const attribution = "by Colan F. Biemer"
  m.addText(new Text(Config.screenWidth/2, Config.screenHeight/4+40, attribution, colorLightGray, true,20));

  const instructions = "Press enter to start or h for instructions."
  m.addText(new Text(Config.screenWidth/2, Config.screenHeight/2, instructions, colorWhite, true, 20));

  return m;
}

export function gameOverMenu(callback: ()=>void): Menu {
  const x = Config.width/4;
  const y = 5;
  let m = new Menu(x, y, Config.width/2, Config.height/5, "GAME OVER", true, true, false, () => {
    if (InputManager.isKeyDown(Key.H, Key.ENTER, Key.ESCAPE)) {
      InputManager.clear();
      callback();
    }
  });

  m.addButton(new Button(
    Config.width/2-4, 
    y + Config.height/5 - 4, 
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
  m.addText(new Text(Config.width/2 - text.length/2, y + 2, text, colorWhite, true));

  return m;
}

export function inventoryMenu(map: GameMap, player: Actor): Menu {
  const inventory = player.inventory;
  const size = inventory.items.length;
  let m: Menu;

  if (size === 0) {
    const x = Config.screenWidth/4+Config.screenWidth/8;
    const y = Config.screenHeight/4+Config.screenHeight/8;
    console.log(x,y)
    m = new Menu(x, y, Config.screenWidth/4, Config.screenHeight/4, "", true, true, true, () => {
      if (InputManager.isKeyDown(Key.Q, Key.ESCAPE)) {
        InputManager.clear();
        m.shouldExit = true;
      }
    });

    m.addText(new Text(x+Config.screenWidth/8, y+Config.screenHeight/8, 'Inventory empty.', colorWhite, true, 25));
  } else {
    const x = Config.width/4;
    const y = 5;
    
    m = new Menu(x, y, Config.width/2, 3+size*3, "Inventory", true, true, false, () => {
      if (InputManager.isKeyDown(Key.Q, Key.ESCAPE)) {
        InputManager.clear();
        m.shouldExit = true;
      }
    });
    
    let curY = 2;
    for (let item of inventory.items) {
      m.addButton(new Button(
        x+4,
        y+curY,
        Config.width/2 - 8,
        3,
        item.name,
        colorDarkGray,
        colorWhite,
        colorDarkGray,
        colorWhite, 
        () => {
          // on consume returns a bool for whether or not the item should be
          // destroyed or not
          if (item.onConsume(map, map.player())) {
            inventory.destroyItemWithID(item.id);
          }

          // close the inventory after use
          m.shouldExit = true;
        }
      ));

      curY += 3;
    }
  }

  return m;
}