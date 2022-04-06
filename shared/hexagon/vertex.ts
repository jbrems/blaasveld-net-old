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
    return approximate(this.x) === approximate(vertex.x) && approximate(this.y) === approximate(vertex.y);
  }

  public toString (): string {
    return `Vertex(${approximate(this.x)}, ${approximate(this.y)})`;
  }
}

function approximate (number: number): string {
  // Since we want 0 to equal -0 but '0.000000' does not equal '-0.000000'
  if (number > -0.0000005 && number < 0.0000005) return '0.000000';
  return number.toFixed(6);
}
