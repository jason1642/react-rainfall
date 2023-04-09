
export type numDrops = number | undefined;

export type dropletColor = `rgb(${string},${string},${string})` | undefined;

export type size = 'short' | 'default' | 'long' | undefined;

export type showImpact = boolean | undefined;

export type rainEffect = 'rainbow' | undefined;

export type fallSpeed = 'slow' | 'normal' | 'fast' | undefined;

export type duration = 'slow' | 'normal' | 'fast' | undefined;

export type dropletOpacity = number | undefined;


// This is used to pass into mapObjects as an object
export interface dropletOptions {
   readonly numDrops?: numDrops,
   readonly dropletColor?: dropletColor,
   readonly size?: size,
   readonly showImpact?: showImpact,
   readonly rainEffect?: rainEffect,
   readonly dropletOpacity?: dropletOpacity,

}


// object of styles for the container, stem, or impact with limited fields 