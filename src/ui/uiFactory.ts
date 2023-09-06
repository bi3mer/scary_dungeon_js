import { config } from "process";
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
    Config.screenWidth/2, 
    Config.screenHeight - 5*Config.screenHeight/16, 
    Config.screenWidth * 0.03, 
    Config.screenHeight * 0.05, 
    "Ok", 
    colorLightGray, 
    colorWhite, 
    colorLightGray, 
    colorWhite,
    true,
    () => { }
  ));

  const startY = y+70
  m.addText(new Text(x+20, startY, "- WASD or arrow keys to move.", colorWhite, false, 15));
  m.addText(new Text(x+20, startY+15, "- E to interact.", colorWhite, false, 15));
  m.addText(new Text(x+20, startY+30, "- Q to open your inventory.", colorWhite, false, 15));

  m.addText(new Text(
    x+20, 
    startY+60, 
    "Your goal is to collect potions to get to the next level in\nthe prison.", 
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
  const x = Config.screenWidth*0.4;
  const y = Config.screenHeight/4;
  const w = Config.screenWidth*0.2;
  const h = Config.screenHeight/8;
  let m = new Menu(x, y, w, h, "GAME OVER", true, true, false, () => {
    if (InputManager.isKeyDown(Key.H, Key.ENTER, Key.ESCAPE)) {
      InputManager.clear();
      callback();
    }
  });


  m.addButton(new Button(
    x + w/2.5, 
    y + h/2, 
    Config.screenWidth * 0.03,  
    Config.screenHeight * 0.05, 
    "Ok", 
    colorLightGray, 
    colorWhite, 
    colorLightGray, 
    colorWhite,
    true, 
    callback
  ));
  
  return m;
}

export function inventoryMenu(map: GameMap, player: Actor): Menu {
  const inventory = player.inventory;
  const size = inventory.items.length;
  let m: Menu;

  const x = Config.screenWidth*0.1;
  const y = Config.screenHeight*0.02;
  const w = Config.screenWidth*0.3

  if (size === 0) {
    m = new Menu(x, y, w, Config.screenHeight*0.07, "Inventory Empty", true, true, true, () => {
      if (InputManager.isKeyDown(Key.Q, Key.ESCAPE)) {
        InputManager.clear();
        m.shouldExit = true;
      }
    });

  } else {
    const itemWidth = Config.screenWidth*0.26
    const itemHeight = Config.screenHeight*0.07;
    const paddingW = Config.screenWidth*0.02;
    const paddingH = Config.screenHeight*0.02;
    const h = Config.screenHeight * 0.08 + paddingH + (itemHeight + paddingH) * inventory.items.length;
    
    m = new Menu(x, y, w, h, "Inventory", true, true, false, () => {
      if (InputManager.isKeyDown(Key.Q, Key.ESCAPE)) {
        InputManager.clear();
        m.shouldExit = true;
      }
    });
    
    let curY = y + Config.screenHeight * 0.08;
    for (let item of inventory.items) {
      m.addButton(new Button(
        x + paddingW,
        curY,
        itemWidth,
        itemHeight,
        item.name,
        colorDarkGray,
        colorWhite,
        colorDarkGray,
        colorWhite, 
        true, 
        () => {
          if (item.onConsume(map, map.player())) {
            inventory.destroyItemWithID(item.id);
          }

          // close the inventory after use
          m.shouldExit = true;
        }
      ));

      curY += itemHeight + paddingH;
    }
  }

  return m;
}