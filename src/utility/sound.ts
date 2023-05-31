export class Sound {
  private static sounds: HTMLAudioElement[] = []

  static init(): void {
    this.sounds.push(new Audio("assets/thunder.wav"));
  }

  static playThunder(): void {
    this.sounds[0].currentTime = 0.15;
    this.sounds[0].play();
  }
}