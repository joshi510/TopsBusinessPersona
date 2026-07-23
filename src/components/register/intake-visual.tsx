"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, ClipboardList, FileText, Sparkles, Zap } from "lucide-react";
import { PremiumIcon } from "@/components/register/premium-icon";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ACCENTS } from "@/lib/accent-colors";
import { fadeUp, staggerContainer } from "@/lib/motion";

const HOW_STEPS = [
  {
    n: 1,
    icon: FileText,
    title: "Register",
    desc: "Enter your company details and choose your industry.",
    accent: ACCENTS.blue,
  },
  {
    n: 2,
    icon: Zap,
    title: "Answer 5 Questions",
    desc: "Complete five business scenario questions that take less than 90 seconds.",
    accent: ACCENTS.amber,
  },
  {
    n: 3,
    icon: Bot,
    title: "Get Your AI Employee",
    desc: "Instantly discover which AI Employee is the best fit for your business.",
    accent: ACCENTS.purple,
  },
] as const;

const STATS = [
  { value: 9, suffix: "+", label: "AI Employees", accent: ACCENTS.purple },
  { value: 15, suffix: "+", label: "Industries", accent: ACCENTS.indigo },
  { value: 90, suffix: " sec", label: "Assessment", accent: ACCENTS.blue },
] as const;

export function IntakeVisual() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex w-full flex-1 flex-col bg-white lg:h-full">
      <div className="relative z-10 flex flex-1 flex-col px-4 py-5 sm:px-6 sm:py-7 md:px-8 lg:h-full lg:px-7 lg:py-8">
        <motion.div
          className="mx-auto flex w-full max-w-[520px] flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:max-w-[640px] lg:h-full lg:max-w-none lg:p-6"
          variants={reduce ? undefined : staggerContainer(0.08, 0.05)}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          {/* Heading */}
          <motion.div variants={reduce ? undefined : fadeUp}>
            <p className="max-w-md text-[13px] leading-relaxed text-slate-500 sm:text-[14px] md:text-[15px]">
              Discover which AI Employee can automate your business and save
              hours every week.
            </p>
          </motion.div>

          {/* How it works */}
          <motion.div variants={reduce ? undefined : fadeUp} className="mt-4 sm:mt-5">
            <div className="mb-3 flex items-center gap-2.5">
              <PremiumIcon icon={ClipboardList} delay={0.02} size={18} />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                How It Works
              </h2>
            </div>

            <div className="relative mx-auto flex w-full max-w-full flex-col gap-2.5 sm:w-[88%] md:w-[82%] lg:w-[76%]">
              {HOW_STEPS.map((step, i) => {
                return (
                  <div key={step.title} className="relative">
                    {i < HOW_STEPS.length - 1 && (
                      <div
                        className="absolute left-[18px] top-[44px] h-[calc(100%-4px)] w-px border-l border-dashed border-slate-300 sm:left-[21px] sm:top-[48px]"
                        aria-hidden
                      />
                    )}
                    <motion.div
                      variants={reduce ? undefined : fadeUp}
                      whileHover={reduce ? undefined : { y: -3, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 380, damping: 24 }}
                      className="relative flex gap-2.5 rounded-xl border border-slate-200 bg-white px-2.5 py-2.5 sm:gap-3 sm:px-3 sm:py-3"
                    >
                      <PremiumIcon
                        icon={step.icon}
                        delay={0.08 + i * 0.1}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                            style={{
                              background: `linear-gradient(135deg, ${step.accent.gradient[0]}, ${step.accent.gradient[1]})`,
                            }}
                          >
                            {step.n}
                          </span>
                          <p className="text-[13px] font-bold tracking-tight text-slate-900 sm:text-[14px]">
                            {step.title}
                          </p>
                        </div>
                        <p className="mt-1 text-[12px] leading-snug text-slate-500 sm:text-[13px]">
                          {step.desc}
                        </p>
                      </div>
                      {i < HOW_STEPS.length - 1 && (
                        <motion.span
                          className="absolute -bottom-2.5 left-1/2 hidden -translate-x-1/2 text-[12px] text-slate-300 sm:block"
                          aria-hidden
                          animate={
                            reduce
                              ? undefined
                              : { y: [0, 2, 0], opacity: [0.4, 1, 0.4] }
                          }
                          transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          ↓
                        </motion.span>
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="mt-5 grid grid-cols-1 gap-2 sm:mt-auto sm:grid-cols-3 sm:gap-2.5 sm:pt-5 md:gap-3"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                whileHover={reduce ? undefined : { y: -2 }}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 text-left sm:flex-col sm:items-center sm:gap-0 sm:px-2 sm:py-3 sm:text-center md:px-3"
              >
                <div className="flex shrink-0 justify-center sm:mb-2">
                  <PremiumIcon
                    icon={i === 0 ? Bot : i === 1 ? Sparkles : Zap}
                    delay={0.4 + i * 0.08}
                    size={16}
                  />
                </div>
                <div className="min-w-0 flex-1 sm:flex-none">
                  <p
                    className="text-[18px] font-extrabold tracking-tight sm:text-[18px] md:text-[20px]"
                    style={{ color: s.accent.color }}
                  >
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase leading-tight tracking-wide text-slate-500 sm:text-[10px] md:text-[11px]">
                    {s.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
