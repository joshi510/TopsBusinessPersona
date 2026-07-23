"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  Code2,
  Palette,
  Rocket,
  Shield,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiAnalysisScreen } from "@/components/assessment/ai-analysis-screen";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { useAssessment } from "@/context/assessment-context";
import { buildResultView } from "@/lib/assessment/result-view";
import type { AssessmentOption } from "@/lib/assessment/types";
import { buildConsoleHref, getEmployeeAsset } from "@/lib/employeeAssets";

const sideIcons = [
  {
    Icon: Brain,
    className: "left-[4%] top-[22%]",
    delay: 0,
    tone: "from-[#49A5FF] to-[#174D8C]",
  },
  {
    Icon: Sparkles,
    className: "right-[5%] top-[28%]",
    delay: 0.4,
    tone: "from-[#1F7DD9] to-[#174D8C]",
  },
  {
    Icon: Rocket,
    className: "left-[6%] bottom-[28%]",
    delay: 0.8,
    tone: "from-[#49A5FF] to-[#1F7DD9]",
  },
  {
    Icon: Shield,
    className: "right-[4%] bottom-[24%]",
    delay: 1.2,
    tone: "from-[#479ED7] to-[#174D8C]",
  },
  {
    Icon: Palette,
    className: "left-[8%] top-[48%]",
    delay: 0.6,
    tone: "from-[#5BB0FF] to-[#1F7DD9]",
  },
  {
    Icon: Code2,
    className: "right-[7%] top-[52%]",
    delay: 1,
    tone: "from-[#2F6BFF] to-[#174D8C]",
  },
] as const;

function QuizAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-[#49A5FF]/25 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-28 top-32 h-[480px] w-[480px] rounded-full bg-[#1F7DD9]/20 blur-3xl"
        animate={{ x: [0, -30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#174D8C]/15 blur-3xl"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-white/50 blur-3xl"
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {[
        { left: "12%", top: "18%", size: 8, delay: 0 },
        { left: "78%", top: "16%", size: 6, delay: 0.7 },
        { left: "88%", top: "62%", size: 10, delay: 1.4 },
        { left: "18%", top: "72%", size: 7, delay: 0.3 },
        { left: "45%", top: "12%", size: 5, delay: 1.1 },
        { left: "62%", top: "78%", size: 9, delay: 1.8 },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#49A5FF]/45"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.9, 0.25] }}
          transition={{
            duration: 4 + i * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      <motion.span
        className="absolute left-[15%] top-[35%] h-16 w-16 rounded-full border border-white/40 bg-white/20 backdrop-blur-md"
        animate={{ y: [0, -14, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute right-[12%] top-[40%] h-12 w-12 rounded-full border border-white/40 bg-white/15 backdrop-blur-md"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {sideIcons.map(({ Icon, className, delay, tone }) => (
        <motion.div
          key={className}
          className={`absolute hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/50 bg-white/40 shadow-[0_12px_30px_rgba(31,125,217,0.12)] backdrop-blur-xl xl:flex ${className}`}
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 4.8 + delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        >
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${tone} text-white shadow-sm`}
          >
            <Icon size={15} strokeWidth={2.2} />
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function QuizPage() {
  const router = useRouter();
  const {
    isHydrated,
    registrationData,
    industry,
    currentQuestion,
    currentQuestionIndex,
    selectedOptionId,
    isLastQuestion,
    progressPercent,
    totalQuestions,
    ensureSession,
    selectAnswer,
    goNext,
    goPrev,
    completeAssessment,
  } = useAssessment();

  const [analysis, setAnalysis] = useState<{
    consoleHref: string;
    employeeName: string;
    employeeTitle: string;
    employeeAvatar: string;
  } | null>(null);
  const analysisRef = useRef(analysis);
  analysisRef.current = analysis;

  const companyName =
    registrationData?.companyName?.trim() || "Your Business";
  const index = currentQuestionIndex;
  const question = currentQuestion;
  const total = totalQuestions;
  const progress = progressPercent;
  const selected = selectedOptionId;
  const isLast = isLastQuestion;
  const optionCount = question?.options.length ?? 0;

  useEffect(() => {
    if (!isHydrated) return;
    const ok = ensureSession();
    if (!ok) router.replace("/register");
  }, [isHydrated, ensureSession, router]);

  function selectOption(option: AssessmentOption) {
    selectAnswer(option);
  }

  function handlePrev() {
    goPrev();
  }

  function handleNext() {
    if (!selected) return;
    goNext();
  }

  function handleSubmit() {
    if (!selected) return;
    const answers = completeAssessment();
    const view = buildResultView(answers);
    const roleKey = view?.primaryRole.roleKey ?? "SALES";
    const industryLabel =
      registrationData?.industry || industry || "Other";
    const asset = getEmployeeAsset(roleKey);
    setAnalysis({
      consoleHref: buildConsoleHref(roleKey, industryLabel, "demo"),
      employeeName: asset.name,
      employeeTitle: asset.title,
      employeeAvatar: asset.avatar,
    });
  }

  const finishAnalysis = useCallback(() => {
    const href = analysisRef.current?.consoleHref;
    if (!href) return;
    router.replace(href);
  }, [router]);

  if (!isHydrated || !question) {
    return null;
  }

  // Keep assessment hidden while analysis runs — avoids flash before Console
  if (analysis) {
    return (
      <AiAnalysisScreen
        employeeName={analysis.employeeName}
        employeeTitle={analysis.employeeTitle}
        employeeAvatar={analysis.employeeAvatar}
        onComplete={finishAnalysis}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative flex min-h-dvh flex-col overflow-x-hidden overflow-y-auto bg-[linear-gradient(165deg,#F8FBFF_0%,#EAF4FF_40%,#F5FAFF_100%)] lg:h-dvh lg:max-h-dvh lg:overflow-hidden"
    >
      <QuizAtmosphere />

      <div className="relative z-40 shrink-0 bg-transparent">
        <Navbar title="AI Persona Quiz" />
      </div>

      <main className="relative z-10 flex min-h-0 w-full flex-1 flex-col items-center lg:overflow-hidden">
        <div className="mx-auto flex min-h-0 w-full max-w-[1200px] flex-1 flex-col items-center justify-start px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pb-6 sm:pt-6 lg:max-h-full lg:justify-center lg:pt-6 xl:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 26, delay: 0.06 }}
            className="relative flex max-h-full w-full min-h-0 max-w-[980px] flex-col overflow-hidden rounded-[22px] border border-white/70 shadow-[0_24px_60px_rgba(31,125,217,0.14)] sm:rounded-[28px] lg:max-w-[1000px] lg:rounded-[32px]"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/90 to-transparent"
            />

            <div className="relative shrink-0 px-4 pb-1.5 pt-3 sm:px-8 sm:pb-2 sm:pt-3.5">
              <div className="mb-1 flex min-w-0 items-center justify-between gap-2 sm:gap-3">
                <motion.span
                  key={`pill-${index}`}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex shrink-0 items-center rounded-full bg-gradient-to-r from-[#49A5FF] to-[#174D8C] px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-[0_6px_16px_rgba(31,125,217,0.28)] sm:px-3 sm:text-[12px]"
                >
                  Question {index + 1} of {total}
                </motion.span>
                <span className="min-w-0 truncate text-right text-[11px] font-medium text-[#888888] sm:text-[12px]">
                  {companyName}
                </span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-semibold text-[#999999] sm:text-[11px]">
                <span>Progress</span>
                <motion.span
                  key={Math.round(progress)}
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#DCEEFF]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#49A5FF] via-[#1F7DD9] to-[#174D8C]"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-2 sm:px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <h2 className="mb-3 text-[17px] font-extrabold leading-snug tracking-tight text-[#111111] sm:mb-4 sm:text-[22px] lg:text-[24px]">
                    {question.text}
                  </h2>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                    {question.options.map((opt, i) => {
                      const active = selected === opt.id;
                      const isLastOdd =
                        optionCount % 2 === 1 && i === optionCount - 1;

                      return (
                        <motion.button
                          key={opt.id}
                          type="button"
                          onClick={() => selectOption(opt)}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.03 * i }}
                          whileHover={{ y: -2, scale: 1.01 }}
                          whileTap={{ scale: 0.985 }}
                          className={`group relative flex min-h-[52px] w-full items-center gap-2.5 overflow-hidden rounded-[16px] border px-3 py-2.5 text-left transition-all duration-300 sm:min-h-[60px] sm:gap-3.5 sm:rounded-[18px] sm:px-4 ${
                            isLastOdd
                              ? "sm:col-span-2 sm:mx-auto sm:max-w-[calc(50%-6px)]"
                              : ""
                          } ${
                            active
                              ? "border-transparent bg-gradient-to-r from-[#EAF4FF] to-white shadow-[0_0_0_2px_#1F7DD9,0_14px_32px_rgba(31,125,217,0.2)]"
                              : "border-[#D6E8F8]/90 bg-white/75 shadow-[0_8px_24px_rgba(31,125,217,0.08)] backdrop-blur-md hover:border-[#A8D0F5] hover:bg-white/90 hover:shadow-[0_14px_32px_rgba(31,125,217,0.14)]"
                          }`}
                        >
                          {active ? (
                            <motion.span
                              aria-hidden
                              className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(73,165,255,0.14),transparent_55%)]"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            />
                          ) : null}

                          <motion.span
                            animate={
                              active
                                ? { scale: [1, 1.06, 1], rotate: [0, -3, 0] }
                                : { scale: 1 }
                            }
                            transition={{ duration: 0.4 }}
                            className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[14px] font-extrabold transition-all duration-300 sm:h-10 sm:w-10 sm:text-[15px] ${
                              active
                                ? "bg-gradient-to-br from-[#49A5FF] to-[#174D8C] text-white shadow-[0_8px_18px_rgba(31,125,217,0.35)]"
                                : "bg-gradient-to-br from-[#EAF4FF] to-[#DCEEFF] text-[#1F7DD9]"
                            }`}
                          >
                            {opt.letter}
                          </motion.span>

                          <span
                            className={`relative min-w-0 flex-1 break-words text-[13px] font-semibold leading-snug sm:text-[14px] ${
                              active ? "text-[#174D8C]" : "text-[#333333]"
                            }`}
                          >
                            {opt.label}
                          </span>

                          <AnimatePresence>
                            {active ? (
                              <motion.span
                                initial={{ scale: 0, opacity: 0, rotate: -40 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 18,
                                }}
                                className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#49A5FF] to-[#174D8C] text-white shadow-[0_6px_14px_rgba(31,125,217,0.3)]"
                              >
                                <Check size={13} strokeWidth={2.75} />
                              </motion.span>
                            ) : null}
                          </AnimatePresence>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative shrink-0 border-t border-[#E8F1FA]/80 bg-white/90 px-4 py-2.5 backdrop-blur-md sm:px-8 sm:py-3">
              <div className="flex items-center justify-between gap-2 sm:gap-3">
                <motion.button
                  type="button"
                  onClick={handlePrev}
                  disabled={index === 0}
                  whileHover={index === 0 ? undefined : { scale: 1.02 }}
                  whileTap={index === 0 ? undefined : { scale: 0.98 }}
                  className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full border border-[#D6E8F8] bg-white px-3 text-[13px] font-semibold text-[#333333] shadow-sm disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:flex-none sm:gap-2 sm:px-5 sm:text-[14px]"
                >
                  <ArrowLeft size={15} />
                  <span className="truncate">Previous</span>
                </motion.button>

                {!isLast ? (
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    disabled={!selected}
                    whileHover={!selected ? undefined : { scale: 1.02 }}
                    whileTap={!selected ? undefined : { scale: 0.98 }}
                    className="btn-tops inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-3 text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:flex-none sm:gap-2 sm:px-7 sm:text-[14px]"
                  >
                    <span className="truncate">Next</span>
                    <motion.span
                      animate={selected ? { x: [0, 3, 0] } : {}}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight size={15} />
                    </motion.span>
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!selected}
                    whileHover={!selected ? undefined : { scale: 1.02 }}
                    whileTap={!selected ? undefined : { scale: 0.98 }}
                    className="btn-tops inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-3 text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:flex-none sm:px-7 sm:text-[14px]"
                  >
                    Submit
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <div className="relative z-10 shrink-0">
        <Footer />
      </div>
    </motion.div>
  );
}
