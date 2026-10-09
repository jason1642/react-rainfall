import React from "react";
import mapDroplets from "./MapDroplets";
import type { dropletOptions } from "./rainTypes";
import "./Rain.css";

const Rain: React.FunctionComponent<dropletOptions> = ({
  numDrops,
  dropletColor,
  size,
  showImpact,
  rainEffect,
  dropletOpacity,
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
          rainEffect,
          dropletOpacity,
        },
      ),
    );
  }, [numDrops, dropletColor, size, showImpact, rainEffect, dropletOpacity]);

  return (
    <div ref={rainRef} className="rain-container">
      {dropletArray}
    </div>
  );
};

export default Rain;
