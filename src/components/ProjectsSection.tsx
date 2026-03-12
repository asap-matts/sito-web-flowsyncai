"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const projects = [
  { name: "HR", slug: "hr" },
  { name: "MARKETING AI", slug: "marketing-ai" },
  { name: "OUTREACH", slug: "outreach" },
];

/* Animation order: Marketing AI (1) → HR (0) → Outreach (2) */
const entryDelays: Record<number, number> = { 1: 0, 0: 0.22, 2: 0.44 };

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.96,
    filter: "blur(6px)",
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease,
      delay: entryDelays[i] ?? i * 0.22,
    },
  }),
};

const shimmerVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: (i: number) => ({
    x: "200%",
    opacity: [0, 0.5, 0],
    transition: {
      duration: 1.2,
      ease: "easeInOut" as const,
      delay: (entryDelays[i] ?? i * 0.22) + 0.4,
    },
  }),
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-blend relative py-28">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/[0.04] blur-[120px]" />

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
            I nostri progetti
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold leading-tight text-ice">
            Progetti che fanno
            <br />
            <span className="font-accent italic pr-1 bg-gradient-to-r from-accent-bright to-accent bg-clip-text text-transparent">
              la differenza
            </span>
          </h2>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { duration: 0.4, ease },
              }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="neon-card group relative flex items-center justify-center overflow-hidden rounded-2xl border bg-bg-purple-light/50 p-10 aspect-[4/3] backdrop-blur-sm hover:bg-bg-purple-light/80 cursor-pointer"
              >
                {/* Shimmer sweep on entrance */}
                <motion.div
                  custom={i}
                  variants={shimmerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent/[0.08] to-transparent"
                />

                {/* Hover neon border glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 shadow-[inset_0_0_30px_rgba(94,88,213,0.1),0_0_20px_rgba(94,88,213,0.08)]" />

                <h3 className="relative z-10 font-display text-2xl md:text-3xl font-bold text-ice text-center transition-all duration-500 group-hover:text-accent-bright group-hover:drop-shadow-[0_0_12px_rgba(126,122,224,0.4)]">
                  {project.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
