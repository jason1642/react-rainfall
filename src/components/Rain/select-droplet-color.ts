import type { dropletColor, rainProfile } from "./rainTypes";
import { rainbowColors } from "./preset-effects";

const selectDropletColor = (
  dropletColor: dropletColor,
  profile: rainProfile | undefined,
  sample: number = Math.random(), // 0 to 1; pass a stable value for stable colors
): string => {
  if (profile === "rainbow" && dropletColor === undefined) {
    const index = Math.min(
      rainbowColors.length - 1,
      Math.floor(sample * rainbowColors.length),
    );
    return rainbowColors[index];
  }

  return dropletColor ?? "rgb(183, 212, 255)";
};

export default selectDropletColor;
