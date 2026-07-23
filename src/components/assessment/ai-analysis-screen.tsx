"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PROGRESS_STOPS = [0, 25, 45, 65, 82, 100] as const;

type Phase = "analyzing" | "success";

type AiAnalysisScreenProps = {
  employeeName: string;
  employeeTitle: string;
  employeeAvatar?: string;
  onComplete: () => void;
};

export function AiAnalysisScreen({
  employeeName,
  employeeTitle,
  employeeAvatar,
  onComplete,
}: AiAnalysisScreenProps) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("analyzing");
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  };

  // Progress bar → Match Found
  useEffect(() => {
    if (phase !== "analyzing") return;
    clearTimers();

    let i = 0;
    const tick = () => {
      setProgress(PROGRESS_STOPS[Math.min(i, PROGRESS_STOPS.length - 1)]!);
      i += 1;
      if (i < PROGRESS_STOPS.length) {
        schedule(tick, reduce ? 280 : 520);
      } else {
        setProgress(100);
        schedule(() => setPhase("success"), reduce ? 200 : 420);
      }
    };

    schedule(tick, reduce ? 120 : 350);

    return clearTimers;
  }, [phase, reduce]);

  // Match Found → Console directly (no fade that reveals assessment)
  useEffect(() => {
    if (phase !== "success") return;

    const doneId = window.setTimeout(() => {
      onCompleteRef.current();
    }, reduce ? 800 : 1200);

    return () => window.clearTimeout(doneId);
  }, [phase, reduce]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[400] flex min-h-dvh items-center justify-center overflow-y-auto overflow-x-hidden bg-[#F4F8FC] px-4 py-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] font-sans antialiased sm:px-6"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 40%, #FFFFFF 0%, #F4F8FC 55%, #EAF2FA 100%)",
        }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[min(100%,420px)] px-1 sm:max-w-[440px] sm:px-0"
      >
        <AnimatePresence mode="wait">
          {phase === "analyzing" ? (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(3px)" }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div
                className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/80 p-5 shadow-[0_18px_50px_rgba(31,125,217,0.12)] backdrop-blur-xl sm:rounded-[22px] sm:p-6"
              >
                {/* Soft brand glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#49A5FF]/20 blur-2xl"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-12 -left-8 h-24 w-24 rounded-full bg-[#1F7DD9]/10 blur-2xl"
                />

                <div className="relative flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-[17px] font-bold tracking-tight text-[#0F172A] sm:text-[19px]">
                      Analysis Progress
                    </h2>
                  </div>
                  <motion.span
                    key={progress}
                    initial={reduce ? false : { opacity: 0.5, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="shrink-0 bg-gradient-to-r from-[#49A5FF] to-[#174D8C] bg-clip-text text-[28px] font-extrabold tabular-nums leading-none text-transparent sm:text-[32px]"
                  >
                    {progress}%
                  </motion.span>
                </div>

                {/* Track */}
                <div className="relative mt-5 sm:mt-6">
                  <div className="h-3 overflow-hidden rounded-full bg-[#E8F1FB] ring-1 ring-[#D7E8F8] sm:h-3.5">
                    <motion.div
                      className="relative h-full overflow-hidden rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #49A5FF 0%, #1F7DD9 55%, #174D8C 100%)",
                        boxShadow:
                          "0 0 16px rgba(73,165,255,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
                      }}
                      initial={false}
                      animate={{ width: `${Math.max(progress, 2)}%` }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {/* Moving shine */}
                      {!reduce && (
                        <motion.div
                          aria-hidden
                          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/55 to-transparent"
                          animate={{ x: ["-120%", "220%"] }}
                          transition={{
                            duration: 1.35,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Glowing tip */}
                  {progress > 0 && progress < 100 && !reduce ? (
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_rgba(73,165,255,0.75)] ring-2 ring-[#49A5FF]/50 sm:h-5 sm:w-5"
                      animate={{ left: `calc(${progress}% - 8px)` }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : null}
                </div>

                {/* Milestone dots */}
                <div className="relative mt-3 flex justify-between px-0.5">
                  {PROGRESS_STOPS.map((stop) => {
                    const reached = progress >= stop;
                    return (
                      <span
                        key={stop}
                        className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 sm:h-2 sm:w-2 ${
                          reached ? "bg-[#1F7DD9]" : "bg-[#CBD5E1]"
                        }`}
                      />
                    );
                  })}
                </div>

                <p className="mt-4 text-center text-[12px] font-medium text-[#64748B] sm:mt-5 sm:text-[13px]">
                  Matching your perfect AI Employee…
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={
                reduce ? false : { opacity: 0, y: 8, filter: "blur(3px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto flex w-full max-w-[320px] flex-col items-center px-2 text-center sm:max-w-[360px] sm:px-0"
            >
              <motion.div
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DCFCE7] text-[#22C55E] sm:h-12 sm:w-12"
                initial={reduce ? false : { scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              >
                <Check className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.25} />
              </motion.div>

              <p className="mt-4 text-[15px] font-semibold text-[#22C55E] sm:mt-5 sm:text-[16px]">
                Match Found
              </p>

              <p className="mt-4 text-[13px] font-medium text-[#94A3B8] sm:mt-5 sm:text-[14px]">
                Meet
              </p>

              {employeeAvatar ? (
                <div className="relative mt-3 h-12 w-12 overflow-hidden rounded-full ring-1 ring-[#E2E8F0] sm:h-14 sm:w-14">
                  <Image
                    src={employeeAvatar}
                    alt={employeeName}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 48px, 56px"
                  />
                </div>
              ) : null}

              <h2 className="mt-3 max-w-full break-words px-1 text-[24px] font-extrabold tracking-tight text-[#174D8C] sm:text-[28px]">
                {employeeName}
              </h2>
              <p className="mt-1.5 max-w-full break-words px-2 text-[14px] font-medium text-[#64748B] sm:text-[15px]">
                {employeeTitle}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
