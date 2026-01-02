import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const MorphingInterface = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const vh = window.innerHeight;
    setIsScrolled(latest > vh * 0.2);
  });

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-x-0 z-50 pointer-events-none flex justify-center">
      <LayoutGroup>
        <motion.div
          layout
          layoutId="nav-capsule"
          className={cn(
            "pointer-events-auto backdrop-blur-md bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.2)] overflow-hidden transition-colors duration-500 transform-gpu",
            isScrolled
              ? "fixed top-6 rounded-full"
              : "fixed bottom-10 rounded-[2rem]"
          )}
          style={{
            width: isScrolled ? "auto" : "64px",
            height: isScrolled ? "auto" : "40px",
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1 }}
        >
          <AnimatePresence mode="popLayout">
            {isScrolled ? (
              <motion.div
                key="navbar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-2 py-2"
              >
                <div className="px-5 py-2 rounded-full bg-black/20 border border-white/5">
                  <span className="font-mono text-xs font-bold text-cyan-400 tracking-widest">
                    KAVYABUILDS
                  </span>
                </div>
                <div className="flex bg-black/20 rounded-full border border-white/5 p-1">
                  {["WORK", "ARSENAL", "CONTACT"].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleScrollTo(item.toLowerCase())}
                      onMouseEnter={() => setActiveTab(item)}
                      onMouseLeave={() => setActiveTab(null)}
                      className="relative px-5 py-2 rounded-full text-xs font-mono font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {activeTab === item && (
                        <motion.div
                          layoutId="nav-hover"
                          className="absolute inset-0 bg-white/10 rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{item}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => handleScrollTo("work")}
                className="w-full h-full flex flex-col items-center justify-center gap-1 cursor-pointer group"
              >
                <ArrowDown className="w-4 h-4 text-white/70 group-hover:text-cyan-400 transition-colors" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  );
};

export default MorphingInterface;
