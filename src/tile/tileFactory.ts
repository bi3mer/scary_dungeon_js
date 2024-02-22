import { colorBlack, colorDarkGray, colorIndigo, colorLightGray, colorTransparent, colorViolet, colorVisible } from "../utility/colors";
import { Tile } from "./tile";

let tileFactory: { [name: string]: Tile } = {};

tileFactory.floor = new Tile(
  '.',
  true,
  false,
);

tileFactory.decoratedFloor1 = new Tile(
  ',',
  true,
  false,
);

tileFactory.decoratedFloor2 = new Tile(
  '1',
  true,
  false,
);

tileFactory.wall = new Tile(
  '#',
  false,
  true,
);

tileFactory.tombstone = new Tile(
  'T',
  false,
  true,
);

tileFactory.grave = new Tile(
  't',
  false,
  true,
);

tileFactory.anvil = new Tile(
  'X',
  false,
  true,
);

// ...
// X*X
// XXX
// * is where this wall should be placed
tileFactory.bottomMiddleWall = new Tile(
  '~',
  false,
  true,
);

// ...
// X*.
// XX.
// * is where this wall should be placed
tileFactory.bottomEastCornerWall = new Tile(
  '┐',
  false,
  true,
);


// ...
// .*X
// .XX
// * is where this wall should be placed
tileFactory.bottomWestCornerWall = new Tile(
  '┌',
  false,
  true,
);


// XX.
// X*.
// XX.
// * is where this wall should be placed
tileFactory.sideWestWall = new Tile(
  '|',
  false,
  true,
);

// .XX
// .*X
// .XX
// * is where this wall should be placed
tileFactory.sideEastWall = new Tile(
  'i',
  false,
  true,
);

// XX.
// X*.
// ...
// 
// * is where this wall should be placed
tileFactory.cornerSouthEastWall = new Tile(
  '┘',
  false,
  true,
);

// XX.
// X*.
// ...
// 
// * is where this wall should be placed
tileFactory.cornerSouthWestWall = new Tile(
  '└',
  false,
  true,
);

tileFactory.downStairs = new Tile(
  '>',
  false,
  false,
);

tileFactory.forwardSlash = new Tile(
  '/',
  false,
  true,
);

tileFactory.backwardSlash = new Tile(
  '\\',
  false,
  true,
);

tileFactory.altarWall = new Tile(
  'g',
  false,
  true,
);

tileFactory.altarWallSolved = new Tile(
  'G',
  false,
  true,
);

tileFactory.openedChest = new Tile(
  'c',
  false,
  false,
);


export default tileFactory;
