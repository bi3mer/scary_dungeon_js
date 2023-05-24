import { ClingoSolver } from "../utility/clingoSolver";

export class Progression {
  private static gems: number = -1;

  static getLayout(level: number, callback: (layout: [number, number, string][], ) => void): void {
    if (level === 1) {
      callback(this.tutorial());
      return;
    }

    if (this.gems === -1) {
      this.gems = level;
    }
    
    let w: number, h: number;
    if (this.gems % 4 === 0) {
      w = Math.floor(level*1.5);
      h = w;
    } else if (this.gems % 3 === 0) {
      w = Math.floor(level*1.5);
      h = level;
    } else {
      w = level;
      h = Math.floor(level*1.5);
    }

    ClingoSolver.get(level*2, level*2, this.gems).then((result) => {
      if (result[0]) {
        console.error(`Generation failed for level ${this.gems}, increase the map size.`);
        this.getLayout(level+1, callback);
      } else {
        // No error, use the layout to fill out the results.
        this.gems = -1;
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