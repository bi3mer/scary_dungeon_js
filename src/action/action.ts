import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";

export abstract class Action {
  cost: number = 0;
  abstract execute(actor: Actor, map: GameMap): void;
}