"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CtaSection() {
  return (
    <section id="contact" className="relative py-28">
      {/* Decorative separator */}
      <div className="mx-auto mb-20 h-px max-w-5xl glow-line" />

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/[0.06] blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight text-ice">
          Pronto a trasformare
          <br />
          <span className="bg-gradient-to-r from-accent-bright via-accent to-accent-deep bg-clip-text text-transparent">
            il tuo business con l&apos;AI?
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-text-secondary">
          Raccontaci le tue sfide. Analizzeremo insieme come l&apos;intelligenza
          artificiale può migliorare concretamente le tue operazioni.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:info@flowsyncai.com"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-accent to-accent-deep px-8 py-4 font-body text-base font-medium text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-[1.02]"
          >
            Inizia una conversazione
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <p className="mt-6 font-body text-sm text-text-muted">
          Nessun impegno. Parliamo del tuo progetto.
        </p>
      </motion.div>
    </section>
  );
}
