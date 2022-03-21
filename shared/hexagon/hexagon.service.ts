
export function generateHexCoords (center: [number, number], radius: number): [number, number][] {
  const coords: [number, number][] = [];
  const [centerX, centerY] = center;

  // - 0.0000001 to avoid rounding errors generating an extra point
  for (let angle = 0; angle < 2 * Math.PI - 0.0000001; angle += Math.PI / 3) {
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    coords.push([x, y]);
  }

  return coords;
}

export function getNeighbors (center: [number, number], radius: number): [number, number][] {
  const neighbors: [number, number][] = [];

  const [centerX, centerY] = center;
  const distanceBetweenNeighborCenters = getDistanceBetweenNeighborCenters(radius);

  // - 0.0000001 to avoid rounding errors generating an extra point
  for (let angle = Math.PI / 6; angle < 2 * Math.PI - 0.0000001; angle += Math.PI / 3) {
    const x = centerX + Math.cos(angle) * distanceBetweenNeighborCenters;
    const y = centerY + Math.sin(angle) * distanceBetweenNeighborCenters;
    neighbors.push([x, y]);
  }

  return neighbors;
}

function getDistanceBetweenNeighborCenters (radius: number): number {
  return Math.sqrt(Math.pow(radius, 2) - Math.pow(radius / 2, 2)) * 2;
}
