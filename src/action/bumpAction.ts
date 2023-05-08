import { Actor } from "../entity/actor";
import { nameAltar } from "../entity/names";
import { GameMap } from "../game/gameMap";
import { AltarAction } from "./altarAction";
import { AttackAction } from "./attackAction";
import { DirectionAction } from "./directionAction"
import { MoveAction } from "./moveAction";

export class BumpAction extends DirectionAction {
  constructor(dx: number, dy: number) {
    super(dx, dy);
  }
  
  execute(actor: Actor, map: GameMap): boolean {
    let [x, y] = this.destination(actor);
    const actorAtLocation = map.actorAtLocation(x, y);
    
    if (actorAtLocation != null) {
      if (actorAtLocation.name == nameAltar) {
      return (new AltarAction(actorAtLocation)).execute(actor, map);
      } else {
      return (new AttackAction(actorAtLocation).execute(actor, map));
      }
    } else {
      return (new MoveAction(this.dx, this.dy)).execute(actor, map);
    }
  }
}