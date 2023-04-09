import styled from 'styled-components';

interface DropContainerProps {
    gapLength: number;
}

const DropletContainer = styled.div<DropContainerProps>`
  /* Constants */


  /* Customizable */
    left: ${(({gapLength})=>gapLength)}px;






    position: absolute;
    bottom: 100%;
    width: 15px;
    height: 120px;
    pointer-events: none;
    animation: fall 0.5s linear infinite;

    /* Preset values for the drop speed (seconds) should be provided; slow = 2s default = .73 fast = .40s */
    -webkit-animation: fall .5s linear infinite;
    -moz-animation: fall .5s linear infinite;
    
    /* 
    ~ Can be used to individually change duration while keeping others static
      animation-duration: .73s;
      
    ~ Can be used to delay the animation using a positive value for #s (seconds). Not useful unless there is a specific 
    reason to delay only the inital start of animation. If a negative value is provided then it will act as if the animation
    has been playing for x seconds.
     

    ~ Can be used to set how many times the animation should run. Useful just to simply stop animation after specified amount 
      of times or used in other transitions. Inifinte value would just continute to play animation forever.   
      animation-iteration-count: 3;

    ~
      */
      
      /* animation-delay: -3s; */


    -webkit-animation: fall .5s linear infinite;
    -moz-animation: fall .5s linear infinite;


  /* KEYFRAMES from droplet animation
     requires to but not from as it will take existing values and gradually change to the 'to' values
  */
  @keyframes fall {
    /* margin-top is used here because individual position is not known, and to pass on relative to current one
       would probably hinder performance/memory.
       To have droplets reach the bottom of element no matter what, i guess height 0 could be used with no
       issues besides having to account for the speed based on vertical position
    */
    0% {
      transform: translateY(0vh);
    }
    /* transform: translateY(xvh) - positions the element as if the vh has been shifted vertically
       according to the value provided. Here, the entire droplet position is being shifted downward by 90vh. 
       Calculating the pixels by height of parent element plus 120 to compensate for height of the droplet
       Changing the values below determines when the entire droplet stops and triggers the droplet-impact animation 
    */
    75% {
      transform: translateY(725px);
    }

    100% {
      transform: translateY(770px);
    }

  }
`;


export default DropletContainer