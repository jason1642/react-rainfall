import type { cloudProfile, dropletOptions, rainProfile, windProfile } from "./rainTypes";

export interface RainProfileDefaults extends dropletOptions {
  dropsPerWidth: number;
  containerClassName?: string;
}

export interface ResolvedStormOptions {
  showClouds: boolean;
  cloudCount: number;
  cloudSize: number;
  cloudSpeed: number;
  cloudOpacity: number;
  cloudDrift: number;
  cloudBlur: number;
  cloudColor: string;
  cloudProfile: cloudProfile;
  showLightning: boolean;
  lightningFrequency: number;
  lightningFlashDuration: number;
  lightningColor: string;
}

export interface ResolvedWindOptions {
  showWind: boolean;
  windVariation: number;
  gustFrequency: number;
  windStrength: number;
}

const cloudProfiles: Record<cloudProfile, Pick<ResolvedStormOptions, "cloudBlur" | "cloudOpacity" | "cloudSpeed" | "cloudDrift" | "cloudColor">> = {
  soft: { cloudBlur: 18, cloudOpacity: 0.38, cloudSpeed: 34, cloudDrift: 110, cloudColor: "#65738f" },
  puffy: { cloudBlur: 2, cloudOpacity: 0.76, cloudSpeed: 16, cloudDrift: 190, cloudColor: "#43527f" },
  rolling: { cloudBlur: 3, cloudOpacity: 0.72, cloudSpeed: 8, cloudDrift: 300, cloudColor: "#374667" },
};

const windProfiles: Record<windProfile, Omit<ResolvedWindOptions, "showWind">> = {
  subtle: { windVariation: 8, gustFrequency: 8, windStrength: 0.45 },
  breezy: { windVariation: 13, gustFrequency: 6, windStrength: 0.68 },
  gusty: { windVariation: 22, gustFrequency: 4.5, windStrength: 0.9 },
  squall: { windVariation: 30, gustFrequency: 3, windStrength: 1 },
};

// Each profile defines its own starting point. Explicit props override it.
const rainProfiles: Record<rainProfile, RainProfileDefaults> = {
  "light-drizzle": {
    dropsPerWidth: 48,
    dropletColor: "rgb(210, 228, 242)",
    size: "short",
    showImpact: false,
    impactStyle: "splash",
    dropletOpacity: 0.3,
    duration: "slow",
    showClouds: false,
    cloudCount: 3,
    cloudSize: 320,
    cloudSpeed: 36,
    cloudOpacity: 0.4,
    cloudDrift: 120,
    showLightning: false,
    lightningFrequency: 9,
    lightningFlashDuration: 450,
    lightningColor: "#dfe6ff",
  },
  "steady-rain": {
    dropsPerWidth: 24,
    dropletColor: "rgb(204, 224, 245)",
    size: "default",
    showImpact: true,
    impactStyle: "splash",
    dropletOpacity: 0.48,
    duration: "normal",
    showClouds: false,
    cloudCount: 3,
    cloudSize: 320,
    cloudSpeed: 36,
    cloudOpacity: 0.4,
    cloudDrift: 120,
    showLightning: false,
    lightningFrequency: 9,
    lightningFlashDuration: 450,
    lightningColor: "#dfe6ff",
  },
  "passing-shower": {
    dropsPerWidth: 30,
    dropletColor: "rgb(210, 229, 246)",
    size: "default",
    showImpact: true,
    impactStyle: "splash",
    dropletOpacity: 0.46,
    duration: "normal",
    containerClassName: "rain-container--passing-shower",
    showClouds: false,
    cloudCount: 3,
    cloudSize: 320,
    cloudSpeed: 36,
    cloudOpacity: 0.4,
    cloudDrift: 120,
    showLightning: false,
    lightningFrequency: 9,
    lightningFlashDuration: 450,
    lightningColor: "#dfe6ff",
  },
  "heavy-rain": {
    numDrops: 450,
    dropsPerWidth: 12,
    dropletColor: "rgb(169, 184, 255)",
    size: "long",
    showImpact: true,
    impactStyle: "spray",
    dropletOpacity: 0.85,
    duration: "fast",
    angle: 10,
    dropStyle: "streak",
    depth: true,
    showClouds: true,
    cloudCount: 5,
    cloudSize: 420,
    cloudSpeed: 24,
    cloudOpacity: 0.72,
    cloudDrift: 360,
    cloudBlur: 4,
    cloudColor: "#43527f",
    cloudProfile: "puffy",
    showLightning: true,
    lightningFrequency: 15,
    lightningFlashDuration: 300,
    lightningColor: "#dfe6ff",
  },
  "misty-rain": {
    dropsPerWidth: 56,
    dropletColor: "rgb(220, 235, 246)",
    size: "short",
    showImpact: false,
    impactStyle: "splash",
    dropletOpacity: 0.16,
    duration: "slow",
    dropStyle: "soft",
    showClouds: false,
    cloudCount: 3,
    cloudSize: 320,
    cloudSpeed: 36,
    cloudOpacity: 0.4,
    cloudDrift: 120,
    showLightning: false,
    lightningFrequency: 9,
    lightningFlashDuration: 450,
    lightningColor: "#dfe6ff",
  },
  snow: {
    dropsPerWidth: 24,
    dropletColor: "rgb(240, 248, 255)",
    size: "default",
    showImpact: false,
    dropletOpacity: 0.8,
    duration: "slow",
    dropStyle: "snowflake",
    depth: true,
    showClouds: false,
    cloudCount: 3,
    cloudSize: 320,
    cloudSpeed: 36,
    cloudOpacity: 0.3,
    cloudDrift: 120,
    showLightning: false,
    lightningFrequency: 9,
    lightningFlashDuration: 450,
    lightningColor: "#dfe6ff",
  },
  hail: {
    dropsPerWidth: 26,
    dropletColor: "rgb(210, 228, 250)",
    size: "default",
    showImpact: true,
    impactStyle: "spray",
    impactThickness: 2,
    impactOpacity: 0.55,
    dropletOpacity: 0.9,
    duration: "fast",
    dropStyle: "hailstone",
    depth: true,
    showClouds: true,
    cloudCount: 4,
    cloudSize: 360,
    cloudSpeed: 34,
    cloudOpacity: 0.28,
    cloudDrift: 150,
    showLightning: false,
    lightningFrequency: 9,
    lightningFlashDuration: 450,
    lightningColor: "#dfe6ff",
  },
  rainbow: {
    dropsPerWidth: 25,
    duration: "normal",
    showClouds: false,
    cloudCount: 3,
    cloudSize: 320,
    cloudSpeed: 36,
    cloudOpacity: 0.4,
    cloudDrift: 120,
    showLightning: false,
    lightningFrequency: 9,
    lightningFlashDuration: 450,
    lightningColor: "#dfe6ff",
  },
};

export const getRainProfileDefaults = (
  profile: rainProfile | undefined,
): RainProfileDefaults =>
  profile === undefined
    ? {
        dropsPerWidth: 25,
        showClouds: false,
        cloudCount: 3,
        cloudSize: 320,
        cloudSpeed: 36,
        cloudOpacity: 0.4,
        cloudDrift: 120,
        showLightning: false,
        lightningFrequency: 9,
        lightningFlashDuration: 450,
        lightningColor: "#dfe6ff",
      }
    : rainProfiles[profile];

export const getResolvedStormOptions = (
  profile: rainProfile | undefined,
  overrides: Pick<
    dropletOptions,
    | "showClouds"
    | "cloudCount"
    | "cloudSize"
    | "cloudSpeed"
    | "cloudOpacity"
    | "cloudDrift"
    | "cloudBlur"
    | "cloudColor"
    | "cloudProfile"
    | "showLightning"
    | "lightningFrequency"
    | "lightningFlashDuration"
    | "lightningColor"
  >,
): ResolvedStormOptions => {
  const defaults = getRainProfileDefaults(profile);
  const selectedCloudProfile = overrides.cloudProfile ?? defaults.cloudProfile ?? "puffy";
  const cloudDefaults = cloudProfiles[selectedCloudProfile];

  return {
    showClouds: overrides.showClouds ?? defaults.showClouds ?? false,
    cloudCount: overrides.cloudCount ?? defaults.cloudCount ?? 3,
    cloudSize: overrides.cloudSize ?? defaults.cloudSize ?? 320,
    cloudSpeed: overrides.cloudSpeed ?? cloudDefaults.cloudSpeed ?? defaults.cloudSpeed ?? 36,
    cloudOpacity: overrides.cloudOpacity ?? cloudDefaults.cloudOpacity ?? defaults.cloudOpacity ?? 0.4,
    cloudDrift: overrides.cloudDrift ?? cloudDefaults.cloudDrift ?? defaults.cloudDrift ?? 120,
    cloudBlur: overrides.cloudBlur ?? cloudDefaults.cloudBlur ?? defaults.cloudBlur ?? 4,
    cloudColor: overrides.cloudColor ?? cloudDefaults.cloudColor ?? defaults.cloudColor ?? "#43527f",
    cloudProfile: selectedCloudProfile,
    showLightning: overrides.showLightning ?? defaults.showLightning ?? false,
    lightningFrequency:
      overrides.lightningFrequency ?? defaults.lightningFrequency ?? 9,
    lightningFlashDuration:
      overrides.lightningFlashDuration ??
      defaults.lightningFlashDuration ??
      450,
    lightningColor:
      overrides.lightningColor ?? defaults.lightningColor ?? "#dfe6ff",
  };
};

export const getResolvedWindOptions = (
  profile: windProfile | undefined,
  overrides: Pick<dropletOptions, "showWind" | "windVariation" | "gustFrequency">,
): ResolvedWindOptions => {
  const defaults = windProfiles[profile ?? "subtle"];
  return {
    showWind: overrides.showWind ?? profile !== undefined,
    windVariation: overrides.windVariation ?? defaults.windVariation,
    gustFrequency: overrides.gustFrequency ?? defaults.gustFrequency,
    windStrength: defaults.windStrength,
  };
};

export const getRainProfileClassName = (
  profile: rainProfile | undefined,
): string | undefined =>
  profile === undefined ? undefined : rainProfiles[profile].containerClassName;
