import { Action } from "../action/action";
import { BumpAction } from "../action/bumpAction";
import { PassAction } from "../action/passAction";
import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { colorConfusionScroll } from "../utility/colors";
import { Point } from "../utility/point";
import { choice } from "../utility/random";
import { Behavior } from "./behavior";


export class ConfusionBehavior implements Behavior {
  private previousBehavior: Behavior
  private previousBGColor: string
  private duration: number;
  
  constructor(actor: Actor, duration: number) {
    this.previousBehavior = actor.behavior;
    this.previousBGColor = actor.bg;
    
    this.duration = duration;

    actor.behavior = this;
    actor.bg = colorConfusionScroll;
  }

  act(actor: Actor, map: GameMap): [Action, boolean] {
    if (this.duration <= 0) {
      actor.behavior = this.previousBehavior;
      actor.bg = this.previousBGColor;
      return actor.behavior.act(actor, map);
    }

    this.duration--;
    const actions: [Action, boolean][] = [
      [new BumpAction(new Point(0,1)), false],
      [new BumpAction(new Point(0,-1)), false],
      [new BumpAction(new Point(1,0)), false],
      [new BumpAction(new Point(-1,0)), false],
      [new PassAction(), false],
    ]

    return choice(actions);
  }
} 