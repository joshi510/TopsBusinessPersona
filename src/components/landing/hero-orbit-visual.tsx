"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { type MouseEvent, useCallback, useEffect, useRef, useState } from "react";

const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: `${10 + ((i * 19) % 80)}%`,
  top: `${14 + ((i * 27) % 68)}%`,
  size: 2 + (i % 3),
  dur: 3.8 + (i % 4) * 0.5,
  delay: i * 0.3,
}));

const FLOW_STEPS = [
  { label: "Discover", color: "#49A5FF" },
  { label: "Match", color: "#1F7DD9" },
  { label: "Automate", color: "#174D8C" },
];

function DiscoverMatchAutomate({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[4%] z-40 -translate-x-1/2 sm:left-auto sm:right-2 sm:top-[10%] sm:translate-x-0 md:right-3 lg:right-4 lg:top-[9%]"
      initial={reduce ? false : { opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="inline-flex max-w-[calc(100vw-3rem)] items-center gap-1 overflow-hidden whitespace-nowrap rounded-full border border-[#49A5FF]/30 bg-white/90 px-2.5 py-1 shadow-[0_6px_22px_rgba(31,125,217,0.16)] backdrop-blur-md sm:max-w-none sm:gap-1.5 sm:overflow-visible sm:px-3 sm:py-1">
        {FLOW_STEPS.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1 sm:gap-1.5">
            <motion.span
              className="relative z-10 text-[11px] font-extrabold tracking-wide sm:text-[12px]"
              style={{ color: step.color }}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.35 + i * 0.18,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.span
                className="inline-block"
                style={{ color: step.color }}
                animate={
                  reduce
                    ? undefined
                    : {
                        textShadow: [
                          `0 0 0px ${step.color}00`,
                          `0 0 10px ${step.color}88`,
                          `0 0 0px ${step.color}00`,
                        ],
                      }
                }
                transition={{
                  duration: 2.6,
                  delay: i * 0.35,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {step.label}
              </motion.span>
            </motion.span>

            {i < FLOW_STEPS.length - 1 && (
              <motion.span
                className="text-[10px] font-bold text-[#1F7DD9] sm:text-[12px]"
                aria-hidden
                initial={reduce ? false : { opacity: 0, x: -6 }}
                animate={
                  reduce
                    ? { opacity: 1 }
                    : {
                        opacity: [0.45, 1, 0.45],
                        x: [0, 3, 0],
                      }
                }
                transition={
                  reduce
                    ? { delay: 0.4 + i * 0.18 }
                    : {
                        delay: 0.4 + i * 0.18,
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function HeroOrbitVisual() {
  const reduce = useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 16, mass: 0.45 });
  const sy = useSpring(my, { stiffness: 60, damping: 16, mass: 0.45 });
  const rotateX = useTransform(sy, [-12, 12], [3, -3]);
  const rotateY = useTransform(sx, [-14, 14], [-4, 4]);

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduce || !visualRef.current || !isDesktop) return;
      const rect = visualRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      mx.set(px * 14);
      my.set(py * 10);
    },
    [isDesktop, mx, my, reduce]
  );

  const onLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <div
      id="ai-employees"
      ref={visualRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto flex w-full max-w-[860px] flex-col items-center overflow-visible lg:max-w-none"
      style={{ perspective: "1200px" }}
    >
      <div className="relative aspect-[5/4] w-full min-h-[280px] overflow-visible sm:min-h-[380px] md:min-h-[440px] lg:min-h-[500px]">
        <DiscoverMatchAutomate reduce={reduce} />

        <motion.div
          className="pointer-events-none absolute left-1/2 top-[48%] h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(73,165,255,0.28),transparent_62%)] blur-3xl"
          animate={
            reduce
              ? undefined
              : { opacity: [0.4, 0.85, 0.4], scale: [0.94, 1.08, 0.94] }
          }
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute left-[18%] top-[20%] h-[40%] w-[40%] rounded-full bg-[#49A5FF]/15 blur-[50px]"
          animate={
            reduce ? undefined : { opacity: [0.3, 0.6, 0.3], x: [0, 12, 0] }
          }
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="pointer-events-none absolute left-1/2 top-[62%] z-[1] h-[36%] w-[58%] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="absolute inset-[8%] rounded-full border border-[#49A5FF]/25"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-[22%] rounded-full border border-dashed border-[#1F7DD9]/30"
            animate={reduce ? undefined : { rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {!reduce &&
          SPARKS.map((s) => (
            <motion.span
              key={s.id}
              className="pointer-events-none absolute z-[2] rounded-full bg-[#49A5FF]"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                boxShadow: "0 0 8px rgba(73,165,255,0.75)",
              }}
              animate={{
                y: [0, -14, 0],
                opacity: [0.2, 0.85, 0.2],
              }}
              transition={{
                duration: s.dur,
                delay: s.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

        <motion.div
          className="relative z-10 h-full w-full will-change-transform"
          style={
            reduce
              ? undefined
              : {
                  x: sx,
                  y: sy,
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }
          }
        >
          <motion.div
            className="relative h-full w-full"
            animate={
              reduce
                ? undefined
                : isDesktop
                  ? { y: [0, -10, 0], scale: [1, 1.015, 1] }
                  : { y: [0, -5, 0], scale: [1, 1.008, 1] }
            }
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/ai-workforce-hero-hd.png"
              alt="AI Workforce — Salesperson, Marketer, Operations, Accountant, Assistant"
              fill
              className="object-contain object-[center_48%] mix-blend-multiply scale-[1.05] -translate-y-0.5 sm:scale-[1.12] sm:-translate-y-1 md:scale-[1.18] md:-translate-y-2 lg:scale-[1.22] lg:-translate-y-2"
              priority
              quality={100}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 960px"
            />

            {!reduce && (
              <motion.div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                aria-hidden
              >
                <motion.div
                  className="absolute -inset-y-6 w-1/5 skew-x-[-16deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-50%", "200%"] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 2,
                  }}
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>

      <p className="relative z-10 -mt-6 text-center leading-none sm:-mt-10 md:-mt-14 lg:-mt-16">
        <span className="script-accent pe-1 text-[22px] font-bold italic sm:text-[28px] lg:text-[32px]">
          Your AI Workforce,
        </span>{" "}
        <span className="text-[18px] font-extrabold tracking-tight text-[#1F7DD9] sm:text-[22px] lg:text-[26px]">
          24/7
        </span>
        <span
          className="mx-auto mt-0.5 block h-[2px] w-[68%] max-w-[260px] rounded-full bg-gradient-to-r from-transparent via-[#49A5FF] to-transparent opacity-70"
          aria-hidden
        />
      </p>
    </div>
  );
}
