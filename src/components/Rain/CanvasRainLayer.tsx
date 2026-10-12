import React from "react";
import type { dropletOptions, rainDropStyle, impactStyle, size as DropSize } from "./rainTypes";
import { getRainProfileDefaults } from "./rain-profiles";
import selectDropletColor from "./select-droplet-color";
import { dropStylePresets, getDropStyleDefaultSize } from "./drop-style-presets";

interface CanvasRainLayerProps {
  options: dropletOptions;
  running: boolean;
  pauseWhenHidden: boolean;
  respectReducedMotion: boolean;
}

interface Particle {
  x: number;
  phase: number;
  speed: number;
  length: number;
  width: number;
  depthScale: number;
  opacity: number;
  impact: boolean;
  sourceTop: number;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
// Independent deterministic values avoid the diagonal bands caused by using
// adjacent values from a simple low-discrepancy sequence for every attribute.
const seeded = (index: number, salt = 0) => {
  let value = (index + 1) ^ Math.imul(salt + 1, 0x9e3779b1);
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  value ^= value >>> 16;
  return (value >>> 0) / 4294967296;
};

/** Canvas-based particle layer for rain, snow, hail and their ground impacts. */
function CanvasRainLayer({ options, running, pauseWhenHidden, respectReducedMotion }: CanvasRainLayerProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const { profile } = options;

  React.useEffect(() => {
    const pageDocument = document;
    const updateVisibility = () => setPaused(pauseWhenHidden && pageDocument.visibilityState === "hidden");
    updateVisibility();
    pageDocument.addEventListener("visibilitychange", updateVisibility);
    return () => pageDocument.removeEventListener("visibilitychange", updateVisibility);
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

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !parent || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let previousTime = 0;
    let elapsed = 0;
    const defaults = getRainProfileDefaults(profile);
    const dropStyle: rainDropStyle = options.dropStyle ?? defaults.dropStyle ?? "streak";
    const effectiveSize: DropSize = options.size ?? (options.dropStyle
      ? getDropStyleDefaultSize(options.dropStyle)
      : defaults.size ?? "default");
    const impactStyle: impactStyle = options.impactStyle ?? defaults.impactStyle ?? "splash";
    const showImpact = options.showImpact ?? defaults.showImpact ?? true;
    const impactDensity = clamp(options.impactDensity ?? defaults.impactDensity ?? 0.25, 0, 1);
    const thickness = clamp(options.impactThickness ?? defaults.impactThickness ?? 2.5, 0.5, 8);
    const impactOpacity = clamp(options.impactOpacity ?? defaults.impactOpacity ?? 0.65, 0, 1);
    const opacity = clamp(
      options.dropletOpacity ??
        (options.dropStyle ? dropStylePresets[options.dropStyle].defaultOpacity : defaults.dropletOpacity) ??
        0.5,
      0,
      1,
    );
    const depth = options.depth ?? defaults.depth ?? false;
    const duration = options.duration ?? defaults.duration ?? "normal";
    const speedFactor = duration === "fast" ? 1.3 : duration === "slow" ? 0.7 : 1;
    const intensity = clamp(options.intensity ?? 1, 0, 1);
    // Canvas defaults to medium density to keep large storm scenes responsive.
    // DOM keeps its existing high-quality default when quality is omitted.
    const qualityFactor = options.quality === "low"
      ? 0.4
      : options.quality === "high"
        ? 1
        : 0.7;
    const maximum = clamp(Math.floor(options.maxDrops ?? 400), 0, 5000);
    const maxWidth = Math.max(0, parent.clientWidth);
    const requested = options.numDrops ?? defaults.numDrops ?? Math.floor(maxWidth / (defaults.dropsPerWidth ?? 25));
    const count = Math.min(maximum, Math.max(0, Math.floor(requested * intensity * qualityFactor)));
    const requestedAngle = clamp(options.angle ?? defaults.angle ?? 0, -75, 75);
    const resolvedWindVariation = clamp(options.windVariation ?? 0, 0, 30);
    const windLean = options.showWind
      ? (Math.sign(requestedAngle) || 1) * Math.min(14, resolvedWindVariation * 0.4)
      : 0;
    const angle = clamp(requestedAngle + windLean, -75, 75) * Math.PI / 180;
    const rainFromClouds = options.rainFromClouds ?? false;
    const cloudCount = clamp(Math.floor(options.cloudCount ?? defaults.cloudCount ?? 3), 1, 24);
    const cloudSize = Math.max(80, options.cloudSize ?? defaults.cloudSize ?? 320);
    const color = selectDropletColor(options.dropletColor ?? defaults.dropletColor, profile);
    const rgb = color.match(/\(([^)]+)\)/)?.[1] ?? "255, 255, 255";
    const rgbaColor = (alpha: number) => `rgba(${rgb}, ${clamp(alpha, 0, 1)})`;
    const base = dropStylePresets[dropStyle].dimensions[effectiveSize ?? "default"];
    const particles: Particle[] = Array.from({ length: count }, (_, index) => {
      const z = depth ? seeded(index, 4) : 1;
      return {
        x: rainFromClouds
          ? ((index % cloudCount) + 0.5) * maxWidth / cloudCount + (seeded(index, 5) - 0.5) * cloudSize * 0.3
          : seeded(index, 1) * (width || maxWidth),
        // Start in the visible part of the cycle; distinct seeds keep the
        // drops distributed instead of forming diagonal bands.
        phase: seeded(index, 2) * 0.72,
        // DOM drops complete a fall in roughly a second; keep canvas timing
        // close to that so particles do not appear to stall between cycles.
        speed: (0.58 + seeded(index, 3) * 0.5) * speedFactor * (depth ? 0.7 + z * 0.5 : 1),
        length: base.height * (depth ? 0.55 + z * 0.9 : 1),
        width: base.width * (depth ? 0.55 + z * 0.9 : 1),
        depthScale: depth ? 0.55 + z * 0.9 : 1,
        opacity: opacity * (depth ? 0.35 + z * 0.65 : 1),
        impact: showImpact && seeded(index, 7) < impactDensity,
        sourceTop: 0,
      };
    });

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(0, rect.width);
      height = Math.max(0, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.forEach((particle, index) => {
        particle.x = rainFromClouds
          ? ((index % cloudCount) + 0.5) * width / cloudCount + (seeded(index, 5) - 0.5) * cloudSize * 0.3
          : seeded(index, 1) * width;
        particle.sourceTop = rainFromClouds
          ? Math.max(0, Math.min(height * 0.4, cloudSize * (0.29 + seeded(index, 6) * 0.06)))
          : 0;
      });
      // Redraw at the current timeline position, preserving the running loop.
      draw(performance.now(), true);
    };

    const drawDrop = (particle: Particle, x: number, y: number, progress: number, sway: number) => {
      const dropOpacity = particle.opacity * (progress > 0.78 ? Math.max(0, (1 - progress) / 0.22) : 1);
      if (dropOpacity <= 0 || y < -particle.length || y > height + particle.length) return;
      context.save();
      context.translate(x, y);
      // Canvas rotation is clockwise-positive, so a downward streak leans
      // right when its path drifts right (positive public angle).
      context.rotate(-angle);
      context.globalAlpha = dropOpacity;
      // Depth is communicated through scale and opacity; per-particle canvas
      // filters are expensive and often force extra offscreen compositing.
      if (dropStyle === "soft") context.filter = "blur(1px)";
      context.fillStyle = rgbaColor(dropOpacity);
      if (dropStyle === "glow") {
        context.shadowColor = rgbaColor(0.7);
        context.shadowBlur = 5;
        const gradient = context.createRadialGradient(0, 0, 0, 0, 0, Math.max(particle.width, particle.length) * 0.65);
        gradient.addColorStop(0, rgbaColor(0.8));
        gradient.addColorStop(1, rgbaColor(0));
        context.fillStyle = gradient;
        context.beginPath();
        context.ellipse(0, 0, particle.width * 0.75, particle.length * 0.5, 0, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
        context.fillStyle = rgbaColor(0.75);
        context.beginPath();
        context.ellipse(0, 0, particle.width * 0.35, particle.length * 0.42, 0, 0, Math.PI * 2);
        context.fill();
      } else if (dropStyle === "orb" || dropStyle === "hailstone") {
        const radius = particle.width * 0.5;
        const gradient = context.createRadialGradient(-radius * 0.25, -radius * 0.3, 0, 0, 0, radius);
        gradient.addColorStop(0, "rgba(255,255,255,.95)");
        gradient.addColorStop(0.45, rgbaColor(1));
        gradient.addColorStop(1, rgbaColor(0.72));
        context.fillStyle = gradient;
        context.beginPath();
        context.ellipse(0, 0, radius, particle.length * 0.5, 0, 0, Math.PI * 2);
        context.fill();
      } else if (dropStyle === "snowflake") {
        context.strokeStyle = rgbaColor(1);
        context.lineWidth = Math.max(1, particle.width * 0.14);
        context.lineCap = "round";
        for (let arm = 0; arm < 3; arm++) {
          context.save();
          context.rotate((Math.PI * arm) / 3);
          context.beginPath(); context.moveTo(-particle.width / 2, 0); context.lineTo(particle.width / 2, 0); context.stroke();
          context.restore();
        }
      } else if (dropStyle === "pixel") {
        const columns = 4;
        const rows = [1, 1, 2, 3, 4, 4, 3, 3, 2, 1];
        const unitWidth = particle.width / columns;
        const unitHeight = particle.length / rows.length;
        context.fillStyle = rgbaColor(1);
        rows.forEach((filledColumns, row) => {
          const rowWidth = filledColumns * unitWidth;
          context.fillRect(
            -rowWidth / 2,
            -particle.length / 2 + row * unitHeight,
            rowWidth,
            unitHeight,
          );
        });
        context.fillStyle = "rgba(255,255,255,.62)";
        context.globalAlpha = dropOpacity * 0.62;
        context.fillRect(-unitWidth * 0.65, -particle.length * 0.14, unitWidth * 0.45, unitHeight * 1.2);
      } else if (dropStyle === "soft") {
        const radius = Math.max(particle.width, particle.length) * 0.6;
        const gradient = context.createRadialGradient(0, -particle.length * 0.08, 0, 0, 0, radius);
        gradient.addColorStop(0, rgbaColor(0.88));
        gradient.addColorStop(0.52, rgbaColor(0.5));
        gradient.addColorStop(1, rgbaColor(0));
        context.fillStyle = gradient;
        context.beginPath();
        context.ellipse(0, 0, particle.width * 0.55, particle.length * 0.5, 0, 0, Math.PI * 2);
        context.fill();
      } else {
        context.fillStyle = rgbaColor(1);
        if (dropStyle === "cartoon") {
          context.beginPath();
          context.moveTo(0, -particle.length / 2);
          context.bezierCurveTo(particle.width * 0.48, -particle.length * 0.05, particle.width * 0.55, particle.length * 0.2, 0, particle.length / 2);
          context.bezierCurveTo(-particle.width * 0.55, particle.length * 0.2, -particle.width * 0.48, -particle.length * 0.05, 0, -particle.length / 2);
          context.fill();
          context.globalAlpha = dropOpacity * 0.76;
          context.fillStyle = "rgba(255,255,255,.92)";
          context.beginPath();
          context.ellipse(-particle.width * 0.18, -particle.length * 0.06, particle.width * 0.09, particle.length * 0.12, -0.2, 0, Math.PI * 2);
          context.fill();
        } else {
          context.fillRect(-particle.width / 2, -particle.length / 2, particle.width, particle.length);
        }
      }
      context.restore();
    };

    const drawImpact = (particle: Particle, x: number, progress: number) => {
      if (!particle.impact || progress < 0.78 || progress > 1) return;
      const t = (progress - 0.78) / 0.22;
      const alpha = impactOpacity * particle.opacity * (1 - t);
      // Leave enough room for the full ripple ring/stippled splash inside the
      // clipped canvas at the bottom edge.
      const y = height - Math.max(8, thickness * 2);
      context.save();
      context.globalAlpha = alpha;
      context.strokeStyle = rgbaColor(1);
      context.fillStyle = rgbaColor(1);
      context.lineWidth = thickness * particle.depthScale;
      if (impactStyle === "ripple") {
        for (let ring = 0; ring < 2; ring++) {
          const ringT = clamp(t * 1.5 - ring * 0.32, 0, 1);
          if (!ringT) continue;
          context.globalAlpha = alpha * (1 - ringT);
          context.beginPath();
          context.ellipse(x, y, (4 + 16 * ringT) * particle.depthScale, (1.5 + 4 * ringT) * particle.depthScale, 0, 0, Math.PI * 2);
          context.stroke();
        }
      } else {
        const spread = impactStyle === "spray" ? 18 : 10;
        const lift = impactStyle === "spray" ? 22 : 14;
        context.beginPath();
        context.ellipse(x, y, (2 + t * 4) * particle.depthScale, Math.max(0.7, thickness * 0.35), 0, Math.PI, Math.PI * 2);
        context.stroke();
        for (let side = -1; side <= 1; side += 2) {
          for (let dot = 0; dot < 2; dot++) {
            const dx = side * (spread * (0.25 + dot * 0.25) * t);
            const dy = -lift * (0.35 + dot * 0.22) * t;
            context.beginPath(); context.arc(x + dx, y + dy, Math.max(0.5, thickness * (dot ? 0.35 : 0.55)), 0, Math.PI * 2); context.fill();
          }
        }
      }
      context.restore();
    };

    function draw(time: number, force = false) {
      if (!force && (!running || paused || reducedMotion)) return;
      if (previousTime) elapsed += Math.min(64, time - previousTime);
      previousTime = time;
      context.clearRect(0, 0, width, height);
      const variation = clamp(options.windVariation ?? 0, 0, 30) * Math.PI / 180;
      const gustSeconds = Math.max(4, options.gustFrequency ?? 8) * 2.5;
      const sway = options.showWind || options.windProfile
        ? Math.sin((elapsed / 1000 / gustSeconds) * Math.PI * 2) * variation * 0.08
        : 0;
      for (const particle of particles) {
        const progress = reducedMotion ? particle.phase : (particle.phase + elapsed / 1000 * particle.speed) % 1;
        const fallY = particle.sourceTop + progress * (height - particle.sourceTop + particle.length) - particle.length;
        const fallAngle = angle + sway;
        const drift = Math.tan(fallAngle) * height;
        const x = ((particle.x + drift * progress) % (width + particle.width) + width + particle.width) % (width + particle.width) - particle.width / 2;
        drawDrop(particle, x, fallY, progress, sway);
        const landingX = width > 0
          ? ((particle.x + drift) % width + width) % width
          : x;
        drawImpact(particle, clamp(landingX, thickness * 12, Math.max(thickness * 12, width - thickness * 12)), progress);
      }
      if (!force && !reducedMotion && running && !paused) frame = requestAnimationFrame(draw);
    }

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : undefined;
    resizeObserver?.observe(parent);
    if (!resizeObserver) window.addEventListener("resize", resize);
    resize();
    if (running && !paused && !reducedMotion) frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener("resize", resize);
    };
  }, [options, profile, running, paused, reducedMotion]);

  return <canvas ref={canvasRef} className="rain-canvas-layer" aria-hidden="true" />;
}

export default CanvasRainLayer;
