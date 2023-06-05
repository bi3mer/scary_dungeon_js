export class Sound {
  private static sounds: HTMLAudioElement[] = []

  static init(): void {
    this.sounds.push(new Audio("assets/thunder.wav"));
    this.sounds.push(new Audio("assets/teleport_sound.mp3"));
    this.sounds.push(new Audio("assets/game_start.wav"));
    this.sounds.push(new Audio("assets/unlock_altar.wav"));
    this.sounds.push(new Audio("assets/enemyKillEnemySound.wav"));
    this.sounds.push(new Audio("assets/stun_sound.wav"));
    this.sounds.push(new Audio("assets/confusion_sound.wav"));
  }

  static isLoaded(): boolean {
    for(let sound of this.sounds) {
      if (!sound.readyState) {
        return false;
      }
    }
    
    return true;
  }

  static playThunder(): void {
    this.sounds[0].currentTime = 0.15;
    this.sounds[0].play();
  }

  static playTeleport(): void {
    this.sounds[1].currentTime = 0.2;
    this.sounds[1].play();
  }

  static playGameStart(): void {
    this.sounds[2].currentTime = 0.1;
    this.sounds[2].play();
  }
  
  static playUnlockAltar(): void {
    this.sounds[3].currentTime = 0.05;
    this.sounds[3].play();
  }

  static playEnemyKillEnemy(): void {
    this.sounds[4].currentTime = 0.1;
    this.sounds[4].play();
  }

  static playStun(): void {
    this.sounds[5].currentTime = 0.05;
    this.sounds[5].play();
  }

  static playConfusion(): void {
    this.sounds[6].currentTime = 0.05;
    this.sounds[6].play();
  }
}