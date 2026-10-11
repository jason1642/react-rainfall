import type { CSSProperties } from "react";
import "./glassLayer.css";

interface GlassLayerProps {
  fog: number;
  refraction: number;
}

type GlassStyle = CSSProperties & {
  "--glass-fog": string;
  "--glass-refraction": string;
};

function GlassLayer({ fog, refraction }: GlassLayerProps) {
  const safeFog = Math.max(0, Math.min(1, Number.isFinite(fog) ? fog : 0.18));
  const safeRefraction = Math.max(
    0,
    Math.min(12, Number.isFinite(refraction) ? refraction : 2),
  );
  const style: GlassStyle = {
    "--glass-fog": `${safeFog}`,
    "--glass-refraction": `${safeRefraction}px`,
  };

  return (
    <div className="rain-glass-layer" style={style} aria-hidden="true">
      {Array.from({ length: 18 }, (_, index) => (
        <i
          className="rain-glass-run"
          key={index}
          style={{
            left: `${5 + ((index * 29) % 91)}%`,
            top: `${(index * 23) % 86}%`,
            height: `${5 + ((index * 13) % 19)}%`,
            width: `${index % 6 === 0 ? 3.5 : index % 3 === 0 ? 2.5 : 1.5}px`,
            animationDelay: `${-index * 1.13}s`,
            animationDuration: `${7 + (index % 5) * 1.6}s`,
          }}
        />
      ))}
      <span className="rain-glass-glint" />
    </div>
  );
}

export default GlassLayer;
