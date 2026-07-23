"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChartBar, Clock, Sparkle } from "@phosphor-icons/react";
import { Magnetic } from "@/components/motion/magnetic";
import { HeroOrbitVisual } from "@/components/landing/hero-orbit-visual";
import { TopsIcon } from "@/components/ui/tops-icon";
import {
  fadeLeft,
  fadeUp,
  springSoft,
  staggerContainer,
} from "@/lib/motion";

const features = [
  { icon: Clock, title: "2 Min Assessment", sub: "Quick & Easy" },
  { icon: Sparkle, title: "Personalized Match", sub: "100% Relevant" },
  { icon: ChartBar, title: "Actionable Results", sub: "Instant Insights" },
];

const line1 = ["Your", "Business", "Deserves"];
const line2Lead = ["The", "Perfect"];

function AnimatedWord({
  word,
  delay,
  reduce,
  className = "",
}: {
  word: string;
  delay: number;
  reduce: boolean | null;
  className?: string;
}) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {word}
    </motion.span>
  );
}

function FeaturePills({
  reduce,
  className,
  animateOnMount = false,
}: {
  reduce: boolean | null;
  className?: string;
  animateOnMount?: boolean;
}) {
  return (
    <motion.div
      variants={reduce ? undefined : staggerContainer(0.08)}
      initial={animateOnMount && !reduce ? "hidden" : undefined}
      animate={animateOnMount ? "show" : undefined}
      className={className}
    >
      {features.map((f) => (
        <motion.div
          key={f.title}
          variants={reduce ? undefined : fadeUp}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#49A5FF]/12">
            <TopsIcon icon={f.icon} />
          </div>
          <div className="text-left">
            <p className="text-[13px] font-bold leading-tight text-[#1E293B] lg:text-[13px]">
              {f.title}
            </p>
            <p className="text-[11px] text-slate-400 sm:text-[11px]">{f.sub}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="assessment" className="relative overflow-hidden">
      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] items-center gap-6 px-6 pb-8 pt-3 sm:gap-8 sm:pb-10 md:gap-10 md:pb-12 md:pt-4 lg:grid-cols-2 lg:gap-8 lg:px-6 lg:pb-12 lg:pt-5">
        <motion.div
          className="order-1 mx-auto flex max-w-[540px] flex-col items-center text-center sm:mx-0 sm:items-start sm:text-left"
          variants={reduce ? undefined : staggerContainer(0.12, 0.05)}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <motion.p
            variants={reduce ? undefined : fadeLeft}
            className="mb-4 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#1F7DD9]"
          >
            <TopsIcon icon={Sparkle} size={20} />
            <span>Find Your Perfect AI Employee</span>
          </motion.p>

          <h1 className="text-[32px] font-extrabold leading-[1.15] tracking-tight text-[#1E293B] sm:text-[36px] md:text-[36px] lg:text-[38px]">
            <span className="block">
              {line1.map((word, i) => (
                <span key={word} className="mr-[0.28em] inline-block last:mr-0">
                  <AnimatedWord
                    word={word}
                    delay={0.15 + i * 0.1}
                    reduce={reduce}
                    className={
                      word === "Business"
                        ? "bg-gradient-to-r from-[#1E293B] via-[#1F7DD9] to-[#1E293B] bg-[length:200%_100%] bg-clip-text text-transparent"
                        : ""
                    }
                  />
                </span>
              ))}
            </span>

            <span className="mt-1 block">
              {line2Lead.map((word, i) => (
                <span key={word} className="mr-[0.28em] inline-block">
                  <AnimatedWord
                    word={word}
                    delay={0.45 + i * 0.1}
                    reduce={reduce}
                  />
                </span>
              ))}

              <motion.span
                className="relative inline-block pe-1 sm:whitespace-nowrap"
                initial={
                  reduce ? false : { opacity: 0, y: 24, scale: 0.94 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.75,
                  delay: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {!reduce && (
                  <motion.span
                    className="pointer-events-none absolute -inset-x-2 -inset-y-1 -z-10 rounded-lg bg-[#49A5FF]/20 blur-md"
                    aria-hidden
                    animate={{
                      opacity: [0.25, 0.6, 0.25],
                      scale: [0.98, 1.05, 0.98],
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
                <motion.span
                  className="script-accent relative z-[1] text-[1.22em] font-bold"
                  animate={
                    reduce
                      ? undefined
                      : {
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }
                  }
                  transition={
                    reduce
                      ? undefined
                      : {
                          duration: 5,
                          repeat: Infinity,
                          ease: "linear",
                        }
                  }
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                >
                  AI Employee
                </motion.span>
                <motion.span
                  className="script-underline"
                  aria-hidden
                  initial={reduce ? false : { scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 1.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformOrigin: "left center" }}
                />
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="mt-5 max-w-[420px] text-base leading-[1.7] text-slate-500 lg:text-[15px]"
          >
            Answer 5 simple questions and we&apos;ll match you with the AI
            Employee that can create the biggest impact in your business.
          </motion.p>

          {/* Desktop feature pills — same placement as before */}
          <FeaturePills
            reduce={reduce}
            className="mt-7 hidden flex-wrap gap-x-6 gap-y-4 lg:flex"
          />

          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="mt-8 w-full sm:w-auto"
          >
            <Magnetic className="block w-full sm:inline-block sm:w-auto">
              <motion.div
                whileHover={
                  reduce
                    ? undefined
                    : {
                        scale: 1.05,
                        boxShadow: "0 14px 36px rgba(31,125,217,0.45)",
                      }
                }
                whileTap={reduce ? undefined : { scale: 0.96 }}
                transition={springSoft}
                className="flex w-full rounded-full sm:inline-flex sm:w-auto"
              >
                <Link
                  href="/register"
                  className="btn-tops btn-shine btn-shine-loop inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold text-white sm:w-auto"
                >
                  Start Your Assessment
                  <TopsIcon icon={ArrowRight} tone="white" size={24} weight="bold" />
                </Link>
              </motion.div>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          className="order-2 w-full"
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <HeroOrbitVisual />
        </motion.div>

        {/* Mobile / tablet: cards below robot */}
        <FeaturePills
          reduce={reduce}
          animateOnMount
          className="order-3 col-span-full mt-2 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-4 lg:hidden"
        />
      </div>
    </section>
  );
}
