import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";

// =====================================================
// UI COMPONENTS
// =====================================================

import Preloader from "./components/ui/Preloader";
import Cursor from "./components/ui/Cursor";
import MorphingInterface from "./components/ui/MorphingInterface";
import Footer from "./components/ui/Footer";

// =====================================================
// SECTION COMPONENTS
// =====================================================

import Hero from "./components/sections/Hero";
import Intro from "./components/sections/Intro";
import FeatureEngine from "./components/sections/FeatureEngine";
import Arsenal from "./components/sections/Arsenal";
import Work from "./components/sections/Work";
import Contact from "./components/sections/Contact";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // =====================================================
  // LENIS SMOOTH SCROLL
  // =====================================================

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 0,
      wheelMultiplier: 1.2,
    });

    let animationFrame;

    const raf = (time) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  return (
    <div
      className="
        relative
        min-h-screen
        bg-[#050505]
        selection:bg-[#00F0FF]
        selection:text-black
      "
    >
      {/* =================================================
          CUSTOM CURSOR
      ================================================= */}

      <Cursor />

      {/* =================================================
          PRELOADER
      ================================================= */}

      <AnimatePresence mode="wait">
        {isLoading && <Preloader setLoading={setIsLoading} />}
      </AnimatePresence>

      {/* =================================================
          MORPHING INTERFACE
          
          Appears after the preloader completes.
      ================================================= */}

      {!isLoading && <MorphingInterface />}

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="relative z-10">
        <Hero />

        <Intro />

        <FeatureEngine />

        <Arsenal />

        <Work />

        <Contact />
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />
    </div>
  );
}
