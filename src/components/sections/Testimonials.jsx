import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    name: "Tennessee Tourism",
    category: "WEBSITE CONCEPT",
    headline: "A destination deserves a better digital experience.",
    description:
      "Visual storytelling and a more considered digital experience for tourism.",
    link: "https://state-of-tennessee-tourism.vercel.app",
    accent: "cyan",
    featured: true,
  },
  {
    number: "02",
    name: "Caledonia Builders",
    category: "REAL ESTATE",
    headline: "A more considered first impression.",
    description:
      "Architectural storytelling, elegant layouts, and clear property presentation.",
    link: "https://caledonia-builders.vercel.app",
    accent: "amber",
  },
  {
    number: "03",
    name: "Zariya",
    category: "LANGUAGE LEARNING",
    headline: "Bringing local languages closer.",
    description: "A more approachable way to discover regional languages.",
    link: "https://zariya-black.vercel.app",
    accent: "violet",
  },
];

const EASE = [0.22, 1, 0.36, 1];

const accents = {
  cyan: {
    text: "text-[#a6dfe2]/70",
    dot: "bg-[#a6dfe2]",
    glow: "bg-[#7fcbd0]/[0.055]",
  },
  amber: {
    text: "text-[#d7c09d]/70",
    dot: "bg-[#d7c09d]",
    glow: "bg-[#c9a978]/[0.045]",
  },
  violet: {
    text: "text-[#c6b0df]/70",
    dot: "bg-[#c6b0df]",
    glow: "bg-[#a78bc8]/[0.05]",
  },
};

/* =====================================================
   PROJECT CARD
===================================================== */

function ProjectCard({ project, index }) {
  const accent = accents[project.accent];
  const featured = project.featured;

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Explore ${project.name}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: EASE,
      }}
      whileHover={{ y: -3 }}
      className={`group relative isolate flex min-w-0 flex-col overflow-hidden rounded-xl border border-white/[0.09] bg-[#0b0b0b] p-5 transition-colors duration-300 hover:border-white/[0.18] sm:p-6 ${
        featured
          ? "min-h-[290px] md:col-span-7 md:row-span-2 md:min-h-0 md:p-7 lg:p-8"
          : "min-h-[210px] md:col-span-5"
      }`}
    >
      {/* Subtle card lighting */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${accent.glow}`}
      />

      {/* Quiet corner detail */}
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[9px] tracking-[0.12em] text-white/35">
          {project.number} / 03
        </span>

        <span
          className={`font-mono text-[8px] tracking-[0.12em] sm:text-[9px] ${accent.text}`}
        >
          {project.category}
        </span>
      </div>

      {/* Featured-project visual */}
      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none relative my-6 flex min-h-[85px] flex-1 items-center justify-center overflow-hidden sm:my-7 md:min-h-[120px]"
        >
          <div className="absolute h-28 w-28 rounded-full border border-white/[0.07] sm:h-36 sm:w-36" />
          <div className="absolute h-20 w-20 rounded-full border border-[#a6dfe2]/[0.12] sm:h-28 sm:w-28" />

          <span className="font-display text-[5.5rem] font-medium leading-none tracking-[-0.12em] text-white/[0.055] sm:text-[7rem]">
            TN
          </span>

          <span className="absolute bottom-0 right-0 font-mono text-[8px] tracking-[0.16em] text-white/25">
            DIGITAL / EXPERIENCE
          </span>
        </div>
      )}

      {/* Main content */}
      <div className={featured ? "" : "mt-7"}>
        <h3
          className={`max-w-[450px] font-display font-medium leading-[1.12] tracking-[-0.045em] text-white ${
            featured
              ? "text-[1.8rem] sm:text-3xl lg:text-[2.5rem]"
              : "text-xl sm:text-[1.4rem]"
          }`}
        >
          {project.headline}
        </h3>

        <p className="mt-3 max-w-[390px] text-[12px] leading-[1.8] text-white/45 sm:text-[13px]">
          {project.description}
        </p>
      </div>

      {/* Bottom link */}
      <div
        className={`mt-auto flex items-center justify-between gap-3 border-t border-white/[0.09] pt-4 ${
          featured ? "mt-7" : "mt-6"
        }`}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} />

          <span className="truncate text-[11px] font-medium text-white/75 sm:text-xs">
            {project.name}
          </span>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1.5 text-[10px] text-white/45 transition-colors duration-300 group-hover:text-white">
          Explore
          <ArrowUpRight
            size={14}
            strokeWidth={1.4}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </motion.a>
  );
}

/* =====================================================
   EDITORIAL BENTO SECTION
===================================================== */

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#070707] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1040px]">
        {/* Editorial heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a6dfe2]" />

              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">
                Selected projects
              </span>
            </div>

            <h2 className="font-display text-4xl font-medium leading-[1.02] tracking-[-0.055em] sm:text-5xl">
              Words are nice.
              <span className="text-white/35"> Works speak.</span>
            </h2>
          </div>

          <p className="max-w-[255px] text-[12px] leading-6 text-white/40 sm:text-right">
            A small collection of design concepts and digital experiences.
          </p>
        </motion.div>

        {/* Centered bento grid */}
        <div className="grid grid-cols-1 gap-3 md:auto-rows-[205px] md:grid-cols-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} />
          ))}
        </div>

        {/* Minimal footer */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
          <span className="font-mono text-[8px] tracking-[0.14em] text-white/30 sm:text-[9px]">
            DESIGN · DEVELOPMENT
          </span>

          <span className="text-[10px] text-white/30">
            Built with intention.
          </span>
        </div>
      </div>
    </section>
  );
}
