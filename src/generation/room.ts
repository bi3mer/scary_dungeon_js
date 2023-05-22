import { Point } from "../utility/point";

export class Room {
  x1: number
  y1: number
  x2: number
  y2: number

  constructor(x: number, y: number, width: number, height: number) {
    this.x1 = x;
    this.x2 = x + width;
    this.y1 = y;
    this.y2 = y + height;
  }

  center(): [x: number, y: number] {
    return [Math.round((this.x1 + this.x2)/2), Math.round((this.y1 + this.y2)/2)]
  }

  intersects(others: Room[]): boolean {
    for(let other of others) {
      if (
        this.x1-1 <= other.x2 && 
        this.x2+1 >= other.x1 && 
        this.y1-1 <= other.y2 &&
        this.y2+1 >= other.y1
      ) {
        return true;
      }
    }
    return false;
  }

  left(): Point {
    return new Point(this.x1-1, Math.floor((this.y1+this.y2)/2));
  }

  right(): Point {
    return new Point(this.x2-1, Math.floor((this.y1+this.y2)/2));
  }

  up(): Point {
    return new Point(Math.floor((this.x1 + this.x2)/2), this.y1-1)
  }

  down(): Point {
    return new Point(Math.floor((this.x1 + this.x2)/2), this.y2-1)
  }
}