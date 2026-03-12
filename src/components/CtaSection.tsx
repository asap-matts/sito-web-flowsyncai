"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CtaSection() {
  return (
    <section id="contact" className="section-blend relative py-28">
      {/* Decorative separator */}
      <div className="mx-auto mb-20 h-px max-w-5xl glow-line" />

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/[0.06] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="font-display text-3xl md:text-5xl font-bold leading-tight text-ice"
        >
          Pronto a trasformare
          <br />
          <span className="font-accent italic pr-1 bg-gradient-to-r from-accent-bright via-accent to-accent-deep bg-clip-text text-transparent">
            il tuo business con l&apos;AI?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-text-secondary"
        >
          Raccontaci le tue sfide. Analizzeremo insieme come l&apos;intelligenza
          artificiale può migliorare concretamente le tue operazioni.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:info@flowsyncai.com"
            className="group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-accent to-accent-deep px-8 py-4 font-body text-base font-medium text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(94,88,213,0.4)] hover:scale-[1.02]"
          >
            <span className="pointer-events-none absolute inset-0 rounded-xl animate-pulse opacity-0 group-hover:opacity-100 shadow-[0_0_20px_rgba(94,88,213,0.4),0_0_40px_rgba(94,88,213,0.2)]" />
            Inizia una conversazione
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 font-body text-sm text-text-muted"
        >
          Nessun impegno. Parliamo del tuo progetto.
        </motion.p>
      </div>
    </section>
  );
}
