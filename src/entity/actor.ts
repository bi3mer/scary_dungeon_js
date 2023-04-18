import { Entity } from "./entity";
import { RenderOrder } from "../utility/renderOrder";
import { Behavior } from "../behavior/behavior";
import { GameMap } from "../game/gameMap";
import { AIBehavior } from "../behavior/aiBehavior";

export class Actor extends Entity {
  behavior: Behavior

  constructor(
    x: number = 0, 
    y: number = 0, 
    blocksMovement: boolean = false,
    char: string = "?", 
    fg: [number, number, number] = [255, 255, 255],
    bg: [number, number, number] = [0, 0, 0],
    renderOrder: RenderOrder = RenderOrder.Corpse,
    behavior: Behavior = new AIBehavior()
  ) {
    super(x, y, blocksMovement, char, fg, bg, renderOrder);
    this.behavior = behavior;
  }

  public act(map: GameMap): boolean {
    let action = this.behavior.act(this, map);
    if (action !== undefined) {
      action.execute(this, map);
      return true;
    }

    return false;
  }

  public override spawn(x: number, y: number, map: GameMap): Actor {
    let clone = new Actor(
      x,
      y,
      this.blocksMovement,
      this.char,
      undefined, // fg set after the fact
      undefined, // bg set after the fact
      this.renderOrder,
      this.behavior
    );

    clone.fg = this.fg;
    clone.bg = this.bg;

    map.addEntity(clone);

    return clone;
  }
}