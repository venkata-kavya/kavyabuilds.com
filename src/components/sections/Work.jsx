import React, { useLayoutEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import useIsMobile from "../../hooks/useIsMobile";

/* =====================================================
   DATA
===================================================== */

const projects = [
  {
    title: "Macfolio",
    type: "macOS / Portfolio",
    description:
      "A fully realized macOS-inspired portfolio experience blending familiar desktop interactions with a polished personal interface.",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2070&auto=format&fit=crop",
    link: "https://macfolio-kavyabuilds.vercel.app",
  },
  {
    title: "Aura",
    type: "iOS / Interface",
    description:
      "A calm, tactile interface inspired by the precision and simplicity of iOS, with fluid motion and a polished, minimal experience.",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    link: "https://aura-one-drab.vercel.app",
  },
  {
    title: "Neo Brutal",
    type: "Anti-Design / Experiment",
    description:
      "A deliberately loud anti-design experiment built around bold typography, raw structure, sharp contrast, and unapologetic personality.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    link: "https://dorksense-three.vercel.app",
  },
  {
    title: "Mosaic OS",
    type: "3D / Creative Technology",
    description:
      "A futuristic 3D experience exploring immersive interfaces, spatial interaction, and technology-forward visual design.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    link: "YOUR_3D_WEBSITE_URL", // <- replace with a real URL
  },
];

const EASE = [0.22, 1, 0.36, 1];

/* =====================================================
   PROJECT CARD
   Defined OUTSIDE Work so it is never remounted.
===================================================== */

const ProjectCard = ({ project, mobile }) => (
  <motion.a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    initial="rest"
    animate="rest"
    whileHover={!mobile ? "hover" : undefined}
    whileInView={mobile ? "active" : undefined}
    viewport={mobile ? { once: false, amount: 0.55 } : undefined}
    variants={{
      rest: { scale: 1, boxShadow: "0 0 0 rgba(0,240,255,0)" },
      active: {
        scale: 1.01,
        boxShadow:
          "0 0 28px rgba(0,240,255,0.13), 0 0 70px rgba(0,209,160,0.06)",
      },
      hover: {
        scale: 1.008,
        boxShadow: "0 0 30px rgba(0,240,255,0.14)",
      },
    }}
    transition={{ duration: 0.7, ease: EASE }}
    className={`group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0a] ${
      mobile
        ? "h-[235px] w-full sm:h-[260px]"
        : "h-[420px] w-[520px] lg:h-[470px] lg:w-[560px]"
    }`}
  >
    {/* IMAGE */}
    <motion.img
      src={project.img}
      alt={project.title}
      loading="lazy"
      decoding="async"
      draggable={false}
      variants={{
        rest: {
          scale: 1,
          filter: mobile
            ? "grayscale(100%) saturate(0.7)"
            : "grayscale(100%) saturate(0.8)",
        },
        active: {
          scale: 1.035,
          filter: "grayscale(0%) saturate(1.25) brightness(1.02)",
        },
        hover: {
          scale: 1.035,
          filter: "grayscale(0%) saturate(1.2) brightness(1.02)",
        },
      }}
      transition={{ duration: 1, ease: EASE }}
      className="absolute inset-0 h-full w-full object-cover"
    />

    {/* COLOR WASH */}
    <motion.div
      variants={{
        rest: { opacity: mobile ? 0.08 : 0.04 },
        active: { opacity: 0.2 },
        hover: { opacity: 0.16 },
      }}
      transition={{ duration: 0.8 }}
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(0,240,255,0.32),transparent_65%)]"
    />

    {/* DARK GRADIENT */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

    {/* TOP META */}
    <div className="absolute left-5 right-5 top-5 flex items-center justify-between lg:left-7 lg:right-7 lg:top-7">
      <span className="font-mono text-[8px] tracking-[0.16em] text-white/45 sm:text-[10px]">
        {project.type}
      </span>

      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 0.8,
          ease: "easeInOut",
        }}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md sm:h-10 sm:w-10"
      >
        <ArrowUpRight size={15} strokeWidth={1.5} className="text-cyan-400" />
      </motion.div>
    </div>

    {/* CONTENT */}
    <div className="absolute bottom-5 left-5 right-5 lg:bottom-9 lg:left-9 lg:right-9">
      <h3 className="text-[2rem] font-medium leading-none tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
        {project.title}
      </h3>

      <p className="mt-2 max-w-[300px] text-[11px] leading-relaxed text-white/45 sm:mt-3 sm:text-sm">
        {project.description}
      </p>

      <div className="mt-4 h-px w-[34px] bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.7)] sm:mt-6" />
    </div>
  </motion.a>
);

/* =====================================================
   MOBILE
===================================================== */

const WorkMobile = () => (
  <section
    id="work"
    className="relative bg-[#050505] px-4 py-[80px] text-white sm:px-6 sm:py-[100px]"
  >
    <div className="mb-9 sm:mb-12">
      <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-400/70 sm:text-xs">
        Selected work
      </p>

      <h2 className="text-[2.55rem] font-medium leading-[0.92] tracking-[-0.055em] sm:text-5xl">
        A few things
        <br />
        <span className="text-white/30">I've made.</span>
      </h2>
    </div>

    <div className="flex flex-col gap-4 sm:gap-5">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} mobile />
      ))}
    </div>
  </section>
);

/* =====================================================
   DESKTOP: PINNED HORIZONTAL SCROLL

   Section height = 100vh + horizontal overflow.
   So 1px of vertical scroll == 1px of horizontal travel.
   The pinned panel is exactly 100vh, same unit as the
   section, so the pin releases exactly when the last
   card lands.
===================================================== */

const WorkDesktop = () => {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  // Horizontal overflow in px, kept in a motion value so
  // measuring never triggers a React re-render.
  const distance = useMotionValue(0);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      distance.set(
        Math.max(0, Math.round(track.scrollWidth - viewport.clientWidth)),
      );
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);
    window.addEventListener("load", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", measure);
    };
  }, [distance]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Tight spring: smooths wheel notches without feeling laggy.
  // Replace `smooth` with `scrollYProgress` below for 1:1 raw scroll.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 38,
    mass: 0.35,
    restDelta: 0.0005,
  });

  const x = useTransform([smooth, distance], ([p, d]) => -p * d);
  const sectionHeight = useTransform(distance, (d) => `calc(100vh + ${d}px)`);

  return (
    <motion.section
      id="work"
      ref={sectionRef}
      style={{ height: sectionHeight }}
      className="relative w-full bg-[#050505] text-white"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="flex h-full w-full flex-col justify-center">
          {/* INTRO */}
          <div className="mx-auto mb-10 flex w-full max-w-[1200px] items-end justify-between px-6 lg:mb-12 lg:px-10">
            <div>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-cyan-400/70">
                Selected work
              </p>

              <h2 className="text-6xl font-medium leading-[0.9] tracking-[-0.05em] lg:text-7xl">
                A few things <span className="text-white/30">I've made.</span>
              </h2>
            </div>

            <p className="hidden max-w-[240px] text-right text-sm leading-relaxed text-white/30 md:block">
              Interfaces, experiments and digital spaces built with curiosity
              and care.
            </p>
          </div>

          {/* VIEWPORT */}
          <div ref={viewportRef} className="relative w-full overflow-hidden">
            {/* TRACK */}
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex w-max flex-nowrap gap-6 px-6 will-change-transform lg:px-10"
            >
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </motion.div>
          </div>

          {/* SCROLL HINT */}
          <div className="mx-auto mt-7 flex w-full max-w-[1200px] items-center justify-between px-6 lg:px-10">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ width: [28, 48, 28], opacity: [0.25, 0.6, 0.25] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-px bg-white/30"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
                Scroll to explore
              </span>
            </div>

            <span className="hidden font-mono text-[9px] tracking-[0.18em] text-white/20 sm:block">
              01 — 04
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

/* =====================================================
   ENTRY
===================================================== */

const Work = () => {
  const isMobile = useIsMobile();
  return isMobile ? <WorkMobile /> : <WorkDesktop />;
};

export default Work;
