import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

// --- 1. BLOB SHAPE (SVG Animation) ---
export const BlobShape = () => (
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

// --- 2. BOLT SHAPE (Vector Animation) ---
export const BoltShape = () => (
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

// --- 3. CUBE SHAPE (Interactive 3D CSS) ---
export const CubeShape = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse movement into rotation degrees
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
