import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

const Intro = () => {
  const container = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 0.5, 1, 0.5, 0],
  );

  return (
    <section
      ref={container}
      className="relative flex items-center justify-center overflow-hidden bg-[#050505] py-24 md:py-28"
    >
      {/* Background word */}
      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      >
        <span className="whitespace-nowrap text-[18vw] font-semibold tracking-[-0.08em] text-white/[0.018] md:text-[15vw]">
          INTENT
        </span>
      </motion.div>

      {/* Section marker */}
      <div className="absolute left-6 top-8 flex items-center gap-3 md:left-12 md:top-10">
        <span className="font-mono text-[9px] tracking-[0.3em] text-white/20">
          02
        </span>
        <div className="h-px w-8 bg-white/10" />
      </div>

      {/* Main content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-5xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-7"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-400/70 md:text-xs">
            Beyond the code
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-7xl font-medium leading-[0.84] tracking-[-0.045em] text-white md:text-8xl lg:text-9xl"
        >
          <span className="bg-gradient-to-r from-white via-white to-white/65 bg-clip-text text-transparent">
            I build
          </span>

          <br />

          <span className="bg-gradient-to-r from-white/45 via-white/30 to-white/15 bg-clip-text tracking-[-0.025em] text-transparent">
            with intent.
          </span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-7 max-w-md text-sm font-light leading-relaxed text-white/35 md:text-base"
        >
          Thoughtful interfaces, intelligent systems, and experiences designed
          to feel as good as they function.
        </motion.p>

        {/* Interactive reveal */}
        <div className="mt-10 flex flex-col items-center">
          <motion.button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-4 outline-none"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <motion.span
                variants={{
                  hover: { scale: 1.5, opacity: 0.15 },
                }}
                className="absolute h-5 w-5 rounded-full bg-cyan-400 blur-md"
              />

              <motion.span
                animate={{
                  scale: isOpen ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: isOpen ? Infinity : 0,
                  ease: "easeInOut",
                }}
                className="relative h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.7)]"
              />
            </span>

            <span className="font-mono text-[9px] tracking-[0.3em] text-white/35 transition-colors duration-500 group-hover:text-white/70">
              {isOpen ? "CLOSE" : "MY ELEMENTS"}
            </span>

            <motion.span
              animate={{
                x: isOpen ? 2 : 0,
                rotate: isOpen ? 45 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="text-sm text-white/25 transition-colors duration-500 group-hover:text-cyan-400"
            >
              +
            </motion.span>
          </motion.button>

          <motion.div
            animate={{
              width: isOpen ? 100 : 35,
              opacity: isOpen ? 0.25 : 0.12,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-4 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />
        </div>

        {/* Vocabulary reveal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 pt-8 sm:gap-x-8">
                {[
                  "PRECISION",
                  "DEPTH",
                  "MOTION",
                  "PERFORMANCE",
                  "CHARACTERS",
                ].map((item, index) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 * index,
                      duration: 0.4,
                    }}
                    className="font-mono text-[9px] tracking-[0.22em] text-white/25"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Intro;
