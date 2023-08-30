import { Actor } from "./actor";
import { GameMap } from "../game/gameMap";
import { AIBehavior } from "../behavior/aiBehavior";
import { colorBlack, colorConfusionScroll, colorDarkGray, colorEnemy, colorPotion as colorPotion, colorLightningScroll, colorRed, colorStunScroll, colorTransparent, colorViolet,  colorWhite } from "../utility/colors";
import { Item } from "./item";
import { RenderOrder } from "../utility/renderOrder";
import { Entity } from "./entity";
import { EmptyBehavior } from "../behavior/emptyBehavior";
import { nameAltar, nameConfusionScroll, nameEnemy, namePotion, nameLightningScroll, nameReturnToAltarScroll, nameStunScroll } from "./names";
import { Point } from "../utility/point";
import { MessageLog } from "../utility/messageLog";
import { LightningAction } from "../action/lightningAction";
import { ReturnToAltarAction } from "../action/returnToAltarAction";
import { StunAction } from "../action/stunAction";
import { ConfusionScrollAction } from "../action/confusionScrollAction";
import tileFactory from "../tile/tileFactory";

// ------------ Entities ------------
export function spawnCorpse(map: GameMap, pos: Point, name: string): Entity {
  const corpse = new Entity(
    pos,
    name,
    false,
    '%',
    colorRed,
    colorTransparent,
    RenderOrder.Corpse
  );

  map.addEntity(corpse);

  return corpse;
}

// ------------ Actors ------------
export function spawnPlayer(map: GameMap, pos: Point): Actor {
  map.player().pos = pos;
  map.player().id = 0;

  return map.player();
}

export function spawnEnemy(map: GameMap, pos: Point): Actor {
  let enemy = new Actor(pos);
  enemy.name = nameEnemy;
  enemy.char = 'E';
  enemy.fg = colorEnemy;
  enemy.bg = colorTransparent;
  enemy.behavior = new AIBehavior(pos);

  map.addActor(enemy);

  return enemy;
}

export function spawnAltar(map: GameMap, pos: Point): Actor {
  map.altar().char = 'a';
  map.altar().pos = pos;
  map.altar().fg = colorDarkGray;
  map.altar().bg = colorTransparent;
  map.altar().behavior = new EmptyBehavior();

  const gargoylePosition = pos.copy();
  gargoylePosition.y--;
  map.setTile(gargoylePosition, tileFactory.altarWall);

  return map.altar();
}

// ------------ Items ------------
export function spawnPotion(map: GameMap, pos: Point): Item {
  let portion = new Item(
    pos,
    namePotion,
    false,
    's',
    colorPotion,
    colorTransparent,
    RenderOrder.Item,
    (map, actor) => {
      MessageLog.addMessage(`The potion is scary.`, colorPotion, true);
      return false;
    }
  );

  map.addItem(portion);

  return portion;
}

export function spawnLightningScroll(map: GameMap, pos: Point): Item {
  let scroll = new Item(
    pos,
    nameLightningScroll,
    false,
    's',
    colorLightningScroll,
    colorTransparent,
    RenderOrder.Item,
    (map, actor) => {
      return (new LightningAction()).execute(actor, map);
    }
  );

  map.addItem(scroll);

  return scroll;
}

export function spawnReturnToAltarScroll(map: GameMap, pos: Point): Item {
  let scroll = new Item(
    pos,
    nameReturnToAltarScroll,
    false,
    's',
    colorViolet,
    colorBlack,
    RenderOrder.Item,
    (map, actor) => {
      return (new ReturnToAltarAction()).execute(actor, map);
    }
  );

  map.addItem(scroll);
  return scroll;
}

export function spawnStunScroll(map: GameMap, pos: Point): Item {
  let scroll = new Item(
    pos,
    nameStunScroll,
    false,
    's',
    colorStunScroll,
    colorTransparent,
    RenderOrder.Item,
    (map, actor) => {
      return (new StunAction()).execute(actor, map);
    }
  );

  map.addItem(scroll);
  return scroll;
}
export function spawnConfusionScroll(map: GameMap, pos: Point): Item {
  let scroll = new Item(
    pos,
    nameConfusionScroll,
    false,
    's',
    colorConfusionScroll,
    colorTransparent,
    RenderOrder.Item,
    (map, actor) => {
      return (new ConfusionScrollAction()).execute(actor, map);
    }
  );

  map.addItem(scroll);
  return scroll;
}