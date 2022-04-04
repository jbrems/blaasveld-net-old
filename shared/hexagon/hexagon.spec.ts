import { Hexagon } from './hexagon';
import { Vertex } from './vertex';
import { Edge } from './edge';
import * as hexagonMatchers from './hexagon.matcher';

expect.extend(hexagonMatchers);

describe('Hexagon', () => {
  describe('Constructor', () => {
    it('stores the center and radius', () => {
      const center = new Vertex(25.154, 13.7);
      const hexagon = new Hexagon(center, 128.458);
      expect(hexagon.center).toEqual(center);
      expect(hexagon.radius).toEqual(128.458);
    });

    it('accepts an array as center', () => {
      const hexagon = new Hexagon([25.154, 13.7], 128.458);
      expect(hexagon.center).toEqual(new Vertex(25.154, 13.7));
    });

    it('calculates the vertices', () => {
      const hexagon = new Hexagon([0, 0], 1);
      expect(hexagon.vertices).toEqualVertices([[1, 0], [0.5, 0.866025], [-0.5, 0.866025], [-1, 0], [-0.5, -0.866025], [0.5, -0.866025]]);

      const hexagon2 = new Hexagon([64, 64], 128);
      expect(hexagon2.vertices).toEqualVertices([[192, 64], [128, 174.851252], [0, 174.851252], [-64, 64], [-0.0000001, -46.851252], [128, -46.851252]]);
    });

    // TODO: use custom matcher with toFixed
    it('calculates the edges', () => {
      const hexagon = new Hexagon([0, 0], 1);
      expect(hexagon.edges).toEqual([
        new Edge([1, 0], [0.5000000000000001, 0.8660254037844386]),
        new Edge([0.5000000000000001, 0.8660254037844386], [-0.4999999999999998, 0.8660254037844387]),
        new Edge([-0.4999999999999998, 0.8660254037844387], [-1, 1.2246467991473532e-16]),
        new Edge([-1, 1.2246467991473532e-16], [-0.5000000000000004, -0.8660254037844385]),
        new Edge([-0.5000000000000004, -0.8660254037844385], [0.49999999999999933, -0.866025403784439]),
        new Edge([0.49999999999999933, -0.866025403784439], [1, 0]),
      ]);
    });
  });

  describe('Calculate neighbors', () => {
    // TODO: use custom matcher with toFixed
    it('calculates the neighboring hexagons', () => {
      const hexagon = new Hexagon([0, 0], 1);
      expect(hexagon.calculateNeighbors().map(h => h.center)).toEqual([
        new Vertex(1.5, 0.8660254037844385),
        new Vertex(1.0605752387249068e-16, 1.7320508075688772),
        new Vertex(-1.4999999999999996, 0.8660254037844392),
        new Vertex(-1.5000000000000007, -0.8660254037844375),
        new Vertex(-1.856542720724323e-15, -1.7320508075688772),
        new Vertex(1.4999999999999987, -0.8660254037844407),
      ]);
      expect(hexagon.calculateNeighbors().map(h => h.radius)).toEqual([1, 1, 1, 1, 1, 1]);
    });
  });

  describe('Get vertices as array', () => {
    it('returns the vertices as arrays', () => {
      const hexagon = new Hexagon([0, 0], 1);
      expect(hexagon.verticesAsArray).toEqual([
        [1, 0],
        [0.5000000000000001, 0.8660254037844386],
        [-0.4999999999999998, 0.8660254037844387],
        [-1, 1.2246467991473532e-16],
        [-0.5000000000000004, -0.8660254037844385],
        [0.49999999999999933, -0.866025403784439],
      ]);
    });
  });

  describe('Has edge', () => {
    it('returns true if an edge belongs to the hexagon', () => {
      const hexagon = new Hexagon([0, 0], 1);
      expect(hexagon.hasEdge(new Edge([1, 0], [0.5000000000000001, 0.8660254037844386]))).toBe(true);
      expect(hexagon.hasEdge(new Edge([-1, 1.2246467991473532e-16], [-0.5000000000000004, -0.8660254037844385]))).toBe(true);
      expect(hexagon.hasEdge(new Edge([0.49999999999999933, -0.866025403784439], [1, 0]))).toBe(true);
    });

    it('accepts reversed edges', () => {
      const hexagon = new Hexagon([0, 0], 1);
      expect(hexagon.hasEdge(new Edge([0.5000000000000001, 0.8660254037844386], [1, 0]))).toBe(true);
      expect(hexagon.hasEdge(new Edge([-0.5000000000000004, -0.8660254037844385], [-1, 1.2246467991473532e-16]))).toBe(true);
      expect(hexagon.hasEdge(new Edge([1, 0], [0.49999999999999933, -0.866025403784439]))).toBe(true);
    });

    it('returns false if an edge does not belong to the hexagon', () => {
      const hexagon = new Hexagon([0, 0], 1);
      expect(hexagon.hasEdge(new Edge([0, 0], [1, 1]))).toBe(false);
      expect(hexagon.hasEdge(new Edge([0.5, 0.86], [1, 0]))).toBe(false);
    });
  });

  describe('Equals', () => {
    it('returns true if the hexagons center and radius match', () => {
      const hexagon1 = new Hexagon([64, 64], 128);
      const hexagon2 = new Hexagon([64, 64], 128);
      expect(hexagon1.equals(hexagon2)).toBe(true);
      expect(hexagon2.equals(hexagon1)).toBe(true);
      expect(hexagon1.equals(hexagon1)).toBe(true);
      expect(hexagon2.equals(hexagon2)).toBe(true);
    });

    it('returns false if the hexagons center or radius do not match', () => {
      const hexagon1 = new Hexagon([64, 64], 128);
      const hexagon2 = new Hexagon([64, 64], 64);
      const hexagon3 = new Hexagon([0, 0], 128);
      expect(hexagon1.equals(hexagon2)).toBe(false);
      expect(hexagon1.equals(hexagon3)).toBe(false);
      expect(hexagon2.equals(hexagon3)).toBe(false);
    });
  });
});
