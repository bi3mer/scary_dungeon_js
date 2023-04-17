import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";

export abstract class Action {
  abstract execute(actor: Actor, map: GameMap): void;
}