import React from "react";
import { render } from "@testing-library/react";
import Rain from "../Rain";

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "clientWidth", {
    configurable: true,
    value: 1000,
  });
  Object.defineProperty(HTMLElement.prototype, "clientHeight", {
    configurable: true,
    value: 600,
  });
});

const dropletCount = (container: HTMLElement) =>
  container.getElementsByClassName("droplet").length;

describe("Rain", () => {
  it("renders the requested number of droplets", () => {
    const { container } = render(<Rain numDrops={50} />);
    expect(dropletCount(container)).toBe(50);
  });

  it("renders no droplets while hidden, and brings them back", () => {
    const { container, rerender } = render(
      <Rain numDrops={50} visible={false} />,
    );
    expect(dropletCount(container)).toBe(0);

    rerender(<Rain numDrops={50} visible />);
    expect(dropletCount(container)).toBe(50);
  });
});
