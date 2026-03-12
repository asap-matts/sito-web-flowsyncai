"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FINAL_TEXT = "FlowSync AI";
const ANIM_DURATION = 2.5; // seconds — total letter convergence time
const REVEAL_DURATION = 0.8; // overlay fade-out

const ease = [0.16, 1, 0.3, 1] as const;

interface LetterStart {
  char: string;
  x: number; // px offset from final position
  y: number;
  rotate: number;
  scale: number;
}

function generateLetterStarts(): LetterStart[] {
  return FINAL_TEXT.split("").map((char) => {
    // Random position across the viewport (offset from center)
    const angle = Math.random() * Math.PI * 2;
    const radius = 300 + Math.random() * 400;
    return {
      char,
      x: Math.cos(angle) * radius * (Math.random() > 0.5 ? 1 : -1),
      y: Math.sin(angle) * radius * (Math.random() > 0.5 ? 1 : -1),
      rotate: -180 + Math.random() * 360,
      scale: 0.3 + Math.random() * 0.7,
    };
  });
}

export default function IntroAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<"init" | "scatter" | "converge" | "done">(
    "init"
  );

  // Generate random start positions once (stable across renders)
  const letters = useMemo(() => generateLetterStarts(), []);

  // Check sessionStorage on mount
  useEffect(() => {
    if (sessionStorage.getItem("intro-seen") === "1") {
      setPhase("done");
    } else {
      setPhase("scatter");
    }
  }, []);

  // scatter → converge almost immediately (letters appear then fly in)
  useEffect(() => {
    if (phase !== "scatter") return;
    // Brief moment so letters render at scattered positions, then converge
    const t = setTimeout(() => setPhase("converge"), 50);
    return () => clearTimeout(t);
  }, [phase]);

  // After converge animation finishes → done
  useEffect(() => {
    if (phase !== "converge") return;
    const t = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("intro-seen", "1");
    }, (ANIM_DURATION + REVEAL_DURATION) * 1000);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "init") return null;

  return (
    <>
      <div
        style={{
          opacity: phase === "done" ? 1 : undefined,
          visibility: "visible",
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
              backgroundColor: "rgba(6, 1, 15, 0.95)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            exit={{
              opacity: 0,
              backdropFilter: "blur(0px)",
            } as any}
            transition={{ duration: REVEAL_DURATION, ease }}
          >
            {/* Glow orb behind text */}
            <motion.div
              className="absolute h-[300px] w-[300px] rounded-full bg-accent/[0.12] blur-[100px]"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: ANIM_DURATION * 0.6, ease }}
            />

            {/* Letters container — inline so letters form the word at rest */}
            <div className="relative z-10 flex items-center justify-center">
              {letters.map((letter, i) => {
                const isSpace = letter.char === " ";
                const isConverging = phase === "converge";

                // Stagger: first letters arrive slightly before last ones
                const staggerDelay = (i / letters.length) * 0.3;
                // Each letter takes most of the ANIM_DURATION to arrive
                const letterDuration = ANIM_DURATION * 0.85;

                return (
                  <motion.span
                    key={i}
                    className="inline-block font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight select-none"
                    initial={{
                      x: letter.x,
                      y: letter.y,
                      rotate: letter.rotate,
                      scale: letter.scale,
                      opacity: 0,
                    }}
                    animate={
                      isConverging
                        ? {
                            x: 0,
                            y: 0,
                            rotate: 0,
                            scale: 1,
                            opacity: 1,
                          }
                        : {
                            x: letter.x,
                            y: letter.y,
                            rotate: letter.rotate,
                            scale: letter.scale,
                            opacity: 0.5,
                          }
                    }
                    transition={{
                      duration: letterDuration,
                      delay: staggerDelay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      width: isSpace ? "0.35em" : undefined,
                      background: isConverging
                        ? undefined
                        : "rgba(94, 88, 213, 0.5)",
                      WebkitBackgroundClip: isConverging ? undefined : "text",
                      WebkitTextFillColor: isConverging ? undefined : "transparent",
                    }}
                  >
                    {isSpace ? "\u00A0" : (
                      <motion.span
                        className="inline-block"
                        initial={{ color: "rgba(94, 88, 213, 0.6)" }}
                        animate={
                          isConverging
                            ? { color: "rgba(240, 244, 255, 1)" }
                            : { color: "rgba(94, 88, 213, 0.6)" }
                        }
                        transition={{
                          duration: letterDuration * 0.5,
                          delay: staggerDelay + letterDuration * 0.5,
                          ease,
                        }}
                      >
                        {letter.char}
                      </motion.span>
                    )}
                  </motion.span>
                );
              })}
            </div>

            {/* Subtle particle trail — small dots that fade during convergence */}
            {letters.map((letter, i) => {
              if (letter.char === " ") return null;
              return (
                <motion.div
                  key={`trail-${i}`}
                  className="absolute h-1 w-1 rounded-full bg-accent-bright/40"
                  initial={{
                    x: letter.x,
                    y: letter.y,
                    opacity: 0,
                  }}
                  animate={
                    phase === "converge"
                      ? { x: 0, y: 0, opacity: [0, 0.6, 0] }
                      : { x: letter.x, y: letter.y, opacity: 0 }
                  }
                  transition={{
                    duration: ANIM_DURATION * 0.7,
                    delay: (i / letters.length) * 0.2,
                    ease,
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
