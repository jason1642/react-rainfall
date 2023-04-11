import type { rainEffect, dropletColor } from "./Rain.types"
import {rainbowColors} from './preset-effects'

// This will choose a single color for each droplet based on the rain effect and droplet color values

const selectDropletColor = (dropletColor: dropletColor, rainEffect: rainEffect): string => {
    if (dropletColor === undefined && rainEffect === undefined) return 'rgb(183, 212, 255)'

    if(rainEffect === 'rainbow') {
        // console.log(`linear-gradient(to bottom, rgba(${rainbowColors[randomColor].split('(')[1].split(')')[0]}, 0), rgba(${rainbowColors[randomColor].split('(')[1].split(')')[0]}, .4))`)
        // console.log(rainbowColors[(Math.floor(Math.random() * 7))])
        return rainbowColors[(Math.floor(Math.random() * 7))]
    }


    if (dropletColor === undefined) return 'rgb(183, 212, 255)'

    // `linear-gradient(to bottom, rgba(${dropletColor?.split('(')[1].split(')')[0]}, 0), rgba(${dropletColor?.split('(')[1].split(')')[0]}, .4)) !important`
    return dropletColor



    


}

export default selectDropletColor