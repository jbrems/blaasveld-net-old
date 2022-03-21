declare namespace jest {
  interface Matchers<R> {
    toMatchCoords(received: [number, number][], expected: [number, number][]): R;
  }
}
