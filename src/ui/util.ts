import { Display } from "rot-js";

const topLeft = '┌';
const topRight = '┐';
const bottomLeft = '└';
const bottomRight = '┘';
const vertical = '│';
const horizontal = '─';
const leftTitle = '┤';
const rightTitle = '├';
const empty = ' ';

export function drawFrameWithTitle(display: CanvasRenderingContext2D, title: string, x: number, y: number, width: number, height: number) {
  // https://github.com/bodiddlie/js-rogue-tutorial/blob/main/src/render-functions.ts#L56
  const innerWidth = width - 2;
  const innerHeight = height - 2;
  const remainingAfterTitle = innerWidth - (title.length + 2); // adding two because of the borders on left and right
  const left = Math.floor(remainingAfterTitle / 2);

  const topRow =
    topLeft +
    horizontal.repeat(left) +
    leftTitle +
    title +
    rightTitle +
    horizontal.repeat(remainingAfterTitle - left) +
    topRight;
  const middleRow = vertical + empty.repeat(innerWidth) + vertical;
  const bottomRow = bottomLeft + horizontal.repeat(innerWidth) + bottomRight;

  // display.drawText(x, y, topRow);
  // for (let i = 1; i <= innerHeight; i++) {
  //   display.drawText(x, y + i, middleRow);
  // }

  // display.drawText(x, y + height - 1, bottomRow);
}

export function drawFrame(display: Display, x: number, y: number, width: number, height: number, frameColor: string, ) {
  // https://github.com/bodiddlie/js-rogue-tutorial/blob/main/src/render-functions.ts#L56
  const innerWidth = width - 2;
  const innerHeight = height - 2;

  const topRow = topLeft + horizontal.repeat(innerWidth) + topRight;
  const middleRow = vertical + empty.repeat(innerWidth) + vertical;
  const bottomRow = bottomLeft + horizontal.repeat(innerWidth) + bottomRight;

  display.drawText(x, y, `%c{${frameColor}}${topRow}`);
  for (let i = 1; i <= innerHeight; i++) {
    display.drawText(x, y + i, `%c{${frameColor}}${middleRow}`);
  }

  display.drawText(x, y + height - 1, `%c{${frameColor}}${bottomRow}`);
}