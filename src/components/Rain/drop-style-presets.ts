import type { rainDropStyle, size } from "./rainTypes";

interface DropStylePreset {
  defaultSize: Exclude<size, undefined>;
  defaultOpacity?: number;
  dimensions: Record<Exclude<size, undefined>, { width: number; height: number }>;
}

/** Canonical shape dimensions shared by both renderers. */
export const dropStylePresets: Record<rainDropStyle, DropStylePreset> = {
  streak: {
    defaultSize: "default",
    dimensions: {
      short: { width: 2, height: 10 },
      default: { width: 2, height: 19 },
      long: { width: 2, height: 34 },
    },
  },
  pixel: {
    defaultSize: "default",
    defaultOpacity: 0.82,
    dimensions: {
      short: { width: 8, height: 12 },
      default: { width: 8, height: 22 },
      long: { width: 8, height: 34 },
    },
  },
  soft: {
    defaultSize: "short",
    defaultOpacity: 0.34,
    dimensions: {
      short: { width: 4, height: 10 },
      default: { width: 4, height: 16 },
      long: { width: 5, height: 23 },
    },
  },
  orb: {
    defaultSize: "default",
    defaultOpacity: 0.78,
    dimensions: {
      short: { width: 7, height: 7 },
      default: { width: 8, height: 9 },
      long: { width: 10, height: 12 },
    },
  },
  snowflake: {
    defaultSize: "default",
    defaultOpacity: 0.8,
    dimensions: {
      short: { width: 10, height: 10 },
      default: { width: 12, height: 12 },
      long: { width: 15, height: 15 },
    },
  },
  hailstone: {
    defaultSize: "default",
    defaultOpacity: 0.88,
    dimensions: {
      short: { width: 8, height: 9 },
      default: { width: 10, height: 11 },
      long: { width: 12, height: 14 },
    },
  },
  cartoon: {
    defaultSize: "default",
    defaultOpacity: 0.98,
    dimensions: {
      short: { width: 11, height: 16 },
      default: { width: 12, height: 21 },
      long: { width: 14, height: 26 },
    },
  },
  glow: {
    defaultSize: "short",
    defaultOpacity: 0.58,
    dimensions: {
      short: { width: 3, height: 8 },
      default: { width: 4, height: 12 },
      long: { width: 5, height: 17 },
    },
  },
};

export const getDropStyleDefaultSize = (style: rainDropStyle): size =>
  dropStylePresets[style].defaultSize;
