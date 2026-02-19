"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function SunMoonIllustration({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, ease }}
      className={className}
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Glow filters */}
          <filter id="sun-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="moon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="ray-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>

          {/* Sun gradient */}
          <radialGradient id="sun-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="80%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>

          {/* Sun corona gradient */}
          <radialGradient id="corona-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>

          {/* Moon gradient */}
          <radialGradient id="moon-gradient" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </radialGradient>

          {/* Moon inner shadow for craters */}
          <radialGradient id="crater-1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
          </radialGradient>

          {/* Background star field gradient */}
          <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#030712" stopOpacity="0" />
          </radialGradient>

          {/* Clip for moon crescent effect */}
          <clipPath id="moon-clip">
            <circle cx="270" cy="160" r="62" />
          </clipPath>
        </defs>

        {/* Subtle background glow */}
        <circle cx="200" cy="200" r="190" fill="url(#bg-glow)" />

        {/* Sun rays (animated) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "160px 230px" }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const innerR = 95;
            const outerR = i % 2 === 0 ? 135 : 115;
            const x1 = 160 + Math.cos(angle) * innerR;
            const y1 = 230 + Math.sin(angle) * innerR;
            const x2 = 160 + Math.cos(angle) * outerR;
            const y2 = 230 + Math.sin(angle) * outerR;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#fbbf24"
                strokeOpacity={i % 2 === 0 ? 0.5 : 0.25}
                strokeWidth={i % 2 === 0 ? 2.5 : 1.5}
                strokeLinecap="round"
                filter="url(#ray-glow)"
              />
            );
          })}
        </motion.g>

        {/* Sun corona */}
        <circle cx="160" cy="230" r="110" fill="url(#corona-gradient)" filter="url(#sun-glow)" />

        {/* Sun body */}
        <motion.circle
          cx="160"
          cy="230"
          r="75"
          fill="url(#sun-gradient)"
          filter="url(#sun-glow)"
          animate={{
            r: [75, 77, 75],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Sun surface details */}
        <circle cx="140" cy="215" r="12" fill="#fcd34d" fillOpacity="0.3" />
        <circle cx="175" cy="245" r="8" fill="#fcd34d" fillOpacity="0.2" />
        <circle cx="150" cy="250" r="6" fill="#fcd34d" fillOpacity="0.25" />

        {/* Moon body */}
        <motion.circle
          cx="270"
          cy="160"
          r="62"
          fill="url(#moon-gradient)"
          filter="url(#moon-glow)"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease, delay: 0.3 }}
        />

        {/* Moon crescent shadow (overlapping circle to create crescent) */}
        <motion.circle
          cx="295"
          cy="145"
          r="52"
          fill="#0a1628"
          fillOpacity="0.7"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease, delay: 0.5 }}
        />

        {/* Moon craters */}
        <g clipPath="url(#moon-clip)">
          <circle cx="250" cy="150" r="8" fill="url(#crater-1)" />
          <circle cx="265" cy="180" r="5" fill="url(#crater-1)" />
          <circle cx="240" cy="170" r="4" fill="url(#crater-1)" />
          <circle cx="258" cy="140" r="3" fill="url(#crater-1)" />
        </g>

        {/* Stars scattered around */}
        {[
          { cx: 50, cy: 60, r: 1.5, delay: 0 },
          { cx: 340, cy: 50, r: 1, delay: 0.5 },
          { cx: 370, cy: 280, r: 1.5, delay: 1 },
          { cx: 30, cy: 320, r: 1, delay: 1.5 },
          { cx: 90, cy: 100, r: 1, delay: 0.8 },
          { cx: 320, cy: 340, r: 1.2, delay: 0.3 },
          { cx: 350, cy: 110, r: 0.8, delay: 1.2 },
          { cx: 70, cy: 380, r: 1.1, delay: 0.6 },
          { cx: 180, cy: 50, r: 0.9, delay: 1.8 },
          { cx: 310, cy: 380, r: 1, delay: 0.9 },
        ].map((star, i) => (
          <motion.circle
            key={i}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill="#e2e8f0"
            animate={{
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Connecting arc between sun and moon (subtle) */}
        <motion.path
          d="M 220 195 Q 240 200 250 175"
          stroke="url(#corona-gradient)"
          strokeWidth="1"
          fill="none"
          strokeOpacity="0.4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease, delay: 0.8 }}
        />
      </svg>
    </motion.div>
  );
}
