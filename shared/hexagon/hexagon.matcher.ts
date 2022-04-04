import { Vertex } from "./vertex";

export function toEqualVertices (received: Vertex[], expected: [number, number][]) {
  if (received.length !== expected.length) return { pass: false, message: () => `Expected ${expected.length} vertices but got ${received.length}` };

  for (let i = 0; i < expected.length; i++) {
    const expectedXFixed = expected[i][0].toFixed(6);
    const expectedYFixed = expected[i][1].toFixed(6);
    const receivedXFixed = received[i].x.toFixed(6);
    const receivedYFixed = received[i].y.toFixed(6);
    if (expectedXFixed !== receivedXFixed || expectedYFixed !== receivedYFixed) {
      return { pass: false, message: () => `Expected vertex ${i} [${receivedXFixed}, ${receivedYFixed}] to equal [${expectedXFixed}, ${expectedYFixed}]` };
    }
  }

  return { pass: true, message: () => `Expected vertex not to match ${expected}` };
}