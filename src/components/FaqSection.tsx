"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    question: "Quanto tempo serve per implementare un sistema AI nella mia azienda?",
    answer:
      "Dipende dalla complessità del progetto. Un chatbot personalizzato può essere operativo in 2-3 settimane, mentre un sistema di automazione completo richiede in media 4-8 settimane. Dopo un'analisi iniziale gratuita, ti forniamo una timeline precisa con milestone chiare.",
  },
  {
    question: "Devo avere competenze tecniche per usare i vostri sistemi?",
    answer:
      "Assolutamente no. Ogni sistema che costruiamo è pensato per essere usato dal tuo team senza competenze tecniche. Forniamo interfacce intuitive, formazione dedicata e supporto continuo. Il nostro obiettivo è che l'AI lavori per te, non che tu lavori per l'AI.",
  },
  {
    question: "I miei dati aziendali sono al sicuro?",
    answer:
      "La sicurezza è la nostra priorità. I tuoi dati restano sempre di tua proprietà e non vengono mai condivisi con terze parti. Utilizziamo crittografia end-to-end, server conformi al GDPR e protocolli di sicurezza enterprise. Firmiamo NDA prima di iniziare qualsiasi progetto.",
  },
  {
    question: "Che tipo di ritorno sull'investimento posso aspettarmi?",
    answer:
      "I nostri clienti vedono in media una riduzione del 30-45% dei costi operativi e un aumento del 40% dell'efficienza nei processi automatizzati. La maggior parte dei progetti si ripaga entro 2-4 mesi. Durante la fase di analisi, calcoliamo insieme il ROI stimato specifico per il tuo caso.",
  },
  {
    question: "Posso integrare i vostri sistemi con gli strumenti che già utilizzo?",
    answer:
      "Sì, l'integrazione è il nostro punto di forza. Lavoriamo con CRM, ERP, piattaforme e-commerce, strumenti di project management e qualsiasi software dotato di API. Non sostituiamo i tuoi strumenti: li rendiamo più intelligenti collegandoli tra loro con l'AI.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="section-blend relative py-28">
      {/* Decorative separator */}
      <div className="mx-auto mb-20 h-px max-w-5xl glow-line" />

      {/* Background glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/[0.04] blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-14 text-center"
        >
          <span className="font-body text-sm font-medium uppercase tracking-widest text-accent-bright">
            FAQ
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold leading-tight text-ice">
            Domande{" "}
            <span className="bg-gradient-to-r from-accent-bright to-accent bg-clip-text text-transparent">
              frequenti
            </span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease, delay: i * 0.07 }}
              >
                <button
                  onClick={() => toggle(i)}
                  className={`w-full flex items-center justify-between gap-4 rounded-xl border px-6 py-5 text-left transition-all duration-300 ${
                    isOpen
                      ? "border-accent/25 bg-accent/[0.06] shadow-[0_0_20px_rgba(94,88,213,0.08)]"
                      : "border-subtle bg-accent/[0.03] hover:border-accent/15 hover:bg-accent/[0.06]"
                  }`}
                >
                  <span className="font-display text-base font-semibold text-ice">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-colors duration-300 ${
                        isOpen ? "text-accent-bright" : "text-text-muted"
                      }`}
                    />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pt-3 pb-5 font-body text-[length:var(--fs-text)] leading-relaxed text-text-secondary">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
