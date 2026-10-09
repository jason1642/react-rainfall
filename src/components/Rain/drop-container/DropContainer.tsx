import "./dropContainer.css";
import type { CSSProperties, ReactNode, HTMLAttributes } from "react";
import dropletSizes from "../droplet-sizes";
import type { size } from "../rainTypes";
import React from "react";

interface DropContainerProps extends HTMLAttributes<HTMLDivElement> {
  gapLength: number;
  maxHeight: number;
  size: size;
  style?: CSSProperties;
  children?: ReactNode;
}

type DropContainerStyle = CSSProperties & {
  "--drop-left": string;
  "--drop-height": string;
  "--fall-75": string;
  "--fall-100": string;
};

const DropContainer: React.FunctionComponent<DropContainerProps> = ({
  gapLength,
  maxHeight,
  size,
  style,
  children,
  ...divProps
}) => {
  const dropHeight = dropletSizes(size);

  const containerStyle: DropContainerStyle = {
    ...style,
    "--drop-left": `${gapLength}px`,
    "--drop-height": `${dropHeight}px`,
    "--fall-75": `${maxHeight * 0.9 + dropHeight}px`,
    "--fall-100": `${maxHeight + dropHeight}px`,
  };

  return (
    <div {...divProps} className="rain-drop-container" style={containerStyle}>
      {children}
    </div>
  );
};

export default DropContainer;
