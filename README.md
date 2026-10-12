# React Rainfall

React Rainfall adds animated precipitation and optional weather layers to a positioned element.

## Installation

```sh
npm install react-rainfall
```

## Basic usage

```tsx
import { Rain } from "react-rainfall";
import "react-rainfall/dist/style.css";

function WeatherPanel() {
  return (
    <div style={{ position: "relative", width: "100%", height: 600 }}>
      <Rain />
    </div>
  );
}
```

`Rain` fills its parent, so give the parent `position: relative` and a height. The rain layer is decorative and does not intercept pointer events.

## API

All props are optional. A selected `profile` supplies defaults for properties it defines; an explicitly provided prop takes precedence.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `profile` | String union | None | Precipitation preset: `light-drizzle`, `steady-rain`, `passing-shower`, `heavy-rain`, `misty-rain`, `snow`, `hail`, `cartoon`, or `rainbow`. |
| `numDrops` | `number` | Profile value, otherwise parent width / 25 | Target particle count before quality scaling and the `maxDrops` cap. Angled rain adds edge coverage. |
| `dropletColor` | `rgb()` color | Profile value, otherwise `rgb(183, 212, 255)` | Particle color. Use RGB syntax, for example `rgb(170, 195, 255)`. |
| `size` | `"short" \| "default" \| "long"` | Profile/style default | Particle size. When `dropStyle` is explicitly set, its own baseline size is used unless `size` is also provided. |
| `dropletOpacity` | `number` | Profile/style default, otherwise `0.5` | Particle opacity from `0` to `1`. An explicitly selected `dropStyle` supplies a baseline opacity unless this prop is set. |
| `duration` | `"slow" \| "normal" \| "fast"` | Profile value, otherwise `"normal"` | Controls fall speed. |
| `angle` | `number` | Profile value, otherwise `0` | Tilt in degrees from vertical. Positive values drift right; negative values drift left. Values are clamped to `-75` through `75`. |
| `dropStyle` | String union | Profile value, otherwise `"streak"` | Particle shape: `streak`, `pixel`, `soft`, `glow`, `orb`, `snowflake`, `hailstone`, or `cartoon`. |
| `depth` | `boolean` | Profile value, otherwise `false` | Varies particle size, speed, opacity, and impact scale to suggest foreground and background layers. |
| `showImpact` | `boolean` | Profile value, otherwise `true` | Show an impact when a particle reaches the bottom. |
| `impactStyle` | `"splash" \| "spray" \| "ripple"` | Profile value, otherwise `"splash"` | Choose a small upward splash, a wider spray, or expanding water rings. |
| `impactThickness` | `number` | Profile value, otherwise `2.5` | Impact thickness from `0.5` to `8` pixels. |
| `impactOpacity` | `number` | Profile value, otherwise `0.65` | Impact opacity from `0` to `1`. |
| `impactDensity` | `number` | Profile value, otherwise `0.25` | Fraction of drops that make impacts, from `0` to `1`. Selection is stable per drop. |
| `showClouds` | `boolean` | Profile value, otherwise `false` | Show animated clouds behind the precipitation. |
| `cloudProfile` | String union | Profile value, otherwise `"puffy"` | Cloud appearance: `soft`, `puffy`, `rolling`, or `cartoon`. |
| `cloudCount` | `number` | Profile value, otherwise `3` | Cloud count, clamped to `0`–`24`. |
| `cloudSize` | `number` | Profile value, otherwise `320` | Approximate cloud width in pixels. |
| `cloudSpeed` | `number` | Cloud profile/preset value | Time in seconds for a cloud to drift in one direction before easing back. |
| `cloudOpacity` | `number` | Cloud profile/preset value | Cloud opacity from `0` to `1`. |
| `cloudDrift` | `number` | Cloud profile/preset value | Horizontal cloud travel in pixels. Negative values drift left. |
| `cloudBlur` | `number` | Cloud profile/preset value | Cloud blur in pixels, clamped to `0`–`40`. |
| `cloudColor` | `string` | Cloud profile/preset value | CSS color for the cloud shapes. |
| `rainFromClouds` | `boolean` | `false` | Cluster drops under the clouds. Clouds are enabled automatically; profile-based drop counts are reduced, while explicit `numDrops` is respected. |
| `showLightning` | `boolean` | Profile value, otherwise `false` | Enable lightning flashes. Lightning is visual and has no thunder audio. |
| `lightningFrequency` | `number` | Profile value, otherwise `9` | Average seconds between flashes. |
| `lightningFlashDuration` | `number` | Profile value, otherwise `450` | Flash duration in milliseconds, clamped to `80`–`4000`. |
| `lightningColor` | `string` | Profile value, otherwise `#dfe6ff` | CSS color for lightning. |
| `showWind` | `boolean` | `false` | Enable a directional slant and gradual gust drift. |
| `windProfile` | String union | None | Wind preset: `subtle`, `breezy`, `gusty`, or `squall`. Selecting one enables wind. |
| `windVariation` | `number` | Wind profile value, otherwise `8` | Wind strength in degrees, clamped to `0`–`30`. |
| `gustFrequency` | `number` | Wind profile value, otherwise `8` | Base time in seconds for the gust cycle. |
| `surface` | `"air" \| "glass"` | `"air"` | Add a fogged pane and animated water runs when set to `"glass"`. |
| `glassFog` | `number` | `0.18` | Fog overlay strength from `0` to `1`. |
| `glassRefraction` | `number` | `2` | Backdrop blur in pixels, clamped to `0`–`12`. |
| `renderer` | `"dom" \| "canvas"` | `"dom"` | Select DOM or canvas particles. Canvas draws precipitation and impacts together; other weather layers remain DOM/CSS. |
| `quality` | `"low" \| "medium" \| "high"` | DOM: `"high"`; canvas: `"medium"` | Particle-count scale: low uses 40%, medium 70%, and high 100%. |
| `maxDrops` | `number` | DOM: `600`; canvas: `400` | Maximum particle count, clamped to `0`–`5000`. |
| `intensity` | `number` | `1` | Scale active particle count from `0` to `1`. Can also be changed through the ref or hook. |
| `playing` | `boolean` | `true` | Start or pause the animation. Can also be controlled through the ref or hook. |
| `pauseWhenHidden` | `boolean` | `false` | Pause animation while the browser tab is hidden. |
| `respectReducedMotion` | `boolean` | `true` | Respect the system `prefers-reduced-motion` setting. Set to `false` to force animation. |

## Storm example

```tsx
<Rain
  profile="heavy-rain"
  angle={18}
  showClouds
  cloudCount={5}
  showLightning
  lightningFrequency={15}
  dropStyle="pixel"
  depth
/>
```

## Canvas renderer

The DOM renderer is the default. Canvas is an optional renderer that can reduce particle DOM nodes. It defaults to medium quality and a 400-drop cap; choose higher quality or a different cap when appropriate for the target device.

```tsx
<Rain
  renderer="canvas"
  profile="heavy-rain"
  showLightning
  impactStyle="ripple"
/>
```

The canvas renderer draws precipitation and splash, spray, and ripple impacts. Clouds, glass, wind visuals, and lightning continue to use their existing DOM/CSS layers.

## Imperative controls

Use a ref when controls should act directly on `Rain` without needing to mirror animation state in React state. `setIntensity` accepts a value from `0` to `1`; `triggerLightning` can request a flash even when automatic lightning is disabled.

```tsx
import { useRef } from "react";
import { Rain, type RainHandle } from "react-rainfall";

function StormControls() {
  const rainRef = useRef<RainHandle | null>(null);

  return (
    <>
      <Rain ref={rainRef} profile="heavy-rain" />
      <button onClick={() => rainRef.current?.stop()}>Stop</button>
      <button onClick={() => rainRef.current?.start()}>Start</button>
      <button onClick={() => rainRef.current?.setIntensity(0.35)}>
        Set intensity
      </button>
      <button onClick={() => rainRef.current?.triggerLightning()}>
        Flash lightning
      </button>
    </>
  );
}
```

## State-driven controls

Use `useRainfall()` when the rest of the UI needs to display or respond to the current play state and intensity. It returns `ref`, `props`, `playing`, `intensity`, and the same control methods.

```tsx
import { Rain, useRainfall } from "react-rainfall";

function StatefulStorm() {
  const rain = useRainfall(0.8);

  return (
    <>
      <Rain ref={rain.ref} {...rain.props} profile="heavy-rain" />
      <button onClick={rain.playing ? rain.stop : rain.start}>
        {rain.playing ? "Stop" : "Start"}
      </button>
      <label>
        Intensity
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={rain.intensity}
          onChange={(event) => rain.setIntensity(Number(event.target.value))}
        />
      </label>
      <button onClick={rain.triggerLightning}>Flash lightning</button>
    </>
  );
}
```