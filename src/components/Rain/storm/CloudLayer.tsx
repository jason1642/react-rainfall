import type { CSSProperties } from "react";
import "./cloudLayer.css";

interface CloudLayerProps {
  count: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
  blur: number;
  color: string;
}

type CloudStyle = CSSProperties & {
  "--cloud-size": string;
  "--cloud-speed": string;
  "--cloud-opacity": string;
  "--cloud-drift": string;
  "--cloud-blur": string;
  "--cloud-color": string;
};

function CloudLayer({ count, size, speed, opacity, drift, blur, color }: CloudLayerProps) {
  const safeCount = Number.isFinite(count)
    ? Math.min(24, Math.max(0, Math.floor(count)))
    : 0;
  const safeSize = Number.isFinite(size) ? Math.max(80, size) : 320;
  const safeSpeed = Number.isFinite(speed) ? Math.max(1, speed) : 36;
  const safeOpacity = Number.isFinite(opacity)
    ? Math.max(0, Math.min(1, opacity))
    : 0.4;
  const safeDrift = Number.isFinite(drift) ? drift : 0;
  const safeBlur = Number.isFinite(blur) ? Math.max(0, Math.min(40, blur)) : 4;

  return (
    <div className="storm-cloud-layer" aria-hidden="true">
      {Array.from({ length: safeCount }, (_, index) => {
        const sizeScale = 0.72 + Math.random() * 0.56;
        const opacityScale = 0.88 + Math.random() * 0.12;
        const style: CloudStyle = {
          "--cloud-size": `${safeSize * sizeScale}px`,
          "--cloud-speed": `${safeSpeed * (0.85 + Math.random() * 0.3)}s`,
          "--cloud-opacity": `${safeOpacity * opacityScale}`,
          "--cloud-drift": `${safeDrift}px`,
          "--cloud-blur": `${safeBlur}px`,
          "--cloud-color": color,
          left: `${((index + 0.5) / safeCount) * 100}%`,
          top: `${-22 + Math.random() * 15}%`,
          animationDelay: `${(-index * safeSpeed) / safeCount}s`,
        };

        return <div className="storm-cloud" key={index} style={style} />;
      })}
    </div>
  );
}

export default CloudLayer;
