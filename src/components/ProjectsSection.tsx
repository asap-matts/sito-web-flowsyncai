"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const projects = [
  { name: "HR", slug: "hr" },
  { name: "MARKETING AI", slug: "marketing-ai" },
  { name: "OUTRICH", slug: "outrich" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: i * 0.12 },
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
            <span className="bg-gradient-to-r from-accent-bright to-accent bg-clip-text text-transparent">
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
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group relative flex items-center justify-center rounded-2xl border border-subtle bg-bg-purple-light/50 p-10 aspect-[4/3] backdrop-blur-sm transition-all duration-500 hover:border-accent/20 hover:bg-bg-purple-light/80 hover:shadow-[0_0_40px_rgba(94,88,213,0.08)] cursor-pointer"
              >
                <h3 className="font-display text-2xl md:text-3xl font-bold text-ice text-center">
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
