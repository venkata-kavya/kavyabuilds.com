import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";

// --- UI Components ---
import Preloader from "./components/ui/Preloader";
import Cursor from "./components/ui/Cursor";
import MorphingInterface from "./components/ui/MorphingInterface";
import Footer from "./components/ui/Footer";

// --- Section Components ---
import Hero from "./components/sections/Hero";
import Intro from "./components/sections/Intro";
import FeatureEngine from "./components/sections/FeatureEngine";
import Arsenal from "./components/sections/Arsenal";
import Work from "./components/sections/Work";
import Contact from "./components/sections/Contact";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    // Initialize Lenis for smooth inertial scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      smoothWheel: true,
      touchMultiplier: 0,
      wheelMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] selection:bg-[#00F0FF] selection:text-black">
      {/* 1. Custom Cursor (Hidden on touch devices via CSS) */}
      <Cursor />

      {/* 2. Preloader Sequence */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader setLoading={setIsLoading} />}
      </AnimatePresence>

      {/* 3. Navigation Bar */}
      {!isLoading && <MorphingInterface />}

      {/* 4. Main Content Flow */}
      <main className="relative z-10">
        <Hero />
        <Intro />
        <FeatureEngine />
        <Arsenal />
        <Work />
        <Contact />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
