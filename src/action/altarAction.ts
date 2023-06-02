import { Actor } from "../entity/actor";
import { nameGem, namePlayer } from "../entity/names";
import { GameMap } from "../game/gameMap";
import { colorGreen, colorLightGray, colorWhite } from "../utility/colors";
import { MessageLog } from "../utility/messageLog";
import { Sound } from "../utility/sound";
import { Action } from "./action";

export class AltarAction extends Action {
  altar: Actor

  constructor(altar: Actor) {
    super();
    this.altar = altar;
  }
  
  private unlockAltar(actor: Actor, map: GameMap): boolean {
    const requiredGemCount = map.requiredGems();
    const playerGemCount = actor.inventory.getCount(nameGem);

    const shouldRender = playerGemCount == requiredGemCount;
    if (shouldRender) {
      Sound.playUnlockAltar();
      MessageLog.addMessage(
        'The altar has opened. Step through it... if you dare!',
        colorGreen,
        false
      );
      
      this.altar.fg = colorGreen;
      this.altar.bg = colorLightGray;

      actor.inventory.destroyItemsWithName(nameGem);
    } else {
      MessageLog.addMessage(
        `The altar needs ${requiredGemCount - actor.inventory.getCount(nameGem)} more gems to unlock.`, 
        colorLightGray, 
        true
      );
    }

    return shouldRender;
  }

  private stepThroughAltar(actor: Actor, map: GameMap): boolean {
    Sound.playGameStart();
    MessageLog.addMessage('You step into the next level of the prison...', colorWhite, false);
    map.markLevelComplete();
    return true;
  }

  execute(actor: Actor, map: GameMap): boolean {
    if (actor.name !== namePlayer) {
      return false;
    }
    
    if (this.altar.fg === colorGreen) {
      return this.stepThroughAltar(actor, map);
    } else {
      return this.unlockAltar(actor, map);
    }
  }
}