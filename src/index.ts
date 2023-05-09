import { Game } from "./game/game";
import { ClingoSolver } from "./utility/clingoSolver";

document.body.onload = () => {
  ClingoSolver.init().then(() => {
    let game = new Game();
    game.start();

    ClingoSolver.get(8, 3).then((result) => {
      console.log(result[0]);
      console.log(result[1]);
    });
  })
}