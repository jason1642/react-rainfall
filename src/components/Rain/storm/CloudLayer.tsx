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

const cloudHeights = ["2%", "10%", "18%", "6%", "22%", "13%"];

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
        const style: CloudStyle = {
          "--cloud-size": `${safeSize}px`,
          "--cloud-speed": `${safeSpeed}s`,
          "--cloud-opacity": `${safeOpacity}`,
          "--cloud-drift": `${safeDrift}px`,
          left: `${(index * 43) % 120 - 10}%`,
          top: cloudHeights[index % cloudHeights.length],
          animationDelay: `${(-index * safeSpeed) / safeCount}s`,
        };

        return <div className="storm-cloud" key={index} style={style} />;
      })}
    </div>
  );
}

export default CloudLayer;
