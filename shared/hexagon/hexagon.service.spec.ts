import * as service from './hexagon.service';
import { Edge } from './edge';
import { Vertex } from './vertex';
import { Hexagon } from './hexagon';
import { toEqualEdges } from './hexagon.matcher';

expect.extend({ toEqualEdges });

describe('Hexagon service', () => {
  describe('Calculate distance between neighbor centers', () => {
    it('calculates the distance between hexagon centers for the given radius', () => {
      expect(service.calculateDistanceBetweenNeighborCenters(1)).toBe(1.7320508075688772);
      expect(service.calculateDistanceBetweenNeighborCenters(10)).toBe(17.320508075688775);
      expect(service.calculateDistanceBetweenNeighborCenters(128)).toBe(221.70250336881628);
    });
  });

  describe('Calculate border edges', () => {
    it('calculates the border for a single hexagon', () => {
      const hexagon = new Hexagon([0, 0], 1);
      expect(service.calculateBorderEdges([hexagon])).toEqualEdges([
        new Edge([1, 0], [0.5, 0.866025]),
        new Edge([0.5, 0.866025], [-0.5, 0.866025]),
        new Edge([-0.5, 0.866025], [-1, 0]),
        new Edge([-1, 0], [-0.5, -0.866025]),
        new Edge([-0.5, -0.8660254], [0.5, -0.866025]),
        new Edge([0.5, -0.866025], [1, 0]),
      ]);
    });

    it('calculates the border for two neighboring hexagons', () => {
      const hexagon = new Hexagon([0, 0], 1);
      expect(service.calculateBorderEdges([hexagon, hexagon.calculateNeighbors()[0]])).toEqualEdges([
        new Edge([0.5, 0.866025], [-0.5, 0.866025]),
        new Edge([-0.5, 0.866025], [-1, 0]),
        new Edge([-1, 0], [-0.5, -0.866025]),
        new Edge([-0.5, -0.8660254], [0.5, -0.866025]),
        new Edge([0.5, -0.866025], [1, 0]),
        new Edge([2.5, 0.8660254], [2, 1.732051]),
        new Edge([2, 1.732051], [1, 1.732051]),
        new Edge([1, 1.732051], [0.5, 0.866025]),
        new Edge([0.5, 0.866025], [1, 0]),
        new Edge([1, 0], [2, -0.0000001]),
        new Edge([2, -0.0000001], [2.5, 0.866025]),
      ]);
    });

    it('calculates the border for three neighboring hexagons', () => {
      const hexagon = new Hexagon([0, 0], 1);
      const [hexagon2, hexagon3] = hexagon.calculateNeighbors();
      expect(service.calculateBorderEdges([hexagon, hexagon2, hexagon3])).toEqualEdges([
        new Edge([-0.5, 0.866025], [-1, 0]),
        new Edge([-1, 0], [-0.5, -0.866025]),
        new Edge([-0.5, -0.8660254], [0.5, -0.866025]),
        new Edge([0.5, -0.866025], [1, 0]),
        new Edge([2.5, 0.8660254], [2, 1.732051]),
        new Edge([2, 1.732051], [1, 1.732051]),
        new Edge([0.5, 0.866025], [1, 0]),
        new Edge([1, 0], [2, -0.0000001]),
        new Edge([2, -0.0000001], [2.5, 0.866025]),
        new Edge([1, 1.732051], [0.5, 2.598076]),
        new Edge([0.5, 2.598076], [-0.5, 2.598076]),
        new Edge([-0.5, 2.598076], [-1, 1.732051]),
        new Edge([-1, 1.732051], [-0.5, 0.866025]),
        new Edge([-0.5, 0.866025], [0.5, 0.866025]),
      ]);
    });
  });

  describe('Convert edges to ordered vertices array', () => {
    it('Converts the edges to an array of vertices', () => {
      const edges: Edge[] = [];
      expect(service.convertEdgesToOrderedVerticesArray(edges)).toEqual([]);

      edges.push(new Edge([1, 1], [2, 2]));
      expect(service.convertEdgesToOrderedVerticesArray(edges)).toEqual([new Vertex(1, 1), new Vertex(2, 2)]);

      edges.push(new Edge([2, 2], [3, 3]), new Edge([3, 3], [4, 4]), new Edge([4,4], [1,1]));
      expect(service.convertEdgesToOrderedVerticesArray(edges)).toEqual([new Vertex(1, 1), new Vertex(2, 2), new Vertex(3, 3), new Vertex(4, 4)]);
    });

    it('Orders the edges as a continuous path', () => {
      const edges = [new Edge([2,2], [3,3]), new Edge([4,4], [1,1]), new Edge([3,3], [4,4]), new Edge([1,1], [2,2])];
      expect(service.convertEdgesToOrderedVerticesArray(edges)).toEqual([new Vertex(2, 2), new Vertex(3, 3), new Vertex(4, 4), new Vertex(1, 1)]);
    });
  });
});
