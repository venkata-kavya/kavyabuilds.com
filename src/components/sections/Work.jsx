import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Work = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  const projects = [
    {
      title: "AURA",
      type: "iOS INSPIRED",
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "NEO BRUTAL",
      type: "ANTI-DESIGN",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    },
    {
      title: "MOSAIC_OS",
      type: "APPLICATION",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <section
      id="work"
      ref={containerRef}
      className="h-[250vh] bg-[#050505] relative"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full h-full flex items-center">
          <div className="w-[30%] md:w-[450px] h-full flex flex-col justify-center pl-16 md:pl-32 pr-8 z-10 bg-[#050505]/50 backdrop-blur-sm border-r border-white/5">
            <h2 className="text-6xl md:text-8xl font-semibold text-white tracking-tighter mb-4 leading-none">
              DEPLOYED
              <br />
              ENTITIES
            </h2>
            <p className="font-mono text-cyan-500 text-sm">
              /// DRAG_TO_NAVIGATE
            </p>
          </div>
          <div className="flex-1 h-full flex items-center overflow-hidden">
            <motion.div style={{ x }} className="flex gap-12 px-12">
              {projects.map((p, i) => (
                <div
                  key={i}
                  className="relative w-[80vw] md:w-[600px] h-[50vh] md:h-[60vh] flex-shrink-0 group overflow-hidden border border-white/10 rounded-sm bg-[#111] cursor-pointer"
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                  {/* HOVER ARROW */}
                  <div className="absolute top-8 right-8 bg-white/10 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-md border border-white/20 scale-50 group-hover:scale-100">
                    <ArrowUpRight className="text-cyan-400 w-6 h-6" />
                  </div>

                  {/* TITLE */}
                  <div className="absolute bottom-0 left-0 p-8 md:p-12">
                    <div className="font-mono text-sm text-cyan-400 mb-2">
                      {p.type}
                    </div>
                    <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                      {p.title}
                    </h3>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
