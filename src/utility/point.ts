export class Point {
  x: number
  y: number

  /**
   * Construct a point with x and y coordinates
   * @param x - x coordinate
   * @param y - y coordinate
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Copy point
   * @returns a copy of the original point
   */
  copy(): Point {
    return new Point(this.x, this.y);
  }

  /**
   * Add two points together.
   * @param other - point to ad
   * @returns - new resulting point
   */
  add(other: Point): Point {
    return new Point(this.x + other.x, this.y + other.y);
  }

  /**
   * Add a scalar to this point
   * @param n - scalar to add
   */
  addScalar(n: number): void {
    this.x += n;
    this.y += n;
  }

  /**
   * Subtract two points
   * @param other - point to subtract 
   * @returns new point with (this - other).
   */
  subtract(other: Point): Point {
    return new Point(this.x - other.y, this.y - other.y);
  }

  /**
   * Subtract a scalar from this point (this.x - scalar, this.y -scalar)
   * @param n - scalar to subtract
   */
  subtractScalar(n: number): void {
    this.x -= n;
    this.y -= n;
  }

  /**
   * Test equality of two points.
   * @param other - point to compare to
   * @returns true if x and y coordinates are the same for both points.
   */
  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }

  /**
   * Compute the euclidean distance between two points
   * @param other - point to compare to
   * @returns distance
   */
  euclideanDistance(other: Point): number {
    return Math.sqrt(Math.pow(this.x-other.x, 2) + (Math.pow(this.y-other.y, 2)))
  }

  /**
   * Compute the manhattan distance between two points
   * @param other - point to compare to
   * @returns distance
   */
  manhattanDistance(other: Point): number {
    return Math.abs(this.x - other.x) + Math.abs(this.y-other.y);
  }
}