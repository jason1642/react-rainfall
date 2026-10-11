import "./windLayer.css";
import type { CSSProperties } from "react";

interface WindLayerProps {
  gustFrequency: number;
  windVariation: number;
  strength: number;
}

function WindLayer({ gustFrequency, windVariation, strength }: WindLayerProps) {
  return (
    <div
      className="rain-wind-layer"
      aria-hidden="true"
      style={{
        "--gust-frequency": `${gustFrequency}s`,
        "--wind-variation": `${windVariation}deg`,
        "--wind-strength": `${strength}`,
      } as CSSProperties}
    >
      {[0, 1, 2, 3, 4].map((gust) => (
        <span
          key={gust}
          style={{ animationDelay: `${(gust * gustFrequency * 0.12).toFixed(2)}s` }}
        />
      ))}
    </div>
  );
}

export default WindLayer;
