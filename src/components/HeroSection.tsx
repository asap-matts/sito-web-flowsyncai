"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Canvas wave animation ── */
const SPEED_SCALE = 0.8; // base speed factor

const waveLayers = [
  { amp: 55, freq: 1.3, speed: 1,    y: 0.32, alpha: 0.18 },
  { amp: 70, freq: 0.9, speed: -0.7, y: 0.40, alpha: 0.13 },
  { amp: 40, freq: 1.9, speed: 1.4,  y: 0.46, alpha: 0.15 },
  { amp: 65, freq: 1.1, speed: -1.0, y: 0.53, alpha: 0.10 },
  { amp: 35, freq: 2.3, speed: 0.9,  y: 0.50, alpha: 0.12 },
  { amp: 50, freq: 1.6, speed: -1.3, y: 0.58, alpha: 0.07 },
];

function useWaveCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let id: number;
    let t0: number | null = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
    }

    resize();
    window.addEventListener("resize", resize);

    function frame(ts: number) {
      if (!t0) t0 = ts;
      const elapsed = (ts - t0) / 1000; // seconds, ever-increasing

      const w = canvas!.width / dpr;
      const h = canvas!.height / dpr;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);

      for (const layer of waveLayers) {
        const p = elapsed * SPEED_SCALE * layer.speed;

        // Gradient: purple (#5E58D5) → light lavender → ice white (#f0f4ff)
        const grad = ctx!.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0,   `rgba(94, 88, 213, ${layer.alpha})`);
        grad.addColorStop(0.35, `rgba(126, 122, 224, ${layer.alpha * 0.8})`);
        grad.addColorStop(0.65, `rgba(181, 178, 235, ${layer.alpha * 0.55})`);
        grad.addColorStop(1,   `rgba(240, 244, 255, ${layer.alpha * 0.35})`);

        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.moveTo(0, h);

        for (let x = 0; x <= w; x += 3) {
          const nx = x / w;
          const y =
            h * layer.y +
            Math.sin(nx * Math.PI * 2 * layer.freq + p) * layer.amp +
            Math.sin(nx * Math.PI * 4 * layer.freq * 0.6 + p * 1.3) * (layer.amp * 0.25);
          ctx!.lineTo(x, y);
        }

        ctx!.lineTo(w, h);
        ctx!.closePath();
        ctx!.fill();
      }

      id = requestAnimationFrame(frame);
    }

    id = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useWaveCanvas(canvasRef);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/[0.07] blur-[120px]" />
        <div className="absolute right-1/4 top-2/3 h-[400px] w-[400px] rounded-full bg-accent-deep/[0.1] blur-[100px]" />
      </div>

      {/* Flowing wave animation */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full blur-[2px]"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 55%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.08] px-4 py-2 backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-accent-bright" />
          <span className="font-body text-sm text-accent-bright">
            Intelligenza Artificiale per il Business
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease, delay: 0.5 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight text-ice"
        >
          Il partner AI definitivo
          <br />
          <span className="bg-gradient-to-r from-accent-bright via-accent to-accent-deep bg-clip-text text-transparent">
            per la tua azienda
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.8 }}
          className="mx-auto mt-6 max-w-2xl font-body text-lg md:text-xl leading-relaxed text-text-secondary"
        >
          Progettiamo e implementiamo sistemi su misura basati sull&apos;intelligenza
          artificiale per aumentare produttività, efficienza e ridurre i costi
          operativi.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 1.1 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-accent to-accent-deep px-7 py-3.5 font-body text-base font-medium text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(94,88,213,0.4)] hover:scale-[1.02]"
          >
            Parliamone
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-accent to-accent-deep px-7 py-3.5 font-body text-base font-medium text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(94,88,213,0.4)] hover:scale-[1.02]"
          >
            Scopri i nostri progetti
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.4 }}
          className="mt-20 grid grid-cols-3 gap-8 border-t border-subtle pt-10"
        >
          {[
            { value: "24/7", label: "Operatività continua" },
            { value: "+40%", label: "Efficienza media" },
            { value: "-30%", label: "Costi operativi" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent-bright to-accent bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="mt-1 font-body text-sm text-text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
