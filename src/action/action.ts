import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";

export abstract class Action {
  /**
   * Execute an action
   * @param actor 
   * @param map 
   * @returns true if the result of this action requires a re-render of the game
  // map else false and no re render will occur
   */
  abstract execute(actor: Actor, map: GameMap): boolean;
}