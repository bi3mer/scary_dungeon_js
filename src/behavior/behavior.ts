import { Action } from "../action/action";
import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";

export abstract class Behavior {
  abstract act(actor: Actor, map: GameMap): Action|undefined;
}