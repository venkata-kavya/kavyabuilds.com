import React, { useState } from "react";
import { motion } from "framer-motion";
import { Folder, FolderOpen } from "lucide-react";

const FeatureEngine = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const folders = [
    {
      title: "Immersive",
      description:
        "Websites with depth, motion and details that make you want to explore.",
    },
    {
      title: "Editorial",
      description:
        "Clean typography, thoughtful spacing and a strong visual rhythm.",
    },
    {
      title: "Interactive",
      description: "Interfaces that respond naturally and feel good to use.",
    },
    {
      title: "Experimental",
      description:
        "Playful ideas and unexpected details that give a site character.",
    },
    {
      title: "Systems",
      description:
        "Flexible components that stay consistent as the product grows.",
    },
  ];

  return (
    <section
      data-cursor="dot"
      className="
        relative
        bg-[#050505]
        text-white
        py-32
        md:py-40
        overflow-hidden
      "
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16"
        >
          <p className="text-xs font-mono tracking-[0.25em] uppercase text-cyan-400/70 mb-5">
            What I build
          </p>

          <h2 className="text-5xl md:text-7xl font-medium tracking-[-0.045em] leading-[0.95]">
            Digital experiences
            <br />
            <span className="text-white/30">with character.</span>
          </h2>
        </motion.div>

        {/* CARDS */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-5
            gap-4
            w-full
          "
        >
          {folders.map((folder, index) => {
            const hovered = hoveredIndex === index;

            return (
              <motion.div
                key={folder.title}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{
                  y: -7,
                }}
                className="
                  relative
                  w-full
                  aspect-square
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.018]
                  overflow-hidden
                  cursor-pointer
                "
              >
                {/* HOVER GLOW */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    opacity: hovered ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(0,240,255,0.1), transparent 65%)",
                  }}
                />

                <div className="relative h-full w-full p-6 flex flex-col">
                  {/* FOLDER */}
                  <motion.div
                    animate={{
                      y: hovered ? -3 : 0,
                      scale: hovered ? 1.08 : 1,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      relative
                      w-[34px]
                      h-[34px]
                    "
                  >
                    {/* CLOSED FOLDER */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        opacity: hovered ? 0 : 1,
                        scale: hovered ? 0.9 : 1,
                      }}
                      transition={{
                        duration: 0.25,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Folder
                        size={32}
                        strokeWidth={1.25}
                        color="rgba(0,240,255,0.55)"
                        fill="rgba(0,240,255,0.04)"
                      />
                    </motion.div>

                    {/* OPEN + FILLED FOLDER */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        opacity: hovered ? 1 : 0,
                        scale: hovered ? 1 : 0.9,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <FolderOpen
                        size={32}
                        strokeWidth={1.25}
                        color="#00F0FF"
                        fill="rgba(0,240,255,0.3)"
                      />
                    </motion.div>

                    {/* FOLDER GLOW */}
                    <motion.div
                      className="
                        absolute
                        inset-[-8px]
                        rounded-full
                        bg-cyan-400
                        blur-xl
                        pointer-events-none
                        -z-10
                      "
                      animate={{
                        opacity: hovered ? 0.2 : 0,
                        scale: hovered ? 1 : 0.6,
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                    />
                  </motion.div>

                  {/* TEXT */}
                  <div className="mt-auto">
                    <motion.h3
                      animate={{
                        x: hovered ? 2 : 0,
                        color: hovered ? "#ffffff" : "rgba(255,255,255,0.88)",
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        text-lg
                        font-medium
                        tracking-[-0.02em]
                        whitespace-nowrap
                      "
                    >
                      {folder.title}
                    </motion.h3>

                    <motion.p
                      animate={{
                        x: hovered ? 2 : 0,
                        opacity: hovered ? 0.6 : 0.35,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        mt-3
                        text-[13px]
                        leading-[1.55]
                        text-white
                      "
                    >
                      {folder.description}
                    </motion.p>
                  </div>

                  {/* BOTTOM ACCENT */}
                  <motion.div
                    className="
                      absolute
                      bottom-0
                      left-6
                      h-px
                      bg-cyan-400
                    "
                    animate={{
                      width: hovered ? 28 : 0,
                      opacity: hovered ? 0.7 : 0,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureEngine;
