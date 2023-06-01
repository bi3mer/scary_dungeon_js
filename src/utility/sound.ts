export class Sound {
  private static sounds: HTMLAudioElement[] = []

  static init(): void {
    this.sounds.push(new Audio("assets/thunder.wav"));
    this.sounds.push(new Audio("assets/teleport_sound.wav"));
  }

  static playThunder(): void {
    this.sounds[0].currentTime = 0.15;
    this.sounds[0].play();
  }

  static playTeleport(): void {
    this.sounds[1].currentTime = 0.1;
    this.sounds[1].play();
  }
}