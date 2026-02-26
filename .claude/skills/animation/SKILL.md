---
name: ui-animations
description: Complete animation knowledge base for premium web products. Covers Framer Motion, GSAP, CSS Scroll-driven Animations, View Transitions API, Lottie, React Three Fiber, SVG animations, drag/gesture, text effects, micro-interactions, and reusable hooks. Activates when implementing animated components, motion effects, transitions, interactive UI elements, landing pages, 3D scenes, or any animation-related task.
---

# UI Animation — Complete Knowledge Base

Production-ready animation patterns for premium web products. Multi-library, framework-agnostic knowledge covering every major animation technique used in modern web development.

---

## Table of Contents

0. [Decision Framework](#0-decision-framework)
1. [Standards & Tokens](#1-standards--tokens)
2. [Framer Motion (Motion)](#2-framer-motion-motion)
3. [GSAP (GreenSock)](#3-gsap-greensock)
4. [CSS Scroll-driven Animations](#4-css-scroll-driven-animations)
5. [View Transitions API](#5-view-transitions-api)
6. [SVG Animations](#6-svg-animations)
7. [Lottie / DotLottie](#7-lottie--dotlottie)
8. [React Three Fiber (3D)](#8-react-three-fiber-3d)
9. [Entrance & Exit Animations](#9-entrance--exit-animations)
10. [Scroll-Triggered Animations](#10-scroll-triggered-animations)
11. [Hover & Interaction Effects](#11-hover--interaction-effects)
12. [Page Transitions](#12-page-transitions)
13. [Text Effects](#13-text-effects)
14. [Drag & Gesture](#14-drag--gesture)
15. [Micro-interactions](#15-micro-interactions)
16. [Loading & Skeleton States](#16-loading--skeleton-states)
17. [Background Effects](#17-background-effects)
18. [Number & Counter Animations](#18-number--counter-animations)
19. [Reusable Hooks & Utilities](#19-reusable-hooks--utilities)
20. [Smooth Scroll](#20-smooth-scroll)
21. [External Libraries & Resources](#21-external-libraries--resources)
22. [Performance](#22-performance)
23. [Accessibility](#23-accessibility)
24. [Anti-Patterns](#24-anti-patterns)

---

## 0. Decision Framework

Choose the right tool for the job. Never default to one library for everything.

```
┌─────────────────────────────────────────────────────────────┐
│                    WHAT ARE YOU ANIMATING?                   │
└──────────────────────────┬──────────────────────────────────┘
                           │
    ┌──────────────────────┼──────────────────────────────┐
    │                      │                              │
    ▼                      ▼                              ▼
 UI Element           Scroll-linked                  Full Page
 (fade, scale,        (parallax, reveal,             (route change,
  hover, tap)          pin, scrub)                    tab switch)
    │                      │                              │
    ▼                      ▼                              ▼
 Framer Motion        Simple → CSS scroll()          View Transitions API
 or CSS               Complex → GSAP ScrollTrigger   or Framer Motion
                      Medium → Framer whileInView     AnimatePresence
    │
    │   ┌──────────────────────────────────────────────────┐
    │   │              SPECIAL CASES                       │
    │   ├──────────────────────────────────────────────────┤
    │   │ Complex timeline/sequence → GSAP                 │
    │   │ Designer animation (AE)  → Lottie / DotLottie   │
    │   │ 3D / WebGL               → React Three Fiber    │
    │   │ SVG path/morph           → GSAP or FM + SVG     │
    │   │ Number counting          → Custom hook           │
    │   │ Drag / reorder           → FM drag or dnd-kit    │
    │   │ Smooth scroll            → Lenis                 │
    │   │ Text splitting           → GSAP SplitText or FM  │
    │   └──────────────────────────────────────────────────┘
```

### Quick Decision Matrix

| Need | Best Choice | Alternative | Avoid |
|------|------------|-------------|-------|
| Fade/slide entrance | Framer Motion | CSS transition | GSAP (overkill) |
| Scroll-linked parallax | GSAP ScrollTrigger | CSS `scroll()` | FM (limited scrub) |
| Scroll reveal (once) | FM `whileInView` | CSS `view()` | GSAP (overkill) |
| Complex sequence | GSAP Timeline | — | FM (no timeline) |
| Page transition | View Transitions API | FM AnimatePresence | — |
| Hover micro-interaction | FM `whileHover` | CSS `:hover` | GSAP (overkill) |
| Spring physics | Framer Motion | — | CSS (no springs) |
| After Effects animation | Lottie / DotLottie | — | Manual recreation |
| 3D scene | React Three Fiber | Three.js vanilla | CSS 3D (limited) |
| SVG path drawing | FM + SVG | GSAP DrawSVG | CSS (limited) |
| Drag & reorder | FM `drag` / dnd-kit | GSAP Draggable | Manual impl |
| Counting numbers | Custom hook | FM `useSpring` | — |
| Layout animation | FM `layout` prop | GSAP FLIP | — |
| Text char-by-char | GSAP SplitText | FM + split logic | — |

---

## 1. Standards & Tokens

Shared constants across all animation work. Import or reference these everywhere.

```typescript
// ── Easing ──────────────────────────────────────────────
// Premium cubic-bezier (use as default everywhere)
const premiumEase = [0.16, 1, 0.3, 1] as const
// CSS equivalent
// cubic-bezier(0.16, 1, 0.3, 1)

// Named easings
const ease = {
  default:   [0.16, 1, 0.3, 1],   // Smooth deceleration
  snappy:    [0.76, 0, 0.24, 1],   // Quick snap
  gentle:    [0.25, 0.1, 0.25, 1], // Soft ease
  bounce:    [0.34, 1.56, 0.64, 1],// Overshoot
  linear:    [0, 0, 1, 1],         // Linear (scroll-linked)
} as const

// GSAP equivalents
// "power3.out" ≈ premiumEase
// "power2.inOut" ≈ snappy
// "back.out(1.7)" ≈ bounce

// ── Durations (seconds) ─────────────────────────────────
const duration = {
  instant:   0.1,   // Micro-feedback (tap, toggle)
  fast:      0.2,   // Hover states, small transitions
  normal:    0.3,   // Standard UI transitions
  slow:      0.5,   // Entrance animations
  dramatic:  0.8,   // Hero reveals, modals
  cinematic: 1.2,   // Landing page hero sequences
} as const

// ── Stagger Delays (seconds) ────────────────────────────
const stagger = {
  tight:     0.02,  // Dense lists (>20 items)
  fast:      0.04,  // Standard lists
  normal:    0.06,  // Cards, grid items
  slow:      0.1,   // Feature sections
  dramatic:  0.15,  // Hero elements
} as const

// ── Spring Presets ──────────────────────────────────────
const spring = {
  snappy:  { type: "spring", stiffness: 500, damping: 30 },
  bouncy:  { type: "spring", stiffness: 300, damping: 15 },
  gentle:  { type: "spring", stiffness: 150, damping: 20 },
  stiff:   { type: "spring", stiffness: 700, damping: 40 },
  molasses:{ type: "spring", stiffness: 100, damping: 30 },
} as const

// ── Distance Tokens (pixels) ────────────────────────────
const distance = {
  subtle: 8,      // Small shifts
  normal: 20,     // Standard entrance offset
  large:  40,     // Dramatic entrance
  hero:   80,     // Hero section reveals
} as const
```

### CSS Custom Properties

```css
:root {
  /* Easing */
  --ease-premium: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-snappy: cubic-bezier(0.76, 0, 0.24, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Durations */
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-dramatic: 800ms;
}
```

---

## 2. Framer Motion (Motion)

React-first animation library. Best for declarative UI animations, spring physics, layout animations, and gestures.

**Package:** `motion` (v11+, formerly `framer-motion`)
**Import:** `import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react"`

### 2.1 Core Patterns

```typescript
// ── Basic animation ─────────────────────────────────────
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
>
  Content
</motion.div>

// ── Variants (choreographed animations) ─────────────────
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
}

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => (
    <motion.li key={i.id} variants={item}>{i.label}</motion.li>
  ))}
</motion.ul>

// ── Layout animation ────────────────────────────────────
// Animate between layouts automatically (reorder, resize, reflow)
<motion.div layout transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
  {expanded && <ExpandedContent />}
</motion.div>

// layout="position" → only animate position, not size
// layout="size" → only animate size, not position
// layout={true} → animate both

// ── Shared layout (layoutId) ────────────────────────────
// Seamlessly animate an element between two positions in the DOM
<motion.div layoutId={`card-${id}`}>
  <motion.h2 layoutId={`title-${id}`}>{title}</motion.h2>
</motion.div>

// In modal:
<motion.div layoutId={`card-${id}`} className="modal">
  <motion.h2 layoutId={`title-${id}`}>{title}</motion.h2>
  <p>{details}</p>
</motion.div>

// ── AnimatePresence (exit animations) ───────────────────
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      key="unique"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
// mode="wait" → old exits before new enters
// mode="sync" → both animate simultaneously
// mode="popLayout" → new enters immediately, old exits in background
```

### 2.2 Scroll Hooks

```typescript
import { useScroll, useTransform, useMotionValueEvent } from "motion/react"

// ── Page scroll progress ────────────────────────────────
const { scrollYProgress } = useScroll()
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

// ── Element-relative scroll ─────────────────────────────
const ref = useRef(null)
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"]
  // "start end" = element top hits viewport bottom
  // "end start" = element bottom hits viewport top
})

const y = useTransform(scrollYProgress, [0, 1], [100, -100])
const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

// ── React to scroll events ──────────────────────────────
useMotionValueEvent(scrollYProgress, "change", (latest) => {
  console.log("Scroll progress:", latest)
})
```

### 2.3 Spring Physics

```typescript
import { useSpring, useMotionValue } from "motion/react"

// ── Animated value with spring ──────────────────────────
const x = useMotionValue(0)
const smoothX = useSpring(x, { stiffness: 300, damping: 30 })

// Update x → smoothX follows with spring physics
x.set(100)

// ── Spring guide ────────────────────────────────────────
// stiffness: Higher = faster, snappier (100-1000)
// damping:   Higher = less oscillation (10-100)
// mass:      Higher = heavier, slower (0.1-10)
//
// Presets:
// Snappy button:   stiffness: 500, damping: 30
// Bouncy modal:    stiffness: 300, damping: 15
// Gentle float:    stiffness: 100, damping: 20
// Stiff snap:      stiffness: 700, damping: 40
```

---

## 3. GSAP (GreenSock)

The industry standard for complex, timeline-based, scroll-driven animations. Free for all uses (since Webflow acquisition 2024).

**Packages:** `gsap`, `@gsap/react`
**Install:** `npm install gsap @gsap/react`

### 3.1 Setup with React / Next.js

```typescript
"use client" // Required for App Router

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register plugins ONCE (outside component)
gsap.registerPlugin(ScrollTrigger)

function AnimatedSection() {
  const container = useRef<HTMLDivElement>(null)

  // useGSAP = drop-in replacement for useEffect
  // Automatically cleans up all animations on unmount
  useGSAP(() => {
    gsap.from(".card", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    })
  }, { scope: container }) // Scope selectors to this ref

  return (
    <div ref={container}>
      <div className="card">A</div>
      <div className="card">B</div>
      <div className="card">C</div>
    </div>
  )
}
```

### 3.2 Timeline (Sequenced Animations)

```typescript
useGSAP(() => {
  const tl = gsap.timeline({
    defaults: { duration: 0.6, ease: "power3.out" }
  })

  tl.from(".hero-title", { y: 80, opacity: 0 })
    .from(".hero-subtitle", { y: 40, opacity: 0 }, "-=0.3") // overlap 0.3s
    .from(".hero-cta", { scale: 0.9, opacity: 0 }, "-=0.2")
    .from(".hero-image", { x: 100, opacity: 0 }, "-=0.4")

  // Position parameter:
  // "-=0.3"  → 0.3s before previous ends (overlap)
  // "+=0.5"  → 0.5s after previous ends (gap)
  // 1.5      → absolute time 1.5s from start
  // "<"      → same start time as previous
  // "<0.2"   → 0.2s after previous starts
}, { scope: container })
```

### 3.3 ScrollTrigger

```typescript
useGSAP(() => {
  // ── Basic scroll reveal ───────────────────────────────
  gsap.from(".section", {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".section",
      start: "top 80%",    // trigger top hits 80% of viewport
      end: "top 20%",      // trigger top hits 20% of viewport
      toggleActions: "play none none none",
      // onEnter onLeave onEnterBack onLeaveBack
      // "play" "pause" "resume" "reset" "restart" "complete" "reverse" "none"
    }
  })

  // ── Scrub (animation linked to scroll position) ───────
  gsap.to(".parallax-element", {
    y: -200,
    ease: "none",
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,       // true = direct link to scroll
      // scrub: 0.5      // 0.5s smooth catch-up
    }
  })

  // ── Pin (lock element while scrolling) ────────────────
  gsap.to(".pinned-panel", {
    x: "-300%",
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-section",
      start: "top top",
      end: "+=3000",      // scroll distance in px
      pin: true,           // pin the trigger element
      scrub: 1,
      snap: 1 / 3,        // snap to each panel
    }
  })

  // ── Batch (animate groups on scroll) ──────────────────
  ScrollTrigger.batch(".grid-item", {
    onEnter: (elements) => {
      gsap.from(elements, {
        y: 40,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "power3.out",
      })
    },
    start: "top 85%",
  })
}, { scope: container })
```

### 3.4 SplitText (Typography Animations)

```typescript
import { SplitText } from "gsap/SplitText"
gsap.registerPlugin(SplitText)

useGSAP(() => {
  // Split into chars, words, or lines
  const split = new SplitText(".hero-heading", { type: "chars,words" })

  gsap.from(split.chars, {
    y: 40,
    opacity: 0,
    rotateX: -90,
    stagger: 0.02,
    duration: 0.6,
    ease: "back.out(1.7)",
  })

  // Revert split on cleanup (handled by useGSAP context)
}, { scope: container })
```

### 3.5 FLIP (First Last Invert Play)

```typescript
import { Flip } from "gsap/Flip"
gsap.registerPlugin(Flip)

function handleLayoutChange() {
  // 1. Capture current state
  const state = Flip.getState(".grid-item")

  // 2. Make DOM changes (reorder, reparent, toggle class)
  toggleFilter()

  // 3. Animate from old state to new state
  Flip.from(state, {
    duration: 0.6,
    ease: "power3.inOut",
    stagger: 0.04,
    absolute: true,      // use absolute positioning during animation
    onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 }),
    onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0.8 }),
  })
}
```

### 3.6 GSAP Easing Reference

```
// Common easing functions
"none"              // linear
"power1.out"        // subtle ease-out
"power2.out"        // moderate ease-out
"power3.out"        // strong ease-out (≈ premiumEase)
"power4.out"        // very strong ease-out
"back.out(1.7)"     // overshoot
"elastic.out(1,0.3)"// elastic bounce
"bounce.out"        // ball bounce
"expo.out"          // exponential
"circ.out"          // circular
"steps(5)"          // stepped

// Replace .out with .in or .inOut for variants
```

---

## 4. CSS Scroll-driven Animations

Native browser API for scroll-linked animations. Zero JavaScript. Excellent performance.

**Support:** Chrome 115+, Edge 115+, Safari 26+, Firefox 144+

### 4.1 Scroll Progress (scroll())

```css
/* Animate based on page scroll position */
.progress-bar {
  animation: grow-width linear;
  animation-timeline: scroll();       /* track nearest scroll ancestor */
  animation-range: 0% 100%;
}

@keyframes grow-width {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* Track a specific scroller */
.element {
  animation-timeline: scroll(nearest block);
  /* scroll(<scroller> <axis>) */
  /* scroller: nearest | root | self */
  /* axis: block | inline | x | y */
}
```

### 4.2 View Progress (view())

```css
/* Animate when element enters/exits viewport */
.reveal-on-scroll {
  animation: fade-slide-up linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
  /* entry = element entering viewport */
  /* exit = element leaving viewport */
  /* cover = full passage through viewport */
  /* contain = element fully within viewport */
}

@keyframes fade-slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apple-style parallax image */
.parallax-image {
  animation: parallax linear;
  animation-timeline: view();
  animation-range: cover 0% cover 100%;
}

@keyframes parallax {
  from { transform: translateY(-15%); }
  to   { transform: translateY(15%); }
}
```

### 4.3 Named Timelines

```css
/* Name a scroll timeline on a scroller */
.scroll-container {
  scroll-timeline-name: --my-scroller;
  scroll-timeline-axis: block;
  overflow-y: scroll;
}

/* Attach to any descendant */
.child-element {
  animation: slide-in linear;
  animation-timeline: --my-scroller;
}

/* Named view timeline */
.tracked-element {
  view-timeline-name: --hero;
  view-timeline-axis: block;
}

.other-element {
  animation: react-to-hero linear;
  animation-timeline: --hero;
  animation-range: contain 0% contain 100%;
}
```

### 4.4 Practical Examples

```css
/* ── Sticky header shrink ────────────────────────────────*/
.header {
  animation: shrink-header linear both;
  animation-timeline: scroll();
  animation-range: 0px 200px;
}

@keyframes shrink-header {
  from { padding-block: 2rem; font-size: 1.5rem; }
  to   { padding-block: 0.5rem; font-size: 1rem; }
}

/* ── Horizontal scroll section ───────────────────────────*/
.horizontal-track {
  animation: scroll-horizontal linear;
  animation-timeline: scroll(self inline);
}

@keyframes scroll-horizontal {
  from { transform: translateX(0); }
  to   { transform: translateX(-100%); }
}

/* ── Reveal cards with stagger (CSS only) ────────────────*/
.card:nth-child(1) { animation-range: entry 0% entry 80%; }
.card:nth-child(2) { animation-range: entry 10% entry 90%; }
.card:nth-child(3) { animation-range: entry 20% entry 100%; }
```

---

## 5. View Transitions API

Native browser API for animated transitions between DOM states or pages. Zero-library page transitions.

**Support:** Chrome 111+, Edge 111+, Safari 18+, Firefox 144+

### 5.1 Next.js Setup (15.2+)

```typescript
// next.config.ts
const config = {
  experimental: {
    viewTransition: true,
  },
}
export default config
```

### 5.2 Usage with React (Experimental)

```typescript
// React Canary — <ViewTransition> component
import { ViewTransition } from "react"

function App() {
  return (
    <ViewTransition>
      {showDetail ? <DetailView /> : <ListView />}
    </ViewTransition>
  )
}
```

### 5.3 Manual Usage (Vanilla / Non-React)

```typescript
// Single-page transition
document.startViewTransition(() => {
  // Update the DOM here
  updateContent()
})

// With async operations
document.startViewTransition(async () => {
  const data = await fetchNewPage()
  renderContent(data)
})
```

### 5.4 CSS Customization

```css
/* Default crossfade */
::view-transition-old(root) {
  animation: fade-out 0.3s var(--ease-premium);
}
::view-transition-new(root) {
  animation: fade-in 0.3s var(--ease-premium);
}

/* Named transitions for specific elements */
.hero-image {
  view-transition-name: hero;
}

::view-transition-old(hero) {
  animation: scale-out 0.4s var(--ease-premium);
}
::view-transition-new(hero) {
  animation: scale-in 0.4s var(--ease-premium);
}

/* Shared element transition (like layoutId) */
.card-title {
  view-transition-name: card-title;
}
/* Browser auto-morphs between old/new positions */

@keyframes fade-out { to { opacity: 0; } }
@keyframes fade-in { from { opacity: 0; } }
@keyframes scale-out { to { transform: scale(0.95); opacity: 0; } }
@keyframes scale-in { from { transform: scale(1.05); opacity: 0; } }
```

### 5.5 Cross-document Transitions (MPA)

```css
/* Enable on both pages */
@view-transition {
  navigation: auto;
}

/* Runs on old page before leaving */
::view-transition-old(root) {
  animation: slide-out 0.3s ease;
}

/* Runs on new page after loading */
::view-transition-new(root) {
  animation: slide-in 0.3s ease;
}
```

---

## 6. SVG Animations

Path drawing, morphing, and line animations using SVG + Framer Motion or GSAP.

### 6.1 Path Drawing (Framer Motion)

```typescript
// Draw an SVG path on scroll or on mount
<motion.svg viewBox="0 0 200 200" width={200} height={200}>
  <motion.path
    d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
  />
</motion.svg>

// Scroll-linked path drawing
function ScrollPath() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"]
  })

  return (
    <svg ref={ref} viewBox="0 0 500 500">
      <motion.path
        d="..."
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        style={{ pathLength: scrollYProgress }}
      />
    </svg>
  )
}
```

### 6.2 Path Drawing (GSAP)

```typescript
useGSAP(() => {
  gsap.fromTo(".draw-path",
    { strokeDashoffset: 1000, strokeDasharray: 1000 },
    {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".svg-container",
        start: "top center",
        end: "bottom center",
        scrub: true,
      }
    }
  )
}, { scope: container })
```

### 6.3 SVG Morphing (GSAP MorphSVG)

```typescript
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
gsap.registerPlugin(MorphSVGPlugin)

useGSAP(() => {
  gsap.to("#circle", {
    morphSVG: "#star",     // morph circle shape into star shape
    duration: 1,
    ease: "power2.inOut",
  })
}, { scope: container })
```

### 6.4 Animated SVG Icons

```typescript
// Hamburger → X morph
function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24">
      <motion.line
        x1={3} x2={21}
        animate={isOpen ? { y1: 12, y2: 12, rotate: 45 } : { y1: 6, y2: 6, rotate: 0 }}
        stroke="currentColor" strokeWidth={2}
        style={{ transformOrigin: "center" }}
      />
      <motion.line
        x1={3} y1={12} x2={21} y2={12}
        animate={{ opacity: isOpen ? 0 : 1 }}
        stroke="currentColor" strokeWidth={2}
      />
      <motion.line
        x1={3} x2={21}
        animate={isOpen ? { y1: 12, y2: 12, rotate: -45 } : { y1: 18, y2: 18, rotate: 0 }}
        stroke="currentColor" strokeWidth={2}
        style={{ transformOrigin: "center" }}
      />
    </svg>
  )
}
```

### 6.5 Animated Checkmark

```typescript
<motion.svg viewBox="0 0 24 24" width={24} height={24}>
  <motion.path
    d="M5 12l5 5L20 7"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: checked ? 1 : 0 }}
    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
  />
</motion.svg>
```

---

## 7. Lottie / DotLottie

Designer-created animations (After Effects → Lottie) rendered natively in the browser. WASM-powered, tiny bundle.

**Package:** `@lottiefiles/dotlottie-react`
**Install:** `npm install @lottiefiles/dotlottie-react`

### 7.1 Basic Usage

```typescript
"use client"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

function SuccessAnimation() {
  return (
    <DotLottieReact
      src="/animations/success.lottie"  // or .json
      loop={false}
      autoplay
      style={{ width: 200, height: 200 }}
    />
  )
}
```

### 7.2 Playback Control

```typescript
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import type { DotLottie } from "@lottiefiles/dotlottie-web"

function ControlledAnimation() {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null)

  const dotLottieRefCallback = (ref: DotLottie) => {
    setDotLottie(ref)
  }

  return (
    <>
      <DotLottieReact
        src="/animations/interactive.lottie"
        dotLottieRefCallback={dotLottieRefCallback}
        autoplay={false}
      />
      <button onClick={() => dotLottie?.play()}>Play</button>
      <button onClick={() => dotLottie?.pause()}>Pause</button>
      <button onClick={() => dotLottie?.stop()}>Stop</button>
      <button onClick={() => dotLottie?.setFrame(30)}>Seek</button>
    </>
  )
}
```

### 7.3 Event Handling

```typescript
useEffect(() => {
  if (!dotLottie) return

  const onComplete = () => console.log("Animation finished")
  const onFrame = ({ currentFrame }) => console.log("Frame:", currentFrame)

  dotLottie.addEventListener("complete", onComplete)
  dotLottie.addEventListener("frame", onFrame)

  return () => {
    dotLottie.removeEventListener("complete", onComplete)
    dotLottie.removeEventListener("frame", onFrame)
  }
}, [dotLottie])
```

### 7.4 When to Use Lottie

- Complex character/icon animations designed in After Effects
- Onboarding illustrations, success/error states
- Loading animations with brand personality
- Animated logos and brand marks
- Any animation where a designer provides a `.json` or `.lottie` file

**Performance notes:**
- `.lottie` format is ~80% smaller than raw JSON
- dotlottie-react uses WASM renderer (less CPU/memory than JS renderers)
- Prefer `.lottie` over `.json` in production

---

## 8. React Three Fiber (3D)

React renderer for Three.js. Declarative 3D scenes in React components.

**Packages:** `@react-three/fiber`, `@react-three/drei`, `three`
**Install:** `npm install @react-three/fiber @react-three/drei three`

### 8.1 Basic Scene

```typescript
"use client"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Text3D, Environment } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

function RotatingBox() {
  const meshRef = useRef<THREE.Mesh>(null)

  // useFrame runs every frame (~60fps)
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8b5cf6" />
    </mesh>
  )
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <RotatingBox />
      <OrbitControls enableZoom={false} />
      <Environment preset="city" />
    </Canvas>
  )
}
```

### 8.2 Scroll-linked 3D

```typescript
import { useScroll } from "motion/react"
import { useFrame } from "@react-three/fiber"

function ScrollLinkedObject() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { scrollYProgress } = useScroll()

  useFrame(() => {
    if (meshRef.current) {
      const progress = scrollYProgress.get()
      meshRef.current.rotation.y = progress * Math.PI * 2
      meshRef.current.position.y = (1 - progress) * 3
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshNormalMaterial />
    </mesh>
  )
}
```

### 8.3 Floating Elements (drei)

```typescript
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei"

// Float = gentle hover animation
<Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
  <Sphere args={[1, 64, 64]}>
    <MeshDistortMaterial
      color="#4f46e5"
      distort={0.3}     // distortion amount
      speed={1.5}       // distortion speed
      roughness={0.2}
    />
  </Sphere>
</Float>
```

### 8.4 Ecosystem

| Package | Purpose |
|---------|---------|
| `@react-three/drei` | Helpers: OrbitControls, Float, Text3D, Sky, Stars, Environment |
| `@react-three/postprocessing` | Bloom, DOF, ChromaticAberration, Vignette |
| `@react-three/rapier` | 3D physics (gravity, collisions) |
| `@react-three/gltfjsx` | Convert GLTF/GLB → React components |

---

## 9. Entrance & Exit Animations

### 9.1 Fade In

```typescript
// Framer Motion
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
}
```

### 9.2 Slide Up

```typescript
const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
}
```

### 9.3 Blur Fade (Premium)

```typescript
const blurFade = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(5px)" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
}
// Performance: 🟡 uses filter, avoid on many elements
```

### 9.4 Scale In

```typescript
const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
}
```

### 9.5 Slide From Direction

```typescript
const slideFrom = (direction: "left" | "right" | "top" | "bottom", distance = 40) => {
  const axis = direction === "left" || direction === "right" ? "x" : "y"
  const value = direction === "left" || direction === "top" ? -distance : distance
  return {
    initial: { opacity: 0, [axis]: value },
    animate: { opacity: 1, [axis]: 0 },
    exit: { opacity: 0, [axis]: value / 2 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
}
```

### 9.6 Staggered Children

```typescript
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.03, staggerDirection: -1 }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10 }
}
```

### 9.7 GSAP Equivalents

```typescript
// Staggered entrance with GSAP
gsap.from(".item", {
  y: 40,
  opacity: 0,
  duration: 0.6,
  stagger: 0.06,
  ease: "power3.out",
})

// Timeline entrance sequence
const tl = gsap.timeline()
tl.from(".title", { y: 60, opacity: 0, duration: 0.6 })
  .from(".body", { y: 30, opacity: 0, duration: 0.5 }, "-=0.3")
  .from(".cta", { scale: 0.9, opacity: 0, duration: 0.4 }, "-=0.2")
```

---

## 10. Scroll-Triggered Animations

### 10.1 Scroll Reveal (FM — whileInView)

```typescript
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
  Content
</motion.div>
```

### 10.2 Parallax (FM)

```typescript
function Parallax({ children, speed = 0.5 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200])

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}
```

### 10.3 Cinematic Zoom Out (FM)

```typescript
function CinematicReveal({ children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [1.6, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1])

  return (
    <motion.div ref={ref} style={{ scale, opacity }}>
      {children}
    </motion.div>
  )
}
```

### 10.4 Progress Indicator (FM)

```typescript
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
```

### 10.5 Horizontal Scroll Section (GSAP)

```typescript
useGSAP(() => {
  const sections = gsap.utils.toArray<HTMLElement>(".panel")

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".horizontal-container",
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      end: () => "+=" + document.querySelector(".horizontal-container")!.scrollWidth,
    }
  })
}, { scope: container })
```

### 10.6 CSS-only Scroll Reveal

```css
.scroll-reveal {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## 11. Hover & Interaction Effects

### 11.1 Scale Hover

```typescript
<motion.div
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.2 }}
>
  Card
</motion.div>
```

### 11.2 Magnetic Button

```typescript
function MagneticButton({ children, strength = 0.3 }) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = ref.current!.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) * strength
    const y = (e.clientY - top - height / 2) * strength
    gsap.to(ref.current, { x, y, duration: 0.3, ease: "power2.out" })
  }

  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" })
  }

  return (
    <button ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </button>
  )
}
```

### 11.3 Glow Effect

```typescript
<motion.button className="relative" whileHover="hover">
  <motion.div
    className="absolute inset-0 bg-primary/20 blur-xl rounded-full"
    variants={{ hover: { opacity: 1, scale: 1.5 } }}
    initial={{ opacity: 0, scale: 1 }}
    transition={{ duration: 0.3 }}
  />
  <span className="relative z-10">Button</span>
</motion.button>
```

### 11.4 Tilt Card (3D Perspective)

```typescript
function TiltCard({ children, intensity = 20 }) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = ref.current!.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5

    gsap.to(ref.current, {
      rotateX: y * -intensity,
      rotateY: x * intensity,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = () => {
    gsap.to(ref.current, {
      rotateX: 0, rotateY: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {children}
    </div>
  )
}
```

### 11.5 Border Trail (CSS)

```css
.border-trail {
  position: relative;
  overflow: hidden;
}
.border-trail::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  background: conic-gradient(
    from var(--angle, 0deg),
    transparent 70%,
    hsl(var(--primary)) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: rotate-border 3s linear infinite;
}
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes rotate-border {
  to { --angle: 360deg; }
}
```

### 11.6 Flip Card

```typescript
function FlipCard({ front, back }: { front: ReactNode; back: ReactNode }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="relative w-64 h-80 cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 backface-hidden">{front}</div>
        <div className="absolute inset-0 backface-hidden" style={{ transform: "rotateY(180deg)" }}>
          {back}
        </div>
      </motion.div>
    </div>
  )
}
```

---

## 12. Page Transitions

### 12.1 View Transitions API (Preferred — Native)

```typescript
// next.config.ts → experimental: { viewTransition: true }
// Then just use <Link> — Next.js handles it automatically
```

### 12.2 Crossfade (FM)

```typescript
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### 12.3 Slide Transition (FM)

```typescript
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0
  })
}

<AnimatePresence custom={direction} mode="wait">
  <motion.div
    key={activeTab}
    custom={direction}
    variants={slideVariants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
  >
    {content}
  </motion.div>
</AnimatePresence>
```

### 12.4 GSAP Page Transition (with Barba.js or manual)

```typescript
// Exit current page
async function pageExit() {
  await gsap.to(".page-content", {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: "power2.in",
  })
}

// Enter new page
function pageEnter() {
  gsap.from(".page-content", {
    opacity: 0,
    y: 20,
    duration: 0.4,
    ease: "power3.out",
  })
}

// IMPORTANT: Kill ScrollTriggers before route change
ScrollTrigger.getAll().forEach(st => st.kill())
```

---

## 13. Text Effects

### 13.1 Split Text Reveal (FM)

```typescript
function SplitTextReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ")

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.05, delayChildren: delay } }
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
```

### 13.2 Character-by-Character (GSAP SplitText)

```typescript
useGSAP(() => {
  const split = new SplitText(".animated-heading", { type: "chars,words,lines" })

  gsap.from(split.chars, {
    y: 40,
    opacity: 0,
    rotateX: -90,
    stagger: 0.02,
    duration: 0.6,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".animated-heading",
      start: "top 80%",
    }
  })
}, { scope: container })
```

### 13.3 Typewriter

```typescript
function Typewriter({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("")

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return <span>{displayed}<span className="animate-pulse">|</span></span>
}
```

### 13.4 Text Scramble

```typescript
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

function TextScramble({ text, duration = 1000 }: { text: string; duration?: number }) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    let frame = 0
    const totalFrames = duration / 16

    const animate = () => {
      frame++
      const progress = frame / totalFrames

      const scrambled = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " "
          if (i < text.length * progress) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join("")

      setDisplay(scrambled)
      if (frame < totalFrames) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [text, duration])

  return <span className="font-mono">{display}</span>
}
```

### 13.5 Gradient Text

```css
.animated-gradient-text {
  background: linear-gradient(
    90deg,
    hsl(var(--primary)),
    hsl(var(--secondary)),
    hsl(var(--primary))
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 3s linear infinite;
}

@keyframes gradient-shift {
  to { background-position: 200% center; }
}
```

### 13.6 Shimmer Text

```css
.shimmer-text {
  background: linear-gradient(
    110deg,
    currentColor 35%,
    rgba(255, 255, 255, 0.7) 50%,
    currentColor 65%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer-text 2s infinite;
}

@keyframes shimmer-text {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}
```

---

## 14. Drag & Gesture

### 14.1 Draggable Element (FM)

```typescript
<motion.div
  drag                       // enable both axes
  // drag="x"               // constrain to x-axis
  // drag="y"               // constrain to y-axis
  dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
  dragElastic={0.2}          // rubber-band effect at constraints
  dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
  whileDrag={{ scale: 1.05, cursor: "grabbing" }}
>
  Drag me
</motion.div>
```

### 14.2 Drag with Snap Back

```typescript
<motion.div
  drag
  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
  dragElastic={0.5}
  // Element snaps back to center on release
>
  Pull and release
</motion.div>
```

### 14.3 Swipe to Dismiss

```typescript
function SwipeToDismiss({ children, onDismiss }) {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 150) {
          onDismiss()
        }
      }}
      animate={{ x: 0 }}
    >
      {children}
    </motion.div>
  )
}
```

### 14.4 Drag Reorder (FM + Reorder)

```typescript
import { Reorder } from "motion/react"

function ReorderableList({ items, onReorder }) {
  return (
    <Reorder.Group axis="y" values={items} onReorder={onReorder}>
      {items.map(item => (
        <Reorder.Item
          key={item.id}
          value={item}
          whileDrag={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
        >
          {item.label}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
```

### 14.5 GSAP Draggable

```typescript
import { Draggable } from "gsap/Draggable"
gsap.registerPlugin(Draggable)

useGSAP(() => {
  Draggable.create(".draggable", {
    type: "x,y",
    bounds: ".container",
    inertia: true,         // momentum after release
    onDrag: function() {
      console.log("x:", this.x, "y:", this.y)
    },
    snap: {
      x: (val) => Math.round(val / 100) * 100,  // snap to grid
      y: (val) => Math.round(val / 100) * 100,
    }
  })
})
```

---

## 15. Micro-interactions

### 15.1 Button Press

```typescript
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.1 }}
>
  Click me
</motion.button>
```

### 15.2 Toggle Switch

```typescript
function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      className="w-12 h-6 rounded-full p-1 cursor-pointer"
      style={{ backgroundColor: enabled ? "var(--primary)" : "var(--muted)" }}
      onClick={onToggle}
    >
      <motion.div
        className="w-4 h-4 bg-white rounded-full"
        animate={{ x: enabled ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  )
}
```

### 15.3 Like/Heart Button

```typescript
function HeartButton() {
  const [liked, setLiked] = useState(false)

  return (
    <motion.button
      onClick={() => setLiked(!liked)}
      whileTap={{ scale: 0.85 }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        width={24}
        height={24}
        animate={liked ? {
          scale: [1, 1.3, 1],
          fill: "#ef4444",
        } : {
          scale: 1,
          fill: "none",
        }}
        transition={{ duration: 0.3 }}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </motion.svg>
    </motion.button>
  )
}
```

### 15.4 Tooltip

```typescript
function Tooltip({ children, content }: { children: ReactNode; content: string }) {
  const [show, setShow] = useState(false)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-foreground text-background text-sm rounded whitespace-nowrap"
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

### 15.5 Loading Dots

```typescript
function LoadingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-primary rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}
```

---

## 16. Loading & Skeleton States

### 16.1 Shimmer Skeleton

```css
.skeleton {
  background: linear-gradient(
    90deg,
    hsl(var(--muted)) 25%,
    hsl(var(--muted-foreground) / 0.1) 50%,
    hsl(var(--muted)) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 0.375rem;
}

@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}
```

### 16.2 Pulse Skeleton

```css
.skeleton-pulse {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
```

### 16.3 Progress Bar

```typescript
function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}
```

### 16.4 Spinner

```css
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid hsl(var(--muted));
  border-top-color: hsl(var(--primary));
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## 17. Background Effects

### 17.1 Aurora Background

```css
.aurora-bg {
  position: relative;
  overflow: hidden;
}

.aurora-bg::before,
.aurora-bg::after {
  content: "";
  position: absolute;
  inset: -50%;
  filter: blur(100px);
  opacity: 0.4;
  pointer-events: none;
}

.aurora-bg::before {
  background: radial-gradient(ellipse at 40% 50%, hsl(var(--primary) / 0.4), transparent 70%);
  animation: aurora 15s ease-in-out infinite;
}

.aurora-bg::after {
  background: radial-gradient(ellipse at 60% 50%, hsl(var(--secondary) / 0.3), transparent 70%);
  animation: aurora 20s ease-in-out infinite reverse;
}

@keyframes aurora {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(10%, 10%) scale(1.1); }
  66%      { transform: translate(-10%, 5%) scale(0.9); }
}
```

### 17.2 Animated Grid

```css
.animated-grid {
  background-image:
    linear-gradient(hsl(var(--border) / 0.3) 1px, transparent 1px),
    linear-gradient(90deg, hsl(var(--border) / 0.3) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  to { background-position: 60px 60px; }
}
```

### 17.3 Noise Texture Overlay

```css
.noise-overlay::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
}
```

### 17.4 Gradient Mesh

```css
.gradient-mesh {
  background:
    radial-gradient(at 20% 80%, hsl(var(--primary) / 0.3) 0, transparent 50%),
    radial-gradient(at 80% 20%, hsl(var(--secondary) / 0.3) 0, transparent 50%),
    radial-gradient(at 50% 50%, hsl(var(--accent) / 0.2) 0, transparent 50%);
  animation: mesh-shift 10s ease-in-out infinite alternate;
}

@keyframes mesh-shift {
  to {
    background:
      radial-gradient(at 80% 20%, hsl(var(--primary) / 0.3) 0, transparent 50%),
      radial-gradient(at 20% 80%, hsl(var(--secondary) / 0.3) 0, transparent 50%),
      radial-gradient(at 50% 50%, hsl(var(--accent) / 0.2) 0, transparent 50%);
  }
}
```

### 17.5 Dot Pattern

```css
.dot-pattern {
  background-image: radial-gradient(
    circle,
    hsl(var(--foreground) / 0.1) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
}
```

---

## 18. Number & Counter Animations

### 18.1 Count Up (FM useSpring)

```typescript
import { useSpring, useMotionValue, motion } from "motion/react"
import { useEffect } from "react"

function AnimatedCounter({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  })
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    motionValue.set(target)
  }, [target, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (v) => {
      setDisplay(Math.round(v).toLocaleString())
    })
    return unsubscribe
  }, [springValue])

  return <span>{display}</span>
}

// Usage: <AnimatedCounter target={12450} />
```

### 18.2 Count Up (GSAP)

```typescript
useGSAP(() => {
  const counter = { value: 0 }

  gsap.to(counter, {
    value: 12450,
    duration: 2,
    ease: "power2.out",
    onUpdate: () => {
      document.querySelector(".counter")!.textContent =
        Math.round(counter.value).toLocaleString()
    },
    scrollTrigger: {
      trigger: ".counter",
      start: "top 80%",
    }
  })
}, { scope: container })
```

### 18.3 Percentage with Ring

```typescript
function ProgressRing({ progress }: { progress: number }) {
  const circumference = 2 * Math.PI * 45 // radius = 45

  return (
    <svg width={100} height={100} viewBox="0 0 100 100">
      {/* Background circle */}
      <circle cx={50} cy={50} r={45} fill="none" stroke="var(--muted)" strokeWidth={6} />
      {/* Animated progress circle */}
      <motion.circle
        cx={50} cy={50} r={45}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: circumference * (1 - progress / 100) }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
      />
      <text x={50} y={55} textAnchor="middle" className="text-lg font-semibold fill-foreground">
        {progress}%
      </text>
    </svg>
  )
}
```

---

## 19. Reusable Hooks & Utilities

### 19.1 useAnimateOnMount

```typescript
import { useRef } from "react"
import { useInView } from "motion/react"

function useAnimateOnMount(options?: { once?: boolean; margin?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin ?? "-80px",
  })

  return { ref, isInView }
}

// Usage
function Card() {
  const { ref, isInView } = useAnimateOnMount()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      Content
    </motion.div>
  )
}
```

### 19.2 useScrollProgress

```typescript
function useScrollProgress(target?: React.RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll(
    target ? { target, offset: ["start end", "end start"] } : undefined
  )
  return scrollYProgress
}
```

### 19.3 useCountUp

```typescript
function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()

    function update(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
  }, [isInView, target, duration])

  return { ref, value }
}

// Usage
function Stat() {
  const { ref, value } = useCountUp(12450)
  return <span ref={ref}>{value.toLocaleString()}</span>
}
```

### 19.4 useReducedMotion

```typescript
import { useReducedMotion } from "motion/react"

function SafeAnimation({ children }) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: prefersReduced ? 0 : 0.5 }}
    >
      {children}
    </motion.div>
  )
}
```

### 19.5 Marquee Component

```typescript
function Marquee({
  children,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
}: {
  children: ReactNode
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
}) {
  return (
    <div
      className="group flex overflow-hidden"
      style={{ "--speed": `${speed}s`, "--direction": direction === "left" ? "normal" : "reverse" } as React.CSSProperties}
    >
      <div className={`flex shrink-0 gap-4 animate-marquee ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}>
        {children}
      </div>
      <div className={`flex shrink-0 gap-4 animate-marquee ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`} aria-hidden>
        {children}
      </div>
    </div>
  )
}
```

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-100%); }
}
.animate-marquee {
  animation: marquee var(--speed, 40s) linear infinite var(--direction, normal);
}
```

---

## 20. Smooth Scroll

### 20.1 Lenis

```typescript
// lib/lenis.ts
"use client"
import Lenis from "lenis"

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    smoothWheel: true,
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
  return lenis
}

// In layout or provider:
useEffect(() => {
  const lenis = initLenis()
  return () => lenis.destroy()
}, [])
```

### 20.2 Lenis + GSAP ScrollTrigger

```typescript
// Sync Lenis with GSAP ScrollTrigger
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const lenis = new Lenis()

lenis.on("scroll", ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)
```

### 20.3 GSAP ScrollSmoother

```typescript
import { ScrollSmoother } from "gsap/ScrollSmoother"
gsap.registerPlugin(ScrollSmoother)

// Requires wrapper structure:
// <div id="smooth-wrapper">
//   <div id="smooth-content">...page...</div>
// </div>

useGSAP(() => {
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: true,     // enables data-speed and data-lag attributes
  })
})

// Usage in HTML:
// <img data-speed="0.5" />  ← slower parallax
// <div data-speed="1.5" />  ← faster parallax
// <h1 data-lag="0.2" />     ← follows with delay
```

---

## 21. External Libraries & Resources

### Component Libraries (Copy-paste)

| Library | Best For | URL |
|---------|----------|-----|
| **Aceternity UI** | 3D effects, spotlight, beams, lamp, wavy backgrounds | ui.aceternity.com |
| **Magic UI** | Marquee, orbit, gradient text, shimmer button, particles, globe | magicui.design |
| **Motion Primitives** | Text scramble, text morph, infinite slider, morphing dialog | motion-primitives.com |
| **Animata** | Border trail, text flip, staggered grid, hover cards | animata.design |
| **Luxe Components** | Premium animated components for React | luxe.guhrodrigues.com |

### Full Libraries

| Library | Best For | URL |
|---------|----------|-----|
| **Framer Motion / Motion** | React declarative animations, springs, layout | motion.dev |
| **GSAP** | Timeline, scroll-driven, text splitting, complex sequences | gsap.com |
| **Three.js** | 3D rendering, WebGL, shaders | threejs.org |
| **React Three Fiber** | Three.js in React (declarative) | r3f.docs.pmnd.rs |
| **Lottie / DotLottie** | After Effects animations on web | lottiefiles.com |
| **Lenis** | Smooth scroll | lenis.darkroom.engineering |

### Design Tools

| Tool | Best For | URL |
|------|----------|-----|
| **Rive** | Interactive stateful animations (alternative to Lottie) | rive.app |
| **Spline** | 3D design tool → export to React/web | spline.design |
| **Theatre.js** | Visual animation editor for Three.js + React | theatrejs.com |
| **LottieFiles** | Browse/create Lottie animations | lottiefiles.com |

### Inspiration

| Source | URL |
|--------|-----|
| Codrops | tympanus.net/codrops |
| Awwwards | awwwards.com |
| GSAP Showcase | gsap.com/showcase |
| Three.js Examples | threejs.org/examples |
| Aceternity Templates | ui.aceternity.com/templates |

---

## 22. Performance

### GPU-Accelerated Properties (Fast)

- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (blur, brightness — use sparingly)

### Avoid Animating (Causes Layout/Paint)

- `width`, `height` → use `scale` instead
- `top`, `left`, `right`, `bottom` → use `translate` instead
- `margin`, `padding` → use `transform` instead
- `border-radius` (can be slow at scale)
- `box-shadow` → use pseudo-element + opacity instead

### Library Performance Comparison

| Factor | CSS | Framer Motion | GSAP | Lottie (dotlottie) |
|--------|-----|---------------|------|---------------------|
| Bundle size | 0 KB | ~35 KB | ~25 KB (+plugins) | ~15 KB (WASM) |
| Simple transition | Best | Good | Overkill | N/A |
| Complex timeline | Limited | Limited | Best | N/A |
| Scroll-linked | Good (native) | Good | Best | N/A |
| Spring physics | No | Best | Good | N/A |
| Layout animation | No | Best | FLIP plugin | N/A |
| Designer animation | No | No | No | Best |
| 3D | Limited | Limited | Limited | No (use R3F) |

### Best Practices

```typescript
// ✅ Use transform, not position
animate={{ x: 100 }}         // GPU-accelerated
// ❌ animate={{ left: 100 }}  // triggers layout

// ✅ Use will-change sparingly and clean up
<motion.div
  style={{ willChange: "transform" }}
  onAnimationComplete={() => { ref.current.style.willChange = "auto" }}
/>

// ✅ Debounce scroll handlers
// GSAP ScrollTrigger does this automatically
// FM useScroll does this automatically

// ✅ Use once: true for scroll reveals
viewport={{ once: true }}

// ✅ Avoid animating too many elements simultaneously
// Use stagger to spread the load

// ✅ Lazy-load heavy libraries
const Lottie = dynamic(() => import("@lottiefiles/dotlottie-react"), { ssr: false })
const Canvas = dynamic(() => import("@react-three/fiber").then(m => m.Canvas), { ssr: false })

// ✅ Use CSS for simple states, JS for complex
// hover color change → CSS
// hover magnetic pull → JS (GSAP/FM)
```

---

## 23. Accessibility

### Reduced Motion (Always Support)

```typescript
// Framer Motion hook
import { useReducedMotion } from "motion/react"

function Component() {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
      animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: prefersReduced ? 0 : 0.5 }}
    />
  )
}
```

```css
/* CSS global fallback */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```typescript
// GSAP — check in matchMedia
gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
  // Only animate when user hasn't requested reduced motion
  gsap.from(".element", { y: 40, opacity: 0 })
})
```

### Additional Accessibility Rules

- Never convey information only through animation
- Provide pause/stop controls for auto-playing animations
- Avoid flashing/strobing (max 3 flashes per second)
- Ensure animated content is reachable via keyboard
- Test with screen readers (animated elements shouldn't interrupt reading flow)
- `aria-hidden="true"` on purely decorative animated elements

---

## 24. Anti-Patterns

### Universal

1. **Over-animating** — Not everything needs animation. Animate with purpose
2. **Long durations** — Max 600ms for UI, 1200ms for hero. Users feel delay
3. **Layout property animation** — Never animate width/height/margin/padding. Use transforms
4. **Missing exit animations** — Always use AnimatePresence or equivalent
5. **Ignoring reduced motion** — Always provide a fallback
6. **Too many simultaneous animations** — Stagger or sequence them
7. **Heavy backgrounds on dashboards** — Reserve aurora/particles for landing pages
8. **Animating on mount without condition** — Use whileInView or IntersectionObserver

### Framer Motion

9. **Using `animate` without `initial`** — Causes flash on mount
10. **Forgetting `key` on AnimatePresence children** — Exit animations won't fire
11. **Nesting `layout` animations deeply** — Performance degrades; keep layout animations shallow
12. **Using `layout` on large subtrees** — Use `layout="position"` when possible

### GSAP

13. **Not using `useGSAP()` in React** — Memory leaks from orphaned animations
14. **Forgetting to kill ScrollTriggers on route change** — Ghost triggers persist
15. **Animating server components** — GSAP requires `"use client"`
16. **Not registering plugins** — `gsap.registerPlugin(ScrollTrigger)` before use

### CSS

17. **Missing `@property` for custom properties** — `conic-gradient` angle animations won't work
18. **Not checking browser support** — CSS scroll-driven animations need feature detection
19. **Over-relying on `!important` in reduced motion** — Can break intentional state changes

### Performance

20. **Loading Three.js/R3F for simple effects** — Massive bundle for a floating div
21. **Lottie for simple icons** — SVG animation is lighter for simple shapes
22. **Not lazy-loading heavy animation libraries** — Use `dynamic()` / `React.lazy()`
23. **Multiple smooth scroll libraries** — Pick one: Lenis OR GSAP ScrollSmoother, never both
