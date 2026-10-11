import type { CSSProperties, ReactElement } from "react";
import Droplet from "./Droplet/Droplet";
import DropImpact from "./impact/Impact";
import DropletContainer from "./drop-container/DropContainer";
import dropletSizes from "./droplet-sizes";
import type { dropletOptions } from "./rainTypes";
import { getRainProfileDefaults } from "./rain-profiles";
import selectDropletColor from "./select-droplet-color";

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
  } = options;

  const { maxWidth, maxHeight } = rainRef;
  const profileDefaults = getRainProfileDefaults(profile);
  const localCloudCount = Math.max(
    1,
    Math.min(24, Math.floor(cloudCount ?? profileDefaults.cloudCount ?? 3)),
  );
  const localCloudSize = Math.max(80, cloudSize ?? profileDefaults.cloudSize ?? 320);
  const safeWindVariation = Number.isFinite(windVariation)
    ? Math.max(0, Math.min(30, windVariation ?? 0))
    : 0;
  const safeGustFrequency = Number.isFinite(gustFrequency)
    ? Math.max(1, gustFrequency ?? 8)
    : 8;
  const effectiveSize = size ?? profileDefaults.size ?? "default";
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
  const effectiveOpacity =
    dropletOpacity ?? profileDefaults.dropletOpacity ?? 0.5;
  const effectiveAngleValue = angle ?? profileDefaults.angle ?? 0;
  const effectiveAngle = Number.isFinite(effectiveAngleValue)
    ? Math.max(-75, Math.min(75, effectiveAngleValue))
    : 0;
  const effectiveDropStyle = dropStyle ?? profileDefaults.dropStyle ?? "streak";
  const effectiveDepth = depth ?? profileDefaults.depth ?? false;
  const effectiveDuration = duration ?? profileDefaults.duration ?? "normal";
  const speedMultiplier =
    effectiveDuration === "fast" ? 1.3 : effectiveDuration === "slow" ? 0.7 : 1;
  const effectiveNumDrops = numDrops ?? profileDefaults.numDrops;
  const angleRadians = (effectiveAngle * Math.PI) / 180;
  const horizontalDriftPerPixel = Math.tan(angleRadians);
  const requestedDrops =
    effectiveNumDrops === undefined
      ? Math.floor(maxWidth / profileDefaults.dropsPerWidth)
      : Math.floor(effectiveNumDrops);
  const requestedDropsCount = Math.max(0, requestedDrops);
  const totalFallDistance = maxHeight;
  const totalHorizontalDrift = horizontalDriftPerPixel * totalFallDistance;
  const rotatedDropHalfWidth =
    (dropletSizes(effectiveSize) *
      (effectiveDepth ? 1.45 : 1) *
      Math.abs(Math.sin(angleRadians))) /
    2;
  const coverageStart =
    Math.min(0, totalHorizontalDrift) - rotatedDropHalfWidth;
  const coverageEnd =
    Math.max(maxWidth, maxWidth + totalHorizontalDrift) + rotatedDropHalfWidth;
  const coverageWidth = Math.max(0, coverageEnd - coverageStart);
  const coverageMultiplier = maxWidth > 0 ? coverageWidth / maxWidth : 0;
  const numDropsCount = rainFromClouds
    ? numDrops === undefined
      ? Math.min(
          requestedDropsCount,
          Math.max(12, Math.ceil(requestedDropsCount * 0.1)),
        )
      : requestedDropsCount
    : Math.ceil(requestedDropsCount * coverageMultiplier);
  const columnWidth = numDropsCount > 0 ? coverageWidth / numDropsCount : 0;

  const drops: ReactElement[] = [];
  const dropDimensions = {
    streak: { width: 2, height: { short: 10, default: 19, long: 34 } },
    pixel: { width: 8, height: { short: 12, default: 22, long: 34 } },
    soft: { width: 4, height: { short: 14, default: 24, long: 36 } },
    orb: { width: 7, height: { short: 7, default: 9, long: 12 } },
    snowflake: { width: 10, height: { short: 10, default: 13, long: 16 } },
    hailstone: { width: 8, height: { short: 9, default: 12, long: 16 } },
  }[effectiveDropStyle];
  const baseDropHeight = dropDimensions.height[effectiveSize];

  for (let i = 0; i < numDropsCount; i++) {
    const depthPosition = effectiveDepth ? Math.random() : 1;
    const depthScale = effectiveDepth ? 0.55 + depthPosition * 0.9 : 1;
    const depthOpacity = effectiveDepth ? 0.35 + depthPosition * 0.65 : 1;
    const depthBlur = effectiveDepth ? (1 - depthPosition) * 1.2 : 0;
    const sourceTop = rainFromClouds
      ? Math.max(0, Math.min(maxHeight * 0.4, localCloudSize * (0.29 + Math.random() * 0.06)))
      : 0;
    const fallDistance = maxHeight - sourceTop;
    const dropHorizontalDrift = horizontalDriftPerPixel * fallDistance;
    const depthSpeed = effectiveDepth ? 0.75 + depthPosition * 0.5 : 1;
    const durationSeconds =
      (0.9 + Math.random() * 0.8) / (speedMultiplier * depthSpeed);
    // Positive delays stagger launches from the top. Negative delays start
    // some drops partway through their cycle, which can show a splash before
    // that drop has visibly fallen.
    const randomDelaySeconds = Math.random() * durationSeconds;
    const horizontalJitter = (Math.random() - 0.5) * columnWidth * 0.7;
    const landingLeft = rainFromClouds
      ? ((Math.floor(Math.random() * localCloudCount) + 0.5) /
          localCloudCount) *
          maxWidth +
        (Math.random() - 0.5) * localCloudSize * 0.34
      : coverageStart + i * columnWidth + horizontalJitter;
    const left = landingLeft - dropHorizontalDrift;
    const dropColor = selectDropletColor(
      dropletColor ?? profileDefaults.dropletColor,
      profile,
    );
    const rgb = dropColor.match(/\(([^)]+)\)/)?.[1] ?? "255, 255, 255";

    const animationStyle: CSSProperties = {
      animationDuration: `${durationSeconds.toFixed(2)}s`,
      animationDelay: `${randomDelaySeconds.toFixed(2)}s`,
      animationFillMode: "both",
    };
    const containerAnimationStyle = showWind
      ? ({
          ...animationStyle,
          animationName: "rain-drop-fall, rain-drop-wind-sway",
          animationDuration: `${durationSeconds.toFixed(2)}s, ${safeGustFrequency}s`,
          animationDelay: `${randomDelaySeconds.toFixed(2)}s, 0s`,
          animationTimingFunction: "linear, ease-in-out",
          animationIterationCount: "infinite, infinite",
          animationFillMode: "both, none",
          "--wind-sway": `${Math.min(80, Math.tan((safeWindVariation * Math.PI) / 180) * maxHeight)}px`,
          "--wind-sway-left": `${-Math.min(80, Math.tan((safeWindVariation * Math.PI) / 180) * maxHeight) * 0.35}px`,
        } as CSSProperties)
      : animationStyle;
    const dropletAnimationStyle = showWind
      ? {
          ...animationStyle,
          animationName: "rain-drop-fade, rain-drop-angle-sway",
          animationDuration: `${durationSeconds.toFixed(2)}s, ${safeGustFrequency}s`,
          animationDelay: `${randomDelaySeconds.toFixed(2)}s, 0s`,
          animationTimingFunction: "linear, ease-in-out",
          animationIterationCount: "infinite, infinite",
          animationFillMode: "both, none",
          rotate: "0deg",
          "--wind-angle": `${safeWindVariation}deg`,
          "--wind-angle-reverse": `${-safeWindVariation}deg`,
        } as CSSProperties
      : effectiveDropStyle === "snowflake"
        ? {
            ...animationStyle,
            animationName: "rain-drop-fade, rain-snow-tumble",
            animationDuration: `${durationSeconds.toFixed(2)}s, ${Math.max(2, durationSeconds * 2.8).toFixed(2)}s`,
            animationDelay: `${randomDelaySeconds.toFixed(2)}s, 0s`,
            animationTimingFunction: "linear, ease-in-out",
            animationIterationCount: "infinite, infinite",
            animationFillMode: "both, none",
          } as CSSProperties
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
            ? { top: `${sourceTop - dropletSizes(effectiveSize)}px`, bottom: "auto" }
            : { bottom: "100%" }),
          zIndex: effectiveDepth ? Math.ceil(depthPosition * 9) + 1 : 1,
        }}
      >
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
              ? ({ "--drop-opacity": `${effectiveOpacity * depthOpacity}` } as CSSProperties)
              : {}),
            bottom: 0,
            filter:
              depthBlur || effectiveDropStyle === "soft"
                ? `blur(${depthBlur + (effectiveDropStyle === "soft" ? 1 : 0)}px)`
                : undefined,
            backgroundImage:
              effectiveDropStyle === "snowflake"
                ? undefined
                : effectiveDropStyle === "hailstone"
                  ? `radial-gradient(circle at 30% 25%, rgba(255,255,255,.95), rgba(${rgb}, ${effectiveOpacity * depthOpacity}) 55%, rgba(${rgb}, ${effectiveOpacity * depthOpacity}))`
                  : `linear-gradient(to bottom, rgba(${rgb}, 0), rgba(${rgb}, ${effectiveOpacity * depthOpacity}))`,
            backgroundColor: undefined,
          }}
        />

        {effectiveShowImpact && (
          <DropImpact
            variant={effectiveImpactStyle}
            thickness={effectiveImpactThickness * depthScale}
            style={{
              display: "block",
              ...animationStyle,
              color: dropColor,
              opacity: depthOpacity * effectiveImpactOpacity,
              transform: `translateY(-2px) scale(${depthScale})`,
              transformOrigin: "center bottom",
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
