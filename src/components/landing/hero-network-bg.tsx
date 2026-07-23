"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const NODES = [
  { x: 12, y: 18 },
  { x: 28, y: 42 },
  { x: 48, y: 22 },
  { x: 68, y: 48 },
  { x: 82, y: 20 },
  { x: 18, y: 72 },
  { x: 55, y: 78 },
  { x: 88, y: 68 },
  { x: 40, y: 58 },
];

const LINES: [number, number][] = [
  [0, 2],
  [2, 4],
  [1, 2],
  [1, 5],
  [2, 8],
  [3, 8],
  [3, 4],
  [5, 8],
  [6, 8],
  [6, 7],
  [4, 7],
];

export function HeroNetworkBg() {
  const reduce = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: `${(i * 19 + 5) % 96}%`,
        top: `${(i * 29 + 8) % 92}%`,
        size: 2 + (i % 3),
        dur: 6 + (i % 5),
        delay: (i % 6) * 0.35,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(73,165,255,0.16),transparent_50%),radial-gradient(ellipse_at_20%_80%,rgba(31,125,217,0.08),transparent_45%)]" />

      <motion.div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#1F7DD9 1px, transparent 1px), linear-gradient(90deg, #1F7DD9 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        animate={
          reduce
            ? undefined
            : { backgroundPosition: ["0px 0px", "48px 48px"] }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
        {LINES.map(([a, b], i) => {
          const n1 = NODES[a];
          const n2 = NODES[b];
          return (
            <motion.line
              key={i}
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              stroke="#49A5FF"
              strokeWidth="0.15"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.15 }}
              animate={
                reduce
                  ? { opacity: 0.25 }
                  : { pathLength: [0.2, 1, 0.2], opacity: [0.15, 0.55, 0.15] }
              }
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.25,
              }}
            />
          );
        })}
        {NODES.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="0.55"
            fill="#1F7DD9"
            animate={
              reduce
                ? undefined
                : { opacity: [0.25, 0.9, 0.25], r: [0.45, 0.7, 0.45] }
            }
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.18,
            }}
          />
        ))}
      </svg>

      {!reduce &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-[#49A5FF]/50"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -28, 0],
              x: [0, (p.id % 2 === 0 ? 10 : -10), 0],
              opacity: [0.15, 0.7, 0.15],
            }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
    </div>
  );
}
