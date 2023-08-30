import { Actor } from "../entity/actor";
import { namePotion, namePlayer } from "../entity/names";
import { GameMap } from "../game/gameMap";
import tileFactory from "../tile/tileFactory";
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
    const requiredPotionCount = map.requiredPotions();
    const playerPotionCount = actor.inventory.getCount(namePotion);

    const shouldRender = playerPotionCount == requiredPotionCount;
    if (shouldRender) {
      Sound.playUnlockAltar();
      map.altar().char = 'A';

      let pos = map.altar().pos.copy();
      pos.y--;

      map.setTile(pos, tileFactory.altarWallSolved);

      MessageLog.addMessage(
        'The fountain filled up!',
        colorGreen,
        false
      );

      MessageLog.addMessage(
        'In the distance, you hear a door open...',
        colorWhite,
        false
      );

      MessageLog.addErrorMessage('There is no door... Nothing opened up, step through the fountain', true);
      
      this.altar.fg = colorGreen;
      this.altar.bg = colorLightGray;

      actor.inventory.destroyItemsWithName(namePotion);
    } else {
      const left = requiredPotionCount - actor.inventory.getCount(namePotion);
      let m: string;

      if (left === 1) {
        m = `The fountain seems empty. It looks like it would take a potion more to fill it.`;
      } else {
        m = `The fountain seems empty. It looks like it would take ${left} potions to fill it.`; 
      }

      MessageLog.addMessage(m, colorLightGray, true);
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