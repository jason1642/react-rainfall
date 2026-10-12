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
numDrops | false | number | parentWidth / 25 (profile dependent) | number | Target number of drops before quality scaling and the `maxDrops` cap. Angled rain adds offscreen edge-buffer drops to keep coverage full.
dropletColor | false | color in rbg() format | white | 'rgb(200, 200, 200) | Color of droplets, which will use a linear gradient effect. Must be in rgb format.
size | false | string | 'default' | 'short' (10px) <br /> 'default' (19px) <br /> 'long' (34px) for streaks | Change the visible length of rain streaks.
showImpact | false | boolean | true| boolean | Show the impact animation when the rain drop reachs the bottom.
impactStyle | false | string | 'splash' (profile default may vary) | 'splash', 'spray', 'ripple' | Choose upward splash particles, a spray burst, or expanding puddle rings.
impactThickness | false | number | 2.5 | 0.5 - 8 pixels | Set the diameter of the impact particles.
impactOpacity | false | number | 0.65 | 0 - 1 | Set the overall impact visibility.
impactDensity | false | number | Profile default (0.18–0.3) | 0 - 1 | Set the fraction of drops that produce impacts. Selection is stable by drop index; `0` disables impacts and `1` adds one to every eligible drop.
angle | false | number | 0 | -75 to 75 | Tilt the rain from vertical in degrees. Positive values drift right; negative values drift left. Values outside this range are clamped.
profile | false | string | undefined | 'light-drizzle', 'steady-rain', 'passing-shower', 'heavy-rain', 'misty-rain', 'snow', 'hail', 'cartoon', 'rainbow' | Select a precipitation preset. Explicit props such as `numDrops` and `size` override preset defaults.
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
cloudProfile | false | string | 'puffy' | 'soft', 'puffy', 'rolling', 'cartoon' | Choose diffuse clouds, clearly shaped clouds, faster rolling clouds, or bright rounded cartoon clouds. Explicit cloud props override the preset values.
showLightning | false | boolean | false (true for `heavy-rain`) | true / false | Enable lightning flashes above the rain. This is a visual effect and does not play thunder audio.
lightningFrequency | false | number | 9 (15 for `heavy-rain`) | seconds | Average interval between flashes; the first flash appears within about one second.
lightningFlashDuration | false | number | 450 (300 for `heavy-rain`) | milliseconds | Duration of each flash, clamped to 80–4000 ms.
lightningColor | false | string | #dfe6ff | CSS color | Color used for the lightning bolt and flash.
dropStyle | false | string | 'streak' | 'streak', 'pixel', 'soft', 'orb', 'snowflake', 'hailstone', 'cartoon' | Change the visual shape of each precipitation particle.
depth | false | boolean | false (true for `heavy-rain`) | true / false | Vary drop size, speed, opacity, blur, and impact height to create distant and foreground rain layers.
showWind | false | boolean | false | true / false | Add gradual gusts that bend and gently shift individual drops.
windProfile | false | string | undefined | 'subtle', 'breezy', 'gusty', 'squall' | Choose a wind intensity preset. Selecting a profile enables animated drop angle and drift; `windVariation` and `gustFrequency` customize it.
rainFromClouds | false | boolean | false | true / false | Cluster rain beneath the cloud positions and reduce profile-default drop density; an explicit `numDrops` is respected. Clouds are shown automatically when this is enabled.
windVariation | false | number | Profile default (8 degrees for subtle wind) | 0 - 30 degrees | Set how far drops gradually lean and shift during a gust. Clouds keep their slower `cloudDrift` motion.
gustFrequency | false | number | Profile default (8 seconds for subtle wind) | seconds | Set the base interval of the gradual drop-angle and drift cycle.
surface | false | string | 'air' | 'air', 'glass' | Set `glass` to add a fogged pane with animated water runs and refraction-like backdrop blur.
glassFog | false | number | 0.18 | 0 - 1 | Set the fogged-glass overlay strength.
glassRefraction | false | number | 2 | 0 - 12 pixels | Adjust the glass backdrop blur and refraction impression.
pauseWhenHidden | false | boolean | false | true / false | Set true to pause CSS animations while the browser tab is hidden.
respectReducedMotion | false | boolean | true | true / false | Honor the operating system's `prefers-reduced-motion` setting. Set false to force animations when the system preference requests reduced motion.
playing | false | boolean | true | true / false | Start or pause the rain layer. Also controlled by the imperative ref and `useRainfall()` hook.
intensity | false | number | 1 | 0 - 1 | Scale the active drop count from none to the selected profile's full density.
quality | false | string | 'high' | 'low', 'medium', 'high' | Scale drop count to suit device capabilities: low uses 40%, medium 70%, and high 100% of the requested count.
maxDrops | false | number | 600 | 0 - 5000 | Hard cap on the final drop count, including extra drops added to cover angled rain. Lower this or use a lower `quality` on slower devices.







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


## Imperative and state controls

`Rain` accepts a ref with `start()`, `stop()`, `setIntensity(0–1)`, and `triggerLightning()` methods:

```tsx
import { useRef } from "react";
import { Rain, type RainHandle } from "react-rainfall";

function StormControls() {
  const rainRef = useRef<RainHandle>(null);

  return (
    <>
      <Rain ref={rainRef} profile="heavy-rain" />
      <button onClick={() => rainRef.current?.stop()}>Stop</button>
      <button onClick={() => rainRef.current?.start()}>Start</button>
      <button onClick={() => rainRef.current?.setIntensity(0.35)}>
        Lighten the rain
      </button>
      <button onClick={() => rainRef.current?.triggerLightning()}>
        Flash lightning
      </button>
    </>
  );
}
```

For state-driven controls, `useRainfall()` returns a ref, `props` to spread onto `Rain`, and matching control methods:

```tsx
import { Rain, useRainfall } from "react-rainfall";

function StatefulStorm() {
  const rain = useRainfall();

  return (
    <>
      <Rain ref={rain.ref} {...rain.props} profile="heavy-rain" />
      <button onClick={rain.playing ? rain.stop : rain.start}>
        {rain.playing ? "Stop" : "Start"}
      </button>
      <input
        aria-label="Rain intensity"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={rain.intensity}
        onChange={(event) => rain.setIntensity(Number(event.target.value))}
      />
      <button onClick={rain.triggerLightning}>Flash lightning</button>
    </>
  );
}
```

`pauseWhenHidden` defaults to `false`; set it to `true` to pause while the top-level browser tab is hidden. `respectReducedMotion` defaults to `true`; set it to `false` to force animation even when the operating system requests reduced motion. Storybook scenes set it to `false` so their animation previews remain visible.


