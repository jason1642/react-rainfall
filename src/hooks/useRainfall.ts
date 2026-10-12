import { useCallback, useRef, useState } from "react";
import type { RefCallback } from "react";
import type { RainHandle } from "../components/Rain/rainTypes";

export interface RainfallController {
  ref: RefCallback<RainHandle>;
  props: { playing: boolean; intensity: number; visible: boolean };
  playing: boolean;
  intensity: number;
  visible: boolean;
  start: () => void;
  stop: () => void;
  show: () => void;
  hide: () => void;
  setIntensity: (intensity: number) => void;
  triggerLightning: () => void;
}

const clampIntensity = (value: number) =>
  Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 1;

/** State-backed controls for the Rain component. Pass `ref` and `props` to `<Rain />`. */
export function useRainfall(initialIntensity = 1): RainfallController {
  const handleRef = useRef<RainHandle | null>(null);
  const [visible, setVisible] = useState(true);
  const ref = useCallback((handle: RainHandle | null) => {
    handleRef.current = handle;
  }, []);
  const [playing, setPlaying] = useState(true);
  const [intensity, setIntensityState] = useState(() =>
    clampIntensity(initialIntensity),
  );

  const start = useCallback(() => {
    setPlaying(true);
    handleRef.current?.start();
  }, []);

  const stop = useCallback(() => {
    setPlaying(false);
    handleRef.current?.stop();
  }, []);
  const show = useCallback(() => {
    setVisible(true);
    handleRef.current?.show();
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
    handleRef.current?.hide();
  }, []);
  const setIntensity = useCallback((value: number) => {
    const nextIntensity = clampIntensity(value);
    setIntensityState(nextIntensity);
    handleRef.current?.setIntensity(nextIntensity);
  }, []);

  const triggerLightning = useCallback(() => {
    handleRef.current?.triggerLightning();
  }, []);

  return {
    ref,
    props: { playing, intensity, visible },
    playing,
    visible,
    show,
    hide,
    intensity,
    start,
    stop,
    setIntensity,
    triggerLightning,
  };
}

export default useRainfall;
