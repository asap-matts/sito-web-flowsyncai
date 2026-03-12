"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Shield, Clock } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    icon: Zap,
    title: "Approccio Pratico",
    description:
      "Niente teoria fine a sé stessa. Costruiamo soluzioni concrete che generano risultati misurabili dal primo giorno.",
  },
  {
    icon: Shield,
    title: "Sicurezza & Privacy",
    description:
      "I tuoi dati restano tuoi. Ogni sistema è progettato con la massima attenzione alla protezione delle informazioni aziendali.",
  },
  {
    icon: Clock,
    title: "Sempre Operativi",
    description:
      "I nostri sistemi lavorano giorno e notte, adattandosi al ritmo della tua azienda senza mai fermarsi.",
  },
];

export default function AboutSection() {
  const markerRef = useRef(null);
  const markerInView = useInView(markerRef, { once: true, margin: "-60px" });

  return (
    <section id="about" className="section-blend relative py-28">
      {/* Decorative separator */}
      <div className="mx-auto mb-20 h-px max-w-5xl glow-line" />

      {/* Background glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-accent-deep/[0.06] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
          >
            <span className="font-body text-sm font-medium uppercase tracking-widest text-accent-bright">
              Chi siamo
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold leading-tight text-ice">
              Non vendiamo AI.
              <br />
              <span className="font-accent italic pr-1 bg-gradient-to-r from-accent-bright to-accent bg-clip-text text-transparent">
                Risolviamo problemi.
              </span>
            </h2>
            <p className="mt-6 font-body text-[length:var(--fs-text)] leading-relaxed text-text-secondary">
              FlowSync AI nasce dalla convinzione che l&apos;intelligenza artificiale
              debba essere uno strumento pratico, non un concetto astratto. Lavoriamo
              fianco a fianco con le aziende per capire le sfide quotidiane e
              costruire sistemi che le risolvono concretamente.
            </p>
            <p className="mt-4 font-body text-[length:var(--fs-text)] leading-relaxed text-text-secondary">
              <span
                ref={markerRef}
                className="marker-underline"
                style={{
                  backgroundSize: markerInView ? "100% 8px" : "0% 8px",
                }}
              >
                Ogni soluzione è progettata su misura, integrata nei tuoi processi
                esistenti e pensata per scalare con la tua crescita.
              </span>
            </p>
          </motion.div>

          {/* Right: Pillars */}
          <div className="flex flex-col gap-5">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                whileHover={{
                  x: 6,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className="neon-card group flex gap-4 rounded-xl border bg-accent/[0.03] p-5 hover:bg-accent/[0.06]"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent-bright transition-transform duration-300 group-hover:scale-110">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-ice">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 font-body text-sm leading-relaxed text-text-muted">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
