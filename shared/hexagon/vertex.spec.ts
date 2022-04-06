import { Vertex } from './vertex';

describe('Vertex', () => {
  describe('Constructor', () => {
    it('stores the x and y value of the vertex', () => {
      const vertex = new Vertex(12, 58);
      expect(vertex.x).toBe(12);
      expect(vertex.y).toBe(58);
    });

    it('handles negative values', () => {
      const vertex = new Vertex(-12, -58);
      expect(vertex.x).toBe(-12);
      expect(vertex.y).toBe(-58);
    });

    it('handles floating point values', () => {
      const vertex = new Vertex(0.000005, 128.7549321);
      expect(vertex.x).toBe(0.000005);
      expect(vertex.y).toBe(128.7549321);
    });

    it('handles negative floating point values', () => {
      const vertex = new Vertex(-0.000005, -128.7549321);
      expect(vertex.x).toBe(-0.000005);
      expect(vertex.y).toBe(-128.7549321);
    });
  });

  describe('Equals', () => {
    it('returns true for equal vertices', () => {
      const vertex1 = new Vertex(12, 58);
      const vertex2 = new Vertex(12, 58);
      expect(vertex1.equals(vertex2)).toBe(true);
      expect(vertex2.equals(vertex1)).toBe(true);
      expect(vertex1.equals(vertex1)).toBe(true);
      expect(vertex2.equals(vertex2)).toBe(true);
    });

    it('returns false for non equal vertices', () => {
      const vertex1 = new Vertex(12, 58);
      const vertex2 = new Vertex(7, 32);
      expect(vertex1.equals(vertex2)).toBe(false);
      expect(vertex2.equals(vertex1)).toBe(false);
    });

    it('handles floating point values', () => {
      const vertex1 = new Vertex(0.000005, 128.7549321);
      const vertex2 = new Vertex(0.000005, 128.7549321);
      expect(vertex1.equals(vertex2)).toBe(true);
      expect(vertex2.equals(vertex1)).toBe(true);
      expect(vertex1.equals(vertex1)).toBe(true);
      expect(vertex2.equals(vertex2)).toBe(true);
    });

    it('allows for small rounding errors', () => {
      const vertex1 = new Vertex(0.0000004, 128.7549322);
      const vertex2 = new Vertex(0.0000005, 128.7549321);
      expect(vertex1.equals(vertex2)).toBe(true);
      expect(vertex2.equals(vertex1)).toBe(true);
      expect(vertex1.equals(vertex1)).toBe(true);
      expect(vertex2.equals(vertex2)).toBe(true);
    });

    it('considers approximations of -0 and 0 to be equal', () => {
      const vertex1 = new Vertex(0.0000002, -.0000003);
      const vertex2 = new Vertex(-0.0000004, 0.0000004);
      expect(vertex1.equals(vertex2)).toBe(true);
      expect(vertex2.equals(vertex1)).toBe(true);
      expect(vertex1.equals(vertex1)).toBe(true);
      expect(vertex2.equals(vertex2)).toBe(true);
    });
  });

  describe('To string', () => {
    it('Formats the Vertex as a string representation', () => {
      expect(new Vertex(2.5, 0.8660254).toString()).toBe('Vertex(2.500000, 0.866025)');
    });

    it('Prints the coordinates with 6 decimal numbers', () => {
      expect(new Vertex(-1, 1).toString()).toBe('Vertex(-1.000000, 1.000000)');
    });
  });
});
