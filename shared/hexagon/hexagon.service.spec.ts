import * as service from './hexagon.service';

describe('Hexagon service', () => {
  describe('Calculate distance between neighbor centers', () => {
    it('calculates the distance between hexagon centers for the given radius', () => {
      expect(service.calculateDistanceBetweenNeighborCenters(1)).toBe(1.7320508075688772);
      expect(service.calculateDistanceBetweenNeighborCenters(10)).toBe(17.320508075688775);
      expect(service.calculateDistanceBetweenNeighborCenters(128)).toBe(221.70250336881628);
    });
  });
});
