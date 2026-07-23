"use client";

import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { TrustIndustriesBar } from "@/components/landing/trust-industries";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { Footer } from "@/components/landing/footer";
import { AnimatedBackground } from "@/components/motion/animated-background";
import { PageLoader } from "@/components/motion/page-loader";

export default function HomePage() {
  return (
    <>
      <PageLoader />
      <AnimatedBackground />
      <main className="relative z-10 min-h-screen overflow-x-hidden bg-transparent">
        <Navbar />
        <Hero />
        <TrustIndustriesBar />
        <FeatureGrid />
        <Footer />
      </main>
    </>
  );
}
