import { Actor } from "./actor";
import { GameMap } from "../game/gameMap";
import colors from "../utility/colors";
import { AIBehavior } from "../behavior/aiBehavior";

export function spawnPlayer(map: GameMap, x: number, y: number): Actor {
  map.player().x = x;
  map.player().y = y;

  return map.player();
}

export function spawnEnemy(map: GameMap, x: number, y: number): Actor {
  let enemy = new Actor();
  enemy.x = x;
  enemy.y = y;
  enemy.char = 'E';
  enemy.fg = colors.enemy
  enemy.behavior = new AIBehavior(x, y);

  map.addActor(enemy);

  return enemy;
}