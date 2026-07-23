"use client";

export function Footer() {
  return (
    <footer
      id="about"
      className="relative z-10 border-t border-[#BFDFFF]/70 bg-[linear-gradient(90deg,#EAF4FF_0%,#F5FAFF_50%,#E8F3FF_100%)]"
    >
      <div className="mx-auto flex h-auto w-full max-w-[1180px] flex-col items-center justify-center gap-2 px-6 py-5 text-center sm:h-[64px] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0 sm:text-left md:px-6">
        <p className="text-[12px] font-medium text-[#174D8C]/80 sm:text-[13px]">
          © 2026 TOPS Technologies. All rights reserved.
        </p>
        <p className="shrink-0 text-[12px] font-semibold text-[#1F7DD9] sm:text-right sm:text-[13px]">
          Discover. Match. Automate.
        </p>
      </div>
    </footer>
  );
}
