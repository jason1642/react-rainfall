import React from "react";
import mapDroplets from "./MapDroplets";
import type { dropletOptions } from "./rainTypes";
import {
  getRainProfileClassName,
  getResolvedStormOptions,
  getResolvedWindOptions,
} from "./rain-profiles";
import CloudLayer from "./storm/CloudLayer";
import LightningLayer from "./storm/LightningLayer";
import WindLayer from "./storm/WindLayer";
import GlassLayer from "./surface/GlassLayer";
import "./Rain.css";

const Rain: React.FunctionComponent<dropletOptions> = ({
  numDrops,
  dropletColor,
  size,
  showImpact,
  impactStyle,
  impactThickness,
  impactOpacity,
  profile,
  dropletOpacity,
  duration,
  angle,
  showClouds,
  cloudCount,
  cloudSize,
  cloudSpeed,
  cloudOpacity,
  cloudDrift,
  cloudBlur,
  cloudColor,
  cloudProfile,
  showLightning,
  lightningFrequency,
  lightningFlashDuration,
  lightningColor,
  dropStyle,
  depth,
  rainFromClouds = false,
  showWind,
  windProfile,
  windVariation,
  gustFrequency,
  surface = "air",
  glassFog = 0.18,
  glassRefraction = 2,
}) => {
  const stormOptions = getResolvedStormOptions(profile, {
    showClouds,
    cloudCount,
    cloudSize,
    cloudSpeed,
    cloudOpacity,
    cloudDrift,
    cloudBlur,
    cloudColor,
    cloudProfile,
    showLightning,
    lightningFrequency,
    lightningFlashDuration,
    lightningColor,
  });
  const windOptions = getResolvedWindOptions(windProfile, {
    showWind,
    windVariation,
    gustFrequency,
  });
  const effectiveShowWind = windOptions.showWind;
  const effectiveCloudCount = rainFromClouds
    ? Math.max(1, stormOptions.cloudCount)
    : stormOptions.cloudCount;
  const effectiveCloudDrift = rainFromClouds && cloudDrift === undefined
    ? 0
    : stormOptions.cloudDrift;
  const safeWindVariation = Number.isFinite(windOptions.windVariation)
    ? Math.max(0, Math.min(30, windOptions.windVariation))
    : 8;
  const safeGustFrequency = Number.isFinite(windOptions.gustFrequency)
    ? Math.max(1, Math.min(120, windOptions.gustFrequency))
    : 8;

  const rainRef = React.useRef<HTMLDivElement>(null);
  const [dropletArray, setDropletArray] = React.useState<React.ReactElement[]>(
    [],
  );

  React.useEffect(() => {
    const element = rainRef.current;
    if (!element) return;

    const updateDroplets = () => {
      const maxWidth = element.clientWidth;
      const maxHeight = element.clientHeight;

      if (maxWidth <= 0 || maxHeight <= 0) {
        setDropletArray([]);
        return;
      }

      setDropletArray(
        mapDroplets(
          { maxWidth, maxHeight },
          {
            numDrops,
            dropletColor,
            size,
            showImpact,
            impactStyle,
            impactThickness,
            impactOpacity,
            profile,
            dropletOpacity,
            duration,
            angle,
            dropStyle,
            depth,
            rainFromClouds,
            cloudCount: effectiveCloudCount,
            cloudSize: stormOptions.cloudSize,
            showWind: effectiveShowWind,
            windVariation: safeWindVariation,
            gustFrequency: safeGustFrequency,
          },
        ),
      );
    };

    updateDroplets();
    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateDroplets);
      observer.observe(element);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateDroplets);
    return () => window.removeEventListener("resize", updateDroplets);
  }, [
    numDrops,
    dropletColor,
    size,
    showImpact,
    impactStyle,
    impactThickness,
    impactOpacity,
    profile,
    dropletOpacity,
    duration,
    angle,
    dropStyle,
    depth,
    rainFromClouds,
    effectiveShowWind,
    windProfile,
    safeWindVariation,
    safeGustFrequency,
    effectiveCloudCount,
    stormOptions.cloudSize,
  ]);

  return (
    <div
      ref={rainRef}
      className={[
        "rain-container",
        getRainProfileClassName(profile),
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {(stormOptions.showClouds || rainFromClouds) && (
        <CloudLayer
          count={effectiveCloudCount}
          size={stormOptions.cloudSize}
          speed={stormOptions.cloudSpeed}
          opacity={stormOptions.cloudOpacity}
          drift={effectiveCloudDrift}
          blur={stormOptions.cloudBlur}
          color={stormOptions.cloudColor}
          windVariation={effectiveShowWind ? safeWindVariation : 0}
          gustFrequency={safeGustFrequency}
        />
      )}
      {dropletArray}
      {surface === "glass" && (
        <GlassLayer fog={glassFog} refraction={glassRefraction} />
      )}
      {effectiveShowWind && (
        <WindLayer gustFrequency={safeGustFrequency} windVariation={safeWindVariation} strength={windOptions.windStrength} />
      )}
      {stormOptions.showLightning && (
        <LightningLayer
          frequency={stormOptions.lightningFrequency}
          flashDuration={stormOptions.lightningFlashDuration}
          color={stormOptions.lightningColor}
        />
      )}
    </div>
  );
};

export default Rain;
