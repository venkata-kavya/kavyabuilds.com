import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Preloader = ({ setLoading }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let frame;
    let timeout;

    const duration = 3600;
    const start = performance.now();

    const animate = (time) => {
      const elapsed = time - start;
      const raw = Math.min(elapsed / duration, 1);

      // Smooth progression
      const eased = 1 - Math.pow(1 - raw, 2.1);

      setProgress(Math.floor(eased * 100));

      if (raw < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setProgress(100);

        timeout = setTimeout(() => {
          setIsComplete(true);

          // Tell App.jsx that loading is finished
          setLoading(false);
        }, 300);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [setLoading]);

  const status =
    progress < 20
      ? "INITIALIZING"
      : progress < 45
        ? "LOADING"
        : progress < 70
          ? "BUILDING"
          : progress < 100
            ? "REFINING"
            : "READY";

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="preloader"
        >
          {/* Background glow */}
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.03, 0.07, 0.03],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="preloader-glow"
          />

          {/* Grid */}
          <div className="preloader-grid" />

          {/* Top */}
          <div className="preloader-top">
            <div className="brand">
              <motion.span
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="brand-dot"
              />

              <span>KAVYA BUILDS</span>
            </div>

            <span>2026</span>
          </div>

          {/* CENTER */}
          <div className="loader-center">
            <div className="loader-box">
              <div className="identifier">
                <span>001</span>
                <i />
                <span>SYSTEM</span>
              </div>

              <div className="percentage-row">
                <span className="percentage">
                  {String(progress).padStart(2, "0")}
                </span>

                <span className="percent-symbol">%</span>
              </div>

              <div className="progress-container">
                <div className="progress-track">
                  <motion.div
                    className="progress-fill"
                    animate={{
                      width: `${progress}%`,
                    }}
                    transition={{
                      duration: 0.08,
                      ease: "linear",
                    }}
                  />
                </div>

                <motion.div
                  className="progress-highlight"
                  animate={{
                    left: `${Math.max(progress - 3, 0)}%`,
                  }}
                  transition={{
                    duration: 0.08,
                    ease: "linear",
                  }}
                />
              </div>

              <div className="status-row">
                <div className="status">
                  <motion.span
                    animate={{
                      opacity: [0.2, 1, 0.2],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                    className="status-dot"
                  />

                  <span>{status}</span>
                </div>

                <span>00—100</span>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="preloader-bottom">
            <span>DESIGN / ENGINEERING</span>
            <span>IN</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
