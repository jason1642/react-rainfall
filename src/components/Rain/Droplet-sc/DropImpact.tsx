import styled from 'styled-components';

interface DropImpactProps {

}

const DropImpact = styled.div<DropImpactProps>`
  

  width: 15px;
  height: 10px;
  border-top: 2px dotted rgb(255, 255, 255);
  border-radius: 50%;
  opacity: 1;
  transform: scale(0);
  animation: droplet-impact 0.5s linear infinite;
  /* Toggle display to remove effect */
  display: block;


@keyframes droplet-impact {
  0% {
    opacity: 1;
    transform: scale(0);
  }
  80% {
    opacity: 1;
    transform: scale(0);
  }
  90% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}
  
`;


export default DropImpact