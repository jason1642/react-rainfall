import React, {useEffect, useState, useRef, RefObject} from 'react'
import './Rain.css'

interface IRainProps {
    numDrops?: number;
    // Add other option props such as:
    // - styles for rain container and droplets
    // - Rain direction, speed, fall length

}
const randRange = (minNum: number, maxNum:number) =>{
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
  }

const mapDroplets = (numDrops: number, rainRef: React.MutableRefObject<any>): Array<JSX.Element> =>{
  const array = []
  const {clientWidth: maxWidth, clientHeight: maxHeight} = rainRef.current
  for(let i = 0; i < numDrops; i++){
    array.push(
      <div 
        key={`drop${i}`}
        className='droplet'
         id={`drop${i}`} 
         style={{
            left: randRange(0, maxWidth),
            top: randRange(-1000, maxHeight)
         }}
         />
      )
  }
  return array
} 


const Rain: React.FunctionComponent<IRainProps> = ({numDrops = 50}) => {
    
  
  // Attach this ref to container to get max height and width
  // Container width and height are 100% of the parents w/h so droplets are'nt positioned beyond boundaries
  const rainRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)
  const [dropletArray, setDropletArray ] = useState<Array<any>>()

  useEffect(() => {
    setDropletArray(mapDroplets(numDrops, rainRef))
    console.log('Number of drops: ', rainRef.current?.childElementCount)
    console.log(dropletArray)
  }, [numDrops, rainRef]);
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
    <div 
        id='Rain'
        ref={rainRef}
    > 
    {dropletArray}
</div>
  )
}

export default Rain;
