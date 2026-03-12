"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    name: "Marco Bianchi",
    role: "CEO, TechVenture Srl",
    quote:
      "FlowSync AI ha rivoluzionato il nostro servizio clienti. Il chatbot personalizzato gestisce l'80% delle richieste in autonomia, e il team può finalmente concentrarsi sulle attività strategiche.",
    stars: 5,
  },
  {
    name: "Laura Conti",
    role: "COO, LogiPro Italia",
    quote:
      "Grazie all'automazione dei processi implementata da FlowSync, abbiamo ridotto i tempi operativi del 45%. Un investimento che si è ripagato in meno di tre mesi.",
    stars: 5,
  },
  {
    name: "Alessandro Ferrara",
    role: "Founder, DataDrive Agency",
    quote:
      "Cercavamo un partner AI che capisse davvero le nostre esigenze, non che vendesse soluzioni preconfezionate. FlowSync ha costruito un sistema su misura che funziona perfettamente.",
    stars: 5,
  },
  {
    name: "Giulia Moretti",
    role: "Head of Operations, NovaPharma",
    quote:
      "L'integrazione AI nei nostri sistemi di gestione magazzino ha eliminato il 90% degli errori manuali. Il team di FlowSync è stato impeccabile nella fase di implementazione.",
    stars: 5,
  },
  {
    name: "Roberto Sala",
    role: "CTO, FinEdge Solutions",
    quote:
      "Il sistema di analisi predittiva che ci hanno costruito anticipa le tendenze di mercato con una precisione sorprendente. Abbiamo aumentato il fatturato del 25% nel primo trimestre.",
    stars: 5,
  },
  {
    name: "Chiara Lombardi",
    role: "Direttrice HR, Gruppo Meridian",
    quote:
      "FlowSync ha automatizzato il nostro processo di screening CV. Quello che richiedeva 3 giorni ora si completa in 2 ore, con candidati più in linea con i nostri requisiti.",
    stars: 5,
  },
  {
    name: "Davide Ricci",
    role: "Managing Director, BuildSmart",
    quote:
      "Avevamo provato altre soluzioni AI, ma nessuna era stata adattata al nostro settore. FlowSync ha capito le specificità dell'edilizia e ha creato qualcosa che usiamo davvero ogni giorno.",
    stars: 5,
  },
  {
    name: "Francesca De Luca",
    role: "CMO, BrightRetail",
    quote:
      "Le campagne marketing ottimizzate dall'AI di FlowSync hanno triplicato il nostro tasso di conversione. Il sistema impara continuamente e migliora settimana dopo settimana.",
    stars: 5,
  },
  {
    name: "Stefano Greco",
    role: "CEO, AgroTech Innovations",
    quote:
      "Nel settore agricolo la tecnologia spesso spaventa. FlowSync ha reso l'AI accessibile al nostro team con un'interfaccia semplice e un supporto eccezionale in ogni fase.",
    stars: 5,
  },
  {
    name: "Elena Marchetti",
    role: "Operations Manager, VeloceShip",
    quote:
      "Il sistema di ottimizzazione delle rotte di consegna ha ridotto i costi di trasporto del 35%. FlowSync non promette, dimostra con i risultati.",
    stars: 5,
  },
];

const VISIBLE_COUNT = 3;

const fadeVariants = {
  enter: {
    opacity: 0,
    scale: 0.97,
    filter: "blur(8px)",
  },
  center: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    filter: "blur(8px)",
  },
};

export default function TestimonialsSection() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const maxPage = Math.ceil(testimonials.length / VISIBLE_COUNT) - 1;

  const paginate = useCallback(
    (dir: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(dir);
      setPage((prev) => {
        const next = prev + dir;
        if (next < 0) return maxPage;
        if (next > maxPage) return 0;
        return next;
      });
    },
    [maxPage, isAnimating]
  );

  const visibleTestimonials = testimonials.slice(
    page * VISIBLE_COUNT,
    page * VISIBLE_COUNT + VISIBLE_COUNT
  );

  return (
    <section className="section-blend relative py-28">
      {/* Decorative separator */}
      <div className="mx-auto mb-20 h-px max-w-5xl glow-line" />

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/3 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/[0.05] blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-16 text-center"
        >
          <span className="font-body text-sm font-medium uppercase tracking-widest text-accent-bright">
            Testimonianze
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold leading-tight text-ice">
            Cosa dicono{" "}
            <span className="font-accent italic pr-1 bg-gradient-to-r from-accent-bright to-accent bg-clip-text text-transparent">
              i nostri clienti
            </span>
          </h2>
        </motion.div>

        {/* Carousel wrapper */}
        <div className="relative flex items-center gap-4">
          {/* Left arrow — neon style */}
          <button
            onClick={() => paginate(-1)}
            className="group/btn relative flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-full border border-accent/20 bg-accent/[0.05] text-accent-bright transition-all duration-300 hover:border-accent/50 hover:bg-accent/15 hover:shadow-[0_0_20px_rgba(94,88,213,0.3),0_0_40px_rgba(94,88,213,0.15),inset_0_0_12px_rgba(94,88,213,0.1)]"
            aria-label="Precedente"
          >
            {/* Neon ring pulse on hover */}
            <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 group-hover/btn:animate-ping border border-accent/30" />
            <ChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover/btn:-translate-x-0.5" />
          </button>

          {/* Cards container */}
          <div className="relative flex-1 overflow-hidden">
            {/* Neon flash overlay — fires on page change */}
            <AnimatePresence>
              {isAnimating && (
                <motion.div
                  key={`flash-${page}`}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
                  style={{
                    background:
                      direction > 0
                        ? "radial-gradient(ellipse at right center, rgba(94,88,213,0.2) 0%, transparent 70%)"
                        : "radial-gradient(ellipse at left center, rgba(94,88,213,0.2) 0%, transparent 70%)",
                    boxShadow:
                      "inset 0 0 60px rgba(94,88,213,0.1), 0 0 40px rgba(94,88,213,0.05)",
                  }}
                />
              )}
            </AnimatePresence>

            {/* Neon edge glow lines */}
            <AnimatePresence>
              {isAnimating && (
                <>
                  {/* Top edge */}
                  <motion.div
                    key={`neon-top-${page}`}
                    initial={{ scaleX: 0, opacity: 1 }}
                    animate={{ scaleX: 1, opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-none absolute top-0 left-[10%] right-[10%] z-20 h-px origin-center"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(126,122,224,0.8), rgba(94,88,213,1), rgba(126,122,224,0.8), transparent)",
                      boxShadow:
                        "0 0 8px rgba(94,88,213,0.6), 0 0 20px rgba(94,88,213,0.3)",
                    }}
                  />
                  {/* Bottom edge */}
                  <motion.div
                    key={`neon-bottom-${page}`}
                    initial={{ scaleX: 0, opacity: 1 }}
                    animate={{ scaleX: 1, opacity: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.05,
                    }}
                    className="pointer-events-none absolute bottom-0 left-[10%] right-[10%] z-20 h-px origin-center"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(126,122,224,0.8), rgba(94,88,213,1), rgba(126,122,224,0.8), transparent)",
                      boxShadow:
                        "0 0 8px rgba(94,88,213,0.6), 0 0 20px rgba(94,88,213,0.3)",
                    }}
                  />
                </>
              )}
            </AnimatePresence>

            <AnimatePresence
              mode="wait"
              custom={direction}
              onExitComplete={() => setIsAnimating(false)}
            >
              <motion.div
                key={page}
                custom={direction}
                variants={fadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
              >
                {visibleTestimonials.map((t, i) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      ease,
                      delay: 0.1 + i * 0.08,
                    }}
                    className="neon-card group relative flex flex-col rounded-2xl border bg-bg-purple-light/50 p-7 backdrop-blur-sm hover:bg-bg-purple-light/80"
                  >
                    {/* Quote icon */}
                    <Quote className="mb-4 h-8 w-8 text-accent/30" />

                    {/* Stars */}
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: t.stars }).map((_, j) => (
                        <Star
                          key={j}
                          className="h-4 w-4 fill-accent-bright text-accent-bright"
                        />
                      ))}
                    </div>

                    {/* Quote text */}
                    <p className="flex-1 font-body text-[length:var(--fs-text)] leading-relaxed text-text-secondary">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="mt-6 border-t border-subtle pt-5">
                      <p className="font-display text-sm font-bold text-ice">
                        {t.name}
                      </p>
                      <p className="mt-0.5 font-body text-xs text-text-muted">
                        {t.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow — neon style */}
          <button
            onClick={() => paginate(1)}
            className="group/btn relative flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-full border border-accent/20 bg-accent/[0.05] text-accent-bright transition-all duration-300 hover:border-accent/50 hover:bg-accent/15 hover:shadow-[0_0_20px_rgba(94,88,213,0.3),0_0_40px_rgba(94,88,213,0.15),inset_0_0_12px_rgba(94,88,213,0.1)]"
            aria-label="Successivo"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 group-hover/btn:animate-ping border border-accent/30" />
            <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </button>
        </div>

        {/* Dots indicator with neon active state */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {Array.from({ length: maxPage + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (i === page || isAnimating) return;
                setDirection(i > page ? 1 : -1);
                setIsAnimating(true);
                setPage(i);
              }}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === page
                  ? "w-7 bg-accent shadow-[0_0_8px_rgba(94,88,213,0.6),0_0_16px_rgba(94,88,213,0.3)]"
                  : "w-2 bg-accent/15 hover:bg-accent/30"
              }`}
              aria-label={`Pagina ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
