import { Actor } from "./actor";
import { GameMap } from "../game/gameMap";
import { AIBehavior } from "../behavior/aiBehavior";
import { colorBlack, colorEnemy, colorGem, colorWhite } from "../utility/colors";
import { Item } from "./item";
import { RenderOrder } from "../utility/renderOrder";

// ------------ Actors ------------
export function spawnPlayer(map: GameMap, x: number, y: number): Actor {
  map.player().x = x;
  map.player().y = y;

  return map.player();
}

export function spawnEnemy(map: GameMap, x: number, y: number): Actor {
  let enemy = new Actor();
  enemy.x = x;
  enemy.y = y;
  enemy.name = "Scary Enemy";
  enemy.char = 'E';
  enemy.fg = colorEnemy;
  enemy.behavior = new AIBehavior(x, y);

  map.addActor(enemy);

  return enemy;
}

// ------------ Items ------------
export function spawnGem(map: GameMap, x: number, y: number): Item {
  let gem = new Item(
    x,
    y,
    "Gem",
    false,
    '*',
    colorGem,
    colorBlack,
    RenderOrder.Item,
    null
  )

  map.addItem(gem);

  return gem;
}