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
export type showLightning = boolean | undefined;
export type lightningFrequency = number | undefined;
export type lightningFlashDuration = number | undefined;
export type lightningColor = string | undefined;
export type rainDropStyle = "streak" | "pixel" | "soft" | "orb";
export type duration = "slow" | "normal" | "fast" | undefined;
export type rainProfile =
  | "light-drizzle"
  | "rainbow"
  | "steady-rain"
  | "passing-shower"
  | "heavy-rain"
  | "misty-rain";
export type dropletOpacity = number | undefined;

// rem, em, px, etc
export type dropDistance = number | undefined;

export interface dropletOptions {
  numDrops?: numDrops;
  profile?: rainProfile;
  angle?: angle;
  dropletColor?: dropletColor;
  size?: size;
  showImpact?: showImpact;
  rainEffect?: rainEffect;
  dropletOpacity?: dropletOpacity;
  showClouds?: showClouds;
  cloudCount?: cloudCount;
  cloudSize?: cloudSize;
  cloudSpeed?: cloudSpeed;
  cloudOpacity?: cloudOpacity;
  cloudDrift?: cloudDrift;
  showLightning?: showLightning;
  lightningFrequency?: lightningFrequency;
  lightningFlashDuration?: lightningFlashDuration;
  lightningColor?: lightningColor;
  dropStyle?: rainDropStyle;
  depth?: boolean;
}
