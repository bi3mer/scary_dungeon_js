import { ClingoSolver } from "../utility/clingoSolver";

export class Progression {
  private static potions: number = -1;

  static getLayout(level: number, callback: (layout: [number, number, string][], ) => void): void {
    if (level === 1) {
      callback(Progression.tutorial());
      return;
    }

    if (this.potions === -1) {
      this.potions = level;
    }
    
    let w: number, h: number;
    const r = Math.random();
    if (r <= 0.45) {
      w = level*3;
      h = level*2;
    } else if (r <= 0.9){
      w = level*2;
      h = level*3;
    } else {
      w = level*3;
      h = level*3;
    }

    // console.log(w, h, this.potions);
    // callback(Progression.tutorial());
    // return;

    ClingoSolver.get(w, h, this.potions).then((result) => {
      if (result[0]) {
        console.error(`Generation failed for level ${this.potions}, increase the map size.`);
        // this.getLayout(level+1, callback);
        callback(this.tutorial());
      } else {
        // No error, use the layout to fill out the results.
        this.potions = -1;
        callback(result[1]);
      }
    });
  }

  private static tutorial(): [number, number, string][] {
    const layout: [number, number, string][] = [
      [1,1,'altar'],
      [1,2,'gem'],
      [1,0,'room'],
      [2,1,'room'],
      [0,1,'room'],
    ];

    return layout;
  }
}