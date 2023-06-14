import { colorBlack, colorDarkGray, colorIndigo, colorLightGray, colorTransparent, colorViolet, colorVisible } from "../utility/colors";
import { Tile } from "./tile";

let tileFactory: {[name: string]: Tile} = {};

tileFactory.floor = new Tile(
  '.',
  true,
  colorVisible,
  colorBlack,
  colorDarkGray,
  colorBlack
)

tileFactory.wall = new Tile(
  '#',
  false,
  colorVisible,
  colorBlack,
  colorDarkGray,
  colorBlack
)

tileFactory.tombstone = new Tile(
  'T',
  false,
  colorVisible,
  colorBlack,
  colorDarkGray,
  colorBlack
)

tileFactory.grave = new Tile(
  't',
  false,
  colorVisible,
  colorBlack,
  colorDarkGray,
  colorBlack
)

tileFactory.anvil = new Tile(
  'X',
  false,
  colorVisible,
  colorBlack,
  colorDarkGray,
  colorBlack
)

tileFactory.downStairs = new Tile(
  '>',
  false,
  colorLightGray,
  colorBlack,
  colorDarkGray,
  colorBlack
)

tileFactory.forwardSlash = new Tile(
  '/',
  false,
  colorViolet,
  colorBlack,
  colorIndigo,
  colorBlack
)


tileFactory.backwardSlash = new Tile(
  '\\',
  false,
  colorViolet,
  colorBlack,
  colorIndigo,
  colorBlack
)

tileFactory.altarWall = new Tile(
  'g',
  false,
  colorTransparent,
  colorTransparent,
  colorTransparent,
  colorTransparent
);

tileFactory.altarWallSolved = new Tile(
  'G',
  false,
  colorTransparent,
  colorTransparent,
  colorTransparent,
  colorTransparent
);


export default tileFactory;