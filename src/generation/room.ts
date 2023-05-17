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

  getConnectionPoint(other: Room): [x: number, y: number] {
    let x: number = 0;
    let y: number = 0;
    
    /**
     *     1
     *   ┌---┐ 
     * 2 │   │ 3
     *   └---┘
     *     4
     * 
     * There are 4 possible connection points and each if statement goes through
     * them one at a time for simplicity / clarity. This isn't the best way as
     * it naturally favors the ordering, but that can always be improved later.
     */


    if (this.y2 < other.y1) {
      x = Math.round((this.x1 + this.x2)/2);
      y = this.y1-1;
    } else if (this.x1 < other.x2) {
      x = this.x1-1;
      y = Math.round((this.y1 + this.y2)/2);
    } else if (this.x2 < other.x1) {
      x = this.x2 + 1;
      y =  Math.round((this.y1 + this.y2)/2);
    } else {
      x = Math.round((this.x1 + this.x2)/2);
      y = this.y2;
    }

    return [x, y];
  }
}