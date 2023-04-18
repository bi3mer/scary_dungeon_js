import { Action } from "../action/action";
import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { Behavior } from "./behavior";

export class AIBehavior implements Behavior {
  act(actor: Actor, map: GameMap): Action | undefined {
    throw new Error("Method not implemented.");
  }
}