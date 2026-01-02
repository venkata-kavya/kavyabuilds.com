import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useTransform,
  useMotionValue,
} from "framer-motion";

// --- SHAPES (Inline for simplicity, but could be separate files) ---
const BlobShape = () => (
  <div className="w-[300px] h-[300px] flex items-center justify-center">
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full filter drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"
    >
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0E0E0" />
          <stop offset="100%" stopColor="#00F0FF" />
        </linearGradient>
      </defs>
      <motion.path
        fill="url(#blobGradient)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        animate={{
          d: [
            "M47.6,-61.8C61.4,-53.4,72.4,-41.2,77.3,-27.1C82.2,-13,81,3,75.9,17.7C70.8,32.4,61.8,45.8,50.1,55.9C38.4,66,24,72.8,9.2,73.5C-5.6,74.2,-20.9,68.8,-34.5,59.9C-48.1,51,-60,38.6,-67.2,23.8C-74.4,9,-76.9,-8.2,-71.4,-23.1C-65.9,-38,-52.4,-50.6,-38.4,-58.9C-24.4,-67.2,-9.9,-71.2,3.3,-75.1C16.5,-79,33.7,-70.2,47.6,-61.8Z",
            "M53.6,-65.4C69.1,-55.8,81.4,-41.3,84.4,-25.1C87.4,-8.9,81.1,9,71.5,23.5C61.9,38,49,49.1,35.1,56.8C21.2,64.5,6.3,68.8,-7.4,67.6C-21.1,66.4,-33.6,59.7,-45.6,50.6C-57.6,41.5,-69.1,30,-73.4,16.2C-77.7,2.4,-74.8,-13.7,-66.4,-27.4C-58,-41.1,-44.1,-52.4,-29.6,-62.3C-15.1,-72.2,0,-80.7,14.7,-80.1C29.4,-79.5,38.1,-75,53.6,-65.4Z",
            "M47.6,-61.8C61.4,-53.4,72.4,-41.2,77.3,-27.1C82.2,-13,81,3,75.9,17.7C70.8,32.4,61.8,45.8,50.1,55.9C38.4,66,24,72.8,9.2,73.5C-5.6,74.2,-20.9,68.8,-34.5,59.9C-48.1,51,-60,38.6,-67.2,23.8C-74.4,9,-76.9,-8.2,-71.4,-23.1C-65.9,-38,-52.4,-50.6,-38.4,-58.9C-24.4,-67.2,-9.9,-71.2,3.3,-75.1C16.5,-79,33.7,-70.2,47.6,-61.8Z",
          ],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        transform="translate(100 100)"
      />
    </svg>
  </div>
);

const BoltShape = () => (
  <div className="w-[220px] h-[220px] flex items-center justify-center">
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#00F0FF"
      strokeWidth="1.5"
      className="w-full h-full drop-shadow-[0_0_20px_#00F0FF]"
      animate={{ x: [-2, 2, -1, 1, 0], opacity: [0.8, 1, 0.9, 1] }}
      transition={{ repeat: Infinity, duration: 0.2, ease: "linear" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      />
    </motion.svg>
  </div>
);

const CubeShape = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [25, -25]);
  const rotateY = useTransform(mouseX, [-300, 300], [-25, 25]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <div
      className="w-[300px] h-[300px] flex items-center justify-center cube-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
    >
      <motion.div className="cube" style={{ rotateX, rotateY }}>
        <div className="face front" />
        <div className="face back" />
        <div className="face right" />
        <div className="face left" />
        <div className="face top" />
        <div className="face bottom" />
      </motion.div>
    </div>
  );
};

const FeatureEngine = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) setActiveIndex(0);
    else if (latest < 0.66) setActiveIndex(1);
    else setActiveIndex(2);
  });

  const slides = [
    {
      id: "liquid",
      title: "Liquid Layouts",
      sub: "Interfaces that breathe and adapt to any glass rectangle.",
      shape: <BlobShape />,
    },
    {
      id: "velocity",
      title: "Zero Latency",
      sub: "Optimized bytes. No loading spinners. Pure speed.",
      shape: <BoltShape />,
    },
    {
      id: "haptic",
      title: "Haptic Feel",
      sub: "Adding physics, gravity, and weight to digital objects.",
      shape: <CubeShape />,
    },
  ];

  return (
    <div ref={containerRef} className="h-[300vh] relative bg-[#050505]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 px-6">
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 font-mono text-xs text-cyan-400 tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />{" "}
                  Feature_0{activeIndex + 1}
                </div>
                <h2 className="text-6xl md:text-8xl font-semibold text-white tracking-tight leading-[0.9]">
                  {slides[activeIndex].title}
                </h2>
                <p className="text-xl text-gray-400 max-w-md leading-relaxed font-light">
                  {slides[activeIndex].sub}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center lg:justify-center lg:pl-32 order-1 lg:order-2 h-[50vh] lg:h-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                {slides[activeIndex].shape}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeatureEngine;
