import React from "react";
import { render } from "@testing-library/react";

import Rain from "./Rain";

describe("Rain", () => {
  test("renders the Rain component", () => {
    render(<Rain numDrops={10} />);
  });
});