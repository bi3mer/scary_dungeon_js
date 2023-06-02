import { Config } from "../config";
import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { InputManager, Key } from "../game/inputManager";
import { colorBlack, colorDarkGray, colorLightGray, colorWhite, colorYellow } from "../utility/colors";
import { Sound } from "../utility/sound";
import { Button } from "./button";
import { Menu } from "./menu";
import { Text } from "./text";

export function helpMenu() : Menu {
  const x = Config.width/4;
  const y = Config.height/4;
  let m = new Menu(x, y, Config.width/2, Config.height/2, "Help", true, true, false, () => {
    if (InputManager.isKeyDown(Key.H, Key.ENTER, Key.ESCAPE)) {
      m.shouldExit = true;
    }
  });

  m.addButton(new Button(
    Config.width/2-4, 
    Config.height - Config.height/4 - 4, 
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
  m.addText(new Text(x+3, y+4, "E to interact.", colorWhite, colorBlack));
  m.addText(new Text(x+3, y+5, "I to open your inventory.", colorWhite, colorBlack));

  m.addText(new Text(x+3, y+7, "Your goal is to collect gems to\nget to the next level in the\nprison.", colorWhite, colorBlack));

  m.addText(new Text(x+3, y+11, "Make sure to avoid the enemies,\nthey move every third turn and\nwill kill you contact.", colorWhite, colorBlack));

  return m;
}

export function mainMenu(callback: ()=>void) : Menu {
  let m = new Menu(0, 0, Config.width, Config.height, "Main Menu", true, false, false, () => {
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
  m.addText(new Text(Config.width/2-title.length/2, Config.height/2 - 10, title, colorYellow, colorBlack));

  const attribution = "by Colan F. Biemer"
  m.addText(new Text(Config.width/2-attribution.length/2, Config.height/2 - 8, attribution, colorLightGray, colorBlack));

  const instructions = "Press enter to start or h for instructions."
  m.addText(new Text(Config.width/2-instructions.length/2, Config.height/2, instructions, colorWhite, colorBlack));

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
  m.addText(new Text(Config.width/2 - text.length/2, y + 2, text, colorWhite, colorBlack));

  return m;
}

export function inventoryMenu(map: GameMap, player: Actor): Menu {
  const inventory = player.inventory;
  const size = inventory.items.length;
  let m: Menu;

  if (size === 0) {
    const x = Config.width/4;
    const y = 5;
    m = new Menu(x, y, Config.width/2, y, "Inventory", true, true, true, () => {
      if (InputManager.isKeyDown(Key.I, Key.ESCAPE)) {
        InputManager.clear();
        m.shouldExit = true;
      }
    });

    m.addText(new Text(x+12, y+y/2, 'Inventory empty.', colorWhite, colorBlack));
  } else {
    const x = Config.width/4;
    const y = 5;
    
    m = new Menu(x, y, Config.width/2, 3+size*3, "Inventory", true, true, false, () => {
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