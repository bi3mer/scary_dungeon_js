import { Action } from "../action/action";
import { PassAction } from "../action/passAction";
import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { colorStunScroll } from "../utility/colors";
import { MessageLog } from "../utility/messageLog";
import { Behavior } from "./behavior";


export class StunBehavior implements Behavior {
  private previousBehavior: Behavior
  private previousForegroundColor: string
  private stunDuration: number;
  
  constructor(actor: Actor, stunDuration: number) {
    this.previousBehavior = actor.behavior;
    this.previousForegroundColor = actor.bg;
    
    this.stunDuration = stunDuration;
  }

  act(actor: Actor, map: GameMap): [Action, boolean] {
    if (this.stunDuration <= 0) {
      MessageLog.addMessage(`${actor.name} is no longer stunned!`, colorStunScroll, false);
      actor.behavior = this.previousBehavior;
      actor.bg = this.previousForegroundColor;
      return actor.behavior.act(actor, map);
    }

    this.stunDuration--;
    MessageLog.addMessage(`${actor.name} is stunned for ${this.stunDuration} more turns.`, colorStunScroll, false);
    return [new PassAction(), false];
  }

} 