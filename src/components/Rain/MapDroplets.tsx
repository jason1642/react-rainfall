import type { CSSProperties, ReactElement } from "react";
import Droplet from "./Droplet/Droplet";
import DropImpact from "./impact/Impact";
import DropletContainer from "./drop-container/DropContainer";
import type { dropletOptions } from "./rainTypes";
import { getRainProfileDefaults } from "./rain-profiles";
import selectDropletColor from "./select-droplet-color";
import {
  dropStylePresets,
  getDropStyleDefaultSize,
} from "./drop-style-presets";
import { toRgbChannels } from "../../helpers/color-utils";
import { hash01 } from "../../helpers/seededRandom";
const has = (obj: object, key: string) =>
  Object.prototype.hasOwnProperty.call(obj, key);
const round3 = (n: number) => Math.round(n * 1000) / 1000;

const GOLDEN = 0.6180339887498949;
const dropBackground = (variant: string, rgb: string, alpha: number) => {
  // one color stop: the base alpha scaled by `m`, rounded so style strings stay short
  const c = (m: number) => `rgba(${rgb}, ${round3(alpha * m)})`;

  switch (variant) {
    case "snowflake":
      return undefined;
    case "hailstone":
      return `radial-gradient(circle at 30% 25%, rgba(255,255,255,.95), ${c(1)} 55%, ${c(1)})`;
    case "soft":
      return `radial-gradient(ellipse at 50% 40%, ${c(1)} 0%, ${c(0.55)} 52%, ${c(0)} 100%)`;
    case "glow":
      return `radial-gradient(ellipse at 50% 45%, ${c(0.8)} 0%, ${c(0.32)} 58%, ${c(0)} 100%)`;
    default:
      return `linear-gradient(to bottom, ${c(0)}, ${c(1)})`;
  }
};

const CH = {
  depth: 0,
  cloudTop: 1,
  duration: 2,
  delay: 3,
  cloud: 4,
  cloudOffset: 5,
  reducedTop: 6,
  impact: 7,
} as const;
const mapDroplets = (
  rainRef: { maxWidth: number; maxHeight: number },
  options: dropletOptions,
): ReactElement[] => {
  const {
    dropletColor,
    numDrops,
    showImpact,
    impactStyle,
    impactThickness,
    impactOpacity,
    impactDensity,
    size,
    profile,
    dropletOpacity,
    angle,
    dropStyle,
    depth,
    duration,
    rainFromClouds,
    cloudCount,
    cloudSize,
    showWind,
    windVariation,
    gustFrequency,
    intensity = 1,
    quality = "high",
    maxDrops = 600,
  } = options;

  const { maxWidth, maxHeight } = rainRef;
  const profileDefaults = getRainProfileDefaults(profile);
  const localCloudCount = Math.max(
    1,
    Math.min(24, Math.floor(cloudCount ?? profileDefaults.cloudCount ?? 3)),
  );
  const localCloudSize = Math.max(
    80,
    cloudSize ?? profileDefaults.cloudSize ?? 320,
  );
  const safeWindVariation = Number.isFinite(windVariation)
    ? Math.max(0, Math.min(30, windVariation ?? 0))
    : 0;
  const safeGustFrequency = Number.isFinite(gustFrequency)
    ? Math.max(1, gustFrequency ?? 8)
    : 8;
  const requestedDropStyle = dropStyle ?? profileDefaults.dropStyle ?? "streak";

  const effectiveDropStyle = (
    has(dropStylePresets, requestedDropStyle) ? requestedDropStyle : "streak"
  ) as NonNullable<dropletOptions["dropStyle"]>;
  const preset = dropStylePresets[effectiveDropStyle];

  const requestedSize =
    size ??
    (dropStyle
      ? getDropStyleDefaultSize(effectiveDropStyle)
      : profileDefaults.size) ??
    "default";
  const effectiveSize = (
    has(preset.dimensions, requestedSize) ? requestedSize : "default"
  ) as NonNullable<dropletOptions["size"]>;
  const dropDimensions = preset.dimensions[effectiveSize];
  const effectiveShowImpact = showImpact ?? profileDefaults.showImpact ?? true;
  const effectiveImpactStyle =
    impactStyle ?? profileDefaults.impactStyle ?? "splash";
  const effectiveImpactThickness = Math.max(
    0.5,
    Math.min(8, impactThickness ?? profileDefaults.impactThickness ?? 2.5),
  );
  const effectiveImpactOpacity = Math.max(
    0,
    Math.min(1, impactOpacity ?? profileDefaults.impactOpacity ?? 0.65),
  );
  const requestedImpactDensity =
    impactDensity ?? profileDefaults.impactDensity ?? 0.25;
  const effectiveImpactDensity = Number.isFinite(requestedImpactDensity)
    ? Math.max(0, Math.min(1, requestedImpactDensity))
    : 0.25;
  const effectiveOpacity =
    dropletOpacity ??
    (dropStyle ? preset.defaultOpacity : profileDefaults.dropletOpacity) ??
    preset.defaultOpacity ??
    0.5;
  const requestedAngle = angle ?? profileDefaults.angle ?? 0;
  const baseAngle = Number.isFinite(requestedAngle)
    ? Math.max(-75, Math.min(75, requestedAngle))
    : 0;
  // Wind adds a stable lean in its prevailing direction. Gust animation adds
  // only a small path drift, so the drops do not rapidly reverse their tilt.
  const windLean = showWind
    ? (Math.sign(baseAngle) || 1) * Math.min(14, safeWindVariation * 0.4)
    : 0;
  const effectiveAngle = Math.max(-75, Math.min(75, baseAngle + windLean));
  const effectiveDepth = depth ?? profileDefaults.depth ?? false;
  const effectiveDuration = duration ?? profileDefaults.duration ?? "normal";
  const speedMultiplier =
    effectiveDuration === "fast" ? 1.3 : effectiveDuration === "slow" ? 0.7 : 1;
  const requestedNumDrops = numDrops ?? profileDefaults.numDrops;
  const effectiveNumDrops = Number.isFinite(requestedNumDrops)
    ? requestedNumDrops
    : undefined; // falls back to the width-based count
  const safeIntensity = Number.isFinite(intensity)
    ? Math.max(0, Math.min(1, intensity))
    : 1;
  const qualityScale = quality === "low" ? 0.4 : quality === "medium" ? 0.7 : 1;
  const safeMaxDrops = Number.isFinite(maxDrops)
    ? Math.max(0, Math.min(5000, Math.floor(maxDrops ?? 600)))
    : 600;
  const angleRadians = (effectiveAngle * Math.PI) / 180;
  const horizontalDriftPerPixel = Math.tan(angleRadians);
  const requestedDrops =
    effectiveNumDrops === undefined
      ? Math.floor(maxWidth / profileDefaults.dropsPerWidth)
      : Math.floor(effectiveNumDrops);
  const requestedDropsCount = Math.max(
    0,
    Math.floor(requestedDrops * safeIntensity * qualityScale),
  );
  const totalFallDistance = maxHeight;
  const totalHorizontalDrift = horizontalDriftPerPixel * totalFallDistance;
  const rotatedDropHalfWidth =
    (dropDimensions.height *
      (effectiveDepth ? 1.45 : 1) *
      Math.abs(Math.sin(angleRadians))) /
    2;
  const coverageStart =
    Math.min(0, totalHorizontalDrift) - rotatedDropHalfWidth;
  const coverageEnd =
    Math.max(maxWidth, maxWidth + totalHorizontalDrift) + rotatedDropHalfWidth;
  const coverageWidth = Math.max(0, coverageEnd - coverageStart);
  const coverageMultiplier = maxWidth > 0 ? coverageWidth / maxWidth : 0;
  const calculatedDropCount = rainFromClouds
    ? numDrops === undefined
      ? Math.min(
          requestedDropsCount,
          Math.max(12, Math.ceil(requestedDropsCount * 0.1)),
        )
      : requestedDropsCount
    : Math.ceil(requestedDropsCount * coverageMultiplier);
  const numDropsCount = Math.min(safeMaxDrops, calculatedDropCount);

  const drops: ReactElement[] = [];
  const baseDropHeight = dropDimensions.height;
  const baseColor = dropletColor ?? profileDefaults.dropletColor;
  const colorVariesPerDrop = profile === "rainbow" && baseColor === undefined;

  const fixedColor = colorVariesPerDrop
    ? null
    : selectDropletColor(baseColor, profile);

  const fixedRgb = fixedColor ? toRgbChannels(fixedColor) : "";

  for (let i = 0; i < numDropsCount; i++) {
    const r = (channel: number) => hash01(i, channel);
    const stableImpactSample = (((i + 1) * 2654435761) >>> 0) / 4294967296;
    const shouldShowImpact =
      effectiveShowImpact && stableImpactSample < effectiveImpactDensity;
    const depthPosition = effectiveDepth ? r(0) : 1;
    const depthScale = effectiveDepth ? 0.55 + depthPosition * 0.9 : 1;
    const depthOpacity = effectiveDepth ? 0.35 + depthPosition * 0.65 : 1;
    const depthBlur = effectiveDepth ? (1 - depthPosition) * 1.2 : 0;
    const sourceTop = rainFromClouds
      ? Math.max(
          0,
          Math.min(maxHeight * 0.4, localCloudSize * (0.29 + r(1) * 0.06)),
        )
      : 0;

    const fallDistance = maxHeight - sourceTop;
    const dropHorizontalDrift = horizontalDriftPerPixel * fallDistance;
    const depthSpeed = effectiveDepth ? 0.75 + depthPosition * 0.5 : 1;
    const durationSeconds = (0.9 + r(2) * 0.8) / (speedMultiplier * depthSpeed);

    // Positive delays stagger launches from the top. Negative delays start
    // some drops partway through their cycle, which can show a splash before
    // that drop has visibly fallen.
    const randomDelaySeconds = r(3) * durationSeconds;
    const landingLeft = rainFromClouds
      ? ((Math.floor(r(4) * localCloudCount) + 0.5) / localCloudCount) *
          maxWidth +
        (r(5) - 0.5) * localCloudSize * 0.34
      : coverageStart + ((i * GOLDEN) % 1) * coverageWidth;
    const left = landingLeft - dropHorizontalDrift;
    const dropColor =
      fixedColor ?? selectDropletColor(baseColor, profile, r(8));

    const rgb = fixedColor ? fixedRgb : toRgbChannels(dropColor);

    const animationStyle: CSSProperties = {
      animationDuration: `${durationSeconds.toFixed(2)}s`,
      animationDelay: `${randomDelaySeconds.toFixed(2)}s`,
      animationFillMode: "both",
    };
    const containerAnimationStyle = showWind
      ? ({
          ...animationStyle,
          animationName: "rain-drop-fall, rain-drop-wind-drift",
          animationDuration: `${durationSeconds.toFixed(2)}s, ${safeGustFrequency * 3.5}s`,
          animationDelay: `${randomDelaySeconds.toFixed(2)}s, ${-((i % 7) / 7) * safeGustFrequency * 3.5}s`,
          animationTimingFunction: "linear, ease-in-out",
          animationIterationCount: "infinite, infinite",
          animationFillMode: "both, none",
          "--wind-push": `${(Math.sign(effectiveAngle) || 1) * Math.min(24, Math.tan((safeWindVariation * 0.5 * Math.PI) / 180) * maxHeight * 0.12)}px`,
        } as CSSProperties)
      : animationStyle;
    const dropletAnimationStyle =
      effectiveDropStyle === "snowflake"
        ? ({
            ...animationStyle,
            animationName: "rain-drop-fade, rain-snow-tumble",
            animationDuration: `${durationSeconds.toFixed(2)}s, ${Math.max(2, durationSeconds * 2.8).toFixed(2)}s`,
            animationDelay: `${randomDelaySeconds.toFixed(2)}s, 0s`,
            animationTimingFunction: "linear, ease-in-out",
            animationIterationCount: "infinite, infinite",
            animationFillMode: "both, none",
          } as CSSProperties)
        : animationStyle;

    drops.push(
      <DropletContainer
        key={`drop-${i}`}
        maxHeight={fallDistance}
        gapLength={left}
        size={effectiveSize}
        angle={effectiveAngle}
        style={{
          ...containerAnimationStyle,
          ...(rainFromClouds
            ? { top: `${sourceTop - dropDimensions.height}px`, bottom: "auto" }
            : { bottom: "100%" }),
          ...({
            "--reduced-top": `${Math.round(r(6) * 840) / 10}%`,
          } as CSSProperties),
          zIndex: effectiveDepth ? Math.ceil(depthPosition * 9) + 1 : 1,
        }}
      >
        <div className="rain-drop-angle">
          <Droplet
            variant={effectiveDropStyle}
            style={{
              ...dropletAnimationStyle,
              transform: `translateX(-50%) rotate(${-effectiveAngle}deg)`,
              color: dropColor,
              width: `${dropDimensions.width * depthScale}px`,
              height: `${baseDropHeight * depthScale}px`,
              opacity:
                effectiveDropStyle === "snowflake"
                  ? effectiveOpacity * depthOpacity
                  : undefined,
              ...(effectiveDropStyle === "snowflake"
                ? ({
                    "--drop-opacity": `${effectiveOpacity * depthOpacity}`,
                  } as CSSProperties)
                : {}),
              bottom: 0,
              filter:
                depthBlur || effectiveDropStyle === "soft"
                  ? `blur(${depthBlur + (effectiveDropStyle === "soft" ? 1 : 0)}px)`
                  : undefined,
              backgroundImage: dropBackground(
                effectiveDropStyle,
                rgb,
                effectiveOpacity * depthOpacity,
              ),
            }}
          />
        </div>

        {shouldShowImpact && (
          <DropImpact
            variant={effectiveImpactStyle}
            thickness={effectiveImpactThickness * depthScale}
            style={{
              display: "block",
              ...animationStyle,
              color: dropColor,
              opacity: depthOpacity * effectiveImpactOpacity,
              filter: depthBlur ? `blur(${depthBlur}px)` : undefined,
            }}
          />
        )}
      </DropletContainer>,
    );
  }

  return drops;
};

export default mapDroplets;
