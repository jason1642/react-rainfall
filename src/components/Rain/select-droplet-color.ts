import type { dropletColor, rainProfile } from "./rainTypes";
import { rainbowColors } from "./preset-effects";

const selectDropletColor = (
  dropletColor: dropletColor,
  profile: rainProfile | undefined,
): string => {
  if (profile === "rainbow" && dropletColor === undefined) {
    return rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
  }

  return dropletColor ?? "rgb(183, 212, 255)";
};

export default selectDropletColor;
