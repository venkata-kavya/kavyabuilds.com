import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import PreloaderScene from "../3d/PreloaderScene";

const Preloader = ({ setLoading }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const duration = 2400;

    const updateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out curve
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextCount = Math.floor(easedProgress * 100);

      setCount(nextCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        setCount(100);

        setTimeout(() => {
          setLoading(false);
        }, 650);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [setLoading]);

  const displayCount = String(count).padStart(3, "0");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.015,
        filter: "blur(8px)",
        transition: {
          duration: 0.9,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#050505] text-white"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,240,255,0.055),transparent_32%)]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.75)_100%)]" />
      </div>

      {/* Top identity */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute top-8 left-8 right-8 flex items-start justify-between md:top-10 md:left-10 md:right-10"
      >
        <div>
          <div className="font-mono text-[10px] tracking-[0.35em] text-white/80">
            KAVYA
          </div>

          <div className="mt-1 font-mono text-[9px] tracking-[0.28em] text-white/30">
            BUILDS
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-1.5 w-1.5 rounded-full bg-cyan-400"
          />

          <span className="font-mono text-[9px] tracking-[0.25em] text-white/30">
            SYSTEM / 01
          </span>
        </div>
      </motion.div>

      {/* Main experience */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        {/* 3D scene */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
            y: 12,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 1.1,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative h-[220px] w-[220px] md:h-[280px] md:w-[280px]"
        >
          {/* Soft atmospheric glow */}
          <div className="absolute inset-[18%] rounded-full bg-cyan-400/[0.035] blur-3xl" />

          <Canvas
            camera={{ position: [0, 0, 3.5] }}
            dpr={[1, 1.5]}
            gl={{
              antialias: false,
              powerPreference: "high-performance",
            }}
          >
            <PreloaderScene />
          </Canvas>
        </motion.div>

        {/* Loading information */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-[-4px] w-[260px] md:w-[300px]"
        >
          {/* Status row */}
          <div className="mb-3 flex items-end justify-between">
            <div>
              <div className="font-mono text-[9px] tracking-[0.28em] text-white/35">
                INITIALIZING
              </div>

              <div className="mt-1 font-mono text-[9px] tracking-[0.2em] text-cyan-400/80">
                EXPERIENCE
              </div>
            </div>

            <div className="font-mono text-[11px] tabular-nums tracking-[0.15em] text-white/70">
              {displayCount}
              <span className="ml-1 text-white/25">%</span>
            </div>
          </div>

          {/* Progress track */}
          <div className="relative h-[1px] w-full overflow-hidden bg-white/[0.09]">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white"
              style={{
                width: `${count}%`,
              }}
              transition={{
                duration: 0.08,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute inset-y-0 left-0 bg-cyan-400/70 blur-[4px]"
              style={{
                width: `${count}%`,
              }}
              transition={{
                duration: 0.08,
                ease: "linear",
              }}
            />
          </div>

          {/* Bottom metadata */}
          <div className="mt-3 flex items-center justify-between">
            <span className="font-mono text-[8px] tracking-[0.22em] text-white/20">
              CREATIVE SYSTEM
            </span>

            <span className="font-mono text-[8px] tracking-[0.22em] text-white/20">
              2026
            </span>
          </div>
        </motion.div>
      </div>

      {/* Corner coordinates / details */}
      <div className="absolute bottom-8 left-8 font-mono text-[8px] tracking-[0.25em] text-white/15 md:bottom-10 md:left-10">
        17°N / 78°E
      </div>

      <div className="absolute bottom-8 right-8 font-mono text-[8px] tracking-[0.25em] text-white/15 md:bottom-10 md:right-10">
        V.01
      </div>

      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-0 border border-white/[0.035]" />
    </motion.div>
  );
};

export default Preloader;
