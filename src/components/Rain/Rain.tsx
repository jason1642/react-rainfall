import React, { useEffect, useState, useRef } from 'react'
import './Rain.css'
import mapDroplets from './utils/map-droplets';
import type {dropletOptions} from './types'

interface IRainProps extends dropletOptions {
    // Important - Limit amount of drain droplets to prevent a crash or performance 
    // Add other option props such as:
    // - styles for rain container and droplets
    // - Rain direction, speed, fall length

}


// Issues
// 






const Rain: React.FunctionComponent<IRainProps> = ({numDrops, dropletColor, size, showImpact, rainEffect, dropletOpacity}) => {
    
  
  // Attach this ref to container to get max height and width
  // Container width and height are 100% of the parents w/h so droplets are'nt positioned beyond boundaries
  const rainRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)
  const [dropletArray, setDropletArray ] = useState<Array<React.ReactElement>>()

  const mapOnMount = async()=> {
     await setDropletArray(mapDroplets(rainRef,
       {
        numDrops,
        dropletColor,
        size,
        showImpact,
        rainEffect,
        dropletOpacity
        }))
  }

  useEffect(() => {
   
    rainRef && mapOnMount()

    console.log('Number of drops: ', rainRef.current?.childElementCount)
    // console.log(dropletArray)
  }, [numDrops, rainRef, rainEffect, showImpact, dropletColor, size, dropletOpacity]);
  // Issues - positions are possibly greater than the width or height of the screen size, overflowing
  // the element making a scroll bar appear and disappear rapidly. 

  // Possible fix - Retrieve max screen size (or element size) to choose numbers that are less than those values to 
  // prevent overflows

  // Changes - Instead of have the rain fill the whole screen and beyond, only allow rain drops within parent element
  //         - Use typescript and understand how to use parent element attributes to limit the rains boundries



  // First get height and width of parent
  // Map divs(drops) with random positions within height and width of element
  // Instead of appending with jquery, I can simply either set this array of divs to the useState
  // or have the mapping code in the return jsx that rerenders if numDrop number changes

  // Last version checks if number of drops changes, if so stop then start the rain again with new value


    return ( 
      <div id='Rain' ref={rainRef}> 
        {rainRef && dropletArray}
      </div>
    )
}

export default Rain;
