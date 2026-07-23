"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  BarChart3,
  Bell,
  BookOpen,
  Brain,
  Building2,
  Calculator,
  Calendar,
  Check,
  CheckCircle2,
  CheckSquare,
  ClipboardList,
  CreditCard,
  Database,
  Eye,
  Factory,
  FileText,
  Filter,
  BriefcaseBusiness,
  GitBranch,
  Globe,
  HelpCircle,
  Inbox,
  Link as LinkIcon,
  ListChecks,
  ListOrdered,
  ListTodo,
  Mail,
  MessageCircle,
  MessageSquare,
  MonitorPlay,
  Package,
  Phone,
  Receipt,
  RefreshCw,
  Rocket,
  Search,
  Send,
  Settings,
  Share2,
  Shield,
  Smile,
  Sparkles,
  Target,
  Ticket,
  Timer,
  TrendingUp,
  UserCheck,
  UserSearch,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { LiveActivityToasts } from "@/components/console/live-activity-toasts";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Button } from "@/components/ui/button";
import {
  loadPersistedAssessment,
  loadRegistrationFromIntake,
} from "@/lib/assessment/storage";
import type { RegistrationData } from "@/lib/assessment/types";
import {
  friendlyRoleLabel,
  getConsoleAutomations,
  getConsoleCapabilities,
  getConsoleKpis,
  getConsoleWorkflow,
} from "@/lib/console-ui-content";
import { getEmployeeAsset } from "@/lib/employeeAssets";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  MessageCircle,
  Database,
  FileText,
  MessageSquare,
  Bell,
  CheckCircle2,
  ClipboardList,
  Sparkles,
  Eye,
  Share2,
  BarChart3,
  Inbox,
  UserCheck,
  Settings,
  RefreshCw,
  Send,
  CreditCard,
  Calculator,
  Ticket,
  Filter,
  GitBranch,
  Smile,
  Phone,
  Search,
  Calendar,
  HelpCircle,
  Brain,
  Link: LinkIcon,
  ListOrdered,
  UserSearch,
  ListChecks,
  Rocket,
  Mail,
  Target,
  Zap,
  Users,
  Package,
  Activity,
  AlertTriangle,
  Wallet,
  Receipt,
  TrendingUp,
  Globe,
  Shield,
  BookOpen,
  CheckSquare,
  ListTodo,
};

function resolveIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Sparkles;
}

/** Multi-color icon backgrounds (not role-blue only) */
const ICON_COLORS = [
  "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)", // blue → cyan
  "linear-gradient(135deg, #10B981 0%, #22C55E 100%)", // emerald → green
  "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)", // purple → pink
  "linear-gradient(135deg, #F97316 0%, #F59E0B 100%)", // orange → amber
  "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)", // indigo
  "linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)", // teal
  "linear-gradient(135deg, #EF4444 0%, #F97316 100%)", // red → orange
  "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)", // violet → cyan
];

const ARROW_COLORS = [
  "#3B82F6",
  "#10B981",
  "#A855F7",
  "#F97316",
  "#6366F1",
  "#14B8A6",
  "#EF4444",
];

function Glass({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "relative overflow-hidden rounded-[20px] border border-white/70 bg-white/80 shadow-[0_16px_48px_rgba(31,125,217,0.08)] backdrop-blur-2xl sm:rounded-[24px]",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/90 to-transparent"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function ConsoleInner() {
  const params = useSearchParams();
  const roleKey = params.get("roleKey") || "SALES";
  const industry = params.get("industry") || "Other";
  const view = params.get("view") || "demo";

  const employee = useMemo(() => getEmployeeAsset(roleKey), [roleKey]);
  const reduce = useReducedMotion();
  const [registration, setRegistration] = useState<RegistrationData | null>(
    null
  );

  useEffect(() => {
    const persisted = loadPersistedAssessment();
    setRegistration(
      persisted?.registrationData ?? loadRegistrationFromIntake()
    );
  }, []);

  const capabilities = useMemo(
    () => getConsoleCapabilities(roleKey),
    [roleKey]
  );
  const workflow = useMemo(() => getConsoleWorkflow(roleKey), [roleKey]);
  const automations = useMemo(() => getConsoleAutomations(), []);
  const kpis = useMemo(() => getConsoleKpis(roleKey), [roleKey]);
  const roleLabel = friendlyRoleLabel(roleKey, employee.title);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#F8FBFF_0%,#EAF4FF_38%,#F5FAFF_100%)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(73,165,255,0.18),_transparent_55%)]"
      />

      <div className="relative z-40 bg-transparent">
        <Navbar title="Console" />
      </div>

      <LiveActivityToasts employeeName={employee.name} />

      <main className="relative z-10 mx-auto w-full max-w-[1280px] px-3 py-4 pb-14 sm:px-6 sm:py-8 sm:pb-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1F7DD9]">
              AI Employee Workspace
            </p>
            <h1 className="mt-1 break-words text-[18px] font-extrabold leading-snug text-[#0F172A] sm:text-[24px]">
              {employee.name}
              <span className="text-slate-400"> · </span>
              {employee.title}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#EAF4FF] px-2.5 py-1.5 text-[11px] font-bold text-[#174D8C] sm:px-3 sm:text-[12px]">
              {view === "explore" ? "Explore Mode" : "Live Demo"}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700 sm:gap-2 sm:px-3 sm:text-[12px]">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              <span className="sm:hidden">Matched</span>
              <span className="hidden sm:inline">Matched from Assessment</span>
            </span>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)]">
          <motion.aside
            initial={reduce ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="flex min-w-0 flex-col gap-4 sm:gap-5 lg:sticky lg:top-[calc(5rem+env(safe-area-inset-top))] lg:self-start"
          >
            <Glass className="p-4 sm:p-6">
              <div className="relative mx-auto w-full max-w-[180px] sm:max-w-[220px]">
                <motion.div
                  animate={reduce ? undefined : { y: [0, -8, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative aspect-square overflow-hidden rounded-[24px] border border-white bg-gradient-to-br from-[#EAF4FF] to-[#D6E8F8] shadow-[0_20px_48px_rgba(31,125,217,0.18)] sm:rounded-[28px]"
                >
                  <Image
                    src={employee.avatar}
                    alt={employee.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 180px, 220px"
                    priority
                  />
                </motion.div>
                <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full border border-white bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 shadow-sm sm:bottom-3 sm:right-3 sm:px-2.5 sm:text-[11px]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Online
                </span>
              </div>

              <div className="mt-4 text-center sm:mt-5">
                <h2 className="text-[20px] font-extrabold text-[#0F172A] sm:text-[22px]">
                  {employee.name}
                </h2>
                <p className="mt-1 text-[13px] font-semibold text-slate-500 sm:text-[14px]">
                  {employee.title}
                </p>
              </div>

              <div className="mt-4 space-y-2 sm:mt-5">
                <div className="flex items-center gap-2.5 rounded-xl bg-[#F8FBFF] px-3 py-2.5 text-[13px]">
                  <Building2 className="h-4 w-4 shrink-0 text-[#1F7DD9]" />
                  <span className="min-w-0 break-words font-semibold text-[#174D8C]">
                    Industry · {industry}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-[#F8FBFF] px-3 py-2.5 text-[13px]">
                  <Sparkles className="h-4 w-4 shrink-0 text-[#1F7DD9]" />
                  <span className="min-w-0 font-semibold text-[#174D8C]">
                    Role · {roleKey}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-[#F8FBFF] px-3 py-2.5 text-[13px]">
                  <Zap className="h-4 w-4 shrink-0 text-[#1F7DD9]" />
                  <span className="font-semibold text-[#174D8C]">
                    Available 24×7
                  </span>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-[#F8FBFF] px-3 py-2.5 text-[13px]">
                  <Timer className="h-4 w-4 shrink-0 text-[#1F7DD9]" />
                  <span className="font-semibold text-[#174D8C]">
                    Response · &lt; 2s
                  </span>
                </div>
              </div>

              <div className="mt-5 sm:mt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  Specialization
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#D6E8F8] bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#174D8C] shadow-sm"
                    >
                      <Check
                        className="h-3 w-3 shrink-0 text-emerald-500"
                        strokeWidth={3}
                      />
                      <span className="min-w-0 break-words">{cap}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Glass>

            <Glass className="p-4 sm:p-6">
              <h3 className="text-[16px] font-extrabold text-[#0F172A] sm:text-[18px]">
                Company Summary
              </h3>
              <div className="mt-4 space-y-2.5">
                {(
                  [
                    {
                      label: "Company Name",
                      value:
                        registration?.companyName?.trim() || "Your Business",
                      icon: Building2,
                    },
                    {
                      label: "Industry",
                      value: registration?.industry || industry,
                      icon: Factory,
                    },
                    {
                      label: "Team Size",
                      value: registration?.teamSize || "—",
                      icon: Users,
                    },
                    {
                      label: "Your Role",
                      value: registration?.role || "—",
                      icon: BriefcaseBusiness,
                    },
                    {
                      label: "AI Employee",
                      value: `${employee.name} · ${employee.title}`,
                      icon: Sparkles,
                    },
                    {
                      label: "Matched Role",
                      value: roleKey,
                      icon: Target,
                    },
                  ] as const
                ).map((row, i) => {
                  const Icon = row.icon;
                  return (
                    <motion.div
                      key={row.label}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      whileHover={reduce ? undefined : { y: -2, scale: 1.01 }}
                      className="flex items-center gap-3 rounded-2xl border border-[#E8F1FA] bg-white px-3 py-2.5 shadow-sm"
                    >
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/70 text-white shadow-[0_8px_20px_rgba(15,23,42,0.16)]"
                        style={{
                          background: ICON_COLORS[i % ICON_COLORS.length],
                        }}
                      >
                        <Icon className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                          {row.label}
                        </p>
                        <p className="mt-0.5 break-words text-[13px] font-bold text-[#0F172A]">
                          {row.value}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Glass>
          </motion.aside>

          <div className="min-w-0 space-y-4 sm:space-y-5">
            <Glass className="p-4 sm:p-8">
              <div className="grid items-center gap-5 sm:gap-6 md:grid-cols-[1fr_auto]">
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="min-w-0 text-center md:text-left"
                >
                  <p className="text-[13px] font-bold text-[#1F7DD9]">
                    Welcome!
                  </p>
                  <h2 className="mt-2 text-[22px] font-extrabold leading-tight tracking-tight text-[#0F172A] sm:text-[28px] lg:text-[34px]">
                    I&apos;m {employee.name},
                    <br />
                    <span style={{ color: employee.accent }}>
                      Your {roleLabel}.
                    </span>
                  </h2>
                  <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-slate-500 sm:mt-4 sm:text-[15px] md:mx-0">
                    Ready to automate your business, save hours every week, and
                    help your team grow faster.
                  </p>
                </motion.div>
                <motion.div
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 160, damping: 16 }}
                  className="mx-auto flex w-full max-w-[220px] flex-col items-center gap-3 sm:gap-4 md:mx-0"
                >
                  <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-[#EAF4FF] to-[#D6E8F8] shadow-[0_16px_40px_rgba(31,125,217,0.2)] sm:h-32 sm:w-32">
                    <Image
                      src={employee.avatar}
                      alt={employee.name}
                      fill
                      className="object-cover object-top"
                      sizes="128px"
                    />
                  </div>
                  <motion.div
                    whileHover={reduce ? undefined : { y: -2, scale: 1.03 }}
                    whileTap={reduce ? undefined : { scale: 0.97 }}
                    animate={
                      reduce
                        ? undefined
                        : {
                            boxShadow: [
                              "0 6px 16px rgba(73,165,255,0.2)",
                              "0 8px 22px rgba(73,165,255,0.35)",
                              "0 6px 16px rgba(73,165,255,0.2)",
                            ],
                          }
                    }
                    transition={{
                      boxShadow: {
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="w-full rounded-full sm:w-auto"
                  >
                    <Button
                      className="relative h-11 w-full overflow-hidden rounded-full border border-[#B8DBFF] bg-gradient-to-r from-[#EAF4FF] via-[#CCE6FF] to-[#B3DAFF] px-5 text-[13px] font-semibold text-[#174D8C] shadow-sm hover:from-[#F5FAFF] hover:via-[#D9ECFF] hover:to-[#C2E0FF] hover:text-[#174D8C] sm:h-11 sm:w-auto"
                      onClick={() => {
                        scrollTo("workflow-preview");
                      }}
                    >
                      <motion.span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        animate={
                          reduce
                            ? undefined
                            : { x: ["-120%", "120%"] }
                        }
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          repeatDelay: 1.2,
                        }}
                      />
                      <MonitorPlay className="relative h-4 w-4" />
                      <span className="relative">Start Live Demo</span>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </Glass>

            <Glass className="p-4 sm:p-6">
              <h3 className="text-[16px] font-extrabold text-[#0F172A] sm:text-[18px]">
                Business Impact
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                {employee.impact.map((item, i) => {
                  const Icon = resolveIcon(item.icon);
                  return (
                    <motion.div
                      key={item.label}
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.04 * i }}
                      className="flex items-center gap-3 rounded-2xl border border-[#D6E8F8] bg-white px-3 py-3 sm:px-4"
                    >
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/70 text-white shadow-[0_8px_20px_rgba(15,23,42,0.15)]"
                        style={{
                          background: ICON_COLORS[i % ICON_COLORS.length],
                        }}
                      >
                        <Icon className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                      <span className="inline-flex min-w-0 items-center gap-2 text-[13px] font-bold text-[#174D8C] sm:text-[14px]">
                        <Check
                          className="h-3.5 w-3.5 shrink-0 text-emerald-500"
                          strokeWidth={3}
                        />
                        <span className="min-w-0 break-words">{item.label}</span>
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </Glass>

            <Glass className="p-4 sm:p-6">
              <h3 className="text-[16px] font-extrabold text-[#0F172A] sm:text-[18px]">
                Why This AI Employee?
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-600 sm:text-[15px]">
                {employee.whySelected}
              </p>
            </Glass>

            <Glass id="workflow-preview" className="scroll-mt-24 p-4 sm:p-6">
              <h3 className="text-[16px] font-extrabold text-[#0F172A] sm:text-[18px]">
                Workflow Preview
              </h3>
              <p className="mt-1 text-[13px] text-slate-500">
                How {employee.name} completes a full business workflow.
              </p>

              <div className="mt-5 flex flex-col items-stretch gap-0 lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-1">
                {workflow.map((step, i) => {
                  const Icon = resolveIcon(step.icon);
                  return (
                    <div
                      key={step.label}
                      className="flex min-w-0 flex-col items-center lg:flex-row"
                    >
                      <motion.div
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        className="flex w-full min-w-0 items-center gap-3 rounded-2xl border border-[#E8F1FA] bg-[#F8FBFF] px-3 py-3 lg:w-auto lg:min-w-[120px] lg:max-w-[150px] lg:flex-col lg:text-center"
                      >
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/70 text-white shadow-[0_8px_20px_rgba(15,23,42,0.15)]"
                          style={{
                            background: ICON_COLORS[i % ICON_COLORS.length],
                          }}
                        >
                          <Icon className="h-4 w-4" strokeWidth={2.4} />
                        </span>
                        <span className="min-w-0 break-words text-[12px] font-bold text-[#0F172A]">
                          {step.label}
                        </span>
                      </motion.div>
                      {i < workflow.length - 1 ? (
                        <ArrowDown
                          className="my-1 h-4 w-4 lg:mx-1 lg:my-0 lg:rotate-[-90deg]"
                          style={{
                            color: ARROW_COLORS[i % ARROW_COLORS.length],
                          }}
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </Glass>

            <section id="automations" className="scroll-mt-24">
              <h3 className="text-[16px] font-extrabold text-[#0F172A] sm:text-[18px]">
                Automations
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {automations.map((item, i) => {
                  const Icon = resolveIcon(item.icon);
                  return (
                    <motion.div
                      key={item.title}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
                      className="rounded-[18px] border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur sm:rounded-[20px]"
                    >
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 text-white shadow-[0_8px_20px_rgba(15,23,42,0.15)]"
                        style={{
                          background: ICON_COLORS[i % ICON_COLORS.length],
                        }}
                      >
                        <Icon className="h-4 w-4" strokeWidth={2.4} />
                      </span>
                      <p className="mt-3 text-[14px] font-extrabold text-[#0F172A]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            <section>
              <h3 className="text-[16px] font-extrabold text-[#0F172A] sm:text-[18px]">
                Business Opportunity
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    label: "Hours Saved Per Week",
                    value: kpis.hoursSaved,
                    suffix: " hrs",
                  },
                  {
                    label: "Estimated Revenue Growth",
                    value: kpis.revenueGrowth,
                    suffix: "%",
                    prefix: "+",
                  },
                  {
                    label: "Average Response Time",
                    value: 0,
                    display: kpis.responseTime,
                  },
                  {
                    label: "Tasks Automated",
                    value: kpis.tasksAutomated,
                    suffix: "+",
                  },
                ].map((kpi, i) => (
                  <motion.div
                    key={kpi.label}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={reduce ? undefined : { y: -3 }}
                    className="rounded-[18px] border border-white/80 bg-white/85 p-4 text-center shadow-sm backdrop-blur sm:rounded-[20px]"
                  >
                    <p className="text-[11px] font-bold uppercase leading-snug tracking-wide text-slate-400">
                      {kpi.label}
                    </p>
                    <p
                      className="mt-2 text-[24px] font-extrabold sm:text-[26px]"
                      style={{ color: employee.accent }}
                    >
                      {"display" in kpi && kpi.display ? (
                        kpi.display
                      ) : (
                        <AnimatedCounter
                          value={kpi.value}
                          suffix={kpi.suffix}
                          prefix={kpi.prefix}
                        />
                      )}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ConsolePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F8FBFF] text-[14px] text-[#174D8C]">
          Loading console…
        </div>
      }
    >
      <ConsoleInner />
    </Suspense>
  );
}
