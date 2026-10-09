import React from "react";
import type { CSSProperties } from "react";
import "./lightningLayer.css";

interface LightningLayerProps {
  frequency: number;
  flashDuration: number;
  color: string;
}

type LightningStyle = CSSProperties & {
  "--lightning-color": string;
  "--lightning-duration": string;
};

function LightningLayer({
  frequency,
  flashDuration,
  color,
}: LightningLayerProps) {
  const [isFlashing, setIsFlashing] = React.useState(false);
  const [boltPosition, setBoltPosition] = React.useState(50);
  const safeFrequency = Number.isFinite(frequency)
    ? Math.max(0.75, frequency)
    : 9;
  const safeDuration = Number.isFinite(flashDuration)
    ? Math.max(80, Math.min(4000, flashDuration))
    : 450;

  React.useEffect(() => {
    let nextFlashTimer: ReturnType<typeof setTimeout>;
    let flashEndTimer: ReturnType<typeof setTimeout>;

    const scheduleFlash = (initial = false) => {
      const interval = initial
        ? Math.min(1, Math.max(0.35, safeFrequency * 0.2))
        : safeFrequency * (0.7 + Math.random() * 0.6);
      nextFlashTimer = setTimeout(() => {
        setBoltPosition(16 + Math.random() * 68);
        setIsFlashing(true);
        flashEndTimer = setTimeout(() => {
          setIsFlashing(false);
          scheduleFlash();
        }, safeDuration);
      }, interval * 1000);
    };

    scheduleFlash(true);
    return () => {
      clearTimeout(nextFlashTimer);
      clearTimeout(flashEndTimer);
    };
  }, [safeDuration, safeFrequency]);

  const style: LightningStyle = {
    "--lightning-color": color,
    "--lightning-duration": `${safeDuration}ms`,
  };

  return (
    <div
      className={`storm-lightning-layer${isFlashing ? " is-flashing" : ""}`}
      style={style}
      aria-hidden="true"
    >
      <div className="storm-lightning-flash" />
      <svg
        className="storm-lightning-bolt"
        style={{ left: `${boltPosition}%` }}
        viewBox="0 0 100 400"
        preserveAspectRatio="none"
      >
        <path d="M58 0 18 208h29L30 400l57-238H55L76 0z" />
      </svg>
    </div>
  );
}

export default LightningLayer;
