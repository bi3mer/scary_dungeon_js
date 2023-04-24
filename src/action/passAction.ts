import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { Action } from "./action";


export class PassAction implements Action {
  execute(actor: Actor, engine: GameMap): boolean {
    // nothing to be done this turn
    return false;
  }
}