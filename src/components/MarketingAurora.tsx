"use client";

import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   Marketing AI — "Aurora Mesh" animation
   Smooth morphing gradient blobs with screen blending,
   twinkling sparkles, and a central glow pulse.
   ═══════════════════════════════════════════════════════════ */

interface Blob {
  /** normalized 0-1 base position */
  baseX: number;
  baseY: number;
  /** normalized radius (fraction of min(cw,ch)) */
  radius: number;
  hue: number;
  saturation: number;
  lightness: number;
  /** movement speeds & phase offsets */
  xFreq: number;
  yFreq: number;
  xPhase: number;
  yPhase: number;
  /** how far the blob drifts from its base (0-1) */
  drift: number;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  driftSpeed: number;
  phase: number;
  twinkleFreq: number;
  hue: number;
}

const BLOBS: Blob[] = [
  { baseX: 0.30, baseY: 0.28, radius: 0.38, hue: 258, saturation: 82, lightness: 52, xFreq: 0.13, yFreq: 0.10, xPhase: 0.0, yPhase: 0.0, drift: 0.18 },
  { baseX: 0.72, baseY: 0.58, radius: 0.32, hue: 275, saturation: 76, lightness: 48, xFreq: 0.10, yFreq: 0.15, xPhase: 1.2, yPhase: 2.4, drift: 0.22 },
  { baseX: 0.50, baseY: 0.42, radius: 0.42, hue: 248, saturation: 88, lightness: 42, xFreq: 0.07, yFreq: 0.09, xPhase: 2.5, yPhase: 1.0, drift: 0.15 },
  { baseX: 0.38, baseY: 0.72, radius: 0.30, hue: 288, saturation: 70, lightness: 50, xFreq: 0.16, yFreq: 0.12, xPhase: 3.8, yPhase: 3.2, drift: 0.20 },
  { baseX: 0.65, baseY: 0.22, radius: 0.34, hue: 242, saturation: 84, lightness: 46, xFreq: 0.09, yFreq: 0.14, xPhase: 4.6, yPhase: 1.8, drift: 0.24 },
  { baseX: 0.20, baseY: 0.55, radius: 0.26, hue: 266, saturation: 78, lightness: 56, xFreq: 0.12, yFreq: 0.08, xPhase: 5.3, yPhase: 4.1, drift: 0.16 },
  { baseX: 0.55, baseY: 0.80, radius: 0.28, hue: 280, saturation: 72, lightness: 44, xFreq: 0.11, yFreq: 0.17, xPhase: 0.7, yPhase: 5.5, drift: 0.19 },
];

const SPARKLE_COUNT = 40;

export default function MarketingAurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animId: number;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.width / dpr;
    const h = () => canvas.height / dpr;

    // Generate sparkles
    const sparkles: Sparkle[] = Array.from({ length: SPARKLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 0.4 + Math.random() * 1.4,
      driftSpeed: 0.012 + Math.random() * 0.025,
      phase: Math.random() * Math.PI * 2,
      twinkleFreq: 0.8 + Math.random() * 2.5,
      hue: 250 + Math.random() * 35,
    }));

    function frame(ts: number) {
      const t = ts / 1000;
      const cw = w();
      const ch = h();
      const minDim = Math.min(cw, ch);

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, cw, ch);

      /* ── Central glow pulse ── */
      const pulseAlpha = 0.06 + 0.03 * Math.sin(t * 0.8);
      const cGrad = ctx!.createRadialGradient(
        cw * 0.5, ch * 0.45, 0,
        cw * 0.5, ch * 0.45, minDim * 0.55,
      );
      cGrad.addColorStop(0, `hsla(265, 85%, 65%, ${pulseAlpha})`);
      cGrad.addColorStop(0.5, `hsla(260, 75%, 50%, ${pulseAlpha * 0.4})`);
      cGrad.addColorStop(1, "hsla(260, 70%, 40%, 0)");
      ctx!.fillStyle = cGrad;
      ctx!.fillRect(0, 0, cw, ch);

      /* ── Aurora blobs (screen blend) ── */
      ctx!.globalCompositeOperation = "screen";

      for (const blob of BLOBS) {
        const bx = (blob.baseX + Math.sin(t * blob.xFreq + blob.xPhase) * blob.drift) * cw;
        const by = (blob.baseY + Math.cos(t * blob.yFreq + blob.yPhase) * blob.drift) * ch;
        const br = blob.radius * minDim * (0.92 + 0.08 * Math.sin(t * 0.4 + blob.xPhase));

        const grad = ctx!.createRadialGradient(bx, by, 0, bx, by, br);
        grad.addColorStop(0, `hsla(${blob.hue}, ${blob.saturation}%, ${blob.lightness}%, 0.30)`);
        grad.addColorStop(0.35, `hsla(${blob.hue}, ${blob.saturation - 5}%, ${blob.lightness - 8}%, 0.14)`);
        grad.addColorStop(0.65, `hsla(${blob.hue + 8}, ${blob.saturation - 12}%, ${blob.lightness - 15}%, 0.05)`);
        grad.addColorStop(1, `hsla(${blob.hue}, ${blob.saturation}%, ${blob.lightness}%, 0)`);

        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(bx, by, br, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalCompositeOperation = "source-over";

      /* ── Sparkles ── */
      for (const s of sparkles) {
        // Slow upward drift, wrap around
        const sy = ((s.y - t * s.driftSpeed) % 1.0 + 1.0) % 1.0;
        const sx = s.x + Math.sin(t * 0.6 + s.phase) * 0.02;
        const px = sx * cw;
        const py = sy * ch;

        const twinkle = 0.15 + 0.85 * Math.pow(Math.abs(Math.sin(t * s.twinkleFreq + s.phase)), 1.5);
        const alpha = twinkle * 0.7;
        const sr = s.size * (0.7 + twinkle * 0.3);

        // Soft glow
        const sGrad = ctx!.createRadialGradient(px, py, 0, px, py, sr * 4);
        sGrad.addColorStop(0, `hsla(${s.hue}, 75%, 82%, ${alpha * 0.5})`);
        sGrad.addColorStop(1, `hsla(${s.hue}, 75%, 82%, 0)`);
        ctx!.fillStyle = sGrad;
        ctx!.beginPath();
        ctx!.arc(px, py, sr * 4, 0, Math.PI * 2);
        ctx!.fill();

        // Core
        ctx!.fillStyle = `hsla(${s.hue}, 80%, 88%, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(px, py, sr, 0, Math.PI * 2);
        ctx!.fill();
      }

      /* ── Subtle vignette ── */
      const vGrad = ctx!.createRadialGradient(
        cw * 0.5, ch * 0.5, minDim * 0.25,
        cw * 0.5, ch * 0.5, minDim * 0.75,
      );
      vGrad.addColorStop(0, "hsla(265, 50%, 10%, 0)");
      vGrad.addColorStop(1, "hsla(265, 50%, 5%, 0.35)");
      ctx!.fillStyle = vGrad;
      ctx!.fillRect(0, 0, cw, ch);

      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      style={{ display: "block" }}
    />
  );
}
