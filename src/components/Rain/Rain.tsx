import React, {forwardRef} from 'react'
// import './Rain.css'
import mapDroplets from './sc-droplets/map-droplets';
import type { dropletOptions } from './rainTypes'
import styled from 'styled-components';
// export interface IRainProps extends dropletOptions {
    // Important - Limit amount of drain droplets to prevent a crash or performance 
    // Add other option props such as:
    // - styles for rain container and droplets
    // - Rain direction, speed, fall length

// }


// Issues 
// 


// Styled components must be redeclared on render or else it will have the same class name as another styled component if used twice  in the same app
const Container = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 10;
  border-radius: inherit;
  left: 0;
`;


const Rain: React.FC<dropletOptions> = ({numDrops, dropletColor, size, showImpact, rainEffect, dropletOpacity}) => {
    
  
  // Attach this ref to container to get max height and width
  // Container width and height are 100% of the parents w/h so droplets are'nt positioned beyond boundaries
  const rainRef: React.MutableRefObject<HTMLDivElement | null> | null = React.useRef(null)
  const [dropletArray, setDropletArray ] = React.useState<Array<any> | null>([])
  // const [maxHeight, setMaxHeight] = React.useState<number>()
  // const [maxWidth, setMaxWidth] = React.useState<number>()
  const [stateRef, setStateRef] = React.useState<any>()
  // const mapOnMount = ()=> {
    
  // }


  
  React.useEffect(() => {
    console.log('setting up droplet array')
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
          console.log('cleaning up useeffect')
          setDropletArray(null)
        }
    // console.log('Number of drops: ', rainRef?.current?.childElementCount)
    // console.log(dropletArray)
  }, [stateRef]);
  // Issues - positions are possibly greater than the width or height of the screen size, overflowing
  // the element making a scroll bar appear and disappear rapidly. 

  // Possible fix - Retrieve max screen size (or element size) to choose numbers that are less than those values to 
  // prevent overflows

  // Changes - Instead of have the rain fill the whole screen and beyond, only allow rain drops within parent element
  //         - Use typescript and understand how to use parent element attributes to limit the rains boundries
  React.useEffect(()=>{
    console.log(rainRef)
    rainRef && setStateRef(rainRef)
    // !maxHeight && setMaxHeight(rainRef.current?.offsetHeight)
    // !maxWidth && setMaxWidth(rainRef.current?.clientWidth)
}, []);


  // First get height and width of parent
  // Map divs(drops) with random positions within height and width of element
  // Instead of appending with jquery, I can simply either set this array of divs to the useState
  // or have the mapping code in the return jsx that rerenders if numDrop number changes

  // Last version checks if number of drops changes, if so stop then start the rain again with new value


    return  ( 
      <Container
        ref={rainRef}
        >
          
        { dropletArray}
        
      </Container>
    ) 
}

export default Rain;
