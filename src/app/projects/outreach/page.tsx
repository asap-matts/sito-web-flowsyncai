"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Target, BarChart3, Repeat } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: Mail,
    title: "Outreach automatizzato",
    description:
      "Sequenze email e messaggi personalizzati generati dall'AI, inviati al momento giusto per massimizzare le risposte.",
  },
  {
    icon: Target,
    title: "Targeting intelligente",
    description:
      "Identifichiamo i prospect ideali analizzando dati e comportamenti, per contattare solo chi è realmente in target.",
  },
  {
    icon: BarChart3,
    title: "Performance in tempo reale",
    description:
      "Dashboard con metriche chiave: open rate, reply rate, conversioni. Ogni campagna è monitorata e ottimizzata.",
  },
  {
    icon: Repeat,
    title: "Iterazione continua",
    description:
      "L'AI analizza i risultati e adatta messaggi, tempistiche e segmenti per migliorare le performance ad ogni ciclo.",
  },
];

/* ---------- Animated chart (preview) ---------- */
const ease = [0.22, 1, 0.36, 1] as const;

const barData = [
  { label: "Sett 1", value: 32, from: "#6d28d9", to: "#8b5cf6" },
  { label: "Sett 2", value: 48, from: "#7c3aed", to: "#a78bfa" },
  { label: "Sett 3", value: 61, from: "#8b5cf6", to: "#a78bfa" },
  { label: "Sett 4", value: 55, from: "#7c3aed", to: "#8b5cf6" },
  { label: "Sett 5", value: 74, from: "#a78bfa", to: "#c4b5fd" },
  { label: "Sett 6", value: 89, from: "#a78bfa", to: "#ddd6fe" },
];

const stats = [
  { value: "2.4k", label: "Email inviate" },
  { value: "68%", label: "Open rate" },
  { value: "34%", label: "Reply rate" },
];

function OutreachChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, { once: true, margin: "-100px" });

  /* SVG dimensions */
  const W = 440;
  const H = 260;
  const padX = 40;
  const padTop = 20;
  const padBottom = 48;
  const chartW = W - padX * 2;
  const chartH = H - padTop - padBottom;

  const max = Math.max(...barData.map((d) => d.value));
  const min = Math.min(...barData.map((d) => d.value));
  const range = max - min || 1;

  /* Compute point positions */
  const points = barData.map((d, i) => ({
    x: padX + (i / (barData.length - 1)) * chartW,
    y: padTop + chartH - ((d.value - min) / range) * chartH,
    value: d.value,
    label: d.label,
  }));

  /* Build polyline string */
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  /* Build area path (fill under the line) */
  const areaPath = [
    `M ${points[0].x},${padTop + chartH}`,
    `L ${points[0].x},${points[0].y}`,
    ...points.slice(1).map((p) => `L ${p.x},${p.y}`),
    `L ${points[points.length - 1].x},${padTop + chartH}`,
    "Z",
  ].join(" ");

  /* Total polyline length for stroke-dasharray animation */
  let totalLen = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    totalLen += Math.sqrt(dx * dx + dy * dy);
  }

  /* Horizontal grid lines */
  const gridLines = 4;
  const gridYs = Array.from({ length: gridLines + 1 }, (_, i) => ({
    y: padTop + (i / gridLines) * chartH,
    val: Math.round(max - (i / gridLines) * range),
  }));

  return (
    <div
      ref={chartRef}
      className="neon-card relative flex h-full flex-col rounded-2xl border bg-bg-purple-light/30 p-6 backdrop-blur-sm"
    >
      {/* Decorative glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/[0.08] via-transparent to-accent-deep/[0.06] pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease }}
        className="relative mb-4"
      >
        <p className="font-body text-sm font-medium text-accent-bright">
          Reply Rate campagne outreach
        </p>
        <p className="mt-1 font-display text-2xl font-bold text-ice">
          +178%{" "}
          <span className="font-body text-sm font-normal text-emerald-400">
            in 6 settimane
          </span>
        </p>
      </motion.div>

      {/* Line chart SVG */}
      <div className="relative flex-1" style={{ minHeight: 280 }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradient for the area fill */}
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
            </linearGradient>
            {/* Gradient for the line */}
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#c4b5fd" />
            </linearGradient>
            {/* Glow filter for the line */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {gridYs.map((g) => (
            <g key={g.y}>
              <line
                x1={padX}
                y1={g.y}
                x2={W - padX}
                y2={g.y}
                stroke="#6b7394"
                strokeOpacity="0.15"
                strokeDasharray="4 4"
              />
              <text
                x={padX - 8}
                y={g.y + 4}
                textAnchor="end"
                className="fill-text-muted"
                style={{ fontSize: 10, fontFamily: "inherit" }}
              >
                {g.val}%
              </text>
            </g>
          ))}

          {/* Week labels on X axis */}
          {points.map((p) => (
            <text
              key={p.label}
              x={p.x}
              y={H - 6}
              textAnchor="middle"
              className="fill-text-muted"
              style={{ fontSize: 10, fontFamily: "inherit" }}
            >
              {p.label}
            </text>
          ))}

          {/* Area fill under line */}
          <motion.path
            d={areaPath}
            fill="url(#areaGrad)"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8, ease }}
          />

          {/* Animated line */}
          <motion.polyline
            points={polyline}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            initial={{ strokeDasharray: totalLen, strokeDashoffset: totalLen }}
            animate={
              isInView
                ? { strokeDashoffset: 0 }
                : { strokeDashoffset: totalLen }
            }
            transition={{ duration: 1.5, delay: 0.2, ease }}
          />

          {/* Data points (dots) */}
          {points.map((p, i) => (
            <motion.circle
              key={p.label}
              cx={p.x}
              cy={p.y}
              r="5"
              fill="#0d0520"
              stroke="#a78bfa"
              strokeWidth="2.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.15, ease }}
            />
          ))}

          {/* Value labels below week labels */}
          {points.map((p, i) => (
            <motion.text
              key={`val-${p.label}`}
              x={p.x}
              y={H - 6 + 14}
              textAnchor="middle"
              className="fill-accent-bright"
              style={{ fontSize: 11, fontWeight: 600, fontFamily: "inherit" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.15, ease }}
            >
              {p.value}%
            </motion.text>
          ))}
        </svg>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.4, ease }}
        className="neon-card relative mt-6 grid grid-cols-3 gap-4 rounded-xl border bg-bg-purple-light/40 p-4"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-lg font-bold text-ice">
              {stat.value}
            </p>
            <p className="font-body text-[10px] text-text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function OutreachProjectPage() {
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

          {/* Hero split: text left, chart right */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — Text content */}
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.08] px-4 py-1.5 font-body text-sm text-accent-bright">
                Outreach AI
              </span>

              <h1 className="mt-6 font-display text-4xl md:text-5xl font-bold leading-[1.1] text-ice">
                Raggiungi i clienti giusti,{" "}
                <span className="bg-gradient-to-r from-accent-bright via-accent to-accent-deep bg-clip-text text-transparent">
                  al momento giusto.
                </span>
              </h1>

              <p className="mt-6 font-body text-lg leading-relaxed text-text-secondary">
                Automatizziamo le campagne di outreach con l&apos;intelligenza
                artificiale. Dall&apos;identificazione dei prospect alla
                personalizzazione dei messaggi, ogni passaggio è ottimizzato per
                generare risposte reali e opportunità concrete.
              </p>

              {/* Value proposition */}
              <div className="neon-card mt-8 rounded-xl border bg-bg-purple-light/50 p-5">
                <p className="font-body text-sm font-medium text-accent-bright">
                  A chi si rivolge
                </p>
                <p className="mt-2 font-body text-base leading-relaxed text-text-secondary">
                  Aziende e professionisti che vogliono generare lead qualificati
                  in modo sistematico, senza perdere ore in attività manuali
                  ripetitive.
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

            {/* Right — Chart */}
            <div className="relative hidden lg:block">
              <div className="sticky top-32 aspect-[4/5] w-full">
                <OutreachChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
