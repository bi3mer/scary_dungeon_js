import { Actor } from "./actor";
import { GameMap } from "../game/gameMap";
import { AIBehavior } from "../behavior/aiBehavior";
import { colorBlack, colorDarkGray, colorEnemy, colorGem, colorLightGray, colorLightningScroll, colorRed, colorViolet,  colorWhite } from "../utility/colors";
import { Item } from "./item";
import { RenderOrder } from "../utility/renderOrder";
import { Entity } from "./entity";
import { EmptyBehavior } from "../behavior/emptyBehavior";
import { nameAltar, nameEnemy, nameGem, nameLightningCorpse, nameLightningScroll, nameReturnToAltarScroll } from "./names";
import { Point } from "../utility/point";
import { MessageLog } from "../utility/messageLog";
import { LightningAnimation } from "../animation/lightningAnimation";
import { AnimationManager } from "../animation/animationManager";
import { ReturnToAltarAnimation } from "../animation/returnToAltarAnimation";

// ------------ Entities ------------
export function spawnCorpse(map: GameMap, pos: Point, name: string): Entity {
  const corpse = new Entity(
    pos,
    name,
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
  map.player().id = 0;

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
  map.altar().pos = pos;
  map.altar().fg = colorDarkGray;
  map.altar().bg = colorWhite;
  map.altar().behavior = new EmptyBehavior();

  return map.altar();
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
        return false; // do not consume the item
      }

      if (a.name === nameAltar) {
        let l = new LightningAnimation(a.pos, map.player().pos, () => {
          MessageLog.addMessage(
            `The lightning struck the altar! But, it didn't do anything. Maybe find the gems.`,
            colorLightGray,
            true);
        });
        console.log(a);
        AnimationManager.setAnimation(l);
        return true; // Consume the item
      }

      if (map.positionVisible(a.pos)){
        let l = new LightningAnimation(a.pos, map.player().pos, () => {
          MessageLog.addMessage(`${a.name} was slain by lightning!`, colorLightningScroll, false);
          map.removeActor(a);
          spawnCorpse(map, a.pos, nameLightningCorpse);
        });
  
        AnimationManager.setAnimation(l);
        return true; // consume the item
      } 

      MessageLog.addMessage(`You don't see anything to strike with your ${nameLightningScroll}.`, colorLightGray, true);
      return false; // do not consume the item
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
      MessageLog.addMessage('You activate the scroll...', colorViolet, false);
      const animation = new ReturnToAltarAnimation(() => {
        actor.pos = map.altar().pos.copy();
        ++actor.pos.x;
      }, () => {
        MessageLog.addMessage('You teleported back to the altar!', colorViolet, false);
      });

      AnimationManager.setAnimation(animation);
      return true;
    }
  );

  map.addItem(scroll);
  return scroll;
}