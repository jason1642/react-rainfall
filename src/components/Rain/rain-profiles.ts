import type { dropletColor, dropletOpacity, rainProfile, showImpact, size } from "./rainTypes";

interface RainProfileDefaults {
  dropsPerWidth: number;
  dropletColor?: dropletColor;
  size?: size;
  showImpact?: showImpact;
  dropletOpacity?: dropletOpacity;
  containerClassName?: string;
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
  "steady-rain": {
    dropsPerWidth: 24,
    dropletColor: "rgb(204, 224, 245)",
    size: "default",
    showImpact: true,
    dropletOpacity: 0.48,
  },
  "passing-shower": {
    dropsPerWidth: 30,
    dropletColor: "rgb(210, 229, 246)",
    size: "default",
    showImpact: true,
    dropletOpacity: 0.46,
    containerClassName: "rain-container--passing-shower",
  },
  "heavy-rain": {
    dropsPerWidth: 12,
    dropletColor: "rgb(196, 219, 249)",
    size: "long",
    showImpact: true,
    dropletOpacity: 0.72,
  },
  "misty-rain": {
    dropsPerWidth: 56,
    dropletColor: "rgb(220, 235, 246)",
    size: "short",
    showImpact: false,
    dropletOpacity: 0.16,
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

export const getRainProfileClassName = (
  profile: rainProfile | undefined,
): string | undefined =>
  profile === undefined ? undefined : rainProfiles[profile].containerClassName;
