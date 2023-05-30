import { Actor } from "./actor";
import { GameMap } from "../game/gameMap";
import { AIBehavior } from "../behavior/aiBehavior";
import { colorBlack, colorDarkGray, colorEnemy, colorGem, colorLightGray, colorLightningScroll, colorRed, colorVisible } from "../utility/colors";
import { Item } from "./item";
import { RenderOrder } from "../utility/renderOrder";
import { Entity } from "./entity";
import { EmptyBehavior } from "../behavior/emptyBehavior";
import { nameAltar, nameEnemy, nameGem, nameLightningScroll } from "./names";
import { Point } from "../utility/point";
import { MessageLog } from "../utility/messageLog";

// ------------ Entities ------------
export function spawnCorpse(map: GameMap, pos: Point): Entity {
  const corpse = new Entity(
    pos,
    'Corpse',
    false,
    '%',
    colorRed,
    colorBlack,
    RenderOrder.Corpse
  );

  map.addEntity(corpse);

  return corpse;
}

// ------------ Actors ------------
export function spawnPlayer(map: GameMap, pos: Point): Actor {
  map.player().pos = pos;

  return map.player();
}

export function spawnEnemy(map: GameMap, pos: Point): Actor {
  let enemy = new Actor(pos);
  enemy.name = nameEnemy;
  enemy.char = 'E';
  enemy.fg = colorEnemy;
  enemy.behavior = new AIBehavior(pos);

  map.addActor(enemy);

  return enemy;
}

export function spawnAltar(map: GameMap, pos: Point): Actor {
  let altar = new Actor(
    pos,
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
export function spawnGem(map: GameMap, pos: Point): Item {
  let gem = new Item(
    pos,
    nameGem,
    false,
    '*',
    colorGem,
    colorBlack,
    RenderOrder.Item,
    (map, actor) => {
      MessageLog.addMessage(`The gem is scary.`, colorGem, true);
      return false;
    }
  );

  map.addItem(gem);

  return gem;
}

export function spawnLightningScroll(map: GameMap, pos: Point): Item {
  let scroll = new Item(
    pos,
    nameLightningScroll,
    false,
    's',
    colorLightningScroll,
    colorBlack,
    RenderOrder.Item,
    (map, actor) => {
      const a = map.nearestActor(actor.pos);
      if (a === null) {
        MessageLog.addMessage(`You don't see anything to strike with your ${nameLightningScroll}.`, colorLightGray, true);
        return false;
      }

      if (map.positionVisible(a.pos)){
        MessageLog.addMessage(`The ${a.name} was slain by lightning!`, colorLightningScroll, false);
        map.removeActor(a);
        return true; // consume the item
      } 

      MessageLog.addMessage(`You don't see anything to strike with your ${nameLightningScroll}.`, colorLightGray, true);
      return false;
    }
  );

  map.addItem(scroll);

  return scroll;
}