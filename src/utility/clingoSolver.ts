import {run, init } from "clingo-wasm";
import { RNG } from "rot-js";

import { LP } from "../generation/layoutLP";

export class ClingoSolver {
  static async init() {
    // @ts-ignore
    await init('https://cdn.jsdelivr.net/npm/clingo-wasm@0.1.1/dist/clingo.wasm');

    // The above just works and is based on what is recommended on their GitHub.
    // I don't love it, but I don't see a way around it for now.
  }

  /**
   * Async function to call to clingo wasm to solve a problem to build a layout
   * with the parameters of width, height, and the number of potions that are in 
   * the layout.
   * 
   * @param width - width of the layout
   * @param height - height of the layout
   * @param potions - number of potions in the layout
   * @returns a promise to return a boolean for if an error occurred and an array
   * that of sprite types and the location on the grid if there was no error
   */
  static async get(width: number, height: number, potions: number): Promise<[boolean, [number, number, string][]]> {
    const asp = `#const width=${width}.\n#const height=${height}.\n#const gems=${potions}.\n${LP}`;
    let result = await run(asp, undefined, [`--seed=${RNG.getUniformInt(0,10000)}`, '--rand-freq=1']);
    const satisfiable = result.Result == "SATISFIABLE";

    if (satisfiable) {
      let sprites: [number, number, string][] = [];
      // @ts-ignore
      for (let solution of result.Call[0]['Witnesses'][0]['Value']) {
        solution = solution.substring(8);
        solution = solution.substring(0, solution.length-1);
        let split = solution.split(',');

        // the output is 1 indexed
        const x = parseInt(split[0])-1;
        const y = parseInt(split[1].substring(0, split[1].length-1))-1;
        
        sprites.push([x, y, split[2]]);
      }

      return [false, sprites];
    } else {
      console.error(result);
      return [true, []];
    }
  }
}