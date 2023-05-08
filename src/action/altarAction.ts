import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { MessageLog } from "../utility/messageLog";
import { Action } from "./action";

export class AltarAction extends Action {
  altar: Actor

  constructor(altar: Actor) {
    super();
    this.altar = altar;
  }
  
  execute(actor: Actor, map: GameMap): boolean {
    MessageLog.addErrorMessage('Altar Action not implemented', true);
    return false;
  }
}