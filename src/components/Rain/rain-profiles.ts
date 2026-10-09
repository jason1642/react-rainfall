import type { dropletColor, dropletOpacity, rainProfile, showImpact, size } from "./rainTypes";

interface RainProfileDefaults {
  dropsPerWidth: number;
  dropletColor?: dropletColor;
  size?: size;
  showImpact?: showImpact;
  dropletOpacity?: dropletOpacity;
}

// Add new named presets here. Explicit component props take precedence over these defaults.
const rainProfiles: Record<rainProfile, RainProfileDefaults> = {
  "light-drizzle": {
    dropsPerWidth: 48,
    dropletColor: "rgb(210, 228, 242)",
    size: "short",
    showImpact: false,
    dropletOpacity: 0.3,
  },
  rainbow: {
    dropsPerWidth: 25,
  },
};

export const getRainProfileDefaults = (
  profile: rainProfile | undefined,
): RainProfileDefaults =>
  profile === undefined
    ? { dropsPerWidth: 25 }
    : rainProfiles[profile];

