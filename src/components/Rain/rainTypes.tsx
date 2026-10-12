export type numDrops = number | undefined;

export type dropletColor = `rgb(${string},${string},${string})` | undefined;

export type size = "short" | "default" | "long" | undefined;

export type showImpact = boolean | undefined;

export type rainEffect = "rainbow" | undefined;

export type fallSpeed = "slow" | "normal" | "fast" | undefined;
// Degrees from vertical: positive angles drift right, negative angles drift left.
export type angle = number | undefined;
export type showClouds = boolean | undefined;
export type cloudCount = number | undefined;
export type cloudSize = number | undefined;
export type cloudSpeed = number | undefined;
export type cloudOpacity = number | undefined;
export type cloudDrift = number | undefined;
export type cloudBlur = number | undefined;
export type cloudColor = string | undefined;
export type cloudProfile = "soft" | "puffy" | "rolling" | "cartoon";
export type windProfile = "subtle" | "breezy" | "gusty" | "squall";
export type surface = "air" | "glass";
export type showLightning = boolean | undefined;
export type lightningFrequency = number | undefined;
export type lightningFlashDuration = number | undefined;
export type lightningColor = string | undefined;

export type rainDropStyle =
  | "streak"
  | "pixel"
  | "soft"
  | "orb"
  | "snowflake"
  | "hailstone"
  | "cartoon"
  | "glow";
export type impactStyle = "splash" | "spray" | "ripple";
export type quality = "low" | "medium" | "high";
export type renderer = "dom" | "canvas";
export type duration = "slow" | "normal" | "fast" | undefined;
export type rainProfile =
  | "light-drizzle"
  | "rainbow"
  | "steady-rain"
  | "passing-shower"
  | "heavy-rain"
  | "misty-rain"
  | "snow"
  | "hail"
  | "cartoon";
export type dropletOpacity = number | undefined;

// rem, em, px, etc
export type dropDistance = number | undefined;

export interface dropletOptions {
  numDrops?: numDrops;
  profile?: rainProfile;
  visible?: boolean;
  angle?: angle;
  dropletColor?: dropletColor;
  size?: size;
  showImpact?: showImpact;
  impactStyle?: impactStyle;
  impactThickness?: number;
  impactOpacity?: number;
  /** Fraction of drops that create impacts. Stable per drop index; defaults vary by profile. */
  impactDensity?: number;
  rainEffect?: rainEffect;
  dropletOpacity?: dropletOpacity;
  duration?: duration;
  showClouds?: showClouds;
  cloudCount?: cloudCount;
  cloudSize?: cloudSize;
  cloudSpeed?: cloudSpeed;
  cloudOpacity?: cloudOpacity;
  cloudDrift?: cloudDrift;
  cloudBlur?: cloudBlur;
  cloudColor?: cloudColor;
  cloudProfile?: cloudProfile;
  rainFromClouds?: boolean;
  windVariation?: number;
  gustFrequency?: number;
  surface?: surface;
  glassFog?: number;
  glassRefraction?: number;
  showLightning?: showLightning;
  lightningFrequency?: lightningFrequency;
  lightningFlashDuration?: lightningFlashDuration;
  lightningColor?: lightningColor;
  dropStyle?: rainDropStyle;
  depth?: boolean;
  showWind?: boolean;
  windProfile?: windProfile;
  pauseWhenHidden?: boolean;
  /** Honor the operating system's reduced-motion setting. Defaults to true. */
  respectReducedMotion?: boolean;
  playing?: boolean;
  intensity?: number;
  /** Scale total drop count for device capabilities. Defaults to `high`. */
  quality?: quality;
  /** Hard maximum number of drops after angled-rain coverage is applied. Defaults to 600. */
  maxDrops?: number;
  /** Select the particle renderer. DOM remains the default. */
  renderer?: renderer;
}

export interface RainHandle {
  start: () => void;
  stop: () => void;
  show: () => void;
  hide: () => void;
  setIntensity: (intensity: number) => void;
  triggerLightning: () => void;
}
