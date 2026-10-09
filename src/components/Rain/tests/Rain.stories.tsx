import type { Decorator, Meta, StoryObj } from "@storybook/react";
import Rain from "../Rain";

const scenes = {
  midnight: {
    eyebrow: "NIGHTFALL · LIVE WEATHER",
    title: "A little rain,\na quieter mind.",
    detail: "MIDNIGHT RAIN",
    background:
      "radial-gradient(ellipse at 72% 4%, rgba(100, 151, 255, .25), transparent 36%), linear-gradient(145deg, #172b4d 0%, #101a31 48%, #090e1d 100%)",
    glow: "rgba(114, 166, 255, .3)",
  },
  drizzle: {
    eyebrow: "SOFT WEATHER · 12°",
    title: "A soft shower\nfor a slow day.",
    detail: "GENTLE DRIZZLE",
    background:
      "radial-gradient(ellipse at 80% 20%, rgba(176, 201, 221, .25), transparent 38%), linear-gradient(145deg, #526b78 0%, #314854 52%, #1e303b 100%)",
    glow: "rgba(207, 229, 242, .25)",
  },
  downpour: {
    eyebrow: "STORM WATCH · HEAVY RAIN",
    title: "Let the storm\nroll through.",
    detail: "HEAVY DOWNPOUR",
    background:
      "radial-gradient(ellipse at 68% 0%, rgba(105, 133, 204, .28), transparent 34%), linear-gradient(145deg, #26334d 0%, #151d32 50%, #0b101d 100%)",
    glow: "rgba(139, 166, 255, .28)",
  },
  rainbow: {
    eyebrow: "AFTER THE RAIN · CLEARING",
    title: "A brighter kind\nof rainy day.",
    detail: "COLOR RAIN",
    background:
      "radial-gradient(ellipse at 78% 12%, rgba(255, 186, 133, .3), transparent 33%), linear-gradient(145deg, #624a72 0%, #33486c 52%, #172c43 100%)",
    glow: "rgba(255, 190, 139, .32)",
  },
} as const;

type SceneName = keyof typeof scenes;

const SceneDecorator: Decorator = (Story, context) => {
  const sceneName = (context.parameters.scene as SceneName | undefined) ?? "midnight";
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
              A living rainfall layer, tuned to set the mood.
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
  },
};

export const GentleDrizzle: Story = {
  name: "Gentle drizzle",
  args: { profile: "light-drizzle" },
  parameters: { scene: "drizzle" },
};

export const HeavyDownpour: Story = {
  name: "Heavy downpour",
  args: {
    numDrops: 128,
    dropletColor: "rgb(206, 224, 255)",
    size: "long",
    showImpact: true,
    dropletOpacity: 0.72,
  },
  parameters: { scene: "downpour" },
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
