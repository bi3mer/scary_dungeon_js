import { EmptyBehavior } from "../behavior/emptyBehavior";
import { Actor } from "../entity/actor";
import { spawnCorpse } from "../entity/entityFactory";
import { nameEnemy, namePlayer } from "../entity/names";
import { GameMap } from "../game/gameMap";
import { colorBlack, colorLightGray, colorRed } from "../utility/colors";
import { MessageLog } from "../utility/messageLog";
import { Action } from "./action";

export class AttackAction extends Action {
  otherActor: Actor

  constructor(otherActor: Actor) {
    super();
    this.otherActor = otherActor;
  }

  private playerDeath(actor: Actor): void {
    actor.char = '%';
    actor.fg = colorRed;
    actor.bg = colorBlack;
    actor.behavior = new EmptyBehavior();

    MessageLog.addMessage(
      `A scary enemy killed you!`, 
      colorRed, 
      false
    );
  }
  
  execute(actor: Actor, map: GameMap): boolean {
    if (actor.name == namePlayer) {
      this.playerDeath(actor);
    } else if (this.otherActor.name == namePlayer) {
      this.playerDeath(this.otherActor);
    } else {
      map.removeActor(actor);
      spawnCorpse(map, actor.x, actor.y);
      MessageLog.addMessage('A scary enemy killed its comrade!', colorLightGray, false);
    }

    return true;
  }
}