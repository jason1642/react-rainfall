import type { CSSProperties } from "react";
import "./cloudLayer.css";

interface CloudLayerProps {
  count: number;
  size: number;
  speed: number;
  opacity: number;
  drift: number;
}

type CloudStyle = CSSProperties & {
  "--cloud-size": string;
  "--cloud-speed": string;
  "--cloud-opacity": string;
  "--cloud-drift": string;
};

const cloudHeights = ["-12%", "-4%", "5%", "-9%", "12%", "2%"];

function CloudLayer({ count, size, speed, opacity, drift }: CloudLayerProps) {
  const safeCount = Number.isFinite(count)
    ? Math.min(24, Math.max(0, Math.floor(count)))
    : 0;
  const safeSize = Number.isFinite(size) ? Math.max(80, size) : 320;
  const safeSpeed = Number.isFinite(speed) ? Math.max(1, speed) : 36;
  const safeOpacity = Number.isFinite(opacity)
    ? Math.max(0, Math.min(1, opacity))
    : 0.4;
  const safeDrift = Number.isFinite(drift) ? drift : 0;

  return (
    <div className="storm-cloud-layer" aria-hidden="true">
      {Array.from({ length: safeCount }, (_, index) => {
        const sizeScale = 0.72 + Math.random() * 0.56;
        const opacityScale = 0.72 + Math.random() * 0.28;
        const style: CloudStyle = {
          "--cloud-size": `${safeSize * sizeScale}px`,
          "--cloud-speed": `${safeSpeed * (0.85 + Math.random() * 0.3)}s`,
          "--cloud-opacity": `${safeOpacity * opacityScale}`,
          "--cloud-drift": `${safeDrift}px`,
          left: `${(index * 43) % 120 - 10}%`,
          top: `calc(${cloudHeights[index % cloudHeights.length]} + ${Math.random() * 6 - 3}%)`,
          animationDelay: `${(-index * safeSpeed) / safeCount}s`,
        };

        return <div className="storm-cloud" key={index} style={style} />;
      })}
    </div>
  );
}

export default CloudLayer;
