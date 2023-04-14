import { Tile } from "./tile";

let tileFactory: {[name: string]: Tile} = {};

tileFactory.floor = new Tile(
  ' ',
  true,
  [100, 100, 100, 1],
  [0, 0, 0, 1],
  [200, 200, 200, 1],
  [0, 0, 0, 1]
)

tileFactory.wall = new Tile(
  '#',
  false,
  [100, 100, 100, 1],
  [0, 0, 0, 1],
  [200, 200, 200, 1],
  [0, 0, 0, 1]
)

tileFactory.downStairs = new Tile(
  '>',
  false,
  [100, 100, 100, 1],
  [0, 0, 0, 1],
  [200, 200, 200, 1],
  [0, 0, 0, 1]
)


export default tileFactory;