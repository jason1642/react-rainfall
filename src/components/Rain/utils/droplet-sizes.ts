import type { size } from "../types"

const dropletSizes = (size: size)=> {
    switch(size){ 
        case 'default': 
            return 120
        case 'short':
            return 20;
        case 'long': 
            return  200;
        default: 
            return 120;
    }
}


export default dropletSizes