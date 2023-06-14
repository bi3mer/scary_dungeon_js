export class Config {
  // Effects game play
  static width: number = 35;
  static height: number = 20;
  static padding: number = 7;

  // lighting
  static sightRadius: number = 6;

  // These are set based on the above by the resize UI code in Game.ts
  static screenWidth: number = 800;
  static screenHeight: number = 600;
  static canvasOffsetLeft: number = 0;
  static canvasOffsetTop: number = 0;
  static tileWidth: number = 10;
  static tileHeight: number = 8;
}
