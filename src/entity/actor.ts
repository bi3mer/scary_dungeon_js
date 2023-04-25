import { Entity } from "./entity";
import { RenderOrder } from "../utility/renderOrder";
import { Behavior } from "../behavior/behavior";
import { GameMap } from "../game/gameMap";
import colors from "../utility/colors";
import { EmptyBehavior } from "../behavior/emptyBehavior";

export class Actor extends Entity {
  behavior: Behavior

  constructor(
    x: number = 0, 
    y: number = 0, 
    blocksMovement: boolean = false,
    char: string = "?", 
    fg: string = colors.white,
    bg: string = colors.black,
    renderOrder: RenderOrder = RenderOrder.Corpse,
    behavior: Behavior = new EmptyBehavior()
  ) {
    super(x, y, blocksMovement, char, fg, bg, renderOrder);
    this.behavior = behavior;
  }

  public act(map: GameMap): [boolean, boolean] {
    let [action, requestAnotherTurn] = this.behavior.act(this, map);
    let requestRender = false;
    if (action !== undefined) {
      requestRender = action.execute(this, map);
    }

    return [requestAnotherTurn, requestRender];
  }
}