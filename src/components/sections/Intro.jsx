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
      className="relative min-h-screen bg-[#050505] overflow-hidden flex items-center justify-center"
    >
      {/* Background word */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[18vw] md:text-[15vw] font-semibold tracking-[-0.08em] text-white/[0.018] whitespace-nowrap">
          INTENT
        </span>
      </motion.div>

      {/* Section marker */}
      <div className="absolute top-10 left-6 md:left-12 flex items-center gap-3">
        <span className="font-mono text-[9px] tracking-[0.3em] text-white/20">
          02
        </span>

        <div className="w-8 h-px bg-white/10" />
      </div>

      {/* Main content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-5xl px-6 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="font-mono text-[10px] md:text-[12px] tracking-[0.35em] uppercase text-cyan-400/70">
            Beyond the code
          </span>
        </motion.div>

        {/* Main statement */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            text-7xl
            md:text-8xl
            lg:text-9xl
            font-sans
            font-medium
            tracking-[-0.045em]
            leading-[0.84]
            text-white
          "
        >
          <span
            className="
              bg-gradient-to-r
              from-white
              via-white
              to-white/65
              bg-clip-text
              text-transparent
            "
          >
            I
          </span>
          <span
            className="
              bg-gradient-to-r
              from-white
              via-white
              to-white/65
              bg-clip-text
              text-transparent
              tracking-[-0.025em]
            "
          >
            {" "}
            build
          </span>

          <br />

          <span
            className="
              bg-gradient-to-r
              from-white/45
              via-white/30
              to-white/15
              bg-clip-text
              text-transparent
              tracking-[-0.025em]
            "
          >
            with intent.
          </span>
        </motion.h2>

        {/* Supporting line */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.25,
          }}
          className="
            mt-8
            mx-auto
            max-w-md
            text-base
            leading-relaxed
            font-light
            text-white/35
          "
        >
          Thoughtful interfaces, intelligent systems, and experiences designed
          to feel as good as they function.
        </motion.p>

        {/* Interactive reveal */}
        <div className="mt-14 flex flex-col items-center">
          <motion.button
            onClick={() => setIsOpen((prev) => !prev)}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-4 outline-none"
          >
            {/* Orbital point */}
            <span className="relative flex items-center justify-center w-5 h-5">
              <motion.span
                variants={{
                  hover: {
                    scale: 1.5,
                    opacity: 0.15,
                  },
                }}
                className="absolute w-5 h-5 rounded-full bg-cyan-400 blur-md"
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
                className="relative w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.7)]"
              />
            </span>

            <span className="font-mono text-[9px] tracking-[0.3em] text-white/35 group-hover:text-white/70 transition-colors duration-500">
              {isOpen ? "CLOSE" : "MY ELEMENTS"}
            </span>

            <motion.span
              animate={{
                x: isOpen ? 2 : 0,
                rotate: isOpen ? 45 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="text-white/25 group-hover:text-cyan-400 transition-colors duration-500 text-sm"
            >
              +
            </motion.span>
          </motion.button>

          {/* Fine line */}
          <motion.div
            animate={{
              width: isOpen ? 120 : 40,
              opacity: isOpen ? 0.25 : 0.12,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="mt-5 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />
        </div>

        {/* Subtle vocabulary reveal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: -10,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden"
            >
              <div className="pt-12 flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
                {[
                  "PRECISION",
                  "DEPTH",
                  "MOTION",
                  "PERFORMANCE",
                  "CHARACTERS",
                ].map((item, index) => (
                  <motion.span
                    key={item}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.08 * index,
                      duration: 0.5,
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

      {/* Bottom marker */}
      <div className="absolute bottom-10 left-6 right-6 md:left-12 md:right-12 flex justify-between items-center">
        <span className="font-mono text-[8px] tracking-[0.25em] text-white/15">
          KAVYA BUILDS
        </span>

        <span className="font-mono text-[8px] tracking-[0.25em] text-white/15">
          02 / 06
        </span>
      </div>
    </section>
  );
};

export default Intro;
