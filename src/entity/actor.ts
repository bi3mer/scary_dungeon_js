import { Entity } from "./entity";
import { RenderOrder } from "../utility/renderOrder";
import { Behavior } from "../behavior/behavior";
import { GameMap } from "../game/gameMap";
import { EmptyBehavior } from "../behavior/emptyBehavior";
import { colorBlack, colorWhite } from "../utility/colors";
import { InventoryComponent } from "../component/inventoryComponent";
import { Point } from "../utility/point";

export class Actor extends Entity {
  behavior: Behavior
  inventory: InventoryComponent

  constructor(
    pos: Point,
    name: string = "Unknown Actor",
    blocksMovement: boolean = false,
    char: string = "?", 
    fg: string = colorWhite,
    bg: string = colorBlack,
    renderOrder: RenderOrder = RenderOrder.Corpse,
    behavior: Behavior = new EmptyBehavior(),
    inventorySize: number = 20,
  ) {
    super(pos, name, blocksMovement, char, fg, bg, renderOrder);
    this.behavior = behavior;

    this.inventory = new InventoryComponent(this, inventorySize);
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