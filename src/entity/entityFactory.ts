import { Actor } from "./actor";
import { PlayerBehavior } from "../behavior/playerBehavior";
import { GameMap } from "../game/gameMap";
import colors from "../utility/colors";
import { AIBehavior } from "../behavior/aiBehavior";

export function spawnPlayer(map: GameMap, x: number, y: number): Actor {
  let player = new Actor();
  player.char = '@';
  player.x = x;
  player.y = y;
  player.fg = colors.white;
  player.bg = colors.black;
  player.behavior = new PlayerBehavior();

  map.player = player;

  return player;
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