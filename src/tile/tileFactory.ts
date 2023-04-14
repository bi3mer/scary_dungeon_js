import { Tile } from "./tile";

let tileFactory: {[name: string]: Tile} = {};

tileFactory.floor = new Tile(
  ' ',
  true,
  [100, 100, 100],
  [0, 0, 0],
  [200, 200, 200],
  [0, 0, 0]
)

tileFactory.wall = new Tile(
  '#',
  false,
  [100, 100, 100],
  [0, 0, 0],
  [200, 200, 200],
  [0, 0, 0]
)

tileFactory.downStairs = new Tile(
  '>',
  false,
  [100, 100, 100],
  [0, 0, 0],
  [200, 200, 200],
  [0, 0, 0]
)


export default tileFactory;