export class Vertex {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public get asArray (): [number, number] {
    return [this.x, this.y];
  }

  public equals (vertex: Vertex): boolean {
    return this.x.toFixed(6) === vertex.x.toFixed(6) && this.y.toFixed(6) === vertex.y.toFixed(6);
  }

  public toString (): string {
    return `Vertex[${this.x.toFixed(6)}, ${this.y.toFixed(6)}]`;
  }
}
