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
      "Pitched a tourism website concept focused on visual storytelling, visitor experience, and a refined digital presence.",
    link: "https://state-of-tennessee-tourism.vercel.app",
    initials: "TN",
    featured: true,
    accent: "cyan",
  },
  {
    number: "02",
    name: "Caledonia Builders",
    category: "REAL ESTATE",
    headline: "A more considered first impression.",
    description:
      "A real estate concept combining architectural storytelling, elegant layouts, and clear property presentation.",
    link: "https://caledonia-builders.vercel.app",
    initials: "CB",
    featured: false,
    accent: "amber",
  },
  {
    number: "03",
    name: "Zariya",
    category: "LANGUAGE LEARNING",
    headline: "Bringing local languages closer.",
    description:
      "A language-learning concept designed to make regional-language discovery more approachable and intuitive.",
    link: "https://zariya-black.vercel.app",
    initials: "ZA",
    featured: false,
    accent: "violet",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const accents = {
  cyan: "border-cyan-300/15 bg-cyan-300/[0.035] text-cyan-200/90",
  amber: "border-amber-200/15 bg-amber-200/[0.03] text-amber-100/90",
  violet: "border-violet-300/15 bg-violet-300/[0.035] text-violet-200/90",
};

/* =====================================================
   SUBTLE CARD GRADIENTS
===================================================== */

const cardBackgrounds = {
  cyan: "bg-[radial-gradient(ellipse_at_15%_0%,rgba(34,211,238,0.075),transparent_48%),radial-gradient(ellipse_at_90%_100%,rgba(8,145,178,0.045),transparent_45%),linear-gradient(135deg,#0e1314_0%,#0a0c0d_55%,#08090a_100%)]",

  amber:
    "bg-[radial-gradient(ellipse_at_90%_0%,rgba(251,191,36,0.065),transparent_48%),radial-gradient(ellipse_at_0%_100%,rgba(180,120,55,0.04),transparent_45%),linear-gradient(135deg,#13110d_0%,#0b0a09_55%,#080808_100%)]",

  violet:
    "bg-[radial-gradient(ellipse_at_15%_0%,rgba(167,139,250,0.075),transparent_48%),radial-gradient(ellipse_at_100%_100%,rgba(124,58,237,0.045),transparent_45%),linear-gradient(135deg,#121018_0%,#0b0a0e_55%,#080808_100%)]",
};

const hoverGlows = {
  cyan: "bg-cyan-400/12",
  amber: "bg-amber-300/10",
  violet: "bg-violet-400/12",
};

/* =====================================================
   PROJECT CARD
===================================================== */

function ProjectCard({ project }) {
  return (
    <motion.article
      variants={reveal}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className={`group relative isolate flex flex-col overflow-hidden rounded-2xl border border-white/[0.09] ${
        project.featured ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      {/* Subtle project-specific background */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-20 ${
          cardBackgrounds[project.accent]
        }`}
      />

      {/* Restrained glow revealed on hover */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-16 -top-20 -z-10 h-48 w-48 rounded-full opacity-0 blur-[90px] transition-opacity duration-500 group-hover:opacity-100 ${
          hoverGlows[project.accent]
        }`}
      />

      {/* Very subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "linear-gradient(to bottom right, black, transparent 75%)",
          WebkitMaskImage:
            "linear-gradient(to bottom right, black, transparent 75%)",
        }}
      />

      <div
        className={`relative flex flex-1 flex-col p-5 sm:p-6 ${
          project.featured ? "md:p-7" : ""
        }`}
      >
        {/* Project number and category */}
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] tracking-[0.14em] text-white/45">
            {project.number} / 03
          </span>

          <span className="rounded-full border border-white/[0.12] bg-black/10 px-2.5 py-1.5 font-mono text-[9px] tracking-[0.1em] text-white/60 backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Project details */}
        <div className="mt-6 flex items-start gap-4">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-xs font-medium tracking-wide backdrop-blur-sm ${
              accents[project.accent]
            }`}
          >
            {project.initials}
          </div>

          <div className="min-w-0">
            <h3
              className={`font-display font-medium leading-[1.2] tracking-[-0.025em] text-white ${
                project.featured ? "max-w-2xl text-2xl sm:text-3xl" : "text-xl"
              }`}
            >
              {project.headline}
            </h3>

            <p className="mt-3 max-w-xl text-[13px] leading-6 tracking-[0.02em] text-white/60">
              {project.description}
            </p>
          </div>
        </div>

        {/* Project footer */}
        <div className="mt-7 flex items-center justify-between gap-3 border-t border-white/[0.10] pt-4">
          <span className="text-[12px] font-medium tracking-[0.035em] text-white/85">
            {project.name}
          </span>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Explore ${project.name}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.15] bg-black/10 px-3.5 py-2 text-[11px] tracking-[0.06em] text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.035] hover:text-white"
          >
            Explore
            <ArrowUpRight
              size={14}
              strokeWidth={1.6}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>

      {/* Restrained animated bottom accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-white/25 via-white/10 to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.article>
  );
}

/* =====================================================
   SELECTED PROJECTS
===================================================== */

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#050505] px-6 py-20 text-white sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-none">
        {/* Editorial heading */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end"
        >
          <div className="max-w-4xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.2em] text-cyan-400/60">
                SELECTED PROJECTS
              </span>
            </div>

            <h2 className="font-display text-4xl font-medium leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Words are nice.
              <br />
              <span className="text-white/35">Works speak.</span>
            </h2>
          </div>

          <p className="max-w-[320px] pb-1 text-[13px] leading-7 tracking-[0.025em] text-white/55 md:text-right">
            A mix of thoughtful design, expressive motion and engineering that
            makes every detail count.
          </p>
        </motion.div>

        {/* Responsive project grid */}
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 gap-3.5 md:grid-cols-2"
        >
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </motion.div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-4">
          <span className="font-mono text-[9px] tracking-[0.14em] text-white/35">
            DESIGN · DEVELOPMENT
          </span>

          <span className="text-[10px] tracking-[0.04em] text-white/35">
            Built with intention.
          </span>
        </div>
      </div>
    </section>
  );
}
