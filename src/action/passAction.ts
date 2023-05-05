import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { Action } from "./action";


export class PassAction implements Action {
  /**
   * Do nothing.
   * @param actor 
   * @param engine 
   * @returns 
   */
  execute(actor: Actor, engine: GameMap): boolean {
    return false;
  }
}