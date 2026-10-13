import React from "react";
import type { dropletOptions, rainDropStyle } from "../rainTypes";
import selectDropletColor from "../select-droplet-color";
import { resolveRainOptions } from "./resolveRainOptions";
import { toRgbChannels } from "../../../helpers/color-utils";
import { hash01 } from "../../../helpers/seededRandom";

interface CanvasRainLayerProps {
  options: dropletOptions;
  running: boolean;
  pauseWhenHidden: boolean;
  respectReducedMotion: boolean;
}

// A drop drawn once to its own small canvas, then stamped with drawImage.
interface Sprite {
  canvas: HTMLCanvasElement;
  width: number; // in CSS pixels
  height: number;
}

interface Particle {
  x: number;
  sourceTop: number;
  phase: number;
  speed: number;
  length: number;
  width: number;
  depthScale: number;
  scale: number; // size bucket, shared by drops that can share a sprite
  opacity: number;
  impact: boolean;
  rgb: string;
  solid: string; // "rgb(r, g, b)" for impact strokes
  sprite: Sprite | null;
  progress: number; // updated every frame, read by the impact pass
}

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

// extra room around a drop for blur and glow
const SPRITE_PADDING: Partial<Record<rainDropStyle, number>> = {
  glow: 8,
  soft: 4,
};

/** Draws one drop at full strength, centered on (0, 0). Opacity is applied when stamping. */
function paintDrop(
  ctx: CanvasRenderingContext2D,
  style: rainDropStyle,
  rgb: string,
  pw: number,
  pl: number,
) {
  const c = (alpha: number) => `rgba(${rgb}, ${alpha})`;

  switch (style) {
    case "glow": {
      ctx.shadowColor = c(0.7);
      ctx.shadowBlur = 5;
      const gradient = ctx.createRadialGradient(
        0,
        0,
        0,
        0,
        0,
        Math.max(pw, pl) * 0.65,
      );
      gradient.addColorStop(0, c(0.8));
      gradient.addColorStop(1, c(0));
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, pw * 0.75, pl * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = c(0.75);
      ctx.beginPath();
      ctx.ellipse(0, 0, pw * 0.35, pl * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "orb":
    case "hailstone": {
      const radius = pw * 0.5;
      const gradient = ctx.createRadialGradient(
        -radius * 0.25,
        -radius * 0.3,
        0,
        0,
        0,
        radius,
      );
      gradient.addColorStop(0, "rgba(255,255,255,.95)");
      gradient.addColorStop(0.45, c(1));
      gradient.addColorStop(1, c(0.72));
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius, pl * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "snowflake": {
      ctx.strokeStyle = c(1);
      ctx.lineWidth = Math.max(1, pw * 0.14);
      ctx.lineCap = "round";
      for (let arm = 0; arm < 3; arm++) {
        ctx.save();
        ctx.rotate((Math.PI * arm) / 3);
        ctx.beginPath();
        ctx.moveTo(-pw / 2, 0);
        ctx.lineTo(pw / 2, 0);
        ctx.stroke();
        ctx.restore();
      }
      break;
    }
    case "pixel": {
      const rows = [1, 1, 2, 3, 4, 4, 3, 3, 2, 1];
      const unitWidth = pw / 4;
      const unitHeight = pl / rows.length;
      ctx.fillStyle = c(1);
      rows.forEach((filled, row) => {
        const rowWidth = filled * unitWidth;
        ctx.fillRect(
          -rowWidth / 2,
          -pl / 2 + row * unitHeight,
          rowWidth,
          unitHeight,
        );
      });
      ctx.fillStyle = "rgba(255,255,255,.38)"; // highlight, .62 x .62
      ctx.fillRect(
        -unitWidth * 0.65,
        -pl * 0.14,
        unitWidth * 0.45,
        unitHeight * 1.2,
      );
      break;
    }
    case "soft": {
      const radius = Math.max(pw, pl) * 0.6;
      const gradient = ctx.createRadialGradient(0, -pl * 0.08, 0, 0, 0, radius);
      gradient.addColorStop(0, c(0.88));
      gradient.addColorStop(0.52, c(0.5));
      gradient.addColorStop(1, c(0));
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(0, 0, pw * 0.55, pl * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "cartoon": {
      ctx.fillStyle = c(1);
      ctx.beginPath();
      ctx.moveTo(0, -pl / 2);
      ctx.bezierCurveTo(pw * 0.48, -pl * 0.05, pw * 0.55, pl * 0.2, 0, pl / 2);
      ctx.bezierCurveTo(
        -pw * 0.55,
        pl * 0.2,
        -pw * 0.48,
        -pl * 0.05,
        0,
        -pl / 2,
      );
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.70)"; // highlight, .92 x .76
      ctx.beginPath();
      ctx.ellipse(
        -pw * 0.18,
        -pl * 0.06,
        pw * 0.09,
        pl * 0.12,
        -0.2,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      break;
    }
    default: {
      // streak: fades in from the top, like the DOM renderer's gradient
      const gradient = ctx.createLinearGradient(0, -pl / 2, 0, pl / 2);
      gradient.addColorStop(0, c(0));
      gradient.addColorStop(1, c(1));
      ctx.fillStyle = gradient;
      ctx.fillRect(-pw / 2, -pl / 2, pw, pl);
    }
  }
}

/** Canvas-based particle layer for rain, snow, hail and their ground impacts. */
function CanvasRainLayer({
  options,
  running,
  pauseWhenHidden,
  respectReducedMotion,
}: CanvasRainLayerProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [onScreen, setOnScreen] = React.useState(true);
  // Lives outside the effect so rebuilds and pauses never rewind the scene.
  const elapsedRef = React.useRef(0);

  React.useEffect(() => {
    const updateVisibility = () =>
      setPaused(pauseWhenHidden && document.visibilityState === "hidden");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updateVisibility);
  }, [pauseWhenHidden]);

  React.useEffect(() => {
    if (!respectReducedMotion || typeof window.matchMedia !== "function") {
      setReducedMotion(false);
      return;
    }
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, [respectReducedMotion]);

  // Stop animating while the scene is scrolled out of view
  React.useEffect(() => {
    const parent = canvasRef.current?.parentElement;
    if (!parent || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const latest = entries[entries.length - 1];
        if (latest) setOnScreen(latest.isIntersecting);
      },
      { rootMargin: "100px" },
    );
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !parent || !context) return;

    const o = resolveRainOptions(options, "canvas");
    const base = o.dimensions;
    const profile = options.profile;

    // Only a rainbow with no explicit color varies per drop
    const perDropColor = profile === "rainbow" && o.baseColor === undefined;
    const fixedRgb = perDropColor
      ? null
      : toRgbChannels(selectDropletColor(o.baseColor, profile));

    const dprCap = o.quality === "low" ? 1 : o.quality === "medium" ? 1.5 : 2;
    const currentDpr = () => Math.min(window.devicePixelRatio || 1, dprCap);

    const rotationCos = Math.cos(-o.angleRadians);
    const rotationSin = Math.sin(-o.angleRadians);
    const windRadians = (o.windVariation * Math.PI) / 180;
    const gustSeconds = Math.max(4, o.gustFrequency) * 2.5;
    const impactMargin = o.impactThickness * 12;

    let width = 0;
    let height = 0;
    let dpr = currentDpr();
    let initialized = false;
    let frame = 0;
    let previousTime = 0; // local, so time spent paused never counts
    const particles: Particle[] = [];
    const sprites = new Map<string, Sprite>();

    const getSprite = (rgb: string, scale: number): Sprite | null => {
      const key = `${rgb}|${scale}`;
      const cached = sprites.get(key);
      if (cached) return cached;

      const pw = base.width * scale;
      const pl = base.height * scale;
      const padding = SPRITE_PADDING[o.dropStyle] ?? 2;
      const spriteCanvas = document.createElement("canvas");
      spriteCanvas.width = Math.ceil((pw * 1.6 + padding * 2) * dpr);
      spriteCanvas.height = Math.ceil(
        (Math.max(pl, pw * 1.6) + padding * 2) * dpr,
      );
      const spriteContext = spriteCanvas.getContext("2d");
      if (!spriteContext) return null;

      spriteContext.scale(dpr, dpr);
      spriteContext.translate(
        spriteCanvas.width / dpr / 2,
        spriteCanvas.height / dpr / 2,
      );
      if (o.dropStyle === "soft") spriteContext.filter = "blur(1px)";
      paintDrop(spriteContext, o.dropStyle, rgb, pw, pl);

      const sprite = {
        canvas: spriteCanvas,
        width: spriteCanvas.width / dpr,
        height: spriteCanvas.height / dpr,
      };
      sprites.set(key, sprite);
      return sprite;
    };

    // Everything about where a particle sits depends on the current size
    const place = (particle: Particle, index: number) => {
      particle.x = o.rainFromClouds
        ? (((index % o.cloudCount) + 0.5) * width) / o.cloudCount +
          (hash01(index, 5) - 0.5) * o.cloudSize * 0.3
        : hash01(index, 1) * width;
      particle.sourceTop = o.rainFromClouds
        ? clamp(o.cloudSize * (0.29 + hash01(index, 6) * 0.06), 0, height * 0.4)
        : 0;
    };

    const createParticle = (index: number): Particle => {
      const z = o.depth ? hash01(index, 4) : 1;
      // size is bucketed in quarters so drops can share a small set of sprites
      const scale = o.depth ? 0.55 + (Math.round(z * 4) / 4) * 0.9 : 1;
      const rgb =
        fixedRgb ??
        toRgbChannels(
          selectDropletColor(o.baseColor, profile, hash01(index, 8)),
        );

      const particle: Particle = {
        x: 0,
        sourceTop: 0,
        // Start in the visible part of the cycle; distinct channels keep the
        // drops spread out instead of forming diagonal bands.
        phase: hash01(index, 2) * 0.72,
        // DOM drops complete a fall in roughly a second; keep canvas timing
        // close to that so particles do not appear to stall between cycles.
        speed:
          (0.58 + hash01(index, 3) * 0.5) *
          o.speedFactor *
          (o.depth ? 0.7 + z * 0.5 : 1),
        length: base.height * scale,
        width: base.width * scale,
        depthScale: scale,
        scale,
        opacity: o.opacity * (o.depth ? 0.35 + z * 0.65 : 1),
        impact: o.showImpact && hash01(index, 7) < o.impactDensity,
        rgb,
        solid: `rgb(${rgb})`,
        sprite: getSprite(rgb, scale),
        progress: 0,
      };
      place(particle, index);
      return particle;
    };

    // The count follows the current width, so a scene that starts in a
    // 0-wide parent fills in as soon as the parent has a size.
    const countFor = (w: number) => {
      const requested = o.numDrops ?? Math.floor(w / o.dropsPerWidth);
      return Math.min(
        o.maxDrops,
        Math.max(0, Math.floor(requested * o.intensity * o.qualityFactor)),
      );
    };

    const syncParticles = () => {
      const target = countFor(width);
      if (particles.length > target) particles.length = target;
      for (let i = 0; i < particles.length; i++) place(particles[i], i);
      for (let i = particles.length; i < target; i++) {
        particles.push(createParticle(i));
      }
    };

    const drawImpact = (particle: Particle, x: number) => {
      const t = (particle.progress - 0.78) / 0.22;
      const alpha = o.impactOpacity * particle.opacity * (1 - t);
      // Leave room for the full ripple ring or splash inside the clipped canvas
      const y = height - Math.max(8, o.impactThickness * 2);
      context.strokeStyle = particle.solid;
      context.fillStyle = particle.solid;
      context.lineWidth = o.impactThickness * particle.depthScale;

      if (o.impactStyle === "ripple") {
        for (let ring = 0; ring < 2; ring++) {
          const ringT = clamp(t * 1.5 - ring * 0.32, 0, 1);
          if (!ringT) continue;
          context.globalAlpha = alpha * (1 - ringT);
          context.beginPath();
          context.ellipse(
            x,
            y,
            (4 + 16 * ringT) * particle.depthScale,
            (1.5 + 4 * ringT) * particle.depthScale,
            0,
            0,
            Math.PI * 2,
          );
          context.stroke();
        }
        return;
      }

      const spread = o.impactStyle === "spray" ? 18 : 10;
      const lift = o.impactStyle === "spray" ? 22 : 14;
      context.globalAlpha = alpha;
      context.beginPath();
      context.ellipse(
        x,
        y,
        (2 + t * 4) * particle.depthScale,
        Math.max(0.7, o.impactThickness * 0.35),
        0,
        Math.PI,
        Math.PI * 2,
      );
      context.stroke();
      for (let side = -1; side <= 1; side += 2) {
        for (let dot = 0; dot < 2; dot++) {
          const dx = side * (spread * (0.25 + dot * 0.25) * t);
          const dy = -lift * (0.35 + dot * 0.22) * t;
          context.beginPath();
          context.arc(
            x + dx,
            y + dy,
            Math.max(0.5, o.impactThickness * (dot ? 0.35 : 0.55)),
            0,
            Math.PI * 2,
          );
          context.fill();
        }
      }
    };

    // Draws the scene at the current clock reading. Never advances time.
    const render = () => {
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.globalAlpha = 1;
      context.clearRect(0, 0, width, height);
      if (width <= 0 || height <= 0 || particles.length === 0) return;

      const seconds = elapsedRef.current / 1000;
      const sway = o.showWind
        ? Math.sin((seconds / gustSeconds) * Math.PI * 2) * windRadians * 0.08
        : 0;
      // the same for every drop, so it is computed once per frame
      const drift = Math.tan(o.angleRadians + sway) * height;

      // Pass 1: drops. Each is one rotated drawImage of its cached sprite.
      for (const particle of particles) {
        const progress = reducedMotion
          ? particle.phase
          : (particle.phase + seconds * particle.speed) % 1;
        particle.progress = progress;

        const fade = progress > 0.78 ? Math.max(0, (1 - progress) / 0.22) : 1;
        const alpha = particle.opacity * fade;
        const y =
          particle.sourceTop +
          progress * (height - particle.sourceTop + particle.length) -
          particle.length;
        const sprite = particle.sprite;
        if (
          alpha <= 0 ||
          !sprite ||
          y < -particle.length ||
          y > height + particle.length
        ) {
          continue;
        }

        const span = width + particle.width;
        const x =
          ((((particle.x + drift * progress) % span) + span) % span) -
          particle.width / 2;

        // Canvas rotation is clockwise-positive, so a downward drop leans
        // right when its path drifts right (a positive public angle).
        context.setTransform(
          rotationCos * dpr,
          rotationSin * dpr,
          -rotationSin * dpr,
          rotationCos * dpr,
          x * dpr,
          y * dpr,
        );
        context.globalAlpha = alpha;
        context.drawImage(
          sprite.canvas,
          -sprite.width / 2,
          -sprite.height / 2,
          sprite.width,
          sprite.height,
        );
      }

      // Pass 2: impacts, with the plain transform and no save/restore
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const particle of particles) {
        if (!particle.impact || particle.progress < 0.78) continue;
        const landingX = (((particle.x + drift) % width) + width) % width;
        drawImpact(
          particle,
          clamp(
            landingX,
            impactMargin,
            Math.max(impactMargin, width - impactMargin),
          ),
        );
      }
      context.globalAlpha = 1;
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const nextWidth = Math.max(0, rect.width);
      const nextHeight = Math.max(0, rect.height);
      const nextDpr = currentDpr();
      // a canvas resize clears it and resets its context, so skip no-ops
      if (
        initialized &&
        nextWidth === width &&
        nextHeight === height &&
        nextDpr === dpr
      ) {
        return;
      }
      initialized = true;

      const dprChanged = nextDpr !== dpr;
      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;
      if (dprChanged) sprites.clear();

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      syncParticles();
      if (dprChanged) {
        for (const particle of particles) {
          particle.sprite = getSprite(particle.rgb, particle.scale);
        }
      }
      render();
    };

    const tick = (time: number) => {
      if (previousTime) elapsedRef.current += Math.min(64, time - previousTime);
      previousTime = time;
      render();
      frame = requestAnimationFrame(tick);
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(resize)
        : undefined;
    resizeObserver?.observe(parent);
    if (!resizeObserver) window.addEventListener("resize", resize);

    resize(); // sizes the canvas and draws the current frame, even when paused
    if (running && !paused && !reducedMotion && onScreen) {
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener("resize", resize);
      sprites.clear();
    };
  }, [options, running, paused, reducedMotion, onScreen]);

  return (
    <canvas ref={canvasRef} className="rain-canvas-layer" aria-hidden="true" />
  );
}

export default CanvasRainLayer;
