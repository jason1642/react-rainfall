import React from "react";
import mapDroplets from "./MapDroplets";
import type { dropletOptions } from "./rainTypes";
import {
  getRainProfileClassName,
  getResolvedStormOptions,
} from "./rain-profiles";
import CloudLayer from "./storm/CloudLayer";
import LightningLayer from "./storm/LightningLayer";
import WindLayer from "./storm/WindLayer";
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
  showLightning,
  lightningFrequency,
  lightningFlashDuration,
  lightningColor,
  dropStyle,
  depth,
  showWind = false,
}) => {
  const stormOptions = getResolvedStormOptions(profile, {
    showClouds,
    cloudCount,
    cloudSize,
    cloudSpeed,
    cloudOpacity,
    cloudDrift,
    showLightning,
    lightningFrequency,
    lightningFlashDuration,
    lightningColor,
  });

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
      {stormOptions.showClouds && (
        <CloudLayer
          count={stormOptions.cloudCount}
          size={stormOptions.cloudSize}
          speed={stormOptions.cloudSpeed}
          opacity={stormOptions.cloudOpacity}
          drift={stormOptions.cloudDrift}
        />
      )}
      {dropletArray}
      {showWind && <WindLayer />}
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
