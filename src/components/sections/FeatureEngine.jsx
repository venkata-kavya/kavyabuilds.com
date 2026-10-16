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
    animation: {
      y: [0, -3, 0],
      rotate: [0, -4, 0],
      scale: [1, 1.05, 1],
    },
  },
  {
    number: "02",
    title: "Editorial",
    description:
      "Thoughtful typography, balanced space and a distinctive visual rhythm.",
    keywords: ["Typography", "Layout", "Art direction"],
    icon: Book,
    hoverIcon: BookOpen,
    animation: {
      rotateY: [0, -12, 0],
      y: [0, -2, 0],
    },
  },
  {
    number: "03",
    title: "Interactive",
    description:
      "Interfaces that respond naturally and feel effortless to use.",
    keywords: ["Interaction", "Micro-motion", "UX"],
    icon: MousePointer,
    hoverIcon: MousePointerClick,
    animation: {
      x: [0, 3, 0],
      y: [0, -2, 0],
      scale: [1, 0.94, 1],
    },
  },
  {
    number: "04",
    title: "Experimental",
    description:
      "Unexpected ideas, expressive motion and playful visual details.",
    keywords: ["Exploration", "Creative code", "Ideas"],
    icon: WandSparkles,
    hoverIcon: Sparkles,
    animation: {
      rotate: [0, -5, 5, -3, 3, 0],
      y: [0, -2, 0],
    },
  },
  {
    number: "05",
    title: "Systems",
    description:
      "Flexible components built to grow without losing consistency.",
    keywords: ["Components", "Architecture", "Scale"],
    icon: Folder,
    hoverIcon: FolderOpen,
    animation: {
      y: [0, -3, 0],
      scale: [1, 1.04, 1],
    },
  },
];

function FeatureIcon({ feature, hovered }) {
  const DefaultIcon = feature.icon;
  const HoverIcon = feature.hoverIcon;

  return (
    <motion.div
      className="relative flex h-14 w-14 shrink-0 items-center justify-center"
      animate={feature.animation}
      transition={{
        duration: feature.title === "Experimental" ? 0.65 : 0.55,
        ease: "easeInOut",
        repeat: hovered ? Infinity : 0,
        repeatType: "mirror",
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="absolute inset-1 rounded-full bg-cyan-400 blur-xl"
        animate={{
          opacity: hovered ? 0.16 : 0,
          scale: hovered ? 1.15 : 0.7,
        }}
        transition={{ duration: 0.35, ease: EASE }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: hovered ? 0 : 1,
          scale: hovered ? 0.78 : 1,
          rotate: hovered ? -10 : 0,
        }}
        transition={{ duration: 0.22, ease: EASE }}
      >
        <DefaultIcon size={28} strokeWidth={1.5} className="text-cyan-300" />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 0.78,
          rotate: hovered ? 0 : 10,
        }}
        transition={{ duration: 0.25, ease: EASE }}
      >
        <HoverIcon size={28} strokeWidth={1.5} className="text-cyan-300" />
      </motion.div>
    </motion.div>
  );
}

function FlipArrow({ flipped, hovered }) {
  return (
    <motion.span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
      animate={{
        y: hovered ? -2 : 0,
        borderColor: hovered
          ? "rgba(103,232,249,0.35)"
          : "rgba(255,255,255,0.10)",
        color: hovered ? "#67e8f9" : "rgba(255,255,255,0.55)",
      }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <motion.span
        className="flex items-center justify-center"
        animate={{
          rotate: flipped ? 0 : 0,
          scale: hovered ? 1.08 : 1,
        }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        {flipped ? (
          <RotateCcw size={16} strokeWidth={1.5} />
        ) : (
          <ArrowUpRight size={18} strokeWidth={1.5} />
        )}
      </motion.span>
    </motion.span>
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: index * 0.07,
        ease: EASE,
      }}
      className="group relative min-h-[350px] w-full text-left outline-none sm:min-h-[370px] xl:min-h-[390px]"
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: EASE }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border p-6 sm:p-7"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderColor: hovered
              ? "rgba(255,255,255,0.16)"
              : "rgba(255,255,255,0.08)",
            background: hovered
              ? "rgba(255,255,255,0.035)"
              : "rgba(255,255,255,0.018)",
            transition: "border-color 300ms ease, background 300ms ease",
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <FeatureIcon feature={feature} hovered={hovered} />

            <span className="pt-2 font-mono text-[10px] tracking-widest text-white/35">
              {feature.number} / 05
            </span>
          </div>

          <div className="mt-auto pt-12">
            <motion.div
              className="mb-5 h-px origin-left bg-cyan-300"
              animate={{
                width: hovered ? "48px" : "26px",
                opacity: hovered ? 0.9 : 0.4,
              }}
              transition={{ duration: 0.35, ease: EASE }}
            />

            <h3 className="font-display text-3xl font-medium leading-[1.05] tracking-tight text-white sm:text-[2rem]">
              {feature.title}
            </h3>

            <div className="mt-6 flex items-center justify-between gap-3">
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                Explore
              </span>

              <FlipArrow flipped={false} hovered={hovered} />
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border p-6 sm:p-7"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderColor: "rgba(103,232,249,0.22)",
            background: "rgba(255,255,255,0.035)",
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] tracking-widest text-white/40">
              {feature.number} / DETAILS
            </span>

            <FlipArrow flipped={true} hovered={hovered} />
          </div>

          <div className="mt-auto pt-8">
            <h3 className="font-display text-3xl font-medium leading-[1.05] tracking-tight text-white sm:text-[2rem]">
              {feature.title}
            </h3>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              {feature.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {feature.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="max-w-full rounded-full border border-white/10 px-3 py-2 text-[11px] leading-tight text-white/55"
                >
                  {keyword}
                </span>
              ))}
            </div>
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
      className="relative overflow-hidden px-5 py-24 text-white sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* SECTION HEADING */}
        <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-white/40"
            >
              <span className="h-px w-7 bg-cyan-300/70" />
              What I build
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl"
            >
              Digital experiences
              <br />
              <span className="text-white/40">with character.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="max-w-xs text-sm leading-6 text-white/45"
          >
            A mix of thoughtful design, expressive motion and engineering that
            makes every detail count.
          </motion.p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-[10px] tracking-wide text-white/25">
            HOVER TO INTERACT · CLICK TO EXPLORE
          </p>

          <span className="shrink-0 font-mono text-[10px] text-white/25">
            05 CAPABILITIES
          </span>
        </div>
      </div>
    </section>
  );
}
