import {run, init } from "clingo-wasm";
import { LP } from "../generation/layoutLP";

export class ClingoSolver {
  static async init() {
    // @ts-ignore
    await init('https://cdn.jsdelivr.net/npm/clingo-wasm@0.1.1/dist/clingo.wasm');

    // The above just works and is based on what is recommended on their GitHub.
    // I don't love it, but I don't see a way around it for now.
  }

  static async get(width: number, gems: number): Promise<[boolean, [number, number, string][]]> {
    const asp = `#const width=${width}.\n#const gems=${gems}.\n${LP}`;
    let result = await run(asp);
    const satisfiable = result.Result == "SATISFIABLE";

    if (satisfiable) {
      let sprites: [number, number, string][] = [];
      // @ts-ignore
      for (let solution of result.Call[0]['Witnesses'][0]['Value']) {
        solution = solution.substring(8);
        solution = solution.substring(0, solution.length-1);
        let split = solution.split(',');
        const x = parseInt(split[0]);
        const y = parseInt(split[1].substring(0, split[1].length-1));
        
        sprites.push([x, y, split[2]]);
      }

      return [true, sprites];
    } else {
      return [false, []];
    }
  }
}