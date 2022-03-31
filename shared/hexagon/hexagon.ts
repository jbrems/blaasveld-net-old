import { Vertex } from './vertex';
import { Edge } from './edge';
import * as hexagonService from './hexagon.service';

export class Hexagon {
  center: Vertex;
  radius: number;
  widthHeightRatio: number;

  vertices: Vertex[];
  edges: Edge[];

  constructor (center: Vertex | [number, number], radius: number, widthHeightRatio = 1.0) {
    if (Array.isArray(center)) center = new Vertex(center[0], center[1]);

    this.center = center;
    this.radius = radius;
    this.widthHeightRatio = widthHeightRatio;

    this.vertices = this.calculateVertices();
    this.edges = this.calculateEdges();
  }

  private calculateVertices (): Vertex[] {
    const vertices: Vertex[] = [];

    // - 0.000001 to avoid rounding errors generating an extra point
    for (let angle = 0; angle < 2 * Math.PI - 0.000001; angle += Math.PI / 3) {
      const x = this.center.x + Math.cos(angle) * this.radius;
      const y = this.center.y + Math.sin(angle) * this.radius * this.widthHeightRatio;
      vertices.push(new Vertex(x, y));
    }

    return vertices;
  }

  private calculateEdges (): Edge[] {
    const edges: Edge[] = [];

    for (let i = 1; i < this.vertices.length; i++) {
      edges.push(new Edge(this.vertices[i - 1], this.vertices[i]));
    }
    edges.push(new Edge(this.vertices[5], this.vertices[0]));

    return edges;
  }

  public calculateNeighbors (): Hexagon[] {
    const neighbors: Hexagon[] = [];

    const distanceBetweenNeighborCenters = hexagonService.calculateDistanceBetweenNeighborCenters(this.radius);

    // - 0.000001 to avoid rounding errors generating an extra point
    for (let angle = Math.PI / 6; angle < 2 * Math.PI - 0.000001; angle += Math.PI / 3) {
      const x = this.center.x + Math.cos(angle) * distanceBetweenNeighborCenters;
      const y = this.center.y + Math.sin(angle) * distanceBetweenNeighborCenters * this.widthHeightRatio;
      neighbors.push(new Hexagon(new Vertex(x, y), this.radius, this.widthHeightRatio));
    }

    return neighbors;
  }

  public get verticesAsArray (): [number, number][] {
    return this.vertices.map(v => v.asArray);
  }

  public hasEdge (edge: Edge): boolean {
    return this.edges.some(e => e.equals(edge));
  }

  public equals (hexagon: Hexagon): boolean {
    return this.center.equals(hexagon.center) && this.radius === hexagon.radius;
  }
}
