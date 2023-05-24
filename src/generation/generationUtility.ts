import { RNG } from "rot-js";
import { Point } from "../utility/point";

// Based on: http://www.roguebasin.com/index.php/Bresenham%27s_Line_Algorithm
export function bresenham(p1: Point, p2: Point, callback: (x: number, y: number) => void)
: void {
  let temp: number;
  let dx = p2.x-p1.x;
  let dy = p2.y-p1.y;

  // rotate if the line is more y than x (steep)
  const isSteep = Math.abs(dy) > Math.abs(dx);
  if (isSteep) {
    temp = p1.x;
    p1.x = p1.y;
    p1.y = temp;

    temp = p2.x;
    p2.x = p2.y;
    p2.y = temp;
  }

  // rearrange so p1.x < p2.x by swapping points
  let swapped = p1.x > p2.x;
  if (swapped) {
    temp = p1.x;
    p1.x = p2.x;
    p2.x = temp;

    temp = p1.y;
    p1.y = p2.y;
    p2.y = temp;
  }

  // recalculate the differences
  dy = p2.y-p1.y;
  dx = p2.x-p1.x;

  // calculate the error
  let error = Math.round(dx / 2.0);
  const yStep = p1.y < p2.y ? 1 : -1;

  // Iterate over bounding box generating points between start and end
  // and use callback to pass the line. NOTE: this doesn't work correctly
  // if the order matters because `swapped` indicates that the order 
  // should be reversed for the correct ordering between the points.
  let y = p1.y;
  for (let x = p1.x; x < p2.x; ++x) {
    if (isSteep) {
      callback(y, x);
    } else {
      callback(x, y);
    }

    error -= Math.abs(dy);
    if (error < 0) {
      y += yStep;
      error += dx;
      
      if (isSteep) {
        callback(y, x);
      } else {
        callback(x, y);
      }
    }
  }
}