import React from 'react'
import mapDroplets from './sc-droplets/map-droplets';
import { dropletOptions } from './rainTypes';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  position: absolute;
  z-index: 10;
  border-radius: inherit;
  left: 0;
`;

const Rain: React.FunctionComponent<dropletOptions> = ({numDrops, dropletColor, size, showImpact, rainEffect, dropletOpacity}) => {
  const rainRef: React.MutableRefObject<HTMLDivElement | null> | null = React.useRef(null)
  const [dropletArray, setDropletArray ] = React.useState<Array<any> | null>([])
  const [stateRef, setStateRef] = React.useState<any>()
  
  React.useEffect(() => {
    // console.log('setting up droplet array')
    stateRef !== undefined && setDropletArray(mapDroplets({maxWidth: stateRef.current.clientWidth, maxHeight: stateRef.current.clientHeight},
       {
        numDrops,
        dropletColor,
        size,
        showImpact,
        rainEffect, 
        dropletOpacity
        }))

        return ()=>{ 
          // console.log('cleaning up useeffect')
          setDropletArray(null)
        }

  }, [stateRef]);
  
  React.useEffect(()=>{
    // console.log(rainRef)
    rainRef && setStateRef(rainRef)
}, []);

    return  ( 
      <Container ref={rainRef}>
        { dropletArray}
       </Container>
    ) 
}

export default Rain;
