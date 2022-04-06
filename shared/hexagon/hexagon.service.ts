import { Hexagon } from './hexagon';
import { Edge } from './edge';
import { Vertex } from './vertex';

export function calculateDistanceBetweenNeighborCenters (radius: number): number {
  return Math.sqrt(Math.pow(radius, 2) - Math.pow(radius / 2, 2)) * 2;
}

export function calculateBorderEdges (hexagons: Hexagon[]): Edge[] {
  const borderEdges: Edge[] = [];

  for (let i = 0; i < hexagons.length; i++) {
    const hexagon = hexagons[i];

    const neighbors = hexagon.calculateNeighbors();
    const neighboringHexagons = hexagons.filter((h) => {
      return neighbors.some(n => n.equals(h));
    });

    const distinctEdges = hexagon.edges.filter((e) => {
      return !neighboringHexagons.some(nh => nh.edges.some(nhe => nhe.equals(e)));
    });
    console.log(`Hex ${i} - adding ${distinctEdges.length} edges from ${hexagon.edges.length} with ${neighboringHexagons.length} neighbors`);
    borderEdges.push(...distinctEdges);
  }

  return borderEdges;
}

export function convertEdgesToOrderedVerticesArray (edges: Edge[]): Vertex[] {
  if (!edges?.length) return [];

  const vertices: Vertex[] = [];

  let edge = edges[0];
  vertices.push(edge.start);
  let currentVertex = edge.end;
  edges = edges.filter(e => !e.equals(edge));
  while (edges.length > 1) {
    const nextEdge = edges.find(e => e.start.equals(currentVertex) || e.end.equals(currentVertex)) as Edge;
    vertices.push(currentVertex);
    if (nextEdge.start.equals(currentVertex)) currentVertex = nextEdge.end;
    else currentVertex = nextEdge.start;
    edges = edges.filter(e => !e.equals(nextEdge as Edge));
  }
  vertices.push(currentVertex);

  return vertices;
}
