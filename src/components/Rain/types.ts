
export type numDrops = number | undefined;

export type dropletColor = `rgb(${string},${string},${string})` | undefined;

// Droplet size
export type size = 'short' | 'default' | 'long' | undefined;

export type showImpact = boolean | undefined;

// This is used to pass into mapObjects as an object
export interface dropletOptions {
    numDrops?: numDrops,
    dropletColor?: dropletColor,
    size?: size,
    showImpact?: showImpact,
}


// object of styles for the container, stem, or impact with limited fields 