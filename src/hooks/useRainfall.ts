import { useCallback, useRef, useState } from "react";
import type { RefObject } from "react";
import type { RainHandle } from "../components/Rain/rainTypes";

export interface RainfallController {
  ref: RefObject<RainHandle | null>;
  props: { playing: boolean; intensity: number };
  playing: boolean;
  intensity: number;
  start: () => void;
  stop: () => void;
  setIntensity: (intensity: number) => void;
  triggerLightning: () => void;
}

const clampIntensity = (value: number) =>
  Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 1;

/** State-backed controls for the Rain component. Pass `ref` and `props` to `<Rain />`. */
export function useRainfall(initialIntensity = 1): RainfallController {
  const ref = useRef<RainHandle | null>(null);
  const [playing, setPlaying] = useState(true);
  const [intensity, setIntensityState] = useState(() =>
    clampIntensity(initialIntensity),
  );

  const start = useCallback(() => {
    setPlaying(true);
    ref.current?.start();
  }, []);

  const stop = useCallback(() => {
    setPlaying(false);
    ref.current?.stop();
  }, []);

  const setIntensity = useCallback((value: number) => {
    const nextIntensity = clampIntensity(value);
    setIntensityState(nextIntensity);
    ref.current?.setIntensity(nextIntensity);
  }, []);

  const triggerLightning = useCallback(() => {
    ref.current?.triggerLightning();
  }, []);

  return {
    ref,
    props: { playing, intensity },
    playing,
    intensity,
    start,
    stop,
    setIntensity,
    triggerLightning,
  };
}

export default useRainfall;
