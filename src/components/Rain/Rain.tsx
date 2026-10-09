import React from "react";
import mapDroplets from "./MapDroplets";
import type { dropletOptions } from "./rainTypes";
import { getRainProfileClassName } from "./rain-profiles";
import CloudLayer from "./storm/CloudLayer";
import LightningLayer from "./storm/LightningLayer";
import "./Rain.css";

const Rain: React.FunctionComponent<dropletOptions> = ({
  numDrops,
  dropletColor,
  size,
  showImpact,
  profile,
  dropletOpacity,
  angle,
  showClouds = false,
  cloudCount = 3,
  cloudSize = 320,
  cloudSpeed = 36,
  cloudOpacity = 0.4,
  cloudDrift = 120,
  showLightning = false,
  lightningFrequency = 9,
  lightningFlashDuration = 450,
  lightningColor = "#eaf3ff",
  dropStyle = "streak",
  depth = false,
}) => {
  const rainRef = React.useRef<HTMLDivElement>(null);
  const [dropletArray, setDropletArray] = React.useState<React.ReactElement[]>(
    [],
  );

  React.useEffect(() => {
    const element = rainRef.current;
    if (!element) return;

    setDropletArray(
      mapDroplets(
        {
          maxWidth: element.clientWidth,
          maxHeight: element.clientHeight,
        },
        {
          numDrops,
          dropletColor,
          size,
          showImpact,
          profile,
          dropletOpacity,
          angle,
          dropStyle,
          depth,
        },
      ),
    );
  }, [
    numDrops,
    dropletColor,
    size,
    showImpact,
    profile,
    dropletOpacity,
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
      {showClouds && (
        <CloudLayer
          count={cloudCount}
          size={cloudSize}
          speed={cloudSpeed}
          opacity={cloudOpacity}
          drift={cloudDrift}
        />
      )}
      {dropletArray}
      {showLightning && (
        <LightningLayer
          frequency={lightningFrequency}
          flashDuration={lightningFlashDuration}
          color={lightningColor}
        />
      )}
    </div>
  );
};

export default Rain;
