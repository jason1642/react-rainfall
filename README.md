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
size | false | string | 'default' | 'short' (20px) <br /> 'default' (120px) <br /> 'long' (200px) | Change the length of the rain drops. 
showImpact | false | boolean | true| boolean | Show the impact animation when the rain drop reachs the bottom.
angle | false | number | 0 | -75 to 75 | Tilt the rain from vertical in degrees. Positive values drift right; negative values drift left. Values outside this range are clamped.
profile | false | string | undefined | 'light-drizzle', 'steady-rain', 'passing-shower', 'heavy-rain', 'misty-rain', 'rainbow' | Select a rainfall preset. Explicit props such as `numDrops` and `size` override preset defaults.
dropletOpacity | false | number | .5 | 0 - 1 | Change the opacity of the droplet itself. Use a decimal number between 0 and 1.
showClouds | false | boolean | false | true / false | Enable the animated cloud layer behind the rain.
cloudCount | false | number | 3 | 0 - 24 | Number of clouds when `showClouds` is enabled.
cloudSize | false | number | 320 | pixels | Approximate width of each cloud.
cloudSpeed | false | number | 36 | seconds | Time for clouds to drift in one direction; they ease back and repeat.
cloudOpacity | false | number | 0.4 | 0 - 1 | Opacity of the clouds.
cloudDrift | false | number | 120 | pixels | Horizontal cloud drift per direction. Positive moves right; negative moves left.
showLightning | false | boolean | false | true / false | Enable lightning flashes above the rain. This is a visual effect and does not play thunder audio.
lightningFrequency | false | number | 9 | seconds | Average interval between lightning flashes.
lightningFlashDuration | false | number | 450 | milliseconds | Duration of each flash, clamped to 80–4000 ms.
lightningColor | false | string | #eaf3ff | CSS color | Color used for the lightning bolt and flash.
dropStyle | false | string | 'streak' | 'streak', 'pixel', 'soft', 'orb' | Change the visual shape of each raindrop. Pixel uses stepped edges; soft blurs the streak; orb makes short bead-like drops.
depth | false | boolean | false | true / false | Randomize drop scale, brightness, blur, and overlap to create small distant drops and larger foreground drops.







![](https://github.com/user-attachments/assets/7c02882a-7e70-4af0-b238-76957b1e7357.gif)





### Storm example

```jsx
<Rain
  profile="heavy-rain"
  angle={18}
  showClouds
  cloudCount={4}
  cloudSize={380}
  cloudSpeed={32}
  cloudOpacity={0.45}
  cloudDrift={140}
  showLightning
  lightningFrequency={8}
  lightningFlashDuration={500}
  lightningColor="#eaf3ff"
  dropStyle="pixel"
  depth
/>
```



## Planned updates
 - Add more rain profile options, such as storm
 - Add direction change options
 - Add in and out fading for droplets options. 
