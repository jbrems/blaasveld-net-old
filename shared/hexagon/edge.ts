import { Vertex } from './vertex';

export class Edge {
  start: Vertex;
  end: Vertex;

  constructor(start: Vertex | [number, number], end: Vertex | [number, number]) {
    if (Array.isArray(start)) start = new Vertex(start[0], start[1]);
    if (Array.isArray(end)) end = new Vertex(end[0], end[1]);

    this.start = start;
    this.end = end;
  }

  public equals (edge: Edge): boolean {
    return (this.start.equals(edge.start) && this.end.equals(edge.end))
      || (this.start.equals(edge.end) && this.end.equals(edge.start));
  }

  public toString () {
    return `Edge[[${this.start.x.toFixed(6)}, ${this.start.y.toFixed(6)}], [${this.end.x.toFixed(6)}, ${this.end.y.toFixed(6)}]]`;
  }
}
