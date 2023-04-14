export class Map {
  width: number
  height: number
  visible: boolean[]
  explored: boolean[]

  constructor(width: number, height:number) {
    this.width = width;
    this.height = height;

    this.visible = Array(this.width*this.height).fill(false);
    this.explored = Array(this.width*this.height).fill(false);
  }
}