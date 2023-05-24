import { Game } from "./game/game";
import { ClingoSolver } from "./utility/clingoSolver";

document.body.onload = () => {
  ClingoSolver.init().then(() => {
    let game = new Game();
    game.start();
  });
};
