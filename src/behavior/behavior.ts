import { Action } from "../action/action";
import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";

export abstract class Behavior {
  // return an action and a boolean if the behavior wants to block execution
  // for another turn
  abstract act(actor: Actor, map: GameMap): [Action, boolean];
}