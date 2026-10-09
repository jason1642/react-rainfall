import type { CSSProperties, ReactElement } from "react";
import Droplet from "../Droplet/Droplet";
import DropImpact from "../impact/Impact";
import DropletContainer from "../drop-container/DropContainer";
import type { dropletOptions } from "../rainTypes";
import selectDropletColor from "../select-droplet-color";

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
  const numDropsCount = numDrops
    ? Math.floor(numDrops)
    : Math.floor(maxWidth / 25);

  const drops: ReactElement[] = [];

  for (let i = 0; i < numDropsCount; i++) {
    const randomUnder1Hundred = Math.floor(Math.random() * 98) + 1;
    const randoFiver = Math.floor(Math.random() * 4) + 2;
    const dropColor = selectDropletColor(dropletColor, rainEffect);
    const rgb = dropColor.match(/\(([^)]+)\)/)?.[1] ?? "255, 255, 255";

    const animationStyle: CSSProperties = {
      animationDuration: `.6${randomUnder1Hundred}s`,
      animationDelay: `.${randomUnder1Hundred}s`,
    };

    drops.push(
      <DropletContainer
        key={`drop-${i}`}
        maxHeight={maxHeight}
        gapLength={(maxWidth / numDropsCount) * i}
        size={size}
        style={{
          ...animationStyle,
          bottom: `${randoFiver * 2 - 1 + 100}%`,
        }}
      >
        <Droplet
          dropletColor={dropletColor}
          style={{
            ...animationStyle,
            background: `linear-gradient(to bottom, rgba(${rgb}, 0), rgba(${rgb}, ${dropletOpacity}))`,
          }}
        />

        {showImpact && (
          <DropImpact
            dropletColor={dropletColor}
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
