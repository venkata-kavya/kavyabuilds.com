import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    damping: 50,
    stiffness: 300,
    mass: 1,
  });

  const smoothY = useSpring(mouseY, {
    damping: 50,
    stiffness: 300,
    mass: 1,
  });

  const [hoverState, setHoverState] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDotMode, setIsDotMode] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      setIsVisible(true);

      /*
       * Find the accordion section from whatever
       * element the mouse is currently over.
       */
      const accordion = e.target.closest("[data-cursor='dot']");

      if (accordion) {
        setIsDotMode(true);
        setHoverState(null);
        return;
      }

      setIsDotMode(false);

      const clickable = e.target.closest("a") || e.target.closest("button");

      const input = e.target.closest("input") || e.target.closest("textarea");

      if (input) {
        setHoverState("text");
      } else if (clickable) {
        setHoverState("active");
      } else {
        setHoverState(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      className="
        hidden
        md:block
        pointer-events-none
        fixed
        inset-0
        z-[99999]
      "
      aria-hidden="true"
    >
      {/* =========================================
          DOT MODE
          ========================================= */}

      <motion.div
        className="
          fixed
          top-0
          left-0
          w-[6px]
          h-[6px]
          rounded-full
          bg-cyan-400
        "
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible && isDotMode ? 1 : 0,
          scale: isDotMode ? 1 : 0.5,
        }}
        transition={{
          duration: 0.12,
          ease: "easeOut",
        }}
      />

      {/* =========================================
          ORIGINAL CURSOR DOT
          ========================================= */}

      <motion.div
        className="
          fixed
          top-0
          left-0
          w-1.5
          h-1.5
          rounded-full
          bg-white
          mix-blend-difference
        "
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible && !isDotMode ? 1 : 0,

          scale: hoverState === "active" ? 3 : hoverState === "text" ? 0 : 1,
        }}
        transition={{
          duration: 0.15,
          ease: "easeOut",
        }}
      />

      {/* =========================================
          ORIGINAL CURSOR RING
          ========================================= */}

      <motion.div
        className="
          fixed
          top-0
          left-0
          w-12
          h-12
          rounded-full
          border
          border-cyan-400/50
        "
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible && !isDotMode && hoverState !== "text" ? 1 : 0,

          scale: hoverState === "active" ? 1.5 : hoverState === "text" ? 0 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      />
    </div>
  );
};

export default Cursor;
