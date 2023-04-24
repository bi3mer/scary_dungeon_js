import { Action } from "../action/action";
import { MoveAction } from "../action/moveAction";
import { PassAction } from "../action/passAction";
import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { InputManager, Key } from "../game/inputManager";
import { Behavior } from "./behavior";

export class PlayerBehavior implements Behavior {
  act(actor: Actor, map: GameMap): Action {
    if (InputManager.isKeyDown(Key.DOWN) || InputManager.isKeyDown(Key.S)) {
      return new MoveAction(0,1);
    }

    if (InputManager.isKeyDown(Key.UP) || InputManager.isKeyDown(Key.W)) {
      return new MoveAction(0,-1);
    }

    if (InputManager.isKeyDown(Key.LEFT) || InputManager.isKeyDown(Key.A)) {
      return new MoveAction(-1,0);
    }

    if (InputManager.isKeyDown(Key.RIGHT) || InputManager.isKeyDown(Key.D)) {
      return new MoveAction(1,0);
    }

    return new PassAction();
  }
}