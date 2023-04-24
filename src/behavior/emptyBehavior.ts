import { Action } from "../action/action";
import { PassAction } from "../action/passAction";
import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { Behavior } from "./behavior";

export class EmptyBehavior implements Behavior {
  act(actor: Actor, map: GameMap): [Action, boolean]  {
    return [new PassAction(), false];
  }
}