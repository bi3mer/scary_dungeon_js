import { Entity } from "./entity";
import { RenderOrder } from "../utility/renderOrder";
import { colorBlack, colorWhite } from "../utility/colors";
import { Point } from "../utility/point";
import { GameMap } from "../game/gameMap";
import { Actor } from "./actor";

export class Item extends Entity {
  id: number

  /**
   * Return true if item should be destroyed.
   */
  onConsume: (map: GameMap, actor: Actor) => boolean
  
  constructor(
    pos: Point, 
    name: string = "Unknown Item",
    blocksMovement: boolean = false,
    char: string = "?", 
    fg: string = colorWhite,
    bg: string = colorBlack,
    renderOrder: RenderOrder = RenderOrder.Corpse,
    onConsume: (map: GameMap, actor: Actor) => boolean,
    id: number=-1,
  ) {
    super(pos, name, blocksMovement, char, fg, bg, renderOrder);

    this.id = id;
    this.onConsume = onConsume;
  }
}