import styled from 'styled-components';
import type { dropletColor } from '../rainTypes';

interface DropletProps {
  dropletColor: dropletColor;

};

const Droplet = styled.div<DropletProps>`
   position: absolute;
    width: 1px;
    height: 60%;
    margin-left: 7px;    
    border-radius: 4px;
    animation: droplet .5s linear infinite;
    -webkit-animation: droplet .5s linear infinite;
    -moz-animation: droplet .5s linear infinite;
  
  @keyframes droplet {
    0% {
      opacity: 1;
    }
    65% {
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  };
  @-webkit-keyframes droplet {
    0% {
      opacity: 1;
    }
    65% {
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  };
  @-moz-keyframes droplet {
    0% {
      opacity: 1;
    }
    65% {
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  };
`;



export default Droplet;