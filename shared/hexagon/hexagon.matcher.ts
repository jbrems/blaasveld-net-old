import { Edge } from "./edge";
import { Vertex } from "./vertex";

interface CustomMatchers<R = unknown> {
  toEqualVertices(expected: Vertex[] | [number, number][]): R;
  toEqualEdges(expected: Edge[] | [[number, number], [number, number]][]): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}

export function toEqualVertices (received: Vertex[], expected: Vertex[] | [number, number][]) {
  if (received.length !== expected.length) return { pass: false, message: () => `Expected ${expected.length} vertices but got ${received.length}` };

  for (let i = 0; i < expected.length; i++) {
    let expectedVertex = expected[i] as Vertex;
    if (Array.isArray(expected[i])) expectedVertex = new Vertex(...(expected[i] as [number, number]));

    if (!expectedVertex.equals(received[i])) {
      return { pass: false, message: () => `Expected vertex ${i} ${received[i]} to equal ${expectedVertex}` };
    }
  }

  return { pass: true, message: () => `Expected vertices not to equal ${expected}` };
}

export function toEqualEdges (received: Edge[], expected: Edge[] | [[number, number], [number, number]][]) {
  if (received.length !== expected.length) return { pass: false, message: () => `Expected ${expected.length} edges but got ${received.length}` };

  for (let i = 0; i < expected.length; i++) {
    let expectedEdge = expected[i] as Edge;
    if (Array.isArray(expected[i])) expectedEdge = new Edge(...(expected[i] as [[number, number], [number, number]]));

    if (!expectedEdge.equals(received[i])) {
      return { pass: false, message: () => `Expected edge ${i} ${received[i]} to equal ${expectedEdge}` };
    }
  }

  return { pass: true, message: () => `Expected edges not to equal ${expected}` };
}