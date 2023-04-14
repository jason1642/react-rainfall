import type { size } from "../rainTypes"

const dropletSizes = (size: size)=> {
    switch(size){ 
        case 'default': 
            return 120
        case 'short':
            return 25;
        case 'long': 
            return  180;
        default: 
            return 120;
    }
}


export default dropletSizes 