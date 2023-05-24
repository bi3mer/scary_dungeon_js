import { Actor } from "../entity/actor";
import { nameAltar } from "../entity/names";
import { GameMap } from "../game/gameMap";
import { Point } from "../utility/point";
import { AltarAction } from "./altarAction";
import { AttackAction } from "./attackAction";
import { DirectionAction } from "./directionAction"
import { MoveAction } from "./moveAction";

export class BumpAction extends DirectionAction {
  constructor(dPos: Point) {
    super(dPos);
  }
  
  execute(actor: Actor, map: GameMap): boolean {
    let pos= this.destination(actor);
    const actorAtLocation = map.actorAtLocation(pos);
    
    if (actorAtLocation != null) {
      if (actorAtLocation.name === nameAltar) {
      return (new AltarAction(actorAtLocation)).execute(actor, map);
      } else {
      return (new AttackAction(actorAtLocation).execute(actor, map));
      }
    } else {
      return (new MoveAction(new Point(this.dPos.x, this.dPos.y))).execute(actor, map);
    }
  }
}