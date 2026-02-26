import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MarketingAIProjectPage() {
  return (
    <div className="grain-overlay">
      <div className="relative min-h-screen py-28">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-body text-sm text-text-secondary transition-colors hover:text-accent-bright"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna ai progetti
          </Link>

          <h1 className="mt-8 font-display text-4xl md:text-5xl font-bold text-ice">
            MARKETING AI
          </h1>

          <p className="mt-6 font-body text-lg text-text-secondary">
            Contenuto in arrivo.
          </p>
        </div>
      </div>
    </div>
  );
}
