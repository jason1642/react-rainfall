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
import CanvasRainLayer from "./CanvasRainLayer";
import "./Rain.css";

const clampIntensity = (value: number) =>
  Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 1;

const Rain = React.forwardRef<RainHandle, dropletOptions>(
  (
    {
      numDrops,
      dropletColor,
      size,
      showImpact,
      impactStyle,
      impactThickness,
      impactOpacity,
      impactDensity,
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
      visible,
      intensity: intensityProp,
      quality,
      maxDrops,
      dropStyle,
      depth,
      rainFromClouds = false,
      showWind,
      windProfile,
      windVariation,
      gustFrequency,
      pauseWhenHidden = false,
      respectReducedMotion = false,
      surface = "air",
      glassFog = 0.18,
      glassRefraction = 2,
      renderer = "dom",
    },
    ref,
  ) => {
    const [isRunning, setIsRunning] = React.useState(playing ?? true);
    const [isVisible, setIsVisible] = React.useState(visible ?? true);
    const [intensity, setIntensityState] = React.useState(
      clampIntensity(intensityProp ?? 1),
    );
    const [lightningTrigger, setLightningTrigger] = React.useState(0);

    React.useEffect(() => {
      if (playing !== undefined) setIsRunning(playing);
    }, [playing]);

    React.useEffect(() => {
      if (visible !== undefined) setIsVisible(visible);
    }, [visible]);

    // a flash requested before hiding shouldn't replay when the rain comes back
    React.useEffect(() => {
      if (!isVisible) setLightningTrigger(0);
    }, [isVisible]);

    React.useEffect(() => {
      if (intensityProp !== undefined) {
        setIntensityState(clampIntensity(intensityProp));
      }
    }, [intensityProp]);

    React.useImperativeHandle(
      ref,
      () => ({
        start: () => setIsRunning(true),
        stop: () => setIsRunning(false),
        show: () => setIsVisible(true),
        hide: () => setIsVisible(false),
        setIntensity: (value) => setIntensityState(clampIntensity(value)),
        triggerLightning: () => {
          if (isVisible) setLightningTrigger((current) => current + 1);
        },
      }),
      [isVisible],
    );

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
    const effectiveCloudDrift =
      rainFromClouds && cloudDrift === undefined ? 0 : stormOptions.cloudDrift;
    const safeWindVariation = Number.isFinite(windOptions.windVariation)
      ? Math.max(0, Math.min(30, windOptions.windVariation))
      : 8;
    const safeGustFrequency = Number.isFinite(windOptions.gustFrequency)
      ? Math.max(1, Math.min(120, windOptions.gustFrequency))
      : 8;

    const canvasOptions = React.useMemo<dropletOptions>(
      () => ({
        numDrops,
        dropletColor,
        size,
        showImpact,
        impactStyle,
        impactThickness,
        impactOpacity,
        impactDensity,
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
        quality,
        maxDrops,
      }),
      [
        numDrops,
        dropletColor,
        size,
        showImpact,
        impactStyle,
        impactThickness,
        impactOpacity,
        impactDensity,
        profile,
        dropletOpacity,
        duration,
        angle,
        dropStyle,
        depth,
        rainFromClouds,
        effectiveCloudCount,
        stormOptions.cloudSize,
        effectiveShowWind,
        safeWindVariation,
        safeGustFrequency,
        intensity,
        quality,
        maxDrops,
      ],
    );

    const rainRef = React.useRef<HTMLDivElement>(null);
    const [dropletArray, setDropletArray] = React.useState<
      React.ReactElement[]
    >([]);

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

      // canvas draws its own particles, and a hidden scene has none
      if (renderer === "canvas" || !isVisible) {
        setDropletArray([]);
        return;
      }

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
              impactDensity,
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
              quality,
              maxDrops,
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
      impactDensity,
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
      quality,
      maxDrops,
      renderer,
      isVisible,
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
        {isVisible && (
          <>
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
            {renderer === "canvas" ? (
              <CanvasRainLayer
                options={canvasOptions}
                running={isRunning}
                pauseWhenHidden={pauseWhenHidden}
                respectReducedMotion={respectReducedMotion}
              />
            ) : (
              dropletArray
            )}
            {surface === "glass" && (
              <GlassLayer fog={glassFog} refraction={glassRefraction} />
            )}
            {effectiveShowWind && (
              <WindLayer
                gustFrequency={safeGustFrequency}
                windVariation={safeWindVariation}
                strength={windOptions.windStrength}
              />
            )}
            {((stormOptions.showLightning && isRunning) ||
              lightningTrigger > 0) && (
              <LightningLayer
                frequency={stormOptions.lightningFrequency}
                flashDuration={stormOptions.lightningFlashDuration}
                color={stormOptions.lightningColor}
                auto={stormOptions.showLightning && isRunning}
                triggerId={lightningTrigger}
              />
            )}
          </>
        )}
      </div>
    );
  },
);

Rain.displayName = "Rain";

export default Rain;
