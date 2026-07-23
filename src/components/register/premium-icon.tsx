"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PremiumIconProps = {
  icon: LucideIcon;
  focused?: boolean;
  delay?: number;
  className?: string;
  size?: number;
};

export function PremiumIcon({
  icon: Icon,
  focused = false,
  delay = 0,
  className,
  size = 20,
}: PremiumIconProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reduce
          ? undefined
          : { scale: 1.08, rotate: 3, y: -1 }
      }
      className={cn("cursor-pointer", className)}
    >
      <motion.div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg backdrop-blur-sm transition-all duration-300 sm:h-[42px] sm:w-[42px] sm:rounded-xl",
          focused
            ? "border border-violet-300/70 bg-gradient-to-br from-violet-500/20 to-blue-500/20"
            : "border border-violet-200/40 bg-gradient-to-br from-violet-500/10 to-blue-500/10"
        )}
        animate={
          reduce
            ? undefined
            : focused
              ? {
                  boxShadow: [
                    "0 0 0 rgba(139,92,246,0)",
                    "0 0 12px rgba(139,92,246,0.18)",
                    "0 0 0 rgba(139,92,246,0)",
                  ],
                }
              : { boxShadow: "0 0 0 rgba(139,92,246,0)" }
        }
        transition={
          focused
            ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
      >
        <motion.div
          animate={
            reduce
              ? undefined
              : focused
                ? { scale: [1, 1.08, 1] }
                : { scale: 1 }
          }
          transition={
            focused
              ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.25 }
          }
        >
          <Icon
            className={cn(
              "transition-colors duration-300",
              focused ? "text-[#7C3AED]" : "text-[#6366F1]"
            )}
            style={{ width: size, height: size }}
            strokeWidth={2}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
