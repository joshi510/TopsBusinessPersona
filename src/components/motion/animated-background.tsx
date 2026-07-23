"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 100}%`,
  top: `${(i * 23 + 11) % 100}%`,
  size: 2 + (i % 4),
  duration: 10 + (i % 7),
  delay: (i % 5) * 0.4,
}));

export function AnimatedBackground() {
  const reduce = useReducedMotion();

  const circles = useMemo(
    () => [
      { className: "left-[-8%] top-[12%] h-72 w-72 bg-[#49A5FF]/12", dur: 14 },
      { className: "right-[-6%] top-[38%] h-80 w-80 bg-[#1F7DD9]/10", dur: 18 },
      { className: "left-[35%] bottom-[-10%] h-96 w-96 bg-[#174D8C]/8", dur: 16 },
      { className: "right-[20%] top-[65%] h-56 w-56 bg-[#479ED7]/10", dur: 20 },
    ],
    []
  );

  if (reduce) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* AI grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(31,125,217,0.9) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31,125,217,0.9) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 20%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, black 20%, transparent 72%)",
        }}
      />

      {/* gradient mesh */}
      <motion.div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 18% 8%, rgba(73,165,255,0.14), transparent 44%), radial-gradient(ellipse at 82% 18%, rgba(31,125,217,0.11), transparent 42%), radial-gradient(ellipse at 50% 85%, rgba(23,77,140,0.09), transparent 48%), radial-gradient(ellipse at 70% 55%, rgba(71,158,215,0.06), transparent 40%)",
        }}
        animate={{
          opacity: [0.75, 0.95, 0.75],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {circles.map((c, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${c.className} ${
            i >= 2 ? "hidden sm:block" : ""
          }`}
          animate={{
            y: [0, -28, 0],
            x: [0, i % 2 === 0 ? 22 : -22, 0],
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: c.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute rounded-full bg-[#49A5FF]/35 ${
            p.id >= 10 ? "hidden lg:block" : ""
          }`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -48, 0],
            opacity: [0.12, 0.5, 0.12],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
