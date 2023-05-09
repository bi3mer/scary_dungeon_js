import { Graph } from "../utility/graph";
import { LayoutGenerator } from "./layoutGenerator";

import { LP } from "./layoutLP";

export class ASPLayoutGenerator implements LayoutGenerator {
  generateLayout(width: number, gems: number): Graph {
    
    const asp = `#const width=${width}.}\n#const gems=${gems}.\n${LP}`;
    let g = new Graph();

    return g;
  }
}