import { colorBlack, colorDarkGray, colorIndigo, colorLightGray, colorViolet, colorVisible } from "../utility/colors";
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


export default tileFactory;