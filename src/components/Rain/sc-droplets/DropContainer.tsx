import styled, {keyframes} from 'styled-components';
import dropletSizes from './droplet-sizes'
import type { size } from '../rainTypes';

interface DropContainerProps {
    gapLength: number;
    maxHeight: number;
    size: size;
}


const FallKeyFrames = (maxHeight: number, size: size) => keyframes`
  ${'0%'} { transform: translateY(0px); }
  ${'75%'}{ transform: translateY(${(maxHeight * .9) + dropletSizes(size)}px); }
  ${'100%'} { transform: translateY(${(maxHeight) + dropletSizes(size)}px); }
`

const DropletContainer = styled.div<DropContainerProps>`
  position: absolute;

  left: ${(({gapLength})=>gapLength)}px;

  width: 15px;
  height: ${({size})=> dropletSizes(size)}px;
  pointer-events: none;
  animation: ${({maxHeight, size})=>FallKeyFrames(maxHeight, size)} .6s linear infinite;

  -webkit-animation: ${({maxHeight, size})=>FallKeyFrames(maxHeight, size)} .6s linear infinite;
  -moz-animation: ${({maxHeight, size})=>FallKeyFrames(maxHeight, size)} .6s linear infinite;
  
`;


export default DropletContainer