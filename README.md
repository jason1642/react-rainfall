 # React Rainfall
  A simple to use React package that provides a rainfall animation effect to the background to a parent element.
  NPM - https://www.npmjs.com/package/react-rainfall
  
  
 ## Installation 
 ```
    npm i react-rainfall
 ```
 
 
 ## Usage 
 ```jsx
    import Rain from 'react-rainfall'

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
numDrops | false | number | 100 | number | The number of rain drops that is animated
dropletColor | false | color in rbg() format | white | 'rgb(200, 200, 200) | Color of droplets, which will use a linear gradient effect. Must be in rgb format
size | false | string | 'default' | 'short' (20px) <br /> 'default' (120px) <br /> 'long' (200px) | Change the length of the rain drops. 
showImpact | false | boolean | true| boolean | Show the impact animation when the rain drop reachs the bottom



![](https://github.com/jason1642/react-rainfall/blob/main/rainfall-gif-04-09-23.gif)




### Developer notes

## Issues / potential problems 

- (April 7th, 2023 ) Droplets are positions at random from start of end of height/width lengths. This means that
it is possible to have most droplets at one half of an element (with bad luck). This can be addressed
by making sure there is atleast 1 droplet for every 10 pixels (or something similar)

-  (April 7th, 2023 ) The default amount of droplets is 50 (currently), this means elements with a wide length will have droplets with 
too much space in between them (positions being random from 0 - maxwidth makes this a bigger problem).
To prevent having the user figure out what is the correct amount for their element (depending on its 
length and responsiveness), an algorithm should be created to assign positions for droplets for x amount 
of pixels. Then move on to the next interval until there is no more space to continue adding more. This 
will automatically assign the number of drops depending on width, which the user can still change if more 
or less is desired.

-  (April 8th, 2023 ) Currently the rendering looks like a video that is being looped back from the same position. It doesn't look natural
and looks a bit choppy. More understanding of the animation and lifecycle of the droplet fall should be looked into.
Current range for vertical droplet position is -1000 <-> maxHeight, to make droplets look more natural, it could always start 
at a negative top position and end keyframe animation position at (top: set number greater than maxheight). 
CSS {animation-delay: -2s}(Using a negative number will cause the animation to appear to have been already playing for x seconds)
can be used to have the rain already start falling within the element since they initally would need some 
time to appear in the main element because they all start above the boundries of the element. 

