"use client";

export default function Footer() {
  return (
    <footer className="border-t border-subtle py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        {/* Logo */}
        <a
          href="/"
          className="font-display text-lg font-bold tracking-tight text-ice select-none"
        >
          FlowSync{" "}
          <span className="bg-gradient-to-r from-accent to-accent-bright bg-clip-text text-transparent">
            AI
          </span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href="#services"
            className="font-body text-sm text-text-muted transition-colors duration-300 hover:text-ice"
          >
            Servizi
          </a>
          <a
            href="#about"
            className="font-body text-sm text-text-muted transition-colors duration-300 hover:text-ice"
          >
            Chi Siamo
          </a>
          <a
            href="#contact"
            className="font-body text-sm text-text-muted transition-colors duration-300 hover:text-ice"
          >
            Contatti
          </a>
        </div>

        {/* Copyright */}
        <p className="font-body text-sm text-text-muted">
          &copy; {new Date().getFullYear()} FlowSync AI
        </p>
      </div>
    </footer>
  );
}
