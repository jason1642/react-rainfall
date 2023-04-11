import type { size } from "./Rain.types"

const dropletSizes = (size: size)=> {
    switch(size){ 
        case 'default': 
            return 100
        case 'short':
            return 25;
        case 'long': 
            return  180;
        default: 
            return 120;
    }
}


export default dropletSizes 