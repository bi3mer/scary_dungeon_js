import { Game } from "./game/game";
import { InputManager } from "./game/inputManager";
import { ClingoSolver } from "./utility/clingoSolver";
import { colorWhite } from "./utility/colors";
import { MessageLog } from "./utility/messageLog";
import { Sound } from "./utility/sound";

document.body.onload = () => {
  MessageLog.addMessage('Loading...', colorWhite, true);

  Sound.init();
  InputManager.init();
  const tileSet = document.createElement("img");
  tileSet.src = "assets/tilemap-kenney_tiny-dungeon_32_32.png";

  ClingoSolver.init().then(() => {
    const loader = () => {
      if (Sound.isLoaded() && tileSet.complete) {
        MessageLog.clear();
        (new Game(tileSet)).start();
      } else {
        MessageLog.addMessage('Loading...', colorWhite, true);
        window.requestAnimationFrame(loader);
      }
    };

    window.requestAnimationFrame(loader);
  });
};
