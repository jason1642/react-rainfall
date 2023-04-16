 # React Rainfall
  A simple to use React package that provides a rainfall animation effect to the background to a parent element.
  npm - https://www.npmjs.com/package/react-rainfall
  
  
 ## Installation 
 ```
    npm i react-rainfall
 ```
 
 
 ## Usage 
 ```jsx
    import Rain from 'react-rainfall'
   // IMPORTANT - Parent element must have position relative or else rain will be positioned based on viewport 
    <div style={{
       position: 'relative',
       height: '600px',
       width: '1000px'
     }}> 
       <Rain />
    </div>
 ```

 ## API
 
 Name | Is Required? | type | Default | options | Description 
--- | -- | --- | --- | --- | ----
numDrops | false | number | parentWidth / 25 | number | The number of rain drops that is animated
dropletColor | false | color in rbg() format | white | 'rgb(200, 200, 200) | Color of droplets, which will use a linear gradient effect. Must be in rgb format.
size | false | string | 'default' | 'short' (20px) <br /> 'default' (120px) <br /> 'long' (200px) | Change the length of the rain drops. 
showImpact | false | boolean | true| boolean | Show the impact animation when the rain drop reachs the bottom.
rainEffect | false | string | undefined | 'rainbow' <br /> More in development | Select a preset for different rainfall effects
dropletOpacity | false | number | .5 | 0 - 1 | Change the opacity of the droplet itself. Use a decimal number between 0 and 1.



![](https://github.com/jason1642/react-rainfall/blob/main/rainfall-gif-04-09-23.gif)



## Planned updates
 - Add more rain effect preset options
 - Add direction change options
 - Add in and out fading for droplets options. 

