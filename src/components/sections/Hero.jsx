import React, { useState, Suspense, memo } from "react";
import Spline from "@splinetool/react-spline";
import { motion } from "framer-motion";
import useIsMobile from "../../hooks/useIsMobile";

// Optimized Spline Component
const SplineScene = memo(({ url, onLoad }) => (
  <Spline scene={url} onLoad={onLoad} renderOnDemand={true} />
));

// Lightweight Mobile Aurora
const Aurora = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div
      className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.15),transparent_50%)] animate-spin-slow"
      style={{ animationDuration: "20s" }}
    />
    <div
      className="absolute bottom-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(0,209,160,0.1),transparent_50%)] animate-spin-slow"
      style={{ animationDuration: "30s", animationDirection: "reverse" }}
    />
  </div>
);

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();
  const SPLINE_SCENE_URL =
    "https://prod.spline.design/L3MeEDFs710JuJgp/scene.splinecode";

  // Auto-set loaded true on mobile since we skip Spline loading
  React.useEffect(() => {
    if (isMobile) setIsLoaded(true);
  }, [isMobile]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 portal-glow" />

      {/* Mobile Optimization: Aurora instead of 3D Scene */}
      {isMobile && <Aurora />}

      <div className="relative z-10 h-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-6 md:px-12">
        <div className="pointer-events-none order-2 lg:order-1 z-20 mix-blend-difference pb-24 lg:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="font-mono text-xs font-medium text-cyan-300 tracking-widest">
                KAVYABUILDS // ONLINE
              </span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={isLoaded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[14vw] lg:text-[10vw] leading-[0.85] font-semibold tracking-tighter text-white uppercase select-none text-left"
          >
            BENDING
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-900">
              REALITY.
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-10 flex flex-col gap-1 text-left"
          >
            <h3 className="text-2xl md:text-3xl font-light text-white">
              Creative Developer
            </h3>
            <div className="flex items-center gap-3 font-mono text-sm text-gray-500 mt-1">
              <span>WEBGL</span>
              <span className="w-1 h-1 bg-gray-700 rounded-full" />
              <span>INTERACTION</span>
              <span className="w-1 h-1 bg-gray-700 rounded-full" />
              <span>UX ENGINEERING</span>
            </div>
          </motion.div>
        </div>

        {/* Desktop Only: Heavy Spline Scene */}
        {!isMobile && (
          <div className="relative w-full h-[50vh] lg:h-full order-1 lg:order-2 flex items-center justify-center lg:justify-end z-10">
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs font-mono text-cyan-500/50">
                LOADING_PHYSICS...
              </div>
            )}
            <motion.div
              className="w-full h-full scale-[1.2] lg:scale-100 origin-center lg:origin-right spline-mask transform-gpu"
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <Suspense fallback={null}>
                <SplineScene
                  url={SPLINE_SCENE_URL}
                  onLoad={() => setIsLoaded(true)}
                />
              </Suspense>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
