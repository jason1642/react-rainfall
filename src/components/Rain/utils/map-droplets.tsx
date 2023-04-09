import Droplet from '../Droplet-sc/Droplet'
import DropImpact from '../Droplet-sc/DropImpact';
import DropletContainer from '../Droplet-sc/DropContainer';
import type { dropletOptions } from '../types'


  // Create an array of HTML div elements to be rendered. These have animation styled attached to them, which can all 
  // be changed at the same time. They have their own unique positions which cannot be changed and must be rerendered
  // to get a new set of droplets. 
  // numDrops could be undefined to allow for a smart position function to determine number of drops based on width

  const mapDroplets = (rainRef: React.MutableRefObject<any>, dropletOptions: dropletOptions): Array<React.ReactElement> =>{
    const { dropletColor = 'rgb(102, 122, 255)', numDrops, showImpact, size, } = dropletOptions
    const array = []
    // The max width here is important; we will need to make sure droplets are spread evenly(but still look natural with randomness).
    
    const {clientWidth: maxWidth, clientHeight: maxHeight} = rainRef.current
    const numDropsCount = numDrops ? Math.floor(numDrops) : Math.floor(maxWidth / 25)
    // If I am calculating the number of drops according to width px and drops per x%, check/set numDrops before moving on
    for(let i = 0; i < numDropsCount; i++){
      const randomUnder1Hundred = (Math.floor(Math.random() * (98 - 1 + 1) + 1))
       //random number between 5 and 2
      const randoFiver = (Math.floor(Math.random() * (5 - 1) + 2))
  
      // console.log(randomUnder1Hundred)
      // console.log(randoFiver)
      array.push(
        <DropletContainer
          maxHeight={maxHeight}
          key={`drop${i}`}
          size={size}
          // className='drop-container'
          id={`drop${i}`}
          // Static gap between droplets: divide width by amount of drops to get the size per gap, then multiply by index to get incremented positon based on gap
          gapLength={(maxWidth / numDropsCount) * i}
           style={{
              animationDuration: `.5${randomUnder1Hundred}s`,
              animationDelay: `.${randomUnder1Hundred}s`,
              // Random % between 103 and 109 to vary the drops starting point, and have a more natural look
              bottom: `${(randoFiver + randoFiver - 1 + 100)}%`,
           }}
           >
  
            {/* animation timing for proceeding two divs don't need much customization */}
            <Droplet
              // className='droplet'
              dropletColor={dropletColor}
              style={{
                animationDuration: `.5${randomUnder1Hundred}s`,
                animationDelay: `.${randomUnder1Hundred}s`,
              }}
            />
            <DropImpact
              dropletColor={dropletColor}
              style={{
                display: showImpact ? 'block !important' : 'none !important',
                animationDuration: `.5${randomUnder1Hundred}s`,
                animationDelay: `.${randomUnder1Hundred}s`,
              }}
               />
              
           </DropletContainer>
        )
    }
    console.log(array.length)
    return array
  } 


  export default mapDroplets