import { Action } from "../action/action";
import { PassAction } from "../action/passAction";
import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { colorStunScroll } from "../utility/colors";
import { Behavior } from "./behavior";


export class StunBehavior implements Behavior {
  private previousBehavior: Behavior
  private previousBGColor: string
  private stunDuration: number;
  
  constructor(actor: Actor, stunDuration: number) {
    this.previousBehavior = actor.behavior;
    this.previousBGColor = actor.bg;
    
    this.stunDuration = stunDuration;

    actor.behavior = this;
    actor.bg = colorStunScroll;
  }

  act(actor: Actor, map: GameMap): [Action, boolean] {
    if (this.stunDuration <= 0) {
      actor.behavior = this.previousBehavior;
      actor.bg = this.previousBGColor;
      return actor.behavior.act(actor, map);
    }

    this.stunDuration--;
    return [new PassAction(), false];
  }

} 