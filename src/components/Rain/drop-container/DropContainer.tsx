import "./dropContainer.css";
import type { CSSProperties, ReactNode, HTMLAttributes } from "react";
import dropletSizes from "../droplet-sizes";
import type { size } from "../rainTypes";
import React from "react";

interface DropContainerProps extends HTMLAttributes<HTMLDivElement> {
  gapLength: number;
  maxHeight: number;
  size: size;
  angle?: number;
  style?: CSSProperties;
  children?: ReactNode;
}

type DropContainerStyle = CSSProperties & {
  "--drop-left": string;
  "--drop-height": string;
  "--fall-75": string;
  "--fall-100": string;
  "--fall-x-75": string;
  "--fall-x-100": string;
};

const DropContainer: React.FunctionComponent<DropContainerProps> = ({
  gapLength,
  maxHeight,
  size,
  angle = 0,
  style,
  children,
  ...divProps
}) => {
  const dropHeight = dropletSizes(size);
  const fall75 = maxHeight * 0.9 + dropHeight;
  const fall100 = maxHeight + dropHeight;
  const horizontalShift = (fall: number) =>
    `${Math.tan((angle * Math.PI) / 180) * fall}px`;

  const containerStyle: DropContainerStyle = {
    ...style,
    "--drop-left": `${gapLength}px`,
    "--drop-height": `${dropHeight}px`,
    "--fall-75": `${fall75}px`,
    "--fall-100": `${fall100}px`,
    "--fall-x-75": horizontalShift(fall75),
    "--fall-x-100": horizontalShift(fall100),
  };

  return (
    <div {...divProps} className="rain-drop-container" style={containerStyle}>
      {children}
    </div>
  );
};

export default DropContainer;
