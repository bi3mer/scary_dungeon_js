import { Action } from "../action/action";
import { MoveAction } from "../action/moveAction";
import { PassAction } from "../action/passAction";
import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { InputManager, Key } from "../game/inputManager";
import { Behavior } from "./behavior";

export class PlayerBehavior implements Behavior {
  turn: number = 1
  
  act(actor: Actor, map: GameMap): [Action, boolean] {
    let requestAnotherTurn = this.turn % 2 == 0;
    if (InputManager.isKeyDown(Key.DOWN) || InputManager.isKeyDown(Key.S)) {
      InputManager.clear();
      ++this.turn;
      
      return [new MoveAction(0,1), requestAnotherTurn];
    }

    if (InputManager.isKeyDown(Key.UP) || InputManager.isKeyDown(Key.W)) {
      InputManager.clear();
      ++this.turn;
      
      return [new MoveAction(0,-1), requestAnotherTurn];
    }

    if (InputManager.isKeyDown(Key.LEFT) || InputManager.isKeyDown(Key.A)) {
      InputManager.clear();
      ++this.turn;
      
      return [new MoveAction(-1,0), requestAnotherTurn];
    }

    if (InputManager.isKeyDown(Key.RIGHT) || InputManager.isKeyDown(Key.D)) {
      InputManager.clear();
      ++this.turn;

      return [new MoveAction(1,0), requestAnotherTurn];
    }

    return [new PassAction(), true];
  }
}