
export type numDrops = number | undefined;

export type dropletColor = `rgb(${string},${string},${string})` | undefined;

export type size = 'short' | 'default' | 'long' | undefined;

export type showImpact = boolean | undefined;

export type rainProfile = 'light-drizzle' | 'rainbow';

export type fallSpeed = 'slow' | 'normal' | 'fast' | undefined;

export type duration = 'slow' | 'normal' | 'fast' | undefined;

export type dropletOpacity = number | undefined;

// rem, em, px, etc
export type dropDistance = number | undefined;

export interface dropletOptions {
    numDrops?: numDrops,
    dropletColor?: dropletColor,
    size?: size,
    showImpact?: showImpact,
    profile?: rainProfile,
    dropletOpacity?: dropletOpacity,

}

