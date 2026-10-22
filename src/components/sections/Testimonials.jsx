import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";

const projects = [
  {
    number: "01",
    name: "Tennessee Tourism",
    category: "WEBSITE PROPOSAL",
    headline: "A destination deserves a digital experience to match.",
    description:
      "A proposal to elevate Tennessee's tourism website through stronger visual storytelling, a refined visitor experience, and a maintainable digital platform.",
    link: "https://state-of-tennessee-tourism.vercel.app",
    linkLabel: "Explore proposal",
    featured: true,
    initials: "TN",
  },
  {
    number: "02",
    name: "Caledonia Builders",
    category: "REAL ESTATE",
    headline: "Building a more considered digital presence.",
    description:
      "A real estate website concept focused on architectural storytelling, elegant layouts, and presenting properties with clarity and confidence.",
    link: "https://caledonia-builders.vercel.app",
    linkLabel: "Explore website",
    featured: false,
    initials: "CB",
  },
  {
    number: "03",
    name: "Zariya",
    category: "LANGUAGE LEARNING",
    headline: "Making local languages feel closer.",
    description:
      "A language-learning experience designed around making regional-language discovery more approachable, engaging, and intuitive.",
    link: "https://zariya-black.vercel.app",
    linkLabel: "Explore experience",
    featured: false,
    initials: "ZA",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function ProjectCard({ project, index }) {
  return (
    <motion.article
      variants={reveal}
      className={`testimonial-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.09] ${
        project.featured ? "bg-white/[0.045] md:col-span-2" : "bg-white/[0.025]"
      }`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8">
        <span className="font-mono text-[10px] tracking-[0.22em] text-white/35">
          / {project.number}
        </span>

        <span className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[9px] tracking-[0.13em] text-white/45">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-7 pt-8 sm:px-8 sm:pb-8">
        <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] text-sm font-medium text-cyan-300">
          {project.initials}
        </div>

        <h3
          className={`max-w-2xl font-display font-medium leading-[1.08] tracking-[-0.045em] text-white ${
            project.featured
              ? "text-3xl sm:text-5xl lg:text-6xl"
              : "text-2xl sm:text-3xl"
          }`}
        >
          {project.headline}
        </h3>

        <p className="mt-5 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
          {project.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-9">
          <div>
            <p className="text-sm font-medium tracking-wide text-white/90">
              {project.name}
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-white/30">
              PROJECT SHOWCASE
            </p>
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.linkLabel}: ${project.name}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-xs text-white/75 transition-all duration-300 hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-200"
          >
            <span>{project.linkLabel}</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-cyan-400/80 via-cyan-200/30 to-transparent transition-transform duration-500 group-hover:scale-x-100"
      />
    </motion.article>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#050505] px-6 py-24 text-white sm:py-32 lg:px-12 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-cyan-400/[0.035] blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end"
        >
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-cyan-400" />
              <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-300">
                SELECTED PROJECTS / 03
              </span>
            </div>

            <h2 className="font-display text-5xl font-medium leading-[0.98] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              Words are nice.
              <br />
              <span className="text-white/35">Work speaks.</span>
            </h2>
          </div>

          <div className="max-w-xs">
            <Quote
              size={25}
              strokeWidth={1.2}
              className="mb-4 text-cyan-300/70"
            />
            <p className="text-sm leading-7 text-white/45">
              Different challenges. Thoughtful digital experiences. A focus on
              making every detail count.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.number} project={project} index={index} />
          ))}
        </motion.div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] leading-5 tracking-[0.12em] text-white/25">
            INDEPENDENT WORK · DESIGN · DEVELOPMENT
          </p>
          <p className="text-xs text-white/30">
            Built with intention, one experience at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
