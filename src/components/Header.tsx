"use client";

import { motion } from "framer-motion";

const navItems = [
  { label: "Servizi", href: "#services" },
  { label: "Progetti", href: "#projects" },
  { label: "Chi Siamo", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Appuntamenti", href: "#booking" },
  { label: "Contatti", href: "#contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const headerVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.4,
      ease,
      staggerChildren: 0.12,
      delayChildren: 0.5,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease,
    },
  },
};

export default function Header() {
  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-40 w-full px-4 sm:px-6 pt-5"
    >
      <nav
        className="mx-auto max-w-6xl rounded-2xl border border-subtle bg-nav/70 px-6 py-3 backdrop-blur-2xl"
        style={{ boxShadow: "var(--nav-shadow)" }}
      >
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            variants={childVariants}
            className="font-display text-xl font-bold tracking-tight text-ice select-none"
          >
            FlowSync{" "}
            <span className="bg-gradient-to-r from-accent to-accent-bright bg-clip-text text-transparent">
              AI
            </span>
          </motion.a>

          {/* Navigation Links — centered */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                variants={childVariants}
                whileHover={{
                  scale: 1.05,
                  textShadow:
                    "0 0 8px rgba(94,88,213,0.8), 0 0 20px rgba(94,88,213,0.4)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 22,
                }}
                className="inline-block whitespace-nowrap rounded-lg px-3 py-2 font-body text-[length:var(--fs-text)] font-medium text-ice/60 transition-colors duration-300 hover:text-ice"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            variants={childVariants}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className="block h-0.5 w-5 rounded-full bg-ice/70" />
            <span className="block h-0.5 w-5 rounded-full bg-ice/70" />
            <span className="block h-0.5 w-3.5 rounded-full bg-ice/70" />
          </motion.button>
        </div>
      </nav>
    </motion.header>
  );
}
