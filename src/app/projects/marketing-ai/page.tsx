import Link from "next/link";
import { ArrowLeft, PenTool, Share2, BarChart3, TrendingUp } from "lucide-react";
import MarketingAurora from "@/components/MarketingAurora";

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
      {/* Full-page aurora background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <MarketingAurora />
      </div>

      <div className="relative z-10 min-h-screen py-28">
        <div className="mx-auto max-w-3xl px-6">
          {/* Back link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-body text-sm text-text-secondary transition-colors hover:text-accent-bright"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna ai progetti
          </Link>

          {/* Hero — centered layout */}
          <div className="mt-12">
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
            <div
              className="neon-card card-animate mt-8 rounded-xl border bg-bg-purple-light/60 backdrop-blur-sm p-5"
              style={{ "--delay": "0.1s" } as React.CSSProperties}
            >
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
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className="neon-card card-animate flex gap-4 rounded-xl border bg-bg-purple-light/60 backdrop-blur-sm p-4"
                  style={{ "--delay": `${0.2 + i * 0.12}s` } as React.CSSProperties}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/[0.08]">
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
        </div>
      </div>
    </div>
  );
}
