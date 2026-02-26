"use client";

import { motion } from "framer-motion";
import { Bot, BrainCircuit, Workflow, MessageSquareMore } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    icon: BrainCircuit,
    title: "Automazione Intelligente",
    description:
      "Automatizziamo i processi ripetitivi con sistemi AI che apprendono e si adattano al tuo flusso di lavoro, liberando tempo per attività strategiche.",
    tags: ["Process Mining", "RPA", "Machine Learning"],
  },
  {
    icon: Bot,
    title: "Assistenti AI Personalizzati",
    description:
      "Chatbot e assistenti virtuali addestrati sui dati della tua azienda per supporto clienti, vendite e operazioni interne 24/7.",
    tags: ["NLP", "Chatbot", "Knowledge Base"],
  },
  {
    icon: Workflow,
    title: "Integrazione Sistemi",
    description:
      "Colleghiamo i tuoi strumenti esistenti con l'intelligenza artificiale, creando un ecosistema connesso che elimina silos e inefficienze.",
    tags: ["API", "Workflow", "Data Pipeline"],
  },
  {
    icon: MessageSquareMore,
    title: "Analisi & Insights",
    description:
      "Trasformiamo i tuoi dati in decisioni strategiche con dashboard intelligenti, previsioni e report automatici alimentati dall'AI.",
    tags: ["Analytics", "Forecasting", "BI"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: i * 0.12 },
  }),
};

export default function ServicesSection() {
  return (
    <section id="services" className="section-blend relative py-28">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/[0.04] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-16"
        >
          <span className="font-body text-sm font-medium uppercase tracking-widest text-accent-bright">
            I nostri sistemi
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold leading-tight text-ice">
            Soluzioni AI costruite
            <br />
            <span className="bg-gradient-to-r from-accent-bright to-accent bg-clip-text text-transparent">
              intorno al tuo business
            </span>
          </h2>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="group relative rounded-2xl border border-subtle bg-bg-purple-light/50 p-7 backdrop-blur-sm transition-all duration-500 hover:border-accent/20 hover:bg-bg-purple-light/80 hover:shadow-[0_0_40px_rgba(94,88,213,0.08)]"
            >
              {/* Icon */}
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent-bright transition-colors duration-300 group-hover:bg-accent/20">
                <service.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-ice">
                {service.title}
              </h3>
              <p className="mt-3 font-body text-[length:var(--fs-text)] leading-relaxed text-text-secondary">
                {service.description}
              </p>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-accent/10 bg-accent/[0.05] px-3 py-1 font-body text-xs text-text-muted transition-colors duration-300 group-hover:text-accent-bright group-hover:border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
