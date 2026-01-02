import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
  const mouse = { x: useMotionValue(0), y: useMotionValue(0) };
  const [hoverState, setHoverState] = useState(null);
  const [isVisible, setIsVisible] = useState(false); // Hide until mouse moves

  const smoothOptions = { damping: 50, stiffness: 300, mass: 1.0 };
  const smoothX = useSpring(mouse.x, smoothOptions);
  const smoothY = useSpring(mouse.y, smoothOptions);

  useEffect(() => {
    const manageMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);

      const target = e.target;
      const isClickable = target.closest("a") || target.closest("button");
      const isInput = target.closest("input") || target.closest("textarea");

      if (isInput) setHoverState("text");
      else if (isClickable) setHoverState("active");
      else setHoverState(null);
    };
    window.addEventListener("mousemove", manageMouseMove);
    return () => window.removeEventListener("mousemove", manageMouseMove);
  }, [isVisible]);

  // Only render on devices that support hover to avoid touch issues
  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full mix-blend-difference"
        style={{
          x: mouse.x,
          y: mouse.y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hoverState === "active" ? 3 : hoverState === "text" ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-cyan-400/50 rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hoverState === "active" ? 1.5 : hoverState === "text" ? 0 : 1,
          opacity: isVisible && hoverState !== "text" ? 1 : 0,
        }}
      />
    </div>
  );
};
export default Cursor;
