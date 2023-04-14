import styled, {keyframes} from 'styled-components';
import dropletSizes from './droplet-sizes'
import type { size } from '../rainTypes';

interface DropContainerProps {
    gapLength: number;
    maxHeight: number;
    size: size;
}

// Having keyframes here is important when a user wants to have more than 1 rain animation component rendering
// on the same page. If keyframes is written normally within the DropletContainer sc, all <Rain /> components will share the 
// last instances height
const FallKeyFrames = (maxHeight: number, size: size) => keyframes`
   /* margin-top is used here because individual position is not known, and to pass on relative to current one
       would probably hinder performance/memory.
       To have droplets reach the bottom of element no matter what, i guess height 0 could be used with no
       issues besides having to account for the speed based on vertical position
    */
       0% {
      transform: translateY(0px);
    }
    /* transform: translateY(xvh) - positions the element as if the vh has been shifted vertically
       according to the value provided. Here, the entire droplet position is being shifted downward by 90vh. 
       Calculating the pixels by height of parent element plus 120 to compensate for height of the droplet
       Changing the values below determines when the entire droplet stops and triggers the droplet-impact animation 
       * Droplet size is 60% of the height of the container
       height of parent container + height of droplet
       */

       /* In translateY, multiple maxHeight by a number less than 1 to represent the precentage of the parents height that will be 
       the size of the gap from the bottom/impact point
         */
    75% {
        transform: translateY(${(maxHeight * .9) + dropletSizes(size)}px);
    }
    /* 
        Figure out a good calculation to prevent impact animations for overflowing below container
        previous number was 90vh for 75% and 100vh for 100%
        */
    100% {
      transform: translateY(${(maxHeight) + dropletSizes(size)}px);
    }
`;

const DropletContainer = styled.div<DropContainerProps>`
  /* Constants */

    position: absolute;
    /* bottom: 100%; */
       // Come up with way to evenly split left position number based on amount of drops and width.
        // If numDrops is provided/known, just divide maxWidth by number of droplets and multiply the index 
        // by the result. 
        // 
        // If user puts in numDrops = 60, how do we calculate left: x in styles for each droplet
        //  - (maxWidth / numDrops) * i  to get evenly spread out drops. Do not round this number.
        // 
  left: ${(({gapLength})=>gapLength)}px;

  /* Customizable */
  


    width: 15px;
    height: ${({size})=> dropletSizes(size)}px;
    pointer-events: none;
    animation: ${({maxHeight, size})=>FallKeyFrames(maxHeight, size)} .6s linear infinite;

    /* Preset values for the drop speed (seconds) should be provided; slow = 2s default = .73 fast = .40s */
    -webkit-animation: ${({maxHeight, size})=>FallKeyFrames(maxHeight, size)} .6s linear infinite;
    -moz-animation: ${({maxHeight, size})=>FallKeyFrames(maxHeight, size)} .6s linear infinite;
    
    /* 
    ~ Can be used to individually change duration while keeping others static
      animation-duration: .73s;
      
    ~ Can be used to delay the animation using a positive value for #s (seconds). Not useful unless there is a specific 
    reason to delay only the inital start of animation. If a negative value is provided then it will act as if the animation
    has been playing for x seconds.
     
    ~ Can be used to set how many times the animation should run. Useful just to simply stop animation after specified amount 
      of times or used in other transitions. Inifinte value would just continute to play animation forever.   
      animation-iteration-count: 3;

      */
      




`;


export default DropletContainer