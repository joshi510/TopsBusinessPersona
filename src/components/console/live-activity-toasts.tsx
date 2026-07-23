"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  CalendarDays,
  Check,
  CheckCircle2,
  Database,
  FileText,
  Mail,
  MessageSquare,
  Receipt,
  Target,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ToastCorner =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center"
  | "mid-right"
  | "mid-left";

type LiveMsg = {
  id: number;
  time: string;
  action: string;
  status: "Completed" | "Delivered";
  icon: LucideIcon;
  gradient: string;
  accent: string;
  badge?: string;
  corner: ToastCorner;
};

const CORNERS: ToastCorner[] = [
  "top-right",
  "bottom-left",
  "top-left",
  "bottom-right",
  "mid-right",
  "top-center",
  "mid-left",
  "bottom-center",
  "top-right",
];

/** Safer spots on phones — avoid mid-side which can feel off-screen */
const MOBILE_CORNERS: ToastCorner[] = [
  "top-center",
  "bottom-center",
  "top-right",
  "bottom-left",
  "top-left",
  "bottom-right",
  "top-center",
  "bottom-center",
  "top-center",
];

const LIVE_MSG_POOL: Omit<LiveMsg, "id" | "time" | "corner">[] = [
  {
    action: "Lead received from website",
    status: "Completed",
    icon: Target,
    gradient: "linear-gradient(135deg, #3B82F6, #06B6D4)",
    accent: "#3B82F6",
  },
  {
    action: "Quotation generated",
    status: "Completed",
    icon: FileText,
    gradient: "linear-gradient(135deg, #A855F7, #EC4899)",
    accent: "#A855F7",
  },
  {
    action: "CRM updated",
    status: "Completed",
    icon: Database,
    gradient: "linear-gradient(135deg, #F97316, #F59E0B)",
    accent: "#F97316",
  },
  {
    action: "WhatsApp sent",
    status: "Delivered",
    icon: MessageSquare,
    gradient: "linear-gradient(135deg, #22C55E, #10B981)",
    accent: "#22C55E",
  },
  {
    action: "Email follow-up delivered",
    status: "Delivered",
    icon: Mail,
    gradient: "linear-gradient(135deg, #EF4444, #F97316)",
    accent: "#EF4444",
  },
  {
    action: "Meeting reminder scheduled",
    status: "Completed",
    icon: CalendarDays,
    gradient: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    accent: "#6366F1",
  },
  {
    action: "Invoice prepared",
    status: "Completed",
    icon: Receipt,
    gradient: "linear-gradient(135deg, #14B8A6, #0D9488)",
    accent: "#14B8A6",
  },
  {
    action: "Dashboard metrics synced",
    status: "Completed",
    icon: BarChart3,
    gradient: "linear-gradient(135deg, #0EA5E9, #3B82F6)",
    accent: "#0EA5E9",
  },
  {
    action: "Today's task is done",
    status: "Completed",
    icon: CheckCircle2,
    gradient: "linear-gradient(135deg, #22C55E, #16A34A)",
    accent: "#16A34A",
    badge: "Done",
  },
];

const CORNER_CLASS: Record<ToastCorner, string> = {
  "top-right": "fixed right-3 top-[76px] sm:right-5 sm:top-24",
  "top-left": "fixed left-3 top-[76px] sm:left-5 sm:top-24",
  "bottom-right":
    "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-3 sm:bottom-6 sm:right-5",
  "bottom-left":
    "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-3 sm:bottom-6 sm:left-5",
  "top-center":
    "fixed inset-x-3 top-[76px] flex justify-center sm:inset-x-0 sm:top-24",
  "bottom-center":
    "fixed inset-x-3 bottom-[max(1rem,env(safe-area-inset-bottom))] flex justify-center sm:inset-x-0 sm:bottom-6",
  "mid-right":
    "fixed right-3 top-0 bottom-0 flex items-center sm:right-5",
  "mid-left":
    "fixed left-3 top-0 bottom-0 flex items-center sm:left-5",
};

function slideFor(corner: ToastCorner) {
  switch (corner) {
    case "top-right":
      return { enter: { x: 90, y: -24 }, exit: { x: 70, y: -12 } };
    case "top-left":
      return { enter: { x: -90, y: -24 }, exit: { x: -70, y: -12 } };
    case "bottom-right":
      return { enter: { x: 90, y: 40 }, exit: { x: 70, y: 24 } };
    case "bottom-left":
      return { enter: { x: -90, y: 40 }, exit: { x: -70, y: 24 } };
    case "top-center":
      return { enter: { x: 0, y: -50 }, exit: { x: 0, y: -28 } };
    case "bottom-center":
      return { enter: { x: 0, y: 50 }, exit: { x: 0, y: 28 } };
    case "mid-right":
      return { enter: { x: 90, y: 0 }, exit: { x: 70, y: 0 } };
    case "mid-left":
      return { enter: { x: -90, y: 0 }, exit: { x: -70, y: 0 } };
  }
}

function formatLiveTime() {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function LiveActivityToasts({ employeeName }: { employeeName: string }) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<LiveMsg | null>(null);
  const [isNarrow, setIsNarrow] = useState(true);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let idx = 0;
    let cancelled = false;
    let hideTimer: number | undefined;
    let nextTimer: number | undefined;

    const showNext = () => {
      if (cancelled || idx >= LIVE_MSG_POOL.length) return;
      const seed = LIVE_MSG_POOL[idx]!;
      const isLast = idx === LIVE_MSG_POOL.length - 1;
      const corners = window.matchMedia("(max-width: 639px)").matches
        ? MOBILE_CORNERS
        : CORNERS;
      const corner = corners[idx % corners.length]!;
      idx += 1;
      const msg: LiveMsg = {
        ...seed,
        id: Date.now() + idx,
        time: formatLiveTime(),
        corner,
      };
      setToast(msg);
      hideTimer = window.setTimeout(() => {
        if (cancelled) return;
        setToast(null);
        if (!isLast) {
          nextTimer = window.setTimeout(showNext, 900);
        }
      }, isLast ? 4800 : 3400);
    };

    const start = window.setTimeout(showNext, 1000);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
      if (hideTimer) window.clearTimeout(hideTimer);
      if (nextTimer) window.clearTimeout(nextTimer);
    };
  }, []);

  if (!mounted) return null;

  const slide = toast ? slideFor(toast.corner) : null;

  return createPortal(
    <AnimatePresence mode="wait">
      {toast && slide ? (
        <div
          key={`slot-${toast.id}`}
          className={`pointer-events-none z-[300] ${CORNER_CLASS[toast.corner]}`}
        >
          <motion.div
            key={toast.id}
            initial={
              reduce
                ? false
                : {
                    opacity: 0,
                    ...(isNarrow
                      ? { y: toast.corner.includes("bottom") ? 36 : -36, x: 0 }
                      : slide.enter),
                    scale: 0.94,
                  }
            }
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={
              reduce
                ? undefined
                : {
                    opacity: 0,
                    ...(isNarrow
                      ? { y: toast.corner.includes("bottom") ? 24 : -24, x: 0 }
                      : slide.exit),
                    scale: 0.96,
                  }
            }
            transition={
              reduce
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 320, damping: 26 }
            }
            className="pointer-events-auto w-[min(100vw-1.5rem,320px)] overflow-hidden rounded-[20px] border border-white/80 bg-white shadow-[0_20px_50px_rgba(31,125,217,0.28)]"
          >
            <div
              className="h-1.5 w-full"
              style={{ background: toast.gradient }}
            />
            <div className="flex items-start gap-3 p-3.5 sm:p-4">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/70 text-white shadow-md"
                style={{ background: toast.gradient }}
              >
                <toast.icon className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    {toast.time}
                  </p>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                    style={{ background: toast.accent }}
                  >
                    {toast.badge ?? "Live"}
                  </span>
                </div>
                <p className="mt-1 text-[13px] font-bold leading-snug text-[#0F172A] sm:text-[14px]">
                  {toast.action}
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                  by {employeeName}
                </p>
                <p
                  className="mt-2 inline-flex items-center gap-1 text-[12px] font-bold"
                  style={{ color: toast.accent }}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  {toast.status}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
