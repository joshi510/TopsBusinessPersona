"use client";

import {
  Boxes,
  Building2,
  FlaskConical,
  Gem,
  Settings2,
  Shirt,
  Truck,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ACCENTS, type Accent } from "@/lib/accent-colors";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const industries: {
  icon: typeof Boxes;
  label: string;
  accent: Accent;
}[] = [
  { icon: Boxes, label: "Ceramics & Tiles", accent: ACCENTS.orange },
  { icon: Shirt, label: "Textile & Denim", accent: ACCENTS.indigo },
  { icon: Gem, label: "Diamond & Jewellery", accent: ACCENTS.rose },
  { icon: FlaskConical, label: "Chemicals & Pharma", accent: ACCENTS.purple },
  { icon: Settings2, label: "Engineering & Auto", accent: ACCENTS.blue },
  { icon: Truck, label: "Logistics & Freight", accent: ACCENTS.cyan },
  { icon: Building2, label: "Real Estate", accent: ACCENTS.amber },
];

export function TrustIndustriesBar() {
  const reduce = useReducedMotion();

  return (
    <section id="industries" className="relative z-10 px-6 pb-6 sm:px-8 sm:pb-7 lg:px-10 lg:pb-8">
      <div className="mx-auto w-full max-w-[1440px]">
        <motion.div
          className="w-full rounded-[22px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_8px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:rounded-[24px] sm:p-6 lg:rounded-[28px] lg:p-8"
          variants={reduce ? undefined : fadeUp}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={viewportOnce}
        >
          <h2 className="mb-6 text-center font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-slate-700 sm:mb-7 sm:text-[13px] lg:mb-8">
            Built for Industries That{" "}
            <span className="text-[#2563EB]">Power India</span>
          </h2>

          <motion.div
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-7 xl:gap-5"
            variants={reduce ? undefined : staggerContainer(0.06)}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={viewportOnce}
          >
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <motion.div
                  key={ind.label}
                  variants={
                    reduce
                      ? undefined
                      : {
                          hidden: { opacity: 0, y: 20, scale: 0.94 },
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
                          boxShadow: `0 16px 40px ${ind.accent.glow}`,
                        }
                  }
                  transition={{ type: "spring", stiffness: 380, damping: 24 }}
                  className="flex h-full min-h-[120px] w-full flex-col items-center justify-center gap-2.5 rounded-[18px] border border-slate-200/90 bg-white px-2 py-4 shadow-[0_8px_40px_rgba(15,23,42,0.06)] sm:min-h-[128px] sm:gap-3 sm:rounded-[20px] lg:min-h-[140px] lg:rounded-[22px] xl:px-1"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14 lg:h-[60px] lg:w-[60px]"
                    style={{ backgroundColor: ind.accent.light }}
                  >
                    <Icon
                      size={28}
                      strokeWidth={1.75}
                      className="h-6 w-6 sm:h-7 sm:w-7"
                      style={{ color: ind.accent.color }}
                      aria-hidden
                    />
                  </div>
                  <span className="max-w-[140px] text-center text-[12px] font-semibold leading-tight tracking-tight text-slate-700 sm:max-w-[150px] sm:text-[13px]">
                    {ind.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
