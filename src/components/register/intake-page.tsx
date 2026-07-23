"use client";

import { IntakeForm } from "@/components/register/intake-form";
import { IntakeVisual } from "@/components/register/intake-visual";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";

export function IntakePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <Navbar title="Registration" />
      <main className="relative grid w-full grid-cols-1 overflow-x-hidden lg:min-h-[calc(100vh-128px)] lg:grid-cols-[40%_60%] lg:items-stretch">
        {/* LEFT — Information panel (below form on mobile) */}
        <div className="order-2 flex min-w-0 border-t border-slate-100 lg:order-1 lg:border-t-0 lg:border-r lg:border-slate-100/80">
          <IntakeVisual />
        </div>

        {/* RIGHT — Registration (first on mobile) */}
        <div className="order-1 flex min-w-0 lg:order-2">
          <IntakeForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
