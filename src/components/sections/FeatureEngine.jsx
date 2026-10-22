import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Layers2,
  Book,
  BookOpen,
  MousePointer,
  MousePointerClick,
  WandSparkles,
  Sparkles,
  Folder,
  FolderOpen,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const features = [
  {
    number: "01",
    title: "Immersive",
    description:
      "Depth, motion and detail that make digital worlds feel alive.",
    keywords: ["3D", "Motion", "Atmosphere"],
    icon: Layers,
    hoverIcon: Layers2,
    animation: { y: [0, -2, 0], rotate: [0, -3, 0] },
  },
  {
    number: "02",
    title: "Editorial",
    description:
      "Thoughtful typography, balanced space and a distinctive visual rhythm.",
    keywords: ["Typography", "Layout", "Art direction"],
    icon: Book,
    hoverIcon: BookOpen,
    animation: { rotateY: [0, -8, 0], y: [0, -2, 0] },
  },
  {
    number: "03",
    title: "Interactive",
    description:
      "Interfaces that respond naturally and feel effortless to use.",
    keywords: ["Interaction", "Micro-motion", "UX"],
    icon: MousePointer,
    hoverIcon: MousePointerClick,
    animation: { x: [0, 2, 0], y: [0, -2, 0] },
  },
  {
    number: "04",
    title: "Experimental",
    description:
      "Unexpected ideas, expressive motion and playful visual details.",
    keywords: ["Exploration", "Creative code", "Ideas"],
    icon: WandSparkles,
    hoverIcon: Sparkles,
    animation: { rotate: [0, -3, 3, 0], y: [0, -2, 0] },
  },
  {
    number: "05",
    title: "Systems",
    description:
      "Flexible components built to grow without losing consistency.",
    keywords: ["Components", "Architecture", "Scale"],
    icon: Folder,
    hoverIcon: FolderOpen,
    animation: { y: [0, -2, 0] },
  },
];

function FeatureIcon({ feature, hovered }) {
  const DefaultIcon = feature.icon;
  const HoverIcon = feature.hoverIcon;

  return (
    <motion.div
      className="relative flex h-10 w-10 shrink-0 items-center justify-center"
      animate={feature.animation}
      transition={{
        duration: 1.8,
        ease: "easeInOut",
        repeat: hovered ? Infinity : 0,
      }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: hovered ? 0 : 1,
          scale: hovered ? 0.85 : 1,
        }}
        transition={{ duration: 0.2, ease: EASE }}
      >
        <DefaultIcon size={23} strokeWidth={1.4} className="text-cyan-200/70" />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 0.85,
        }}
        transition={{ duration: 0.2, ease: EASE }}
      >
        <HoverIcon size={23} strokeWidth={1.4} className="text-cyan-200" />
      </motion.div>
    </motion.div>
  );
}

function FeatureCard({
  feature,
  index,
  hoveredIndex,
  setHoveredIndex,
  flippedIndex,
  setFlippedIndex,
}) {
  const hovered = hoveredIndex === index;
  const flipped = flippedIndex === index;

  return (
    <motion.button
      type="button"
      aria-label={`${feature.title}: ${
        flipped ? "return to front" : "view details"
      }`}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      onFocus={() => setHoveredIndex(index)}
      onBlur={() => setHoveredIndex(null)}
      onClick={() =>
        setFlippedIndex((current) => (current === index ? null : index))
      }
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: EASE,
      }}
      className="group relative h-[285px] w-full text-left outline-none sm:h-[300px]"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 isolate flex flex-col overflow-hidden rounded-xl border p-5 sm:p-6"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderColor: hovered
              ? "rgba(103,232,249,0.28)"
              : "rgba(255,255,255,0.085)",
            background: hovered
              ? "linear-gradient(135deg, rgba(34,211,238,0.075), rgba(255,255,255,0.025) 65%, rgba(34,211,238,0.025))"
              : "linear-gradient(135deg, rgba(34,211,238,0.035), rgba(255,255,255,0.012) 65%, rgba(34,211,238,0.015))",
            transition: "border-color 300ms ease, background 300ms ease",
          }}
        >
          {/* Ambient cyan glow */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -right-16 -top-20 -z-10 h-40 w-40 rounded-full blur-[65px] transition-opacity duration-500 ${
              hovered
                ? "bg-cyan-300/[0.14] opacity-100"
                : "bg-cyan-400/[0.07] opacity-70"
            }`}
          />

          {/* Very subtle lower accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cyan-300/[0.025] to-transparent"
          />

          {/* Icon only — no card number */}
          <div className="relative z-10 flex items-start">
            <FeatureIcon feature={feature} hovered={hovered} />
          </div>

          {/* Title and description */}
          <div className="relative z-10 mt-auto">
            <h3 className="font-display text-2xl font-medium tracking-[-0.025em] text-white sm:text-[1.7rem]">
              {feature.title}
            </h3>

            <p className="mt-3 text-[12px] leading-6 tracking-[0.015em] text-white/50">
              {feature.description}
            </p>

            {/* Discover interaction */}
            <div className="mt-5 flex items-center justify-between border-t border-white/[0.09] pt-3">
              <span className="text-[9px] uppercase tracking-[0.16em] text-white/40">
                Discover
              </span>

              <motion.span
                animate={{
                  x: hovered ? 2 : 0,
                  color: hovered ? "#a5f3fc" : "rgba(165,243,252,0.55)",
                }}
                transition={{ duration: 0.25 }}
              >
                <ArrowUpRight size={16} strokeWidth={1.4} />
              </motion.span>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 isolate flex flex-col overflow-hidden rounded-xl border border-cyan-200/20 bg-[#0b0e0f] p-5 sm:p-6"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/[0.07] blur-[65px]"
          />

          <div className="relative z-10 flex items-center justify-end">
            <RotateCcw
              size={15}
              strokeWidth={1.4}
              className="text-cyan-200/70"
            />
          </div>

          <div className="relative z-10 mt-auto">
            <h3 className="font-display text-2xl font-medium tracking-[-0.025em] text-white">
              {feature.title}
            </h3>

            <p className="mt-4 text-[13px] leading-6 tracking-[0.015em] text-white/55">
              {feature.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {feature.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-cyan-200/[0.12] bg-cyan-200/[0.025] px-2.5 py-1.5 text-[10px] tracking-wide text-white/60"
                >
                  {keyword}
                </span>
              ))}
            </div>

            <p className="mt-6 border-t border-white/[0.08] pt-3 text-[9px] uppercase tracking-[0.16em] text-white/35">
              Click to return
            </p>
          </div>
        </div>
      </motion.div>
    </motion.button>
  );
}

export default function FeatureEngine() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [flippedIndex, setFlippedIndex] = useState(null);

  return (
    <section
      id="what-i-build"
      className="relative overflow-hidden px-6 py-20 text-white sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-none">
        {/* Section heading */}
        <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: EASE }}
              className="mb-4 text-[10px] uppercase tracking-[0.2em] text-cyan-400/70"
            >
              What I build
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE }}
              className="font-display text-4xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl"
            >
              Digital experiences
              <br />
              <span className="text-white/35">with character.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            className="max-w-xs text-[13px] leading-6 tracking-[0.015em] text-white/45"
          >
            Thoughtful design, expressive motion and engineering — every detail
            has a purpose.
          </motion.p>
        </div>

        {/* Capability cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.number}
              feature={feature}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              flippedIndex={flippedIndex}
              setFlippedIndex={setFlippedIndex}
            />
          ))}
        </div>

        {/* Section footer */}
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-4">
          <p className="text-[9px] tracking-[0.12em] text-white/30">
            HOVER TO INTERACT · CLICK TO EXPLORE
          </p>

          <span className="shrink-0 font-mono text-[10px] text-cyan-200/50">
            05 CAPABILITIES
          </span>
        </div>
      </div>
    </section>
  );
}
