import React, {useEffect, useState, useRef, RefObject} from 'react'
import './Rain.css'

interface IRainProps {
    numDrops?: number;
    // Important - Limit amount of drain droplets to prevent a crash or performance 
    // Add other option props such as:
    // - styles for rain container and droplets
    // - Rain direction, speed, fall length

}

// Issues / potential problems

// Droplets are positions at random from start of end of height/width lengths. This means that
// it is possible to have most droplets at one half of an element (with bad luck). This can be addressed
// by making sure there is atleast 1 droplet for every 10 pixels (or something similar)

// The default amount of droplets is 50 (currently), this means elements with a wide length will have droplets with 
// too much space in between them (positions being random from 0 - maxwidth makes this a bigger problem).
// To prevent having the user figure out what is the correct amount for their element (depending on its 
// length and responsiveness), an algorithm should be created to assign positions for droplets for x amount 
// of pixels. Then move on to the next interval until there is no more space to continue adding more. This 
// will automatically assign the number of drops depending on width, which the user can still change if more 
// or less is desired.

// Currently the rendering looks like a video that is being looped back from the same position. It doesn't look natural
// and looks a bit choppy. More understanding of the animation and lifecycle of the droplet fall should be looked into.
// Current range for vertical droplet position is -1000 <-> maxHeight, to make droplets look more natural, it could always start 
// at a negative top position and end keyframe animation position at (top: set number greater than maxheight). 
// CSS {animation-delay: -2s}(Using a negative number will cause the animation to appear to have been already playing for x seconds)
// can be used to have the rain already start falling within the element since they initally would need some 
// time to appear in the main element because they all start above the boundries of the element. 

// For customization, I need to pass props that the user input into the stylesheet. This could be done multiple ways, 
// SCSS seems to be perfect for this very small component.

// This function will simply chose a number in between the min and max numbers provided. This could
// stay the same if another function is used to identify the ranges based on the elements length.
const randRange = (minNum: number, maxNum:number) =>{
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
  }

  // Create an array of HTML div elements to be rendered. These have animation styled attached to them, which can all 
  // be changed at the same time. They have their own unique positions which cannot be changed and must be rerendered
  // to get a new set of droplets.
  // numDrops could be null to allow for a smart position function to determine number of drops based on width
const mapDroplets = (numDrops: number, rainRef: React.MutableRefObject<any>): Array<JSX.Element> =>{
  const array = []
  // The max width here is important; we will need to make sure droplets are spread evenly(but still look natural with randomness).
  // 
  const {clientWidth: maxWidth, clientHeight: maxHeight} = rainRef.current
  
  // Personally I don't like using forloops and pushing (could possibly be better or worse), but this works. Simply returning a
  // map could potentially be much better for optimization. The issue is Object.map must be called upon an array with that length,
  // I should look into other ways to map and return without having a populated array already.
  for(let i = 0; i < numDrops; i++){
    const randomUnder1Hundred = (Math.floor(Math.random() * (98 - 1 + 1) + 1))
     //random number between 5 and 2
    const randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2))

    array.push(
      <div 
        key={`drop${i}`}
        className='drop-container'
        // The ID used here is not used anywhere including the css file.
         id={`drop${i}`} 
        //  Customization doesn't need to be made here as each droplet alone is insignificant to be styled individually instead of using the css class query
         style={{
            animationDuration: `.5${randomUnder1Hundred}s`,
            animationDelay: `.${randomUnder1Hundred}s`,
            bottom: `${(randoFiver + randoFiver - 1 + 100)}%`,
            // left: randRange(0, maxWidth),
            // Come up with way to evenly split left position number based on amount of drops and width
            left: `${i}%`,
            // top: randRange(-1500, 250)
         }}
         >
          <div
            className='droplet'
            style={{
              animationDuration: `.5${randomUnder1Hundred}s`,
              animationDelay: `.${randomUnder1Hundred}s`,
            }}
          />
          <div
           className="droplet-impact" 
           style={{
            animationDuration: `.5${randomUnder1Hundred}s`,
            animationDelay: `.${randomUnder1Hundred}s`,
            }}
             />
            
         </div>
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
