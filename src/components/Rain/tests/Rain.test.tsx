import React from "react";
import { render } from "@testing-library/react";
import Rain from "../Rain";
import mapDroplets from "../MapDroplets";

const dropletCount = (container: HTMLElement) =>
  container.getElementsByClassName("rain-drop-container").length;

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

  it("does not throw on an invalid size or drop style", () => {
    const opts = { numDrops: 5, size: "medium", dropStyle: "nope" } as never;
    expect(() =>
      mapDroplets({ maxWidth: 400, maxHeight: 300 }, opts),
    ).not.toThrow();
  });

  it("keeps gradients valid for rgba and hex colors", () => {
    for (const dropletColor of ["rgba(170, 195, 255, 0.8)", "#aac3ff"]) {
      const [drop] = mapDroplets(
        { maxWidth: 400, maxHeight: 300 },
        { numDrops: 1, dropletColor },
      );
      const html = JSON.stringify(drop.props);
      expect(html).not.toMatch(/rgba\([^)]*,[^)]*,[^)]*,[^)]*,/); // no 5-argument rgba()
    }
  });
});
