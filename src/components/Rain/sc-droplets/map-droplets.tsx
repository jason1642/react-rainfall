import Droplet from './Droplet'
import DropImpact from './DropImpact';
import DropletContainer from './DropContainer';
import type { dropletOptions } from '../rainTypes'
import selectDropletColor from '../select-droplet-color';

  const mapDroplets = (rainRef: {maxWidth: number, maxHeight: number}, dropletOptions: dropletOptions): Array<any> =>{
    const { dropletColor, numDrops, showImpact = true, size = 'default', rainEffect, dropletOpacity = .5} = dropletOptions
    const array = []
    const {maxWidth, maxHeight} = rainRef
    const numDropsCount = numDrops ? Math.floor(numDrops) : Math.floor(maxWidth / 25)

    for(let i = 0; i < numDropsCount; i++){
      const randomUnder1Hundred = (Math.floor(Math.random() * (98 - 1 + 1) + 1))
      const randoFiver = (Math.floor(Math.random() * (5 - 1) + 2))
      const dropColor = selectDropletColor(dropletColor, rainEffect)
      
      array.push(
        <DropletContainer
          maxHeight={maxHeight}
          key={`drop${Math.random() * (i + 13)}${randomUnder1Hundred}`}
          gapLength={(maxWidth / numDropsCount) * i}
          size={size}
          style={{
              animationDuration: `.6${randomUnder1Hundred}s`,
              animationDelay: `.${randomUnder1Hundred}s`,
              bottom: `${(randoFiver + randoFiver - 1 + 100)}%`,
           }}>
  
            <Droplet
              id={`drop${Math.random() * i + 51}${randomUnder1Hundred}`}
              dropletColor={dropletColor}
              style={{
                animationDuration: `.6${randomUnder1Hundred}s`,
                animationDelay: `.${randomUnder1Hundred}s`,
                background: 
                  `linear-gradient(to bottom, rgba(${dropColor.split('(')[1].split(')')[0]}, 0), rgba(${dropColor?.split('(')[1].split(')')[0]}, ${dropletOpacity}))`
              }}/>

            {showImpact && <DropImpact
              dropletColor={dropletColor}
              style={{
                display: 'block',
                animationDuration: `.6${randomUnder1Hundred}s`,
                animationDelay: `.${randomUnder1Hundred}s`,
                borderTop: `2px dotted ${dropColor}`
              }}
               />}
          
           </DropletContainer>
        )}
    return array
  } 


  export default mapDroplets