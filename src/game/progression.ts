import { ClingoSolver } from "../utility/clingoSolver";

export class Progression {
  static getLayout(level: number, callback: (layout: [number, number, string][]) => void): void {
    if (level === 1) {
      callback(this.tutorial());
      return;
    }

    ClingoSolver.get(Math.ceil(level*1.5)+3, Math.floor(level*1.5)+3, 1).then((result) => {
      if (result[0]) {
        // Error, generation failed, increase the map size.
        this.getLayout(level+1, callback);
      } else {
        // No error, use the layout to fill out the results.
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