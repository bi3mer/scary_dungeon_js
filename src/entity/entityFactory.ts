import { Actor } from "./actor";
import { GameMap } from "../game/gameMap";
import { AIBehavior } from "../behavior/aiBehavior";
import { colorBlack, colorDarkGray, colorEnemy, colorGem, colorVisible } from "../utility/colors";
import { Item } from "./item";
import { RenderOrder } from "../utility/renderOrder";
import { Entity } from "./entity";
import { EmptyBehavior } from "../behavior/emptyBehavior";
import { nameAltar, nameEnemy, nameGem } from "./names";

// ------------ Entities ------------


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
  enemy.name = nameEnemy;
  enemy.char = 'E';
  enemy.fg = colorEnemy;
  enemy.behavior = new AIBehavior(x, y);

  map.addActor(enemy);

  return enemy;
}

export function spawnAltar(map: GameMap, x: number, y: number): Entity {
  let altar = new Actor(
    x, 
    y,
    nameAltar,
    true,
    'A',
    colorDarkGray,
    colorVisible,
    RenderOrder.Item,
    new EmptyBehavior(),
    0
  );

  map.addActor(altar);

  return altar;
}

// ------------ Items ------------
export function spawnGem(map: GameMap, x: number, y: number): Item {
  let gem = new Item(
    x,
    y,
    nameGem,
    false,
    '*',
    colorGem,
    colorBlack,
    RenderOrder.Item,
    null
  );

  map.addItem(gem);

  return gem;
}