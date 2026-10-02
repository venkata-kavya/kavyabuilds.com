import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let frame;
    const duration = 3600;
    const start = performance.now();

    const animate = (time) => {
      const elapsed = time - start;
      const percentage = Math.min(elapsed / duration, 1);

      setProgress(Math.floor(percentage * 100));

      if (percentage < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setProgress(100);

        setTimeout(() => {
          setIsComplete(true);
        }, 300);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

  const status =
    progress < 20
      ? "INITIALIZING"
      : progress < 45
        ? "LOADING EXPERIENCE"
        : progress < 70
          ? "BUILDING INTERFACE"
          : progress < 90
            ? "REFINING DETAILS"
            : progress < 100
              ? "ALMOST READY"
              : "READY";

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.015,
            filter: "blur(3px)",
            transition: {
              duration: 0.75,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="
            fixed
            inset-0
            z-[99999]
            overflow-hidden
            bg-[#050505]
            text-white
          "
        >
          {/* =====================================================
              AMBIENT LIGHT
          ====================================================== */}

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.18, 0.28, 0.18],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              h-[360px]
              w-[360px]
              rounded-full
              bg-cyan-400/[0.035]
              blur-[100px]
              pointer-events-none
            "
          />

          {/* =====================================================
              FINE GRID
          ====================================================== */}

          <div
            className="
              absolute
              inset-0
              pointer-events-none
              opacity-[0.025]
              bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
              bg-[size:70px_70px]
            "
          />

          {/* =====================================================
              MOVING SCAN
          ====================================================== */}

          <motion.div
            initial={{ y: "-120%" }}
            animate={{ y: "120%" }}
            transition={{
              duration: 4.2,
              ease: "linear",
              repeat: Infinity,
            }}
            className="
              absolute
              left-0
              right-0
              h-[180px]
              pointer-events-none
              bg-gradient-to-b
              from-transparent
              via-cyan-400/[0.025]
              to-transparent
            "
          />

          {/* =====================================================
              TOP BRANDING
          ====================================================== */}

          <div
            className="
              absolute
              top-7
              left-6
              right-6
              md:left-10
              md:right-10
              flex
              items-center
              justify-between
            "
          >
            <div className="flex items-center gap-3">
              <motion.span
                animate={{
                  opacity: [0.35, 1, 0.35],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-cyan-400
                  shadow-[0_0_10px_rgba(0,240,255,0.7)]
                "
              />

              <span
                className="
                  font-mono
                  text-[8px]
                  tracking-[0.38em]
                  text-white/40
                "
              >
                KAVYA BUILDS
              </span>
            </div>

            <span
              className="
                font-mono
                text-[7px]
                tracking-[0.3em]
                text-white/15
              "
            >
              PORTFOLIO / 2026
            </span>
          </div>

          {/* =====================================================
              MAIN LOADER
          ====================================================== */}

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
          >
            <div className="w-[250px] sm:w-[340px]">
              {/* Top metadata */}

              <div className="flex items-center justify-between mb-7">
                <div className="flex items-center gap-3">
                  <span
                    className="
                      font-mono
                      text-[7px]
                      tracking-[0.3em]
                      text-cyan-400/50
                    "
                  >
                    001
                  </span>

                  <span className="h-px w-8 bg-white/[0.08]" />

                  <span
                    className="
                      font-mono
                      text-[7px]
                      tracking-[0.28em]
                      text-white/20
                    "
                  >
                    SYSTEM LOAD
                  </span>
                </div>

                <span
                  className="
                    font-mono
                    text-[7px]
                    tracking-[0.25em]
                    text-white/15
                  "
                >
                  {status}
                </span>
              </div>

              {/* Percentage */}

              <div className="flex items-baseline justify-between">
                <span
                  className="
                    font-sans
                    text-[clamp(3.5rem,8vw,5.5rem)]
                    font-medium
                    leading-none
                    tracking-[-0.07em]
                    text-white/[0.92]
                    tabular-nums
                  "
                >
                  {String(progress).padStart(2, "0")}
                </span>

                <span
                  className="
                    font-mono
                    text-[9px]
                    tracking-[0.2em]
                    text-cyan-400/45
                  "
                >
                  PERCENT
                </span>
              </div>

              {/* Progress line */}

              <div className="mt-6 relative">
                <div
                  className="
                    relative
                    h-[2px]
                    w-full
                    overflow-hidden
                    bg-white/[0.09]
                  "
                >
                  <motion.div
                    className="
                      absolute
                      left-0
                      top-0
                      h-full
                      bg-cyan-400
                      shadow-[0_0_12px_rgba(0,240,255,0.65)]
                    "
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                  <motion.div
                    className="
                      absolute
                      top-0
                      h-full
                      w-10
                      bg-gradient-to-r
                      from-transparent
                      via-white
                      to-transparent
                      opacity-70
                    "
                    style={{
                      left: `${Math.max(progress - 5, 0)}%`,
                    }}
                  />
                </div>

                {/* Tick marks */}

                <div className="absolute -top-1 left-0 right-0 flex justify-between pointer-events-none">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tick) => (
                    <span
                      key={tick}
                      className={`
                          w-px
                          ${
                            tick === 0 || tick === 10
                              ? "h-3 bg-white/20"
                              : "h-2 bg-white/[0.08]"
                          }
                        `}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom metadata */}

              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{
                      opacity: [0.2, 1, 0.2],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                    className="
                      h-1
                      w-1
                      rounded-full
                      bg-cyan-400
                    "
                  />

                  <span
                    className="
                      font-mono
                      text-[7px]
                      tracking-[0.3em]
                      text-white/20
                    "
                  >
                    {status}
                  </span>
                </div>

                <span
                  className="
                    font-mono
                    text-[7px]
                    tracking-[0.25em]
                    text-white/15
                  "
                >
                  00 — 100
                </span>
              </div>
            </div>
          </div>

          {/* =====================================================
              SIDE DETAILS
          ====================================================== */}

          <div
            className="
              absolute
              left-6
              top-1/2
              -translate-y-1/2
              hidden
              md:block
            "
          >
            <div className="flex flex-col gap-2">
              <span className="h-1 w-1 bg-white/15 rounded-full" />
              <span className="h-6 w-px bg-white/[0.07]" />
              <span className="h-1 w-1 bg-cyan-400/30 rounded-full" />
              <span className="h-10 w-px bg-white/[0.05]" />
              <span className="h-1 w-1 bg-white/10 rounded-full" />
            </div>
          </div>

          <div
            className="
              absolute
              right-6
              top-1/2
              -translate-y-1/2
              hidden
              md:block
            "
          >
            <div className="flex flex-col items-end gap-2">
              <span className="font-mono text-[6px] tracking-[0.25em] text-white/10">
                01
              </span>
              <span className="h-12 w-px bg-white/[0.06]" />
              <span className="font-mono text-[6px] tracking-[0.25em] text-white/10">
                02
              </span>
              <span className="h-12 w-px bg-white/[0.06]" />
              <span className="font-mono text-[6px] tracking-[0.25em] text-cyan-400/25">
                03
              </span>
            </div>
          </div>

          {/* =====================================================
              BOTTOM
          ====================================================== */}

          <div
            className="
              absolute
              bottom-7
              left-6
              right-6
              md:left-10
              md:right-10
              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                font-mono
                text-[6px]
                tracking-[0.35em]
                text-white/10
              "
            >
              DESIGN / ENGINEERING / EXPERIENCE
            </span>

            <span
              className="
                font-mono
                text-[6px]
                tracking-[0.3em]
                text-white/10
              "
            >
              HYDERABAD / IN
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
