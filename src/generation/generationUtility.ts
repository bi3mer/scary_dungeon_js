// Based on: http://www.roguebasin.com/index.php/Bresenham%27s_Line_Algorithm
export function bresenham(
  x1: number, 
  y1: number, 
  x2: number, 
  y2: number, 
  callback: (x: number, y: number) => void)
: void {
  let temp: number;
  let dx = x2-x1;
  let dy = y2-y1;

  // rotate if the line is more y than x (steep)
  const isSteep = Math.abs(dy) > Math.abs(dx);
  if (isSteep) {
    temp = x1;
    x1 = y1;
    y1 = temp;

    temp = x2;
    x2 = y2;
    y2 = temp;
  }

  // rearrange so x1 < x2 by swapping points
  let swapped = x1 > x2;
  if (swapped) {
    temp = x1;
    x1 = x2;
    x2 = temp;

    temp = y1;
    y1 = y2;
    y2 = temp;
  }

  // recalculate the differences
  dy = y2-y1;
  dx = x2-x1;

  // calculate the error
  let error = Math.round(dx / 2.0);
  const yStep = y1 < y2 ? 1 : -1;

  // Iterate over bounding box generating points between start and end
  // and use callback to pass the line. NOTE: this doesn't work correctly
  // if the order matters because `swapped` indicates that the order 
  // should be reversed for the correct ordering between the points.
  let y = y1;
  for (let x = x1; x < x2; ++x) {
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