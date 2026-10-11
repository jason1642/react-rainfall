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
  "--splash-x-out": string;
  "--splash-y": string;
};

function DropImpact({ variant = "splash", thickness = 2.5, style }: DropImpactProps) {
  const animationDuration = style?.animationDuration ?? "1s";
  const animationDelay = style?.animationDelay ?? "0s";
  if (variant === "ripple") {
    return (
      <div className="rain-drop-impact rain-drop-impact--ripple" style={style}>
        {[0, 1].map((ring) => (
          <span
            className="rain-impact-ripple"
            key={ring}
            style={{
              width: `${Math.max(12, 20 * (1 + ring * 0.45))}px`,
              height: `${Math.max(4, 6 * (1 + ring * 0.35))}px`,
              borderWidth: `${Math.max(0.5, thickness * 0.55)}px`,
              animationDuration,
              animationDelay,
            }}
          />
        ))}
      </div>
    );
  }
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
            "--splash-x-out": `${(direction * 9 + (variant === "spray" ? (Math.random() - 0.5) * 8 : 0)) * (variant === "spray" ? 1.2 : 1.25)}px`,
            "--splash-y": `${variant === "spray" ? -16 - Math.random() * 13 : -12 - (1 - Math.abs(direction) / 2) * 6}px`,
          } as SplashParticleStyle}
        />
      ))}
    </div>
  );
}

export default DropImpact;
