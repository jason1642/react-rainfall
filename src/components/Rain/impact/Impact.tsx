import type { CSSProperties } from "react";
import type { impactStyle } from "../rainTypes";
import "./impact.css";

interface DropImpactProps {
  variant?: impactStyle;
  thickness?: number;
  style?: CSSProperties;
}

type ImpactStyle = CSSProperties & {
  "--impact-duration": string;
  "--impact-delay": string;
  "--impact-opacity": string;
  "--impact-size": string;
  "--impact-stroke": string;
  "--impact-secondary-stroke": string;
};

function DropImpact({
  variant = "splash",
  thickness = 2.5,
  style,
}: DropImpactProps) {
  const safeThickness = Number.isFinite(thickness)
    ? Math.max(0.5, Math.min(8, thickness))
    : 2.5;
  const opacity = Number(style?.opacity ?? 1);
  const impactStyle: ImpactStyle = {
    ...style,
    opacity: undefined,
    transform: undefined,
    transformOrigin: undefined,
    animationDuration: undefined,
    animationDelay: undefined,
    "--impact-duration": style?.animationDuration ?? "1s",
    "--impact-delay": style?.animationDelay ?? "0s",
    "--impact-opacity": `${Number.isFinite(opacity) ? Math.max(0, Math.min(1, opacity)) : 1}`,
    "--impact-size": `${safeThickness}px`,
    "--impact-stroke": `${Math.max(0.5, safeThickness * 0.55)}px`,
    "--impact-secondary-stroke": `${Math.max(0.5, safeThickness * 0.4)}px`,
  };

  return (
    <div
      className={`rain-drop-impact rain-drop-impact--${variant}`}
      style={impactStyle}
      aria-hidden="true"
    />
  );
}

export default DropImpact;
