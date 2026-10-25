import { useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Layers2,
  Book,
  BookOpen,
  MousePointer,
  MousePointerClick,
  BrainCircuit,
  Workflow,
  Gauge,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Immersive",
    description: "3D worlds with depth, motion and atmosphere.",
    tags: ["3D", "Motion", "WebGL"],
    icon: Layers,
    hoverIcon: Layers2,
    color: "#a5f3fc",
  },
  {
    number: "02",
    title: "Editorial",
    description: "Distinctive typography and intentional layouts.",
    tags: ["Typography", "Layout", "Art direction"],
    icon: Book,
    hoverIcon: BookOpen,
    color: "#c4b5fd",
  },
  {
    number: "03",
    title: "Interactive",
    description: "Fluid interfaces that respond naturally.",
    tags: ["Interaction", "Motion", "UX"],
    icon: MousePointer,
    hoverIcon: MousePointerClick,
    color: "#a7f3d0",
  },
  {
    number: "04",
    title: "Intelligent",
    description: "Useful AI experiences built around real problems.",
    tags: ["AI", "Automation", "Agents"],
    icon: BrainCircuit,
    hoverIcon: Sparkles,
    color: "#f0abfc",
  },
  {
    number: "05",
    title: "Engineered",
    description: "Reliable applications built to perform and scale.",
    tags: ["Architecture", "Performance", "Systems"],
    icon: Workflow,
    hoverIcon: Gauge,
    color: "#fcd9a0",
  },
];

function AnimatedIcon({ feature, active }) {
  const Icon = feature.icon;
  const HoverIcon = feature.hoverIcon;

  return (
    <motion.div
      className="relative flex h-10 w-10 items-center justify-center"
      animate={{
        y: active ? [0, -3, 0] : 0,
        rotate: active ? [0, -5, 5, 0] : 0,
      }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: active ? 0 : 1,
          scale: active ? 0.7 : 1,
          rotate: active ? -15 : 0,
        }}
        transition={{ duration: 0.22 }}
      >
        <Icon
          size={23}
          strokeWidth={1.4}
          style={{ color: `${feature.color}99` }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.7,
          rotate: active ? 0 : 15,
        }}
        transition={{ duration: 0.22 }}
      >
        <HoverIcon
          size={23}
          strokeWidth={1.4}
          style={{ color: feature.color }}
        />
      </motion.div>
    </motion.div>
  );
}

function DeckCard({ feature, index, activeIndex, hovered, onSelect }) {
  const total = features.length;
  const rawPosition = (index - activeIndex + total) % total;

  // Arrange cards evenly around the selected card.
  const position =
    rawPosition > Math.floor(total / 2) ? rawPosition - total : rawPosition;

  const distance = Math.abs(position);
  const active = position === 0;

  return (
    <motion.button
      type="button"
      aria-label={`View ${feature.title}`}
      aria-pressed={active}
      onClick={() => onSelect(active ? (activeIndex + 1) % total : index)}
      animate={{
        x: active ? "0%" : hovered ? `${position * 24}%` : `${position * 3}%`,
        y: active ? 0 : distance * (hovered ? 8 : 9),
        rotate: active ? 0 : position * (hovered ? 6 : 3),
        scale: 1 - distance * 0.035,
        opacity: 1 - distance * 0.1,
      }}
      transition={{
        type: "spring",
        stiffness: 170,
        damping: 23,
        mass: 0.85,
      }}
      style={{
        zIndex: total - distance,
        transformOrigin: "center center",
      }}
      className="absolute inset-0 h-full w-full text-left outline-none focus-visible:ring-1 focus-visible:ring-cyan-200/60"
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 sm:p-7"
        style={{
          borderColor: active ? `${feature.color}38` : "rgba(255,255,255,0.08)",
          background: "linear-gradient(145deg, #101214 0%, #08090a 85%)",
          boxShadow: active
            ? "0 25px 80px rgba(0,0,0,0.45)"
            : "0 12px 35px rgba(0,0,0,0.3)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full blur-[80px]"
          style={{
            backgroundColor: feature.color,
            opacity: active ? 0.11 : 0.025,
          }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <AnimatedIcon feature={feature} active={active && hovered} />

          <span className="font-mono text-[10px] tracking-widest text-white/35">
            {feature.number}
          </span>
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-14 font-display text-[100px] font-medium leading-none tracking-[-0.09em] sm:text-[115px]"
          style={{ color: "rgba(255,255,255,0.025)" }}
        >
          {feature.number}
        </span>

        <div className="relative z-10 mt-auto">
          <h3 className="font-display text-3xl font-medium leading-tight tracking-[-0.04em] text-white sm:text-4xl">
            {feature.title}
          </h3>

          <p className="mt-3 max-w-xs text-[12px] leading-6 text-white/50 sm:text-[13px]">
            {feature.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {feature.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.09] px-3 py-1.5 text-[10px] text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function FeatureEngine() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const navigate = (direction) => {
    setActiveIndex(
      (current) => (current + direction + features.length) % features.length,
    );
  };

  return (
    <section
      id="what-i-build"
      className="relative overflow-hidden px-6 py-20 text-white sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mb-10 sm:mb-12">
        <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-cyan-400/70">
          What I build
        </p>

        <h2 className="font-display text-4xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
          Digital experiences
          <br />
          <span className="text-white/35">with character.</span>
        </h2>
      </div>

      <div className="mx-auto w-full max-w-[310px]">
        <div
          className="relative h-[434px] w-full sm:h-[448px]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {features.map((feature, index) => (
            <DeckCard
              key={feature.number}
              feature={feature}
              index={index}
              activeIndex={activeIndex}
              hovered={hovered}
              onSelect={setActiveIndex}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {features.map((feature, index) => (
              <button
                key={feature.number}
                type="button"
                aria-label={`Select ${feature.title}`}
                aria-pressed={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                className="h-[3px] rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === index ? 26 : 12,
                  backgroundColor:
                    activeIndex === index
                      ? feature.color
                      : "rgba(255,255,255,0.18)",
                }}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous card"
              onClick={() => navigate(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-cyan-200/30 hover:text-cyan-100"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              aria-label="Next card"
              onClick={() => navigate(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-cyan-200/30 hover:text-cyan-100"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
