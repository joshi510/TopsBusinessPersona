"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function PageLoader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      return;
    }

    let frame = 0;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        frame = window.setTimeout(() => setVisible(false), 220);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(frame);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={!visible}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              animate={
                reduce
                  ? undefined
                  : { scale: [1, 1.04, 1], opacity: [0.92, 1, 0.92] }
              }
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/tops-logo.png"
                alt="TOPS Technologies"
                width={180}
                height={42}
                className="h-10 w-auto object-contain"
                priority
              />
            </motion.div>

            <div className="h-1 w-44 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#49A5FF] via-[#1F7DD9] to-[#174D8C]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[11px] font-medium tracking-wide text-slate-400">
              {progress}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
