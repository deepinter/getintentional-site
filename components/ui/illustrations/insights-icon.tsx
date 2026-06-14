"use client";

import { useEffect, useRef } from "react";

const SPEED  = 1.5;
const FLAT   = 80;         // px of flat baseline between ECG pulses
const BUMP   = 100;        // px for the full QRS complex
const PERIOD = FLAT + BUMP;

// R spike sits at t=0.40 → peakPos = FLAT + 0.40*BUMP = 120 (first cycle)
const EVENTS = [
  { peakPos: 120, label: "Engagement from campaigns", ampFrac: 0.38 },
  { peakPos: 500, label: "Organic traffic declining",  ampFrac: 0.15 },
];

function ecgWave(pos: number, amp: number): number {
  const p = ((pos % PERIOD) + PERIOD) % PERIOD;

  if (p < FLAT) {
    // Tiny baseline wander — a real ECG is never perfectly still
    const wander = 0.018 * Math.sin(pos * 3.71) * Math.sin(pos * 1.29);
    return -wander * amp * 0.4;
  }

  const t = (p - FLAT) / BUMP; // 0..1 across the beat

  const gauss = (c: number, w: number) =>
    Math.exp(-Math.pow((t - c) / w, 2));

  const tri = (c: number, w: number) =>
    Math.max(0, 1 - Math.abs(t - c) / w);

  let y = 0;

  // P wave — small rounded pre-beat bump
  y += 0.18 * gauss(0.09, 0.045);

  // Q dip
  y -= 0.22 * tri(0.31, 0.048);

  // R spike — sharp triangular main peak
  y += 1.00 * tri(0.40, 0.068);

  // S dip
  y -= 0.50 * tri(0.50, 0.038);

  // Small post-S notch
  y += 0.10 * gauss(0.60, 0.038);

  // T wave — broader recovery bump
  y += 0.28 * gauss(0.74, 0.082);

  // Deterministic organic noise
  const noise = 0.055 * Math.sin(pos * 2.31 + 0.4) * Math.cos(pos * 1.09)
              + 0.028 * Math.sin(pos * 5.73);

  return -(y + noise) * amp;
}

export default function InsightsIcon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr  = window.devicePixelRatio || 1;
    const W    = Math.round(rect.width)  || 220;
    const H    = Math.round(rect.height) || 132;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const BASELINE   = H * 0.55;
    const MAX_AMP    = H * 0.44;
    const MIN_AMP    = H * 0.04;
    const fontSize   = 18;
    const buffer     = new Float32Array(W).fill(0);
    let pos          = 0;
    let accumulator  = 0;
    let running      = true;

    const FADE_F  = 45;
    const DECAY_F = 500;
    // Must be long enough for the full buffer to scroll off the left edge,
    // plus a comfortable hold. W px ÷ SPEED px/frame = frames to clear.
    const FLAT_F  = Math.ceil(W / SPEED) + 30;

    type Phase = "fadein" | "decay" | "flatline";
    let phase      : Phase = "fadein";
    let phaseFrame = 0;
    let opacity    = 0;

    const tick = () => {
      if (!running) return;
      phaseFrame++;

      switch (phase) {
        case "fadein":
          opacity = Math.min(1, phaseFrame / FADE_F);
          if (phaseFrame >= FADE_F) { phase = "decay"; phaseFrame = 0; }
          break;
        case "decay":
          if (phaseFrame >= DECAY_F) { phase = "flatline"; phaseFrame = 0; }
          break;
        case "flatline":
          if (phaseFrame >= FLAT_F) {
            buffer.fill(0); pos = 0; phaseFrame = 0; phase = "decay";
          }
          break;
      }

      let amplitude: number;
      let trendAmp: number;
      if (phase === "flatline") {
        amplitude = 0;
        trendAmp  = 0;
      } else {
        const progress  = phase === "decay" ? Math.min(1, phaseFrame / DECAY_F) : 0;
        const trend     = 1 - progress * 0.95;
        // Two overlapping sines → organic per-beat height variation
        const variation = 0.84 + 0.10 * Math.sin(pos * 0.028) + 0.06 * Math.sin(pos * 0.067 + 1.2);
        trendAmp  = MIN_AMP + (MAX_AMP - MIN_AMP) * trend;
        amplitude = trendAmp * variation;
      }

      // Scroll buffer
      accumulator += SPEED;
      const steps = Math.floor(accumulator);
      accumulator -= steps;
      for (let i = 0; i < steps; i++) {
        buffer.copyWithin(0, 1);
        buffer[W - 1] = ecgWave(pos, amplitude);
        pos++;
      }

      // ── Draw ──────────────────────────────────────────────────

      ctx.clearRect(0, 0, W, H);

      // Full-width horizontal orange glow band — gradient for perfectly soft edges
      const bandGrad = ctx.createLinearGradient(0, BASELINE - H * 0.48, 0, BASELINE + H * 0.42);
      bandGrad.addColorStop(0,    "rgba(212,86,29,0)");
      bandGrad.addColorStop(0.30, "rgba(212,86,29,0.07)");
      bandGrad.addColorStop(0.50, "rgba(212,86,29,0.10)");
      bandGrad.addColorStop(0.72, "rgba(212,86,29,0.07)");
      bandGrad.addColorStop(1,    "rgba(212,86,29,0)");
      ctx.fillStyle = bandGrad;
      ctx.fillRect(0, 0, W, H);

      // Hairlines — faint warm orange, visible on the card background
      ctx.strokeStyle = "rgba(212,86,29,0.10)";
      ctx.lineWidth = 0.75;
      const HAIRLINES = 7;
      for (let hi = 1; hi <= HAIRLINES; hi++) {
        const y = (hi / (HAIRLINES + 1)) * H;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Baseline rule
      ctx.strokeStyle = `rgba(212,86,29,${opacity * 0.12})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, BASELINE);
      ctx.lineTo(W, BASELINE);
      ctx.stroke();

      const tracePath = () => {
        ctx.beginPath();
        for (let x = 0; x < W; x++) {
          const y = BASELINE + buffer[x];
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
      };

      // Glow pass
      ctx.save();
      ctx.filter = "blur(6px)";
      ctx.strokeStyle = `rgba(212,86,29,${opacity * 0.45})`;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      tracePath();
      ctx.stroke();
      ctx.restore();

      // Sharp pass
      ctx.strokeStyle = `rgba(212,86,29,${opacity * 0.85})`;
      ctx.lineWidth = 1.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      tracePath();
      ctx.stroke();

      // Annotations
      if (opacity > 0) {
        ctx.textBaseline = "bottom";
        for (const ev of EVENTS) {
          const x = W - pos + ev.peakPos;
          if (x < 0 || x > W + 10) continue;
          const edgeFade = Math.min(1, x / 80, (W - x) / 60);
          const alpha = opacity * Math.max(0, edgeFade);
          if (alpha <= 0) continue;
          ctx.font = `${fontSize}px system-ui, -apple-system, sans-serif`;
          ctx.fillStyle = `rgba(212,86,29,${alpha * 0.65})`;
          const labelY = Math.max(fontSize + 4, BASELINE - H * ev.ampFrac - 22);
          ctx.fillText(ev.label, x, labelY);
        }
      }

      // Feather left & right edges — fades everything drawn this frame
      ctx.save();
      ctx.globalCompositeOperation = "destination-in";
      const FEATHER_W = W * 0.10;
      const fadeGrad = ctx.createLinearGradient(0, 0, W, 0);
      fadeGrad.addColorStop(0,                    "rgba(0,0,0,0)");
      fadeGrad.addColorStop(FEATHER_W / W,         "rgba(0,0,0,1)");
      fadeGrad.addColorStop(1 - FEATHER_W / W,     "rgba(0,0,0,1)");
      fadeGrad.addColorStop(1,                    "rgba(0,0,0,0)");
      ctx.fillStyle = fadeGrad;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => { running = false; };
  }, []);

  return (
    <div className="w-full" style={{ aspectRatio: "5 / 3" }}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
