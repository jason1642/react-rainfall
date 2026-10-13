import "@testing-library/jest-dom";

// jsdom reports 0 for element sizes, and Rain renders no drops in a 0 x 0 box
Object.defineProperty(HTMLElement.prototype, "clientWidth", {
  configurable: true,
  value: 1000,
});
Object.defineProperty(HTMLElement.prototype, "clientHeight", {
  configurable: true,
  value: 600,
});
