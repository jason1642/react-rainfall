
export type numDrops = number | undefined;

export type dropletColor = `rgb(${string},${string},${string})` | undefined;

// Droplet size
export type size = 'short' | 'default' | 'long' | undefined;

export type impact = boolean | undefined;

// This is used to pass into mapObjects as an object
export type dropletOptions = {
    numDrops?: numDrops,
    dropletColor?: dropletColor,
    size?: size,
    impact?: impact,
}


// object of styles for the container, stem, or impact with limited fields 