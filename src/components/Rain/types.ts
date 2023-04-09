
export type numDrops = number | undefined;

export type dropletColor = `rgb(${string},${string},${string})` | undefined;



// This is used to pass into mapObjects as an object
export type dropletOptions = {
    numDrops?: numDrops,
    dropletColor?: dropletColor,
}


// object of styles for the container, stem, or impact with limited fields 