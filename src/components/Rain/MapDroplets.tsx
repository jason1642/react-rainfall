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
    size,
    profile,
    dropletOpacity,
    angle = 0,
    dropStyle = "streak",
    depth = false,
  } = options;

  const { maxWidth, maxHeight } = rainRef;
  const profileDefaults = getRainProfileDefaults(profile);
  const effectiveSize = size ?? profileDefaults.size ?? "default";
  const effectiveShowImpact = showImpact ?? profileDefaults.showImpact ?? true;
  const effectiveOpacity =
    dropletOpacity ?? profileDefaults.dropletOpacity ?? 0.5;
  const effectiveAngle = Number.isFinite(angle)
    ? Math.max(-75, Math.min(75, angle))
    : 0;
  const angleRadians = (effectiveAngle * Math.PI) / 180;
  const horizontalDriftPerPixel = Math.tan(angleRadians);
  const requestedDrops =
    numDrops === undefined
      ? Math.floor(maxWidth / profileDefaults.dropsPerWidth)
      : Math.floor(numDrops);
  const requestedDropsCount = Math.max(0, requestedDrops);
  const totalFallDistance = maxHeight + dropletSizes(effectiveSize);
  const totalHorizontalDrift =
    horizontalDriftPerPixel * totalFallDistance;
  const rotatedDropHalfWidth =
    (dropletSizes(effectiveSize) * (depth ? 1.45 : 1) *
      Math.abs(Math.sin(angleRadians))) /
    2;
  const coverageStart = Math.min(0, totalHorizontalDrift) - rotatedDropHalfWidth;
  const coverageEnd =
    Math.max(maxWidth, maxWidth + totalHorizontalDrift) +
    rotatedDropHalfWidth;
  const coverageWidth = Math.max(0, coverageEnd - coverageStart);
  const coverageMultiplier = maxWidth > 0 ? coverageWidth / maxWidth : 0;
  const numDropsCount = Math.ceil(
    requestedDropsCount * coverageMultiplier,
  );
  const columnWidth = numDropsCount > 0 ? coverageWidth / numDropsCount : 0;

  const drops: ReactElement[] = [];
  const dropDimensions = {
    streak: { width: 2, height: 100 },
    pixel: { width: 8, height: 100 },
    soft: { width: 4, height: 100 },
    orb: { width: 7, height: 42 },
  }[dropStyle];

  for (let i = 0; i < numDropsCount; i++) {
    const depthPosition = depth ? Math.random() : 1;
    const depthScale = depth ? 0.55 + depthPosition * 0.9 : 1;
    const depthOpacity = depth ? 0.35 + depthPosition * 0.65 : 1;
    const depthBlur = depth ? (1 - depthPosition) * 1.2 : 0;
    const durationSeconds = 0.7 + Math.random() * 0.8;
    const randomDelaySeconds = Math.random() * durationSeconds;
    const horizontalJitter = (Math.random() - 0.5) * columnWidth * 0.7;
    const landingLeft = coverageStart + i * columnWidth + horizontalJitter;
    const left = landingLeft - horizontalDriftPerPixel * totalFallDistance;
    const dropColor = selectDropletColor(
      dropletColor ?? profileDefaults.dropletColor,
      profile,
    );
    const rgb = dropColor.match(/\(([^)]+)\)/)?.[1] ?? "255, 255, 255";

    const animationStyle: CSSProperties = {
      animationDuration: `${durationSeconds.toFixed(2)}s`,
      animationDelay: `-${randomDelaySeconds.toFixed(2)}s`,
    };

    drops.push(
      <DropletContainer
        key={`drop-${i}`}
        maxHeight={maxHeight}
        gapLength={left}
        size={effectiveSize}
        angle={effectiveAngle}
        style={{
          ...animationStyle,
          bottom: `${102 + Math.random() * 8}%`,
          zIndex: depth ? Math.ceil(depthPosition * 9) + 1 : 1,
        }}
      >
        <Droplet
          variant={dropStyle}
          style={{
            ...animationStyle,
            transform: `translateX(-50%) rotate(${-effectiveAngle}deg)`,
            width: `${dropDimensions.width * depthScale}px`,
            height: `${dropDimensions.height * depthScale}%`,
            bottom: 0,
            filter:
              depthBlur || dropStyle === "soft"
                ? `blur(${depthBlur + (dropStyle === "soft" ? 1 : 0)}px)`
                : undefined,
            backgroundImage: `linear-gradient(to bottom, rgba(${rgb}, 0), rgba(${rgb}, ${effectiveOpacity * depthOpacity}))`,
          }}
        />

        {effectiveShowImpact && (
          <DropImpact
            style={{
              display: "block",
              ...animationStyle,
              borderTop: `2px dotted ${dropColor}`,
            }}
          />
        )}
      </DropletContainer>,
    );
  }

  return drops;
};

export default mapDroplets;
