import { Action } from "../action/action";
import { BumpAction } from "../action/bumpAction";
import { PassAction } from "../action/passAction";
import { Actor } from "../entity/actor";
import { GameMap } from "../game/gameMap";
import { euclideanDistance } from "../utility/distance";
import { bfs } from "../utility/pathfinding";
import { Point } from "../utility/point";
import { Behavior } from "./behavior";

export class AIBehavior implements Behavior {
  startPos: Point
  
  constructor(startPos: Point) {
    this.startPos = startPos.copy();
  }

  act(actor: Actor, map: GameMap): [Action, boolean] {
    // Get target based on distances
    if (
      actor.euclideanDistance(this.startPos) <= 3 &&
      actor.euclideanDistance(map.player().pos) <= 3
    ) {
      return this.moveTowardsPlayer(map.player().pos.x, map.player().pos.y, actor);
    } else if (!actor.pos.equals(this.startPos)) {
      return this.moveBackToStart(actor, map);
    }

    return [new PassAction(), false];
  }

  private moveTowardsPlayer(targetX: number, targetY: number, actor: Actor): [Action, boolean] {
    // get moves towards the target
    const moves = this.getMoves(actor.pos.x, actor.pos.y, targetX, targetY);

    // if their are no moves, do nothing
    if (moves.length === 0) {
      return [new PassAction(), false];
    }

    // ... else, find the move that is closest to the target
    let closestVal = 10000;
    let closestIndex = -1;
    for (let i = 0; i < moves.length; ++i) {
      const newX = actor.pos.x + moves[i][0];
      const newY = actor.pos.y + moves[i][1];
      const dist = euclideanDistance(newX, newY, targetX, targetY);

      if (dist < closestVal) {
        closestVal = dist;
        closestIndex = i;
      }
    }

    return [new BumpAction(new Point(moves[closestIndex][0], moves[closestIndex][1])), false];
  }

  private moveBackToStart(actor: Actor, map: GameMap): [Action, boolean] {
    // const path = astar(actor.pos, this.startPos, map);
    const path = bfs(actor.pos, this.startPos, map);
    if (path.length === 0) {
      return [new PassAction(), false];
    }

    return [new BumpAction(path[0]), false];
  }

  private getMoves(x1: number, y1: number, x2: number, y2: number): [number, number][] {
    let moves: [number, number][] = [];
    const diffX = x1 - x2;
    const diffY = y1 - y2;

    if (diffX === 0 && diffY === 0) {
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