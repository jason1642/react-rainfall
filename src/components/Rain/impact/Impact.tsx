import type { CSSProperties } from "react";
import type { impactStyle } from "../rainTypes";
import "./impact.css";

interface DropImpactProps {
  variant?: impactStyle;
  thickness?: number;
  style?: CSSProperties;
}

type SplashParticleStyle = CSSProperties & {
  "--splash-x-start": string;
  "--splash-x-end": string;
  "--splash-y": string;
};

function DropImpact({ variant = "splash", thickness = 2.5, style }: DropImpactProps) {
  const animationDuration = style?.animationDuration ?? "1s";
  const animationDelay = style?.animationDelay ?? "0s";
  const directions = variant === "spray" ? [-1, 0, 1] : [-2, -1, 0, 1, 2];

  return (
    <div className={`rain-drop-impact rain-drop-impact--${variant}`} style={style}>
      {directions.map((direction) => (
        <span
          className="rain-impact-particle"
          key={direction}
          style={{
            width: `${thickness}px`,
            height: `${thickness}px`,
            animationDuration,
            animationDelay,
            "--splash-x-start": `${direction * 3}px`,
            "--splash-x-end": `${direction * 9 + (variant === "spray" ? (Math.random() - 0.5) * 8 : 0)}px`,
            "--splash-y": `${variant === "spray" ? -12 - Math.random() * 13 : -10 - (1 - Math.abs(direction) / 2) * 5}px`,
          } as SplashParticleStyle}
        />
      ))}
    </div>
  );
}

export default DropImpact;
