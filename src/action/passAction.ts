import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { Action } from "./action";


export class PassAction implements Action {
  cost: number = 0;
  execute(actor: Actor, engine: GameMap): void {
    // nothing to be done this turn
  }
}