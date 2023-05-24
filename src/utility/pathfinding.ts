import { GameMap } from "../game/gameMap";
import { Point } from "./point";

const MOVES = [
  new Point(1,0),
  new Point(0,1),
  new Point(0,-1),
  new Point(-1,0),
];

class Seen {
  private values: Point[] = []

  add(p: Point) {
    this.values.push(p);
  }

  has(p: Point): boolean {
    for(let v of this.values) {
      if (v.equals(p)) {
        return true;
      }
    }

    return false;
  }
}

// NOTE: this is currently BFS
export function bfs(start: Point, target: Point, map: GameMap): Point[] {
  let frontier: [Point, Point[]][] = [[start, []]];
  let seen: Seen = new Seen();
  while (frontier.length > 0) {
    let [point, moves] = frontier.shift()!;
    if (seen.has(point)) {
      continue;
    } else {
      seen.add(point);
    }

    for (let m of MOVES) {
      let newPos = point.add(m);
      if (newPos.equals(target)) {
        moves.push(m);
        return moves;
      }

      if (map.isWalkable(newPos)) {
        let newMoves = [...moves]; // I can get away with a shallow copy
        newMoves.push(m);
        frontier.push([newPos, newMoves]);
      }
    }
  }

  return [];
}