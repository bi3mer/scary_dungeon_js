import { Action } from "../action/action";
import { MoveAction } from "../action/moveAction";
import { PassAction } from "../action/passAction";
import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { euclideanDistance } from "../utility/distance";
import { Behavior } from "./behavior";

export class AIBehavior implements Behavior {
  startX: number
  startY: number
  constructor(x: number, y: number) {
    this.startX = x;
    this.startY = y;
  }

  act(actor: Actor, map: GameMap): [Action, boolean] {
    // Get target based on distances
    let targetX: number, targetY: number;
    if (
      actor.euclideanDistance(this.startX, this.startY) <= 3 &&
      actor.euclideanDistance(map.player().x, map.player().y) <= 3
    ) {
      targetX = map.player().x;
      targetY = map.player().y;
    } else {
      targetX = this.startX;
      targetY = this.startY;
    }
    
    // get moves towards the target
    const moves = this.getMoves(actor.x, actor.y, targetX, targetY);

    // if their are no moves, do nothing
    if (moves.length == 0) {
      return [new PassAction(), false];
    }

    // ... else, find the move that is closest to the target
    let closestVal = 10000;
    let closestIndex = -1;
    for (let i = 0; i < moves.length; ++i) {
      const newX = actor.x + moves[i][0];
      const newY = actor.y + moves[i][1];
      const dist = euclideanDistance(newX, newY, targetX, targetY);

      if (dist < closestVal) {
        closestVal = dist;
        closestIndex = i;
      }
    }

    return [new MoveAction(moves[closestIndex][0], moves[closestIndex][1]), false];
  }

  private getMoves(x1: number, y1: number, x2: number, y2: number): [number, number][] {
    let moves: [number, number][] = [];
    const diffX = x1 - x2;
    const diffY = y1 - y2;

    if (diffX == 0 && diffY == 0) {
      return moves;
    }

    if (Math.abs(diffY) > Math.abs(diffX)) {
      if (diffY > 0)      moves.push([0, -1]);
      else if (diffY < 0) moves.push([0, 1]);
      if (diffX > 0)      moves.push([-1, 0]);
      else if (diffX < 0) moves.push([1, 0]);
    } else if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0)      moves.push([-1, 0]);
      else if (diffX < 0) moves.push([1, 0]);
      if (diffY > 0)      moves.push([0, -1]);
      else if (diffY < 0) moves.push([0, 1]);
    } else if ((diffX + diffY) % 2 == 0) {
      if (diffY > 0)      moves.push([0, -1]);
      else if (diffY < 0) moves.push([0, 1]);
      if (diffX > 0)      moves.push([-1, 0]);
      else if (diffX < 0) moves.push([1, 0]);
    } else {
      if (diffX > 0)      moves.push([-1, 0]);
      else if (diffX < 0) moves.push([1, 0]);
      if (diffY > 0)      moves.push([0, -1]);
      else if (diffY < 0) moves.push([0, 1]);
    }

    return moves;
  }
} 