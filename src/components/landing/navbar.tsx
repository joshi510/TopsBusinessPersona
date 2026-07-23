"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { fadeDown } from "@/lib/motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#assessment", label: "Assessment" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#ai-employees", label: "AI Employees" },
  { href: "/#industries", label: "Industries" },
  { href: "/#about", label: "About" },
];

export function Navbar({
  title,
}: {
  title?: string;
} = {}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
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

        {/* Desktop / large tablet links */}
        {!title ? (
          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex xl:gap-2"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-[13px] font-semibold text-slate-600 transition hover:bg-[#49A5FF]/10 hover:text-[#1F7DD9] xl:px-3.5 xl:text-[14px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}

        <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
          {title ? (
            <span className="max-w-[52vw] truncate text-right text-[13px] font-semibold text-[#174D8C] sm:max-w-none sm:whitespace-nowrap sm:text-[15px]">
              {title}
            </span>
          ) : null}

          {/* Mobile + tablet menu (hidden when desktop links show) */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-[#174D8C] shadow-sm backdrop-blur-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F7DD9] lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="gap-0 p-0">
              <SheetHeader className="border-b border-slate-100 px-6 py-5 pr-14 pt-[max(1.25rem,env(safe-area-inset-top))]">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Site sections
                </SheetDescription>
                <Image
                  src="/tops-logo.png"
                  alt="TOPS Technologies"
                  width={140}
                  height={32}
                  className="h-7 w-auto object-contain"
                />
              </SheetHeader>

              <nav
                className="flex flex-col gap-1 px-3 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
                aria-label="Mobile"
              >
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="flex min-h-12 items-center rounded-xl px-3 text-[15px] font-semibold text-slate-700 transition hover:bg-[#49A5FF]/10 hover:text-[#1F7DD9]"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
