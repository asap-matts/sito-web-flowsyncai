"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Only letters from "FlowSync AI"
const FLOW_CHARS = "FlowSyncAI";
const FINAL_TEXT = "FlowSync AI";

const ease = [0.16, 1, 0.3, 1] as const;

function randomFlowChar() {
  return FLOW_CHARS[Math.floor(Math.random() * FLOW_CHARS.length)];
}

interface ScatteredChar {
  id: number;
  char: string;
  x: number;
  y: number;
  fontSize: number;
  opacity: number;
  delay: number;
}

export default function IntroAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  // Skip intro if user already visited this session (e.g. returning from a project page)
  const alreadySeen = typeof window !== "undefined" && sessionStorage.getItem("intro-seen") === "1";

  const [phase, setPhase] = useState<
    "scatter" | "converge" | "reveal" | "done"
  >(alreadySeen ? "done" : "scatter");
  const [displayChars, setDisplayChars] = useState<ScatteredChar[]>([]);
  const [scrambleText, setScrambleText] = useState("");
  const rafRef = useRef<number>(0);

  // Generate scattered characters using only FlowSync AI letters
  const generateChars = useCallback(() => {
    const chars: ScatteredChar[] = [];
    const totalChars = 50;

    for (let i = 0; i < totalChars; i++) {
      chars.push({
        id: i,
        char: randomFlowChar(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        fontSize: 16 + Math.random() * 28,
        opacity: 0.12 + Math.random() * 0.35,
        delay: Math.random() * 1.2,
      });
    }

    return chars;
  }, []);

  // Phase 1: Scatter — letters from "FlowSync AI" appear scattered
  useEffect(() => {
    const chars = generateChars();
    setDisplayChars(chars);

    // Show initial scramble text immediately with mixed FlowSync letters
    setScrambleText(
      FINAL_TEXT.split("")
        .map((c) => (c === " " ? " " : randomFlowChar()))
        .join("")
    );

    // After 1.5s, start converging
    const convergeTimer = setTimeout(() => setPhase("converge"), 1500);
    return () => clearTimeout(convergeTimer);
  }, [generateChars]);

  // Keep scrambling during scatter phase
  useEffect(() => {
    if (phase !== "scatter") return;

    const interval = setInterval(() => {
      setScrambleText(
        FINAL_TEXT.split("")
          .map((c) => (c === " " ? " " : randomFlowChar()))
          .join("")
      );
    }, 120);

    return () => clearInterval(interval);
  }, [phase]);

  // Phase 2: Converge — letters resolve one by one into "FlowSync AI"
  useEffect(() => {
    if (phase !== "converge") return;

    let frame = 0;
    const totalFrames = 170; // ~2.8s at 60fps

    const animate = () => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);

      // Very slow ease — letters lock in gradually
      const easedProgress = 1 - Math.pow(1 - progress, 2.5);

      const scrambled = FINAL_TEXT.split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < FINAL_TEXT.length * easedProgress) return char;
          return randomFlowChar();
        })
        .join("");

      setScrambleText(scrambled);

      if (frame < totalFrames) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Text resolved — go straight to glass reveal
        setPhase("reveal");
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  // Phase 3: Reveal — overlay exits
  useEffect(() => {
    if (phase !== "reveal") return;

    const doneTimer = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("intro-seen", "1");
    }, 1400);
    return () => clearTimeout(doneTimer);
  }, [phase]);

  return (
    <>
      {/* Landing page always rendered behind the overlay */}
      <div
        style={{
          opacity: phase === "done" ? 1 : undefined,
          visibility: phase === "done" ? "visible" : "visible",
        }}
      >
        {children}
      </div>

      <AnimatePresence>
        {phase !== "done" && (
          <motion.div
            key="intro-overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
            style={{
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              backgroundColor: "rgba(6, 1, 15, 0.88)",
            }}
            animate={
              phase === "reveal"
                ? {
                    backgroundColor: "rgba(6, 1, 15, 0.3)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }
                : undefined
            }
            exit={{
              opacity: 0,
              backdropFilter: "blur(0px)",
              WebkitBackdropFilter: "blur(0px)",
              backgroundColor: "rgba(6, 1, 15, 0)",
            }}
            transition={{ duration: 1.4, ease }}
          >
            {/* Scattered FlowSync letters */}
            {displayChars.map((sc) => (
              <motion.span
                key={sc.id}
                className="absolute font-display select-none pointer-events-none font-bold"
                style={{
                  left: `${sc.x}%`,
                  top: `${sc.y}%`,
                  fontSize: sc.fontSize,
                  color: "rgba(94, 88, 213, 0.35)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  phase === "scatter"
                    ? {
                        opacity: sc.opacity,
                        scale: 1,
                      }
                    : {
                        opacity: 0,
                        x: `${50 - sc.x}vw`,
                        y: `${50 - sc.y}vh`,
                        scale: 0.2,
                      }
                }
                transition={{
                  duration: phase === "scatter" ? 1 : 1.8,
                  delay: sc.delay,
                  ease,
                }}
              >
                {sc.char}
              </motion.span>
            ))}

            {/* Glow orb behind text */}
            <motion.div
              className="absolute h-[300px] w-[300px] rounded-full bg-accent/[0.1] blur-[80px]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                phase !== "scatter"
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.5 }
              }
              transition={{ duration: 2, ease }}
            />

            {/* Center scramble text */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                phase === "reveal"
                  ? { opacity: 0, scale: 1.05, filter: "blur(6px)" }
                  : { opacity: 1, scale: 1, filter: "blur(0px)" }
              }
              transition={{
                duration: phase === "reveal" ? 1.2 : 1,
                ease,
              }}
            >
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ice">
                {scrambleText.split("").map((char, i) => (
                  <span
                    key={i}
                    className={
                      i < FINAL_TEXT.length &&
                      scrambleText[i] === FINAL_TEXT[i] &&
                      FINAL_TEXT[i] !== " "
                        ? "inline-block bg-gradient-to-r from-accent-bright via-accent to-accent-deep bg-clip-text text-transparent transition-colors duration-300"
                        : "inline-block text-ice/50 transition-colors duration-300"
                    }
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
