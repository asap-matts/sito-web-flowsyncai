"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/[0.07] blur-[120px]" />
        <div className="absolute right-1/4 top-2/3 h-[400px] w-[400px] rounded-full bg-accent-deep/[0.1] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
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
          transition={{ duration: 1, ease, delay: 0.15 }}
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
          transition={{ duration: 0.9, ease, delay: 0.3 }}
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
          transition={{ duration: 0.8, ease, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-accent to-accent-deep px-7 py-3.5 font-body text-base font-medium text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-[1.02]"
          >
            Parliamone
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-xl border border-subtle bg-accent/[0.03] px-7 py-3.5 font-body text-base font-medium text-ice/80 transition-all duration-300 hover:border-accent/30 hover:text-ice hover:bg-accent/[0.06]"
          >
            Scopri i nostri sistemi
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
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
