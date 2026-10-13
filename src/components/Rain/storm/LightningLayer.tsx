import { useEffect, useState, useCallback, useRef } from "react";
import type { CSSProperties } from "react";
import "./lightningLayer.css";

interface LightningLayerProps {
  frequency: number;
  flashDuration: number;
  color: string;
  auto: boolean;
  triggerId: number;
}

type LightningStyle = CSSProperties & {
  "--lightning-color": string;
  "--lightning-duration": string;
};
const INITIAL_BOLT = "50,0 50,100";
function createBoltPoints() {
  const points = ["50,0"];
  let x = 50;
  let y = 0;

  while (y < 100) {
    y = Math.min(100, y + 8 + Math.random() * 13);
    x = Math.max(16, Math.min(84, x + (Math.random() - 0.5) * 42));
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  return points.join(" ");
}

function LightningLayer({
  frequency,
  flashDuration,
  color,
  auto,
  triggerId,
}: LightningLayerProps) {
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashKey, setFlashKey] = useState(0);
  const [boltPosition, setBoltPosition] = useState(50);
  const [boltPoints, setBoltPoints] = useState(INITIAL_BOLT);
  const lastTriggerId = useRef(0);
  const flashEndTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const safeFrequency = Number.isFinite(frequency)
    ? Math.max(0.75, frequency)
    : 9;
  const safeDuration = Number.isFinite(flashDuration)
    ? Math.max(80, Math.min(4000, flashDuration))
    : 450;

  const flash = useCallback(() => {
    setBoltPosition(16 + Math.random() * 68);
    setBoltPoints(createBoltPoints());
    setFlashKey((current) => current + 1);
    setIsFlashing(true);
    if (flashEndTimer.current) clearTimeout(flashEndTimer.current);
    flashEndTimer.current = setTimeout(
      () => setIsFlashing(false),
      safeDuration,
    );
  }, [safeDuration]);

  useEffect(() => {
    if (triggerId <= lastTriggerId.current) return;
    lastTriggerId.current = triggerId;
    flash();
  }, [triggerId, flash]);

  useEffect(() => {
    if (!auto) return;
    let nextFlashTimer: ReturnType<typeof setTimeout>;

    const scheduleFlash = (initial = false) => {
      const interval = initial
        ? Math.min(1, Math.max(0.35, safeFrequency * 0.2))
        : safeFrequency * (0.7 + Math.random() * 0.6);
      nextFlashTimer = setTimeout(() => {
        flash();
        scheduleFlash();
      }, interval * 1000);
    };

    scheduleFlash(true);
    return () => {
      clearTimeout(nextFlashTimer);
    };
  }, [auto, safeFrequency, flash]);

  useEffect(
    () => () => {
      if (flashEndTimer.current) clearTimeout(flashEndTimer.current);
    },
    [],
  );

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
      <div className="storm-lightning-flash" key={`flash-${flashKey}`} />
      <svg
        key={`bolt-${flashKey}`}
        className="storm-lightning-bolt"
        style={{ left: `${boltPosition}%` }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polyline points={boltPoints} />
      </svg>
    </div>
  );
}

export default LightningLayer;
