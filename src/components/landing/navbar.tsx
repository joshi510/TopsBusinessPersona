"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { List } from "@phosphor-icons/react";
import { fadeDown } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Navbar({
  title,
}: {
  title?: string;
} = {}) {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      variants={reduce ? undefined : fadeDown}
      initial={reduce ? false : "hidden"}
      animate="show"
      className={cn(
        "sticky top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300",
        scrolled
          ? "border-b border-slate-200/70 bg-white/90 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[64px] w-full max-w-[1180px] items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 md:px-6">
        <Link href="/" className="min-w-0 shrink">
          <Image
            src="/tops-logo.png"
            alt="TOPS Technologies"
            width={150}
            height={34}
            className="h-7 w-auto max-w-[120px] object-contain sm:h-8 sm:max-w-none"
            priority
          />
        </Link>

        <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
          {title ? (
            <span className="max-w-[52vw] truncate text-right text-[13px] font-semibold text-[#174D8C] sm:max-w-none sm:whitespace-nowrap sm:text-[15px]">
              {title}
            </span>
          ) : null}

          {/* Decorative menu icon — visible on mobile/tablet, not clickable */}
          <span
            aria-hidden
            className="pointer-events-none inline-flex h-11 w-11 select-none items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-[#174D8C] shadow-sm backdrop-blur-md lg:hidden"
          >
            <List size={22} weight="bold" />
          </span>
        </div>
      </div>
    </motion.header>
  );
}
