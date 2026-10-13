import type { CSSProperties } from "react";
import "./cloudLayer.css";
import { seededRandom } from "../../../helpers/seededRandom";

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
const round = (value: number, places = 2) => {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
};
function CloudLayer({
  count,
  size,
  speed,
  opacity,
  drift,
  blur,
  color,
}: CloudLayerProps) {
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
        const rand = seededRandom(index + 1);
        const sizeScale = 0.72 + rand() * 0.56;
        const opacityScale = 0.88 + rand() * 0.12;
        const style: CloudStyle = {
          "--cloud-size": `${round(safeSize * sizeScale)}px`,
          "--cloud-speed": `${round(safeSpeed * (0.85 + rand() * 0.3))}s`,
          "--cloud-opacity": `${round(safeOpacity * opacityScale, 3)}`,
          "--cloud-drift": `${safeDrift}px`,
          "--cloud-blur": `${safeBlur}px`,
          "--cloud-color": color,
          left: `${round(((index + 0.5) / safeCount) * 100)}%`,
          top: `${round(-8 + rand() * 8)}%`,
          animationDuration: `${round(safeSpeed * (0.85 + rand() * 0.3))}s`,
          animationDelay: `${round((-index * safeSpeed) / safeCount)}s`,
        };

        return (
          <div className="storm-cloud" key={index} style={style}>
            <i className="storm-cloud-base" />
            <i className="storm-cloud-puff storm-cloud-puff--one" />
            <i className="storm-cloud-puff storm-cloud-puff--two" />
            <i className="storm-cloud-puff storm-cloud-puff--three" />
            <i className="storm-cloud-puff storm-cloud-puff--four" />
            <i className="storm-cloud-puff storm-cloud-puff--five" />
          </div>
        );
      })}
    </div>
  );
}

export default CloudLayer;
