"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  BarChart3,
  Brain,
  ClipboardList,
  Clock,
  IndianRupee,
  MessageCircleMore,
  MonitorPlay,
  Bot,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ACCENTS, type Accent } from "@/lib/accent-colors";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const steps: {
  n: number;
  title: string;
  desc: string;
  icon: typeof ClipboardList;
  accent: Accent;
}[] = [
  {
    n: 1,
    title: "Register",
    desc: "Tell us about your business",
    icon: ClipboardList,
    accent: ACCENTS.blue,
  },
  {
    n: 2,
    title: "Answer Questions",
    desc: "Quick assessment about your needs",
    icon: MessageCircleMore,
    accent: ACCENTS.cyan,
  },
  {
    n: 3,
    title: "AI Analysis",
    desc: "We analyze your business needs",
    icon: Brain,
    accent: ACCENTS.purple,
  },
  {
    n: 4,
    title: "AI Match",
    desc: "Get matched with your AI Employee",
    icon: Sparkles,
    accent: ACCENTS.emerald,
  },
  {
    n: 5,
    title: "Watch Demo",
    desc: "See your AI Employee at work",
    icon: MonitorPlay,
    accent: ACCENTS.orange,
  },
  {
    n: 6,
    title: "Deploy",
    desc: "Automate, save time & grow",
    icon: Rocket,
    accent: ACCENTS.rose,
  },
];

const benefits: {
  title: string;
  desc: string;
  icon: typeof Clock;
  accent: Accent;
}[] = [
  {
    title: "Save Time",
    desc: "Automate repetitive work",
    icon: Clock,
    accent: ACCENTS.blue,
  },
  {
    title: "Reduce Cost",
    desc: "Cut operational expenses fast",
    icon: IndianRupee,
    accent: ACCENTS.orange,
  },
  {
    title: "Increase Productivity",
    desc: "Grow without hiring delays",
    icon: BarChart3,
    accent: ACCENTS.emerald,
  },
  {
    title: "Automation",
    desc: "AI workforce that never stops",
    icon: Bot,
    accent: ACCENTS.purple,
  },
  {
    title: "Better Decisions",
    desc: "Data-driven recommendations",
    icon: Brain,
    accent: ACCENTS.cyan,
  },
  {
    title: "24x7 Support",
    desc: "Always on. Never offline.",
    icon: ShieldCheck,
    accent: ACCENTS.rose,
  },
];

const testimonials = [
  {
    quote:
      "Business AI Persona helped us automate our lead follow-ups and save 20+ hours every week!",
    name: "Rajesh Patel",
    role: "CEO Shree Ceramics",
  },
  {
    quote:
      "The AI Employee match was spot on. We deployed in days and saw results in the first month.",
    name: "Priya Mehta",
    role: "Founder Textile Hub",
  },
  {
    quote:
      "Our ops team finally has bandwidth for strategy. The 24/7 AI workforce changed everything.",
    name: "Amit Shah",
    role: "Director Logistics Pro",
  },
];

const avatarPhotos = [
  "/avatars/indian-01.jpg",
  "/avatars/indian-02.jpg",
  "/avatars/indian-03.jpg",
  "/avatars/indian-04.jpg",
  "/avatars/indian-05.jpg",
  "/avatars/indian-06.jpg",
  "/avatars/indian-07.jpg",
  "/avatars/indian-08.jpg",
  "/avatars/indian-09.jpg",
  "/avatars/indian-10.jpg",
];

function TimelineStep({
  step,
  reduce,
}: {
  step: (typeof steps)[0];
  reduce: boolean | null;
}) {
  const Icon = step.icon;
  const { accent } = step;

  return (
    <motion.div
      variants={
        reduce
          ? undefined
          : {
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }
      }
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      className="relative z-10 flex w-full max-w-[200px] flex-col items-center text-center lg:max-w-[160px] lg:flex-1 lg:min-w-0"
    >
      <div className="relative mb-3 flex flex-col items-center">
        {/* 72px outer gradient ring + white inner */}
        <div
          className="flex h-[72px] w-[72px] items-center justify-center rounded-full p-[3px]"
          style={{
            background: `linear-gradient(135deg, ${accent.gradient[0]}, ${accent.gradient[1]})`,
            boxShadow: `0 8px 24px ${accent.glow}`,
          }}
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
            <Icon
              size={36}
              strokeWidth={1.75}
              style={{ color: accent.color }}
              aria-hidden
            />
          </div>
        </div>

        {/* 24px number badge centered below */}
        <div
          className="mt-2 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white"
          style={{
            background: `linear-gradient(135deg, ${accent.gradient[0]}, ${accent.gradient[1]})`,
            boxShadow: `0 4px 12px ${accent.glow}`,
          }}
        >
          {step.n}
        </div>
      </div>

      <p className="text-[14px] font-bold leading-tight tracking-tight text-[#0F172A]">
        {step.title}
      </p>
      <p className="mt-1.5 max-w-[140px] text-[12px] font-normal leading-snug text-slate-500">
        {step.desc}
      </p>
    </motion.div>
  );
}

export function FeatureGrid() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(timelineRef, { once: true, amount: 0.35 });

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section id="how-it-works" className="relative z-10 px-6 pb-8 sm:px-8 sm:pb-9 lg:px-10 lg:pb-10">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 sm:gap-7 lg:gap-8">
        {/* ── How It Works ── */}
        <motion.div
          className="w-full rounded-[22px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_8px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:rounded-[24px] sm:p-6 lg:rounded-[28px] lg:p-8"
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={viewportOnce}
        >
          <h2 className="mb-8 text-center font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-[#2563EB] sm:mb-9 sm:text-[13px] lg:mb-10">
            How It Works
          </h2>

          <div ref={timelineRef} className="relative px-1 sm:px-2 lg:px-4">
            {/* Mobile / tablet vertical connector */}
            <div
              className="pointer-events-none absolute bottom-6 left-1/2 top-6 w-[2px] -translate-x-1/2 lg:hidden"
              aria-hidden
            >
              <motion.div
                className="h-full w-full origin-top"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #2563EB, #06B6D4, #8B5CF6, #10B981, #F97316, #EC4899)",
                  WebkitMaskImage:
                    "repeating-linear-gradient(180deg, #000 0 8px, transparent 8px 14px)",
                  maskImage:
                    "repeating-linear-gradient(180deg, #000 0 8px, transparent 8px 14px)",
                }}
                initial={{ scaleY: 0 }}
                animate={
                  lineInView || reduce ? { scaleY: 1 } : { scaleY: 0 }
                }
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Desktop horizontal timeline */}
            <div
              className="pointer-events-none absolute left-[8%] right-[8%] top-[36px] hidden h-[2px] lg:block"
              aria-hidden
            >
              <motion.div
                className="h-full w-full origin-left"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #2563EB, #06B6D4, #8B5CF6, #10B981, #F97316, #EC4899)",
                  backgroundSize: "100% 100%",
                  WebkitMaskImage:
                    "repeating-linear-gradient(90deg, #000 0 8px, transparent 8px 14px)",
                  maskImage:
                    "repeating-linear-gradient(90deg, #000 0 8px, transparent 8px 14px)",
                }}
                initial={{ scaleX: 0 }}
                animate={
                  lineInView || reduce ? { scaleX: 1 } : { scaleX: 0 }
                }
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <motion.div
              className="relative flex flex-col items-center gap-8 sm:mx-auto sm:max-w-md md:max-w-lg lg:max-w-none lg:flex-row lg:items-start lg:justify-between lg:gap-3"
              variants={reduce ? undefined : staggerContainer(0.09, 0.12)}
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={viewportOnce}
            >
              {steps.map((step) => (
                <TimelineStep key={step.n} step={step} reduce={reduce} />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ── Why Businesses Love ── */}
        <motion.div
          className="w-full rounded-[22px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_8px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:rounded-[24px] sm:p-6 lg:rounded-[28px] lg:p-8"
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={viewportOnce}
        >
          <h2 className="mb-6 text-center font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-slate-700 sm:mb-7 sm:text-[13px] lg:mb-8">
            Why Businesses Love{" "}
            <span className="text-[#2563EB]">TOPS Technologies</span>
          </h2>

          <motion.div
            className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-5"
            variants={reduce ? undefined : staggerContainer(0.07)}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={viewportOnce}
          >
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  variants={
                    reduce
                      ? undefined
                      : {
                          hidden: { opacity: 0, y: 20, scale: 0.96 },
                          show: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                              duration: 0.5,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                        }
                  }
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          y: -8,
                          boxShadow: `0 16px 40px ${b.accent.glow}`,
                        }
                  }
                  transition={{ type: "spring", stiffness: 360, damping: 24 }}
                  className="relative flex h-full min-h-[148px] flex-col items-center overflow-hidden rounded-[18px] border border-slate-200/90 bg-white px-3 pb-5 pt-5 text-center shadow-[0_8px_40px_rgba(15,23,42,0.06)] sm:min-h-[152px] sm:rounded-[20px] sm:px-4 sm:pb-6 sm:pt-6 lg:min-h-[160px] lg:rounded-[22px]"
                >
                  <Icon
                    size={32}
                    strokeWidth={1.75}
                    className="h-7 w-7 sm:h-8 sm:w-8"
                    style={{ color: b.accent.color }}
                    aria-hidden
                  />
                  <p className="mt-3 text-[13px] font-bold leading-tight tracking-tight text-[#0F172A] sm:mt-4 sm:text-[14px]">
                    {b.title}
                  </p>
                  <p className="mt-1.5 text-[11px] font-normal leading-snug text-slate-500 sm:text-[12px]">
                    {b.desc}
                  </p>
                  <span
                    className="absolute inset-x-0 bottom-0 h-1"
                    style={{ backgroundColor: b.accent.color }}
                    aria-hidden
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── JOIN 500+ BUSINESSES — pixel match specs ── */}
        <motion.div
          className="relative h-auto w-full overflow-hidden rounded-[20px] text-white sm:rounded-[22px] md:h-[170px] lg:rounded-[24px]"
          style={{
            background:
              "radial-gradient(ellipse at 88% 40%, rgba(73,165,255,0.45), transparent 52%), linear-gradient(135deg, #49A5FF 0%, #1F7DD9 48%, #174D8C 100%)",
            boxShadow: "0 8px 40px rgba(31, 125, 217, 0.28)",
          }}
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={viewportOnce}
        >
          {/* Subtle blue particles */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(147,197,253,0.55) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(ellipse at 80% 50%, black 10%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 80% 50%, black 10%, transparent 70%)",
            }}
            aria-hidden
          />

          {/* Soft radial glow right */}
          <motion.div
            className="pointer-events-none absolute -right-10 top-1/2 h-[220px] w-[220px] -translate-y-1/2 rounded-full bg-[#49A5FF]/35 blur-3xl"
            animate={
              reduce
                ? undefined
                : { opacity: [0.25, 0.45, 0.25], scale: [1, 1.08, 1] }
            }
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />

          {/* Curved glowing lines */}
          <svg
            className="pointer-events-none absolute -bottom-2 right-0 hidden h-[160px] w-[260px] opacity-60 sm:block"
            viewBox="0 0 260 160"
            fill="none"
            aria-hidden
          >
            <path
              d="M10 145 C 70 95, 130 65, 250 25"
              stroke="url(#joinMesh)"
              strokeWidth="1.75"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M25 152 C 90 105, 150 78, 255 45"
              stroke="url(#joinMesh)"
              strokeWidth="1.35"
              strokeLinecap="round"
              opacity="0.32"
            />
            <path
              d="M40 158 C 110 118, 170 95, 258 65"
              stroke="url(#joinMesh)"
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity="0.2"
            />
            <defs>
              <linearGradient id="joinMesh" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
              </linearGradient>
            </defs>
          </svg>

          {/* Content */}
          <div className="relative grid h-full grid-cols-1 items-center gap-6 px-5 py-6 pb-10 text-center sm:gap-7 sm:px-6 sm:text-left md:grid-cols-[35%_65%] md:gap-12 md:px-10 md:py-6 md:pb-6 md:text-left">
            {/* LEFT 35% */}
            <div className="flex flex-col justify-center">
              <div className="min-w-0">
                <h3 className="font-sans text-[15px] font-bold uppercase leading-tight tracking-tight text-white md:text-[17px] lg:text-[18px]">
                  Join 500+ Businesses
                </h3>
                <p className="mt-1 font-sans text-[12px] font-medium leading-snug text-white/75 md:text-[13px]">
                  Transforming operations with AI Employees
                </p>
              </div>

              <div className="mt-3 flex items-center justify-center sm:mt-2.5 md:justify-start">
                {avatarPhotos.map((src, i) => (
                  <motion.div
                    key={src}
                    className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-slate-700 md:h-10 md:w-10"
                    style={{
                      marginLeft: i === 0 ? 0 : -12,
                      zIndex: avatarPhotos.length - i,
                    }}
                    whileHover={
                      reduce
                        ? undefined
                        : { scale: 1.12, zIndex: 20, y: -2 }
                    }
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>

              <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
                <div className="flex items-center gap-[2px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span
                      key={i}
                      animate={
                        reduce
                          ? undefined
                          : {
                              filter: [
                                "drop-shadow(0 0 0px rgba(250,204,21,0))",
                                "drop-shadow(0 0 4px rgba(250,204,21,0.7))",
                                "drop-shadow(0 0 0px rgba(250,204,21,0))",
                              ],
                            }
                      }
                      transition={{
                        duration: 2.4,
                        delay: i * 0.12,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Star
                        size={14}
                        fill="#FACC15"
                        stroke="#FACC15"
                        aria-hidden
                      />
                    </motion.span>
                  ))}
                </div>
                <span className="font-sans text-[13px] font-bold text-white md:text-[14px]">
                  4.9/5
                </span>
              </div>
            </div>

            {/* RIGHT 65% */}
            <div className="relative flex flex-col justify-center pr-0 md:pr-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-sans text-[13px] font-semibold leading-snug text-white md:text-[14px] lg:text-[15px]">
                    {testimonials[index].quote}
                  </p>
                  <p className="mt-3 pl-0 text-center font-sans text-[13px] font-medium text-white/80 sm:text-right md:pl-8 md:text-[14px] lg:pl-16">
                    <span className="font-semibold text-[#E0F2FE]">
                      {testimonials[index].name}
                    </span>
                    <span className="text-white/70">
                      {" "}
                      {testimonials[index].role}
                    </span>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Slider dots — bottom center */}
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 md:bottom-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className="flex h-11 w-11 items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all ${
                    i === index
                      ? "h-2.5 w-2.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)]"
                      : "h-2 w-2 bg-white/35"
                  }`}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <span id="demo" className="sr-only" />
      <span id="pricing" className="sr-only" />
    </section>
  );
}
