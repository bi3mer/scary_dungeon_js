import { GameMap } from "../game/gameMap";
import { Point } from "./point";

const MOVES = [
  new Point(1, 0),
  new Point(0, 1),
  new Point(0, -1),
  new Point(-1, 0),
];

const MOVES_LENGTH = MOVES.length;

class Seen {
  private values: Point[] = []

  add(p: Point) {
    this.values.push(p);
  }

  has(p: Point): boolean {
    const size = this.values.length;
    for (let i = 0; i < size; ++i) {
      if (this.values[i].equals(p)) {
        return true;
      }
    }

    return false;
  }
}

// TODO: should use A*
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

    let m: Point;
    for (let i = 0; i < MOVES_LENGTH; ++i) {
      m = MOVES[i];
      let newPos = point.add(m);
      if (newPos.equals(target)) {
        moves.push(m);
        return moves;
      }

      if (map.isWalkablePoint(newPos)) {
        let newMoves = [...moves]; // I can get away with a shallow copy
        newMoves.push(m);
        frontier.push([newPos, newMoves]);
      }
    }
  }

  return [];
}
