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
    
    // If I am calculating the number of drops according to width px and drops per x%, check/set numDrops before moving on
    for(let i = 0; i < numDrops; i++){
      const randomUnder1Hundred = (Math.floor(Math.random() * (98 - 1 + 1) + 1))
       //random number between 5 and 2
      const randoFiver = (Math.floor(Math.random() * (5 - 1) + 2))
  
      // Static gap between droplets
      const gapLength = Math.floor(maxWidth / numDrops)
      array.push(
        <div 
          key={`drop${i}`}
          className='drop-container'
           id={`drop${i}`} 
  
           style={{
              animationDuration: `.5${randomUnder1Hundred}s`,
              animationDelay: `.${randomUnder1Hundred}s`,
              // Random % between 103 and 109 to vary the drops starting point, and have a more natural look
              bottom: `${(randoFiver + randoFiver - 1 + 100)}%`,
              // Come up with way to evenly split left position number based on amount of drops and width.
              // If numDrops is provided/known, just divide maxWidth by number of droplets and multiply the index 
              // by the result. 
              left: `${gapLength * i}px`,




              //   If user puts in numDrops = 60, how do we calculate left: x in styles for each droplet
              // 
              // 
              // 
              // 
              // 
              // 

           }}
           >
  
            {/* animation timing for proceeding two divs don't need much customization */}
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


  export default mapDroplets