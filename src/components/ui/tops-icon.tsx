"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Icon as PhosphorIcon, IconProps } from "@phosphor-icons/react";

const SIZE = 24;
const WEIGHT: IconProps["weight"] = "duotone";

interface TopsIconProps {
  icon: PhosphorIcon;
  className?: string;
  tone?: "brand" | "white" | "muted";
  color?: string;
  size?: number;
  weight?: IconProps["weight"];
}

const toneClass = {
  brand: "text-[#1F7DD9]",
  white: "text-white",
  muted: "text-[#479ED7]",
} as const;

export function TopsIcon({
  icon: Icon,
  className = "",
  tone = "brand",
  color,
  size = SIZE,
  weight = WEIGHT,
}: TopsIconProps) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      whileHover={
        reduce ? undefined : { scale: 1.12, rotate: -6, y: -1 }
      }
      transition={{ type: "spring", stiffness: 380, damping: 18 }}
    >
      <Icon
        size={size}
        weight={weight}
        className={color ? undefined : toneClass[tone]}
        style={color ? { color } : undefined}
        aria-hidden
      />
    </motion.span>
  );
}

export const ICON_SIZE = SIZE;
export const ICON_WEIGHT = WEIGHT;
