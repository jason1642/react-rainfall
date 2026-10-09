import type { CSSProperties, ReactElement } from "react";
import Droplet from "./Droplet/Droplet";
import DropImpact from "./impact/Impact";
import DropletContainer from "./drop-container/DropContainer";
import type { dropletOptions } from "./rainTypes";
import selectDropletColor from "./select-droplet-color";

const mapDroplets = (
  rainRef: { maxWidth: number; maxHeight: number },
  options: dropletOptions,
): ReactElement[] => {
  const {
    dropletColor,
    numDrops,
    showImpact = true,
    size = "default",
    rainEffect,
    dropletOpacity = 0.5,
  } = options;

  const { maxWidth, maxHeight } = rainRef;
  const requestedDrops = numDrops === undefined
    ? Math.floor(maxWidth / 25)
    : Math.floor(numDrops);
  const numDropsCount = Math.max(0, requestedDrops);
  const columnWidth = numDropsCount > 0 ? maxWidth / numDropsCount : 0;

  const drops: ReactElement[] = [];

  for (let i = 0; i < numDropsCount; i++) {
    const durationSeconds = 0.7 + Math.random() * 0.8;
    const randomDelaySeconds = Math.random() * durationSeconds;
    const horizontalJitter = (Math.random() - 0.5) * columnWidth * 0.7;
    const left = Math.max(
      0,
      Math.min(maxWidth - 15, i * columnWidth + horizontalJitter),
    );
    const dropColor = selectDropletColor(dropletColor, rainEffect);
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
        size={size}
        style={{
          ...animationStyle,
          bottom: `${102 + Math.random() * 8}%`,
        }}
      >
        <Droplet
          style={{
            ...animationStyle,
            backgroundImage: `linear-gradient(to bottom, rgba(${rgb}, 0), rgba(${rgb}, ${dropletOpacity}))`,
          }}
        />

        {showImpact && (
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
