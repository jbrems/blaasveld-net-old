import { describe, it, expect } from '@jest/globals';
import * as service from './hexagon.service';

expect.extend({
  toMatchCoords (received: [number, number][], expected: [number, number][]) {
    if (received.length !== expected.length) return { message: () => `expected ${expected.length} coordinates, but received ${received.length}`, pass: false };

    for (let i = 0; i < expected.length; i++) {
      const receivedFixed = received.map((coord) => coord.map(n => n.toFixed(3)));
      const expectedFixed = expected.map((coord) => coord.map(n => n.toFixed(3)));
      if (receivedFixed[i][0] !== expectedFixed[i][0] || receivedFixed[i][1] !== expectedFixed[i][1]) {
        return { message: () => `expected coordinate with index ${i} to be [${expectedFixed[i]}], but received [${receivedFixed[i]}]`, pass: false };
      }
    }

    return { message: () => 'expected coordinates not to match', pass: true };
  },
});

describe('Hexagon service', () => {
  describe('Generate Hex Coords', () => {
    it('generates the correct coordinates', () => {
      expect(service.generateHexCoords([0, 0], 1)).toMatchCoords([[1, 0], [0.5, 0.866], [-0.5, 0.866], [-1, 0], [-0.5, -0.866], [0.5, -0.866]]);
      expect(service.generateHexCoords([1, 1], 1)).toMatchCoords([[2, 1], [1.5, 1.866], [0.5, 1.866], [0, 1], [0.5, 0.134], [1.5, 0.134]]);
      expect(service.generateHexCoords([0, 0], 256)).toMatchCoords([[256, 0], [128, 221.703], [-128, 221.703], [-256, 0], [-128, -221.703], [128, -221.703]]);
      expect(service.generateHexCoords([256, 256], 256)).toMatchCoords([[512, 256], [384, 477.703], [128, 477.703], [0, 256], [128, 34.297], [384, 34.297]]);
    });

    it('generates the correct coordinates for radius 0', () => {
      expect(service.generateHexCoords([0, 0], 0)).toMatchCoords([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]);
      expect(service.generateHexCoords([1, 1], 0)).toMatchCoords([[1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]]);
      expect(service.generateHexCoords([256, 256], 0)).toMatchCoords([[256, 256], [256, 256], [256, 256], [256, 256], [256, 256], [256, 256]]);
    });
  });
});
