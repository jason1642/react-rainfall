import React from "react";
import mapDroplets from "./MapDroplets";
import type { dropletOptions, RainHandle } from "./rainTypes";
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

const clampIntensity = (value: number) =>
  Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 1;

const Rain = React.forwardRef<RainHandle, dropletOptions>(({
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
  playing,
  intensity: intensityProp,
  dropStyle,
  depth,
  rainFromClouds = false,
  showWind,
  windProfile,
  windVariation,
  gustFrequency,
  pauseWhenHidden = false,
  respectReducedMotion = true,
  surface = "air",
  glassFog = 0.18,
  glassRefraction = 2,
}, ref) => {
  const [isRunning, setIsRunning] = React.useState(playing ?? true);
  const [intensity, setIntensityState] = React.useState(
    clampIntensity(intensityProp ?? 1),
  );
  const [lightningTrigger, setLightningTrigger] = React.useState(0);

  React.useEffect(() => {
    if (playing !== undefined) setIsRunning(playing);
  }, [playing]);

  React.useEffect(() => {
    if (intensityProp !== undefined) {
      setIntensityState(clampIntensity(intensityProp));
    }
  }, [intensityProp]);

  React.useImperativeHandle(ref, () => ({
    start: () => setIsRunning(true),
    stop: () => setIsRunning(false),
    setIntensity: (value) => setIntensityState(clampIntensity(value)),
    triggerLightning: () => setLightningTrigger((current) => current + 1),
  }), []);

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
    if (!pauseWhenHidden) {
      element.classList.remove("rain-container--paused");
      return;
    }

    let pageDocument: Document;
    try {
      pageDocument = window.top?.document ?? document;
    } catch {
      pageDocument = document;
    }

    const syncVisibility = () => {
      element.classList.toggle(
        "rain-container--paused",
        pageDocument.visibilityState === "hidden",
      );
    };

    syncVisibility();
    pageDocument.addEventListener("visibilitychange", syncVisibility);
    return () => {
      pageDocument.removeEventListener("visibilitychange", syncVisibility);
      element.classList.remove("rain-container--paused");
    };
  }, [pauseWhenHidden]);

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
            intensity,
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
    intensity,
    effectiveCloudCount,
    stormOptions.cloudSize,
  ]);

  return (
    <div
      ref={rainRef}
      data-respect-reduced-motion={respectReducedMotion}
      className={[
        "rain-container",
        getRainProfileClassName(profile),
        !isRunning && "rain-container--stopped",
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
        />
      )}
      {dropletArray}
      {surface === "glass" && (
        <GlassLayer fog={glassFog} refraction={glassRefraction} />
      )}
      {effectiveShowWind && (
        <WindLayer gustFrequency={safeGustFrequency} windVariation={safeWindVariation} strength={windOptions.windStrength} />
      )}
      {((stormOptions.showLightning && isRunning) || lightningTrigger > 0) && (
        <LightningLayer
          frequency={stormOptions.lightningFrequency}
          flashDuration={stormOptions.lightningFlashDuration}
          color={stormOptions.lightningColor}
          auto={stormOptions.showLightning && isRunning}
          triggerId={lightningTrigger}
        />
      )}
    </div>
  );
});

Rain.displayName = "Rain";

export default Rain;
