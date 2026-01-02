import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Intro = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [0, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section
      ref={container}
      className="h-screen flex items-center justify-center bg-[#050505] overflow-hidden relative"
    >
      <div className="absolute inset-0 flex flex-col justify-center opacity-20 pointer-events-none select-none">
        <motion.div
          style={{ x }}
          className="whitespace-nowrap text-[15vw] font-bold leading-none text-outline uppercase"
        >
          System Architecture • WebGL • Creative Dev •
        </motion.div>
      </div>
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 text-center"
      >
        <h1 className="text-[12vw] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-900 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
          HI, I'M KAVYA.
        </h1>
      </motion.div>
    </section>
  );
};

export default Intro;
