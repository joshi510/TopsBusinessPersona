export type Accent = {
  color: string;
  light: string;
  glow: string;
  glowStrong: string;
  gradient: [string, string];
};

export const ACCENTS = {
  blue: {
    color: "#2563EB",
    light: "#EFF6FF",
    glow: "rgba(37, 99, 235, 0.28)",
    glowStrong: "rgba(37, 99, 235, 0.45)",
    gradient: ["#60A5FA", "#2563EB"],
  },
  emerald: {
    color: "#10B981",
    light: "#ECFDF5",
    glow: "rgba(16, 185, 129, 0.28)",
    glowStrong: "rgba(16, 185, 129, 0.45)",
    gradient: ["#34D399", "#10B981"],
  },
  purple: {
    color: "#8B5CF6",
    light: "#F5F3FF",
    glow: "rgba(139, 92, 246, 0.28)",
    glowStrong: "rgba(139, 92, 246, 0.45)",
    gradient: ["#A78BFA", "#8B5CF6"],
  },
  amber: {
    color: "#F59E0B",
    light: "#FFFBEB",
    glow: "rgba(245, 158, 11, 0.28)",
    glowStrong: "rgba(245, 158, 11, 0.45)",
    gradient: ["#FBBF24", "#F59E0B"],
  },
  orange: {
    color: "#F97316",
    light: "#FFF7ED",
    glow: "rgba(249, 115, 22, 0.28)",
    glowStrong: "rgba(249, 115, 22, 0.45)",
    gradient: ["#FB923C", "#F97316"],
  },
  rose: {
    color: "#EC4899",
    light: "#FDF2F8",
    glow: "rgba(236, 72, 153, 0.28)",
    glowStrong: "rgba(236, 72, 153, 0.45)",
    gradient: ["#F472B6", "#EC4899"],
  },
  teal: {
    color: "#14B8A6",
    light: "#F0FDFA",
    glow: "rgba(20, 184, 166, 0.28)",
    glowStrong: "rgba(20, 184, 166, 0.45)",
    gradient: ["#2DD4BF", "#14B8A6"],
  },
  cyan: {
    color: "#06B6D4",
    light: "#ECFEFF",
    glow: "rgba(6, 182, 212, 0.28)",
    glowStrong: "rgba(6, 182, 212, 0.45)",
    gradient: ["#22D3EE", "#06B6D4"],
  },
  indigo: {
    color: "#6366F1",
    light: "#EEF2FF",
    glow: "rgba(99, 102, 241, 0.28)",
    glowStrong: "rgba(99, 102, 241, 0.45)",
    gradient: ["#818CF8", "#6366F1"],
  },
} as const satisfies Record<string, Accent>;

export function accentHoverShadow(accent: Accent) {
  return `0 1px 0 rgba(255,255,255,0.95) inset, 0 16px 48px ${accent.glow}, 0 0 32px ${accent.glowStrong}`;
}

export function accentIconRingStyle(accent: Accent) {
  return {
    background: `linear-gradient(145deg, ${accent.light}, rgba(255,255,255,0.95))`,
    boxShadow: `0 1px 0 rgba(255,255,255,1) inset, 0 4px 16px ${accent.glow}`,
    borderColor: `${accent.color}22`,
  };
}

export function accentGradientBg(accent: Accent) {
  return `linear-gradient(135deg, ${accent.gradient[0]} 0%, ${accent.gradient[1]} 100%)`;
}

export const TIMELINE_GRADIENT =
  "linear-gradient(90deg, #2563EB, #06B6D4, #8B5CF6, #10B981, #F97316, #EC4899)";
