import Link from "next/link";
import { ArrowLeft, Zap, Users, Brain, Rocket } from "lucide-react";
import NetworkParticles from "@/components/NetworkParticles";

const features = [
  {
    icon: Zap,
    title: "Automazione end-to-end",
    description:
      "Job description, screening CV, qualificazione candidati: tutto ciò che è ripetitivo lo fa l'AI.",
  },
  {
    icon: Users,
    title: "Un unico workspace condiviso",
    description:
      "Niente più dati sparsi tra email, fogli Excel e tool frammentati.",
  },
  {
    icon: Brain,
    title: "AI che raccomanda, l'uomo che decide",
    description:
      "L'intelligenza artificiale accelera ogni fase, ma la decisione finale resta sempre umana.",
  },
  {
    icon: Rocket,
    title: "Adozione immediata",
    description:
      "Semplice da usare, automation-first, progettato per chi deve assumere, non per chi vuole configurare software.",
  },
];

export default function HRProjectPage() {
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
                Recruiting AI
              </span>

              <h1 className="mt-6 font-display text-4xl md:text-5xl font-bold leading-[1.1] text-ice">
                Un sistema operativo per il recruiting,{" "}
                <span className="bg-gradient-to-r from-accent-bright via-accent to-accent-deep bg-clip-text text-transparent">
                  non l&apos;ennesimo ATS.
                </span>
              </h1>

              <p className="mt-6 font-body text-lg leading-relaxed text-text-secondary">
                Piattaforma SaaS multi-tenant che automatizza l&apos;intero ciclo di
                selezione del personale — dalla creazione dell&apos;annuncio allo
                screening dei CV, dalla qualificazione dei candidati al supporto
                decisionale — con pipeline potenziate dall&apos;intelligenza artificiale.
              </p>

              {/* Target */}
              <div className="neon-card mt-8 rounded-xl border bg-bg-purple-light/50 p-5">
                <p className="font-body text-sm font-medium text-accent-bright">
                  A chi si rivolge
                </p>
                <p className="mt-2 font-body text-base leading-relaxed text-text-secondary">
                  Aziende che gestiscono assunzioni ad alto volume e alto turnover,
                  dove il recruiting tradizionale è troppo lento, troppo costoso e
                  troppo inconsistente.
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

            {/* Right — Network particle animation */}
            <div className="relative hidden lg:block">
              <div className="sticky top-32 aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <NetworkParticles />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
