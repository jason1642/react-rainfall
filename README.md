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
    import 'react-rainfall/dist/style.css'
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
numDrops | false | number | parentWidth / 25 | number | Target number of visible drops. Angled rain adds offscreen edge-buffer drops to keep coverage full.
dropletColor | false | color in rbg() format | white | 'rgb(200, 200, 200) | Color of droplets, which will use a linear gradient effect. Must be in rgb format.
size | false | string | 'default' | 'short' (10px) <br /> 'default' (19px) <br /> 'long' (34px) for streaks | Change the visible length of rain streaks.
showImpact | false | boolean | true| boolean | Show the impact animation when the rain drop reachs the bottom.
impactStyle | false | string | 'splash' (profile default may vary) | 'splash', 'spray', 'ripple' | Choose upward splash particles, a spray burst, or expanding puddle rings.
impactThickness | false | number | 2.5 | 0.5 - 8 pixels | Set the diameter of the impact particles.
impactOpacity | false | number | 0.65 | 0 - 1 | Set the overall impact visibility.
angle | false | number | 0 | -75 to 75 | Tilt the rain from vertical in degrees. Positive values drift right; negative values drift left. Values outside this range are clamped.
profile | false | string | undefined | 'light-drizzle', 'steady-rain', 'passing-shower', 'heavy-rain', 'misty-rain', 'snow', 'hail', 'rainbow' | Select a precipitation preset. Explicit props such as `numDrops` and `size` override preset defaults.
dropletOpacity | false | number | .5 | 0 - 1 | Change the opacity of the droplet itself. Use a decimal number between 0 and 1.
duration | false | string | Profile default | 'slow', 'normal', 'fast' | Adjust the fall rate. An explicit value overrides the selected profile's speed.
showClouds | false | boolean | false (true for `heavy-rain`) | true / false | Enable the animated cloud layer behind the rain.
cloudCount | false | number | 3 (5 for `heavy-rain`) | 0 - 24 | Number of clouds when `showClouds` is enabled.
cloudSize | false | number | 320 (420 for `heavy-rain`) | pixels | Approximate width of each cloud.
cloudSpeed | false | number | 36 | seconds | Time for clouds to drift in one direction; they ease back and repeat.
cloudOpacity | false | number | 0.4 (0.48 for `heavy-rain`) | 0 - 1 | Opacity of the clouds.
cloudDrift | false | number | 120 (360 for `heavy-rain`) | pixels | Horizontal cloud drift per direction. Positive moves right; negative moves left.
cloudBlur | false | number | 4px | 0 - 40 pixels | Adjust cloud softness. Use a low value for distinct cloud edges.
cloudColor | false | string | #43527f | CSS color | Set the color of the cloud shapes.
showLightning | false | boolean | false (true for `heavy-rain`) | true / false | Enable lightning flashes above the rain. This is a visual effect and does not play thunder audio.
lightningFrequency | false | number | 9 (15 for `heavy-rain`) | seconds | Average interval between flashes; the first flash appears within about one second.
lightningFlashDuration | false | number | 450 (300 for `heavy-rain`) | milliseconds | Duration of each flash, clamped to 80–4000 ms.
lightningColor | false | string | #dfe6ff | CSS color | Color used for the lightning bolt and flash.
dropStyle | false | string | 'streak' | 'streak', 'pixel', 'soft', 'orb', 'snowflake', 'hailstone' | Change the visual shape of each precipitation particle.
depth | false | boolean | false (true for `heavy-rain`) | true / false | Vary drop size, speed, opacity, blur, and impact height to create distant and foreground rain layers.
showWind | false | boolean | false | true / false | Add subtle periodic animated gusts across the rain layer.
rainFromClouds | false | boolean | false | true / false | Cluster rain beneath the cloud positions. Clouds are shown automatically when this is enabled.







![](https://github.com/jason1642/react-rainfall/blob/main/thunderRain.gif)





### Storm example

```jsx
<Rain
  profile="heavy-rain"
  angle={18}
  showClouds
  cloudCount={5}
  cloudSize={420}
  cloudSpeed={32}
  cloudOpacity={0.55}
  cloudDrift={360}
  showLightning
  lightningFrequency={15}
  lightningFlashDuration={300}
  lightningColor="#dfe6ff"
  dropStyle="pixel"
  depth
/>
```



## Planned updates
 - Add more rain profile options, such as storm
 - Add direction change options
 - Add in and out fading for droplets options. 
