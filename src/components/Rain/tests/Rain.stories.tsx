import type { Decorator, Meta, StoryObj } from "@storybook/react";
import Rain from "../Rain";

const scenes = {
  midnight: {
    eyebrow: "MIDNIGHT · SOFT RAIN",
    title: "Rain taps at\nthe quiet hours.",
    description: "Fine silver drops drift through a calm, blue night.",
    detail: "MIDNIGHT RAIN",
    background:
      "radial-gradient(ellipse at 72% 4%, rgba(100, 151, 255, .25), transparent 36%), linear-gradient(145deg, #172b4d 0%, #101a31 48%, #090e1d 100%)",
    glow: "rgba(114, 166, 255, .3)",
  },
  drizzle: {
    eyebrow: "LIGHT DRIZZLE · EASY PACE",
    title: "Just enough rain\nto soften the day.",
    description: "A sparse, gentle shower with small drops and no hard impacts.",
    detail: "GENTLE DRIZZLE",
    background:
      "radial-gradient(ellipse at 80% 20%, rgba(176, 201, 221, .25), transparent 38%), linear-gradient(145deg, #526b78 0%, #314854 52%, #1e303b 100%)",
    glow: "rgba(207, 229, 242, .25)",
  },
  steady: {
    eyebrow: "STEADY RAIN · EVEN RHYTHM",
    title: "A steady rhythm\noutside the window.",
    description: "Consistent rainfall, evenly spaced from clouded sky to ground.",
    detail: "STEADY RAIN",
    background:
      "radial-gradient(ellipse at 78% 12%, rgba(154, 184, 219, .2), transparent 36%), linear-gradient(145deg, #485b70 0%, #2b3d53 52%, #172537 100%)",
    glow: "rgba(148, 183, 229, .22)",
  },
  passing: {
    eyebrow: "PASSING SHOWER · MOVING THROUGH",
    title: "The clouds gather,\nthen drift away.",
    description: "A brief shower swells, passes overhead, and gradually clears.",
    detail: "PASSING SHOWER",
    background:
      "radial-gradient(ellipse at 78% 12%, rgba(165, 195, 221, .24), transparent 38%), linear-gradient(145deg, #506574 0%, #344b5a 52%, #1c303e 100%)",
    glow: "rgba(170, 206, 232, .24)",
  },
  heavy: {
    eyebrow: "HEAVY RAIN · STORM FRONT",
    title: "The storm rolls\nthrough in sheets.",
    description: "Dense, wind-slanted rain falls beneath low, moving storm clouds.",
    detail: "HEAVY RAIN",
    background:
      "radial-gradient(ellipse at 68% 0%, rgba(105, 133, 204, .28), transparent 34%), linear-gradient(145deg, #26334d 0%, #151d32 50%, #0b101d 100%)",
    glow: "rgba(139, 166, 255, .28)",
  },
  mist: {
    eyebrow: "MISTY RAIN · LOW VISIBILITY",
    title: "The distance fades\ninto the rain.",
    description: "Slow, soft-edged droplets blend into a cool, misty veil.",
    detail: "MISTY RAIN",
    background:
      "radial-gradient(ellipse at 72% 8%, rgba(220, 230, 226, .23), transparent 38%), linear-gradient(145deg, #687773 0%, #435552 53%, #263b3a 100%)",
    glow: "rgba(207, 224, 214, .2)",
  },
  rainbow: {
    eyebrow: "CLEARING SKIES · COLOR RAIN",
    title: "A little color\nafter the shower.",
    description: "A bright, prismatic shower brings a warm glow to the clearing sky.",
    detail: "COLOR RAIN",
    background:
      "radial-gradient(ellipse at 78% 12%, rgba(255, 186, 133, .3), transparent 33%), linear-gradient(145deg, #624a72 0%, #33486c 52%, #172c43 100%)",
    glow: "rgba(255, 190, 139, .32)",
  },
  snow: {
    eyebrow: "WINTER WEATHER · QUIET FLAKES",
    title: "Snow settles\nsoftly through the air.",
    description: "Light flakes tumble slowly at different depths against a cold sky.",
    detail: "FALLING SNOW",
    background: "linear-gradient(150deg, #71849b 0%, #3d536c 55%, #1b2b40 100%)",
    glow: "rgba(201, 225, 255, .2)",
  },
  hail: {
    eyebrow: "HAIL SHOWER · FAST AND BRIGHT",
    title: "Ice rattles\nagainst the storm.",
    description: "Rounded hailstones rush down through a dark, unsettled sky.",
    detail: "HAIL SHOWER",
    background: "linear-gradient(145deg, #404b62 0%, #202b40 54%, #111827 100%)",
    glow: "rgba(180, 202, 234, .22)",
  },
  cartoon: {
    eyebrow: "A LITTLE WEATHER · BIG PERSONALITY",
    title: "A happy cloud\nlets loose.",
    description: "Playful blue drops and a bright cartoon cloud bring a lighter mood.",
    detail: "CARTOON RAIN",
    background: "linear-gradient(150deg, #65b0df 0%, #3884bf 54%, #205e9b 100%)",
    glow: "rgba(108, 196, 255, .28)",
  },
  glass: {
    eyebrow: "FROM INSIDE · RAIN ON GLASS",
    title: "Water gathers\non the window.",
    description: "Beaded drops merge into clear runs and catch the light as they slide.",
    detail: "RAIN ON GLASS",
    background: "radial-gradient(ellipse at 50% 0%, #61799c, #263a58 58%, #15243a)",
    glow: "rgba(149, 194, 255, .23)",
  },
  wind: {
    eyebrow: "BREEZE · SLOWING THEN TURNING",
    title: "The breeze\nleans into the rain.",
    description: "A light gust gradually tips the drops, then lets them fall straighter.",
    detail: "BREEZY RAIN",
    background: "linear-gradient(145deg, #50677b 0%, #2c4057 55%, #17263a 100%)",
    glow: "rgba(159, 198, 232, .22)",
  },
  angled: {
    eyebrow: "WIND-DRIVEN RAIN · SLANTED FALL",
    title: "The rain slants\nacross the scene.",
    description: "A steady crosswind gives every streak a clean, consistent lean.",
    detail: "ANGLED RAIN",
    background: "linear-gradient(145deg, #50677b 0%, #2c4057 55%, #17263a 100%)",
    glow: "rgba(159, 198, 232, .22)",
  },
  gustyWind: {
    eyebrow: "GUSTY WIND · SHIFTS IN STRENGTH",
    title: "A stronger gust\nbends the rain.",
    description: "Drops gradually lean and drift farther as the wind rises, then ease back.",
    detail: "GUSTY RAIN",
    background: "linear-gradient(145deg, #465571 0%, #26344e 54%, #121d31 100%)",
    glow: "rgba(143, 171, 238, .24)",
  },
  squall: {
    eyebrow: "SQUALL · WIND DRIVEN",
    title: "A hard gust\nbends the downpour.",
    description: "Forceful gusts angle the rain while the cloud bank drifts steadily overhead.",
    detail: "SQUALL LINE",
    background: "linear-gradient(145deg, #394460 0%, #1b263d 53%, #0e1525 100%)",
    glow: "rgba(137, 159, 235, .26)",
  },
  ripples: {
    eyebrow: "RAIN ON WATER · SOFT CONTACT",
    title: "Each drop leaves\na ring behind.",
    description: "Small circular ripples spread across a calm, dark water surface.",
    detail: "PUDDLE RIPPLES",
    background: "linear-gradient(160deg, #536f84 0%, #2d4d62 54%, #172e43 100%)",
    glow: "rgba(152, 213, 245, .22)",
  },
  pixel: {
    eyebrow: "PIXEL WEATHER · RETRO SKY",
    title: "A storm in\neight-bit motion.",
    description: "Blocky rain streaks fall across a pixel-inspired evening sky.",
    detail: "PIXEL RAIN",
    background: "linear-gradient(145deg, #66799b 0%, #394c71 52%, #202e4e 100%)",
    glow: "rgba(166, 196, 255, .24)",
  },
  depth: {
    eyebrow: "NEAR AND FAR · LAYERED RAIN",
    title: "Rain fills\nthe whole distance.",
    description: "Foreground drops feel larger and faster while distant rain stays faint.",
    detail: "RAIN IN DEPTH",
    background: "linear-gradient(145deg, #56677d 0%, #304057 52%, #172539 100%)",
    glow: "rgba(174, 201, 241, .22)",
  },
  clouds: {
    eyebrow: "CLOUD BANK · DEFINED EDGES",
    title: "The clouds\ncarry the weather.",
    description: "Distinct, slow-moving cloud shapes gather above the rainfall.",
    detail: "MOVING CLOUDS",
    background: "linear-gradient(145deg, #465878 0%, #263651 55%, #111b2c 100%)",
    glow: "rgba(131, 158, 217, .24)",
  },
  cloudRain: {
    eyebrow: "LOCAL SHOWER · UNDER THE CLOUDS",
    title: "Rain follows\nthe clouds overhead.",
    description: "Drops are clustered beneath each cloud, leaving open patches between showers.",
    detail: "CLOUD-BORN RAIN",
    background: "linear-gradient(145deg, #465878 0%, #263651 55%, #111b2c 100%)",
    glow: "rgba(131, 158, 217, .24)",
  },
  impacts: {
    eyebrow: "RAIN MEETS GROUND · FINE SPRAY",
    title: "A light scatter\nat every landing.",
    description: "Fine, low-opacity impact particles keep the storm’s ground detail delicate.",
    detail: "FINE IMPACTS",
    background: "linear-gradient(145deg, #3e4e6c 0%, #222e47 55%, #101827 100%)",
    glow: "rgba(133, 165, 229, .22)",
  },
  splash: {
    eyebrow: "HEAVY RAIN · SPLASH IMPACT",
    title: "Each drop breaks\ninto a quick spray.",
    description: "Classic impact particles flare briefly where fast drops meet the ground.",
    detail: "SPLASH IMPACT",
    background: "linear-gradient(145deg, #3e4e6c 0%, #222e47 55%, #101827 100%)",
    glow: "rgba(133, 165, 229, .22)",
  },
  softClouds: {
    eyebrow: "SOFT CLOUDS · HAZY EDGES",
    title: "Cloud shapes blur\ninto the sky.",
    description: "A diffuse cloud layer drifts slowly behind the rain.",
    detail: "SOFT CLOUDS",
    background: "linear-gradient(145deg, #465878 0%, #263651 55%, #111b2c 100%)",
    glow: "rgba(131, 158, 217, .24)",
  },
  rollingClouds: {
    eyebrow: "ROLLING CLOUDS · SLOW MOVEMENT",
    title: "A cloud bank\nrolls overhead.",
    description: "Defined cloud forms travel steadily across the top of the storm.",
    detail: "ROLLING CLOUDS",
    background: "linear-gradient(145deg, #465878 0%, #263651 55%, #111b2c 100%)",
    glow: "rgba(131, 158, 217, .24)",
  },
  storm: {
    eyebrow: "THUNDERSTORM · CLOUD AND LIGHTNING",
    title: "Thunder gathers\nbehind the rain.",
    description: "A low cloud bank, driving rain, and occasional lightning share the same sky.",
    detail: "THUNDERSTORM",
    background: "linear-gradient(145deg, #343f5a 0%, #1b253d 52%, #0c1322 100%)",
    glow: "rgba(148, 164, 255, .26)",
  },
} as const;

type SceneName = keyof typeof scenes;

const SceneDecorator: Decorator = (Story, context) => {
  const sceneName =
    (context.parameters.scene as SceneName | undefined) ?? "midnight";
  const scene = scenes[sceneName];

  return (
    <main
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",
        display: "grid",
        placeItems: "center",
        padding: "clamp(20px, 5vw, 64px)",
        color: "#f7f8fc",
        background:
          "radial-gradient(ellipse at 50% 0%, #263247 0%, #151b28 46%, #0c1018 100%)",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ width: "min(100%, 1040px)" }}>
        <div
          style={{
            margin: "0 0 16px 4px",
            color: "#aab4c6",
            fontSize: 12,
            fontWeight: 650,
            letterSpacing: ".16em",
            textTransform: "uppercase",
          }}
        >
          React Rainfall <span style={{ color: "#64748b" }}> / </span>
          {scene.detail}
        </div>

        <section
          style={{
            minHeight: 490,
            height: "min(68vh, 620px)",
            minWidth: 0,
            boxSizing: "border-box",
            position: "relative",
            isolation: "isolate",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, .13)",
            borderRadius: 28,
            background: scene.background,
            boxShadow: `0 32px 100px rgba(0, 0, 0, .42), 0 0 80px ${scene.glow}`,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.3,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "linear-gradient(to bottom, black, transparent 85%)",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: "auto 0 0",
              height: "34%",
              background:
                "linear-gradient(180deg, transparent, rgba(4, 8, 17, .42))",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              zIndex: 11,
              left: "clamp(28px, 7vw, 76px)",
              top: "clamp(36px, 8vh, 76px)",
              maxWidth: 550,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                marginBottom: 26,
                color: "rgba(235, 241, 255, .78)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".17em",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#a9caff",
                  boxShadow: "0 0 16px #a9caff",
                }}
              />
              {scene.eyebrow}
            </div>
            <h1
              style={{
                margin: 0,
                whiteSpace: "pre-line",
                fontSize: "clamp(42px, 7vw, 76px)",
                lineHeight: 0.99,
                letterSpacing: "-.055em",
                fontWeight: 560,
                textShadow: "0 2px 30px rgba(6, 12, 26, .28)",
              }}
            >
              {scene.title}
            </h1>
            <p
              style={{
                margin: "24px 0 0",
                color: "rgba(236, 242, 255, .72)",
                fontSize: 15,
                lineHeight: 1.65,
              }}
            >
              {scene.description}
            </p>
          </div>

          <div
            style={{
              position: "absolute",
              zIndex: 11,
              right: 24,
              bottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              border: "1px solid rgba(255, 255, 255, .18)",
              borderRadius: 999,
              color: "rgba(245, 248, 255, .84)",
              background: "rgba(12, 18, 31, .34)",
              backdropFilter: "blur(12px)",
              fontSize: 11,
              fontWeight: 650,
              letterSpacing: ".12em",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#a9caff",
                boxShadow: "0 0 12px #a9caff",
              }}
            />
            {scene.detail}
          </div>

          <Story />
        </section>
      </div>
    </main>
  );
};

const meta = {
  title: "ReactComponentLibrary/Rain",
  component: Rain,
  // Keep the demo scenes animated even when the host OS requests reduced motion.
  // The Rain component itself still honors the system preference by default.
  args: { respectReducedMotion: false },
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
    scene: "midnight",
  },
  decorators: [SceneDecorator],
} satisfies Meta<typeof Rain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Midnight rain",
  args: {
    numDrops: 68,
    dropletColor: "rgb(218, 234, 255)",
    size: "long",
    showImpact: true,
    dropletOpacity: 0.52,
    angle: 20,
  },
};

export const GentleDrizzle: Story = {
  name: "Gentle drizzle",
  args: {
    profile: "light-drizzle",
    angle: 20,
  },
  parameters: { scene: "drizzle" },
};

export const SteadyRain: Story = {
  args: { profile: "steady-rain" },
  parameters: { scene: "steady" },
};

export const PassingShower: Story = {
  args: { profile: "passing-shower" },
  parameters: { scene: "passing" },
};

export const HeavyRain: Story = {
  args: { profile: "heavy-rain" },
  parameters: { scene: "heavy" },
};

export const LowQualityHeavyRain: Story = {
  name: "Heavy rain on low quality",
  args: { profile: "heavy-rain", quality: "low", maxDrops: 180 },
  parameters: { scene: "heavy" },
};

export const HeavyRainWithSplashImpact: Story = {
  name: "Heavy rain with splash impact",
  args: { profile: "heavy-rain", impactStyle: "splash" },
  parameters: { scene: "splash" },
};

export const WindDrivenRain: Story = {
  name: "Wind-driven rain",
  args: { profile: "heavy-rain", angle: 18 },
  parameters: { scene: "angled" },
};

export const StormLayers: Story = {
  name: "Storm clouds and lightning",
  args: {
    profile: "heavy-rain",
    angle: 18,
    showClouds: true,
    cloudCount: 4,
    cloudSize: 380,
    cloudSpeed: 32,
    cloudOpacity: 0.45,
    cloudDrift: 360,
    showLightning: true,
    lightningFrequency: 8,
    lightningFlashDuration: 500,
    lightningColor: "#eaf3ff",
  },
  parameters: { scene: "storm" },
};

export const PixelRain: Story = {
  name: "Pixel rain",
  args: { profile: "steady-rain", dropStyle: "pixel", angle: 18 },
  parameters: { scene: "pixel" },
};

export const RainWithDepth: Story = {
  name: "Rain with depth",
  args: {
    profile: "steady-rain",
    dropStyle: "streak",
    depth: true,
    numDrops: 90,
  },
  parameters: { scene: "depth" },
};

export const MistyRain: Story = {
  args: { profile: "misty-rain" },
  parameters: { scene: "mist" },
};

export const ColorRain: Story = {
  name: "Color rain",
  args: {
    numDrops: 74,
    profile: "rainbow",
    size: "default",
    showImpact: true,
    dropletOpacity: 0.56,
  },
  parameters: { scene: "rainbow" },
};

export const Snow: Story = {
  args: { profile: "snow" },
  parameters: { scene: "snow" },
};

export const Hail: Story = {
  args: { profile: "hail" },
  parameters: { scene: "hail" },
};

export const CartoonRain: Story = {
  name: "Cartoon rain",
  args: { profile: "cartoon" },
  parameters: { scene: "cartoon" },
};

export const RainWithPeriodicWind: Story = {
  name: "Rain with periodic wind gusts",
  args: { profile: "steady-rain", showWind: true, angle: 8 },
  parameters: { scene: "wind" },
};

export const FineImpacts: Story = {
  name: "Fine, subtle impacts",
  args: {
    profile: "heavy-rain",
    impactThickness: 1.3,
    impactOpacity: 0.32,
  },
  parameters: { scene: "impacts" },
};

export const PuddleRipples: Story = {
  name: "Rain on a puddle",
  args: { profile: "steady-rain", impactStyle: "ripple", numDrops: 48 },
  parameters: { scene: "ripples" },
};

export const DefinedMovingClouds: Story = {
  name: "Defined, moving clouds",
  args: {
    profile: "heavy-rain",
    cloudProfile: "puffy",
    cloudOpacity: 0.82,
    cloudBlur: 1,
    cloudColor: "#596b9a",
    cloudDrift: 280,
    cloudSpeed: 20,
  },
  parameters: { scene: "clouds" },
};

export const SoftClouds: Story = {
  name: "Soft cloud profile",
  args: { profile: "heavy-rain", cloudProfile: "soft" },
  parameters: { scene: "softClouds" },
};

export const RollingClouds: Story = {
  name: "Rolling animated cloud profile",
  args: { profile: "heavy-rain", cloudProfile: "rolling" },
  parameters: { scene: "rollingClouds" },
};

export const RainFromClouds: Story = {
  name: "Rain falling from clouds",
  args: {
    profile: "heavy-rain",
    rainFromClouds: true,
    cloudCount: 2,
    cloudSize: 360,
  },
  parameters: { scene: "cloudRain" },
};

export const GustingCloudRain: Story = {
  name: "Cloud rain with gusting wind",
  args: {
    profile: "heavy-rain",
    rainFromClouds: true,
    showWind: true,
    windVariation: 10,
    gustFrequency: 6,
    cloudCount: 2,
    cloudSpeed: 20,
  },
  parameters: { scene: "cloudRain" },
};

export const SubtleWind: Story = {
  name: "Subtle wind profile",
  args: { profile: "steady-rain", windProfile: "subtle" },
  parameters: { scene: "wind" },
};

export const BreezyWind: Story = {
  name: "Breezy wind profile",
  args: { profile: "steady-rain", windProfile: "breezy" },
  parameters: { scene: "wind" },
};

export const GustyWind: Story = {
  name: "Gusty wind profile",
  args: { profile: "heavy-rain", windProfile: "gusty" },
  parameters: { scene: "gustyWind" },
};

export const SquallWind: Story = {
  name: "Squall wind profile",
  args: { profile: "heavy-rain", windProfile: "squall" },
  parameters: { scene: "squall" },
};

export const RainOnGlass: Story = {
  name: "Rain running down glass",
  args: {
    profile: "steady-rain",
    surface: "glass",
    glassFog: 0.32,
    glassRefraction: 3,
    numDrops: 42,
  },
  parameters: { scene: "glass" },
};
