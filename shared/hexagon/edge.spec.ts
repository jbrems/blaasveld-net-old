import { Edge } from './edge';
import { Vertex } from './vertex';

describe('Edge', () => {
  describe('Constructor', () => {
    it('stores the start and end vertices', () => {
      const start = new Vertex(5, 28);
      const end = new Vertex(3.14, 8.47);
      const edge = new Edge(start, end);
      expect(edge.start).toEqual(start);
      expect(edge.end).toEqual(end);
    });

    it('accepts an array as start and end', () => {
      const edge = new Edge([5, 28], [3.14, 8.47]);
      expect(edge.start).toEqual(new Vertex(5, 28));
      expect(edge.end).toEqual(new Vertex(3.14, 8.47));
    });
  });

  describe('Equals', () => {
    it('returns true for equal edges', () => {
      const start1 = new Vertex(38.145, 74.12458);
      const end1 = new Vertex(15, -8);
      const edge1 = new Edge(start1, end1);
      const start2 = new Vertex(38.145, 74.12458);
      const end2 = new Vertex(15, -8);
      const edge2 = new Edge(start2, end2);
      expect(edge1.equals(edge2)).toBe(true);
      expect(edge2.equals(edge1)).toBe(true);
      expect(edge1.equals(edge1)).toBe(true);
      expect(edge2.equals(edge2)).toBe(true);
    });

    it('allows reversed start and end vertices', () => {
      const start1 = new Vertex(38.145, 74.12458);
      const end1 = new Vertex(15, -8);
      const edge1 = new Edge(start1, end1);
      const start2 = new Vertex(15, -8);
      const end2 = new Vertex(38.145, 74.12458);
      const edge2 = new Edge(start2, end2);
      expect(edge1.equals(edge2)).toBe(true);
      expect(edge2.equals(edge1)).toBe(true);
      expect(edge1.equals(edge1)).toBe(true);
      expect(edge2.equals(edge2)).toBe(true);
    });

    it('returns false for non equal edges', () => {
      const start1 = new Vertex(5, 28);
      const end1 = new Vertex(3.14, 8.47);
      const edge1 = new Edge(start1, end1);
      const start2 = new Vertex(38.145, 74.12458);
      const end2 = new Vertex(15, -8);
      const edge2 = new Edge(start2, end2);
      expect(edge1.equals(edge2)).toBe(false);
      expect(edge2.equals(edge1)).toBe(false);
    });
  });
});
