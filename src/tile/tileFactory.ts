import colors from "../utility/colors";
import { Tile } from "./tile";

let tileFactory: {[name: string]: Tile} = {};

tileFactory.floor = new Tile(
  '.',
  true,
  colors.visible,
  colors.black,
  colors.darkGray,
  colors.black
)

tileFactory.wall = new Tile(
  '#',
  false,
  colors.visible,
  colors.black,
  colors.darkGray,
  colors.black
)

tileFactory.downStairs = new Tile(
  '>',
  false,
  colors.lightGray,
  colors.black,
  colors.darkGray,
  colors.black
)


export default tileFactory;