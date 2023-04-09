import Droplet from '../Droplet-sc/Droplet'
import DropImpact from '../Droplet-sc/DropImpact';
import DropletContainer from '../Droplet-sc/DropContainer';
import type {numDrops, dropletOptions} from '../types'


  // Create an array of HTML div elements to be rendered. These have animation styled attached to them, which can all 
  // be changed at the same time. They have their own unique positions which cannot be changed and must be rerendered
  // to get a new set of droplets.
  // numDrops could be null to allow for a smart position function to determine number of drops based on width
  const mapDroplets = (rainRef: React.MutableRefObject<any>, dropletOptions: dropletOptions): Array<React.ReactElement> =>{
    const {dropletColor = 'rgb(255, 135, 235)', numDrops = 100} = dropletOptions
    const array = []
    // The max width here is important; we will need to make sure droplets are spread evenly(but still look natural with randomness).
    
    const {clientWidth: maxWidth, clientHeight: maxHeight} = rainRef.current
    
    // If I am calculating the number of drops according to width px and drops per x%, check/set numDrops before moving on
    for(let i = 0; i < numDrops; i++){
      const randomUnder1Hundred = (Math.floor(Math.random() * (98 - 1 + 1) + 1))
       //random number between 5 and 2
      const randoFiver = (Math.floor(Math.random() * (5 - 1) + 2))
  
      console.log(randomUnder1Hundred)
      console.log(randoFiver)
      array.push(
        <DropletContainer
          key={`drop${i}`}
          // className='drop-container'
          id={`drop${i}`}
          // Static gap between droplets
          gapLength={(maxWidth / numDrops) * i}
           style={{
              animationDuration: `.5${randomUnder1Hundred}s`,
              animationDelay: `.${randomUnder1Hundred}s`,
              // Random % between 103 and 109 to vary the drops starting point, and have a more natural look
              bottom: `${(randoFiver + randoFiver - 1 + 100)}%`,
              // Come up with way to evenly split left position number based on amount of drops and width.
              // If numDrops is provided/known, just divide maxWidth by number of droplets and multiply the index 
              // by the result. 
              // 
                // If user puts in numDrops = 60, how do we calculate left: x in styles for each droplet
              //  - (maxWidth / numDrops) * i  to get evenly spread out drops. Do not round this number.
              // 
              // 
              // 

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
                animationDuration: `.5${randomUnder1Hundred}s`,
                animationDelay: `.${randomUnder1Hundred}s`,
              }}
               />
              
           </DropletContainer>
        )
    }
    return array
  } 


  export default mapDroplets