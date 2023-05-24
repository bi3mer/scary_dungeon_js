export class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  copy(): Point {
    return new Point(this.x, this.y);
  }

  add(other: Point): Point {
    return new Point(this.x + other.x, this.y + other.y);
  }

  addScalar(n: number): void {
    this.x += n;
    this.y += n;
  }

  subtract(other: Point): Point {
    return new Point(this.x - other.y, this.y - other.y);
  }

  subtractScalar(n: number): void {
    this.x -= n;
    this.y -= n;
  }
}