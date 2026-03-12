"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function BookingSection() {
  return (
    <section id="booking" className="section-blend relative py-28">
      {/* Decorative separator */}
      <div className="mx-auto mb-20 h-px max-w-5xl glow-line" />

      {/* Background glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/[0.05] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.08] px-4 py-1.5 font-body text-sm text-accent-bright"
          >
            <CalendarDays className="h-4 w-4" />
            Prenota un appuntamento
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="mt-6 font-display text-3xl md:text-5xl font-bold leading-tight text-ice"
          >
            Parliamo del tuo{" "}
            <span className="font-accent italic pr-1 bg-gradient-to-r from-accent-bright via-accent to-accent-deep bg-clip-text text-transparent">
              progetto
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl font-body text-lg leading-relaxed text-text-secondary"
          >
            Scegli il giorno e l&apos;orario che preferisci. Ti contatteremo per
            una consulenza gratuita e senza impegno.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-2 font-body text-sm text-text-muted"
          >
            Disponibili dal lunedì al venerdì, e il sabato fino alle 13:00.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="neon-card mt-12 overflow-hidden rounded-2xl border bg-bg-purple-light/30 backdrop-blur-sm"
        >
          {/* Google Calendar Appointment Scheduling embed */}
          <iframe
            src="https://calendar.google.com/calendar/appointments/schedules/REPLACE_WITH_YOUR_SCHEDULE_ID?gv=true"
            style={{ border: 0 }}
            width="100%"
            height="600"
            frameBorder="0"
            title="Prenota un appuntamento con FlowSync AI"
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
