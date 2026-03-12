import Link from "next/link";
import { ArrowLeft, PenTool, Share2, BarChart3, TrendingUp } from "lucide-react";

const features = [
  {
    icon: PenTool,
    title: "Contenuti digitali su misura",
    description:
      "Testi, immagini, video, caroselli: creiamo ogni formato con l'AI, adattato al tono e agli obiettivi del tuo brand.",
  },
  {
    icon: Share2,
    title: "Gestione social strategica",
    description:
      "Gestiamo i profili social in modo strategico, garantendo una presenza online costante e professionale.",
  },
  {
    icon: BarChart3,
    title: "Analisi performance in tempo reale",
    description:
      "L'AI analizza i dati concreti delle tue campagne e adatta la strategia in base ai risultati ottenuti.",
  },
  {
    icon: TrendingUp,
    title: "Risultati misurabili",
    description:
      "I nostri clienti risparmiano tempo e risorse, mantenendo una presenza online che porta risultati concreti.",
  },
];

export default function MarketingAIProjectPage() {
  return (
    <div className="grain-overlay">
      <div className="relative min-h-screen py-28">
        <div className="mx-auto max-w-6xl px-6">
          {/* Back link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-body text-sm text-text-secondary transition-colors hover:text-accent-bright"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna ai progetti
          </Link>

          {/* Hero split: text left, image placeholder right */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — Text content */}
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.08] px-4 py-1.5 font-body text-sm text-accent-bright">
                Marketing AI
              </span>

              <h1 className="mt-6 font-display text-4xl md:text-5xl font-bold leading-[1.1] text-ice">
                La tua presenza online,{" "}
                <span className="bg-gradient-to-r from-accent-bright via-accent to-accent-deep bg-clip-text text-transparent">
                  potenziata dall&apos;AI.
                </span>
              </h1>

              <p className="mt-6 font-body text-lg leading-relaxed text-text-secondary">
                Oggi le aziende sanno che devono essere presenti sui social, ma
                spesso non hanno il tempo, le competenze o il budget per farlo
                bene. Noi risolviamo esattamente questo problema. Usiamo
                l&apos;intelligenza artificiale per creare contenuti digitali su
                misura — testi, immagini, video, caroselli — e per gestire i
                profili social in modo strategico.
              </p>

              {/* Value proposition */}
              <div className="mt-8 rounded-xl border border-subtle bg-bg-purple-light/50 p-5">
                <p className="font-body text-sm font-medium text-accent-bright">
                  Il risultato
                </p>
                <p className="mt-2 font-body text-base leading-relaxed text-text-secondary">
                  L&apos;AI ci permette di lavorare più velocemente, analizzare
                  le performance in tempo reale e adattare la strategia in base
                  ai dati concreti. I nostri clienti risparmiano tempo e risorse,
                  mantenendo una presenza online costante, professionale e che
                  porta risultati misurabili.
                </p>
              </div>

              {/* Features grid */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-subtle bg-accent/[0.08]">
                      <feature.icon className="h-5 w-5 text-accent-bright" />
                    </div>
                    <div>
                      <h3 className="font-body text-sm font-semibold text-ice">
                        {feature.title}
                      </h3>
                      <p className="mt-1 font-body text-sm leading-relaxed text-text-muted">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Image placeholder */}
            <div className="relative hidden lg:block">
              <div className="sticky top-32 aspect-[4/5] w-full rounded-2xl border border-subtle bg-bg-purple-light/30 backdrop-blur-sm">
                {/* Decorative glow */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/[0.08] via-transparent to-accent-deep/[0.06]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-body text-sm text-text-muted">
                    Immagine in arrivo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
