import { Game } from "./game/game";

document.body.onload = () => {
  let game = new Game();
  game.start();
}