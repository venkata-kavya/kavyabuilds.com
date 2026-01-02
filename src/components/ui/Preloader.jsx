import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import PreloaderScene from "../3d/PreloaderScene";

const Preloader = ({ setLoading }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [setLoading]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
    >
      <div className="w-[200px] h-[200px] relative mb-[-3]">
        <Canvas
          camera={{ position: [0, 0, 3.5] }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <PreloaderScene />
        </Canvas>
      </div>
      <div className="w-48 space-y-2">
        <div className="flex justify-between items-end font-mono text-[10px] text-cyan-500 tracking-widest">
          <span>{Math.min(count, 100)}%</span>
        </div>
        <div className="w-full h-[1px] bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-cyan-400 shadow-[0_0_10px_#00F0FF]"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(count, 100)}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};
export default Preloader;
