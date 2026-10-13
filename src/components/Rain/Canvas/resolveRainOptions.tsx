import type {
  dropletOptions,
  rainDropStyle,
  impactStyle,
  size as DropSize,
} from "../rainTypes";
import { getRainProfileDefaults } from "../rain-profiles";
import {
  dropStylePresets,
  getDropStyleDefaultSize,
} from "../drop-style-presets";

export type RainRenderer = "dom" | "canvas";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const finiteOr = (value: number | undefined, fallback: number) =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;

// own-property check, so inherited keys like "constructor" are not accepted
const has = (obj: object, key: string) =>
  Object.prototype.hasOwnProperty.call(obj, key);

/**
 * Resolves every effective value (props, then profile defaults, then built-in
 * defaults) once, so the DOM and canvas renderers cannot drift apart.
 * The renderers only differ in their default quality and drop cap.
 */
export function resolveRainOptions(
  options: dropletOptions,
  renderer: RainRenderer,
) {
  const defaults = getRainProfileDefaults(options.profile);

  // drop style and size, with fallbacks for values that are not real presets
  const requestedStyle = options.dropStyle ?? defaults.dropStyle ?? "streak";
  const dropStyle = (
    has(dropStylePresets, requestedStyle) ? requestedStyle : "streak"
  ) as rainDropStyle;
  const preset = dropStylePresets[dropStyle];

  const requestedSize: string =
    options.size ??
    (options.dropStyle ? getDropStyleDefaultSize(dropStyle) : defaults.size) ??
    "default";
  const size = (
    has(preset.dimensions, requestedSize) ? requestedSize : "default"
  ) as DropSize;
  const dimensions = preset.dimensions[size];

  const opacity = clamp(
    options.dropletOpacity ??
      (options.dropStyle ? preset.defaultOpacity : defaults.dropletOpacity) ??
      preset.defaultOpacity ??
      0.5,
    0,
    1,
  );

  // impacts
  const showImpact = options.showImpact ?? defaults.showImpact ?? true;
  const impactStyle = (options.impactStyle ??
    defaults.impactStyle ??
    "splash") as impactStyle;
  const impactThickness = clamp(
    finiteOr(options.impactThickness ?? defaults.impactThickness, 2.5),
    0.5,
    8,
  );
  const impactOpacity = clamp(
    finiteOr(options.impactOpacity ?? defaults.impactOpacity, 0.65),
    0,
    1,
  );
  const impactDensity = clamp(
    finiteOr(options.impactDensity ?? defaults.impactDensity, 0.25),
    0,
    1,
  );

  // motion
  const depth = options.depth ?? defaults.depth ?? false;
  const duration = options.duration ?? defaults.duration ?? "normal";
  const speedFactor = duration === "fast" ? 1.3 : duration === "slow" ? 0.7 : 1;

  // wind and angle (wind adds a stable lean in its prevailing direction)
  const baseAngle = clamp(
    finiteOr(options.angle ?? defaults.angle, 0),
    -75,
    75,
  );
  const showWind = options.showWind ?? false;
  const windVariation = clamp(finiteOr(options.windVariation, 0), 0, 30);
  const gustFrequency = Math.max(1, finiteOr(options.gustFrequency, 8));
  const windLean = showWind
    ? (Math.sign(baseAngle) || 1) * Math.min(14, windVariation * 0.4)
    : 0;
  const angleDegrees = clamp(baseAngle + windLean, -75, 75);

  // how many particles
  const quality =
    options.quality ?? (renderer === "canvas" ? "medium" : "high");
  const qualityFactor =
    quality === "low" ? 0.4 : quality === "medium" ? 0.7 : 1;
  const maxDrops = clamp(
    Math.floor(finiteOr(options.maxDrops, renderer === "canvas" ? 400 : 600)),
    0,
    5000,
  );
  const intensity = clamp(finiteOr(options.intensity, 1), 0, 1);
  const requestedNumDrops = options.numDrops ?? defaults.numDrops;

  // clouds, for rainFromClouds
  const rainFromClouds = options.rainFromClouds ?? false;
  const cloudCount = clamp(
    Math.floor(finiteOr(options.cloudCount ?? defaults.cloudCount, 3)),
    1,
    24,
  );
  const cloudSize = Math.max(
    80,
    finiteOr(options.cloudSize ?? defaults.cloudSize, 320),
  );

  return {
    defaults,
    dropStyle,
    preset,
    size,
    dimensions,
    opacity,
    showImpact,
    impactStyle,
    impactThickness,
    impactOpacity,
    impactDensity,
    depth,
    speedFactor,
    angleDegrees,
    angleRadians: (angleDegrees * Math.PI) / 180,
    showWind,
    windVariation,
    gustFrequency,
    quality,
    qualityFactor,
    maxDrops,
    intensity,
    numDrops:
      typeof requestedNumDrops === "number" &&
      Number.isFinite(requestedNumDrops)
        ? requestedNumDrops
        : undefined, // undefined means "use the width-based count"
    dropsPerWidth: defaults.dropsPerWidth ?? 25,
    rainFromClouds,
    cloudCount,
    cloudSize,
    baseColor: options.dropletColor ?? defaults.dropletColor,
  };
}
