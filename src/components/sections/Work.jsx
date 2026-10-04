import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import useIsMobile from "../../hooks/useIsMobile";

const Work = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Adjusted for 4 projects
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

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
      link: "YOUR_3D_WEBSITE_URL",
    },
  ];

  /* =====================================================
     PROJECT CARD
  ===================================================== */

  const ProjectCard = ({ project }) => {
    return (
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={!isMobile ? "hover" : undefined}
        initial={isMobile ? "rest" : undefined}
        whileInView={isMobile ? "active" : undefined}
        viewport={
          isMobile
            ? {
                once: false,
                amount: 0.55,
              }
            : undefined
        }
        variants={{
          rest: {
            scale: 1,
            boxShadow: "0 0 0 rgba(0,240,255,0)",
          },

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
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          group
          relative
          flex-shrink-0
          overflow-hidden
          rounded-xl
          border
          border-white/[0.08]
          bg-[#0a0a0a]
          cursor-pointer

          ${
            isMobile
              ? "w-full h-[235px] sm:h-[260px]"
              : "w-[520px] h-[420px] lg:w-[560px] lg:h-[470px]"
          }
        `}
      >
        {/* =================================================
            IMAGE
        ================================================= */}

        <motion.img
          src={project.img}
          alt={project.title}
          loading="lazy"
          decoding="async"
          variants={{
            rest: {
              scale: 1,
              filter: isMobile
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
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />

        {/* =================================================
            COLOR WASH
        ================================================= */}

        <motion.div
          variants={{
            rest: {
              opacity: isMobile ? 0.08 : 0.04,
            },

            active: {
              opacity: 0.2,
            },

            hover: {
              opacity: 0.16,
            },
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_55%,rgba(0,240,255,0.32),transparent_65%)]
          "
        />

        {/* =================================================
            DARK GRADIENT
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/25
            to-transparent
          "
        />

        {/* =================================================
            TOP META
        ================================================= */}

        <div
          className={`
            absolute
            left-5
            right-5
            top-5
            flex
            items-center
            justify-between

            ${
              isMobile
                ? "sm:left-6 sm:right-6 sm:top-6"
                : "lg:left-7 lg:right-7 lg:top-7"
            }
          `}
        >
          <span
            className="
              font-mono
              text-[8px]
              tracking-[0.16em]
              text-white/45
              sm:text-[10px]
            "
          >
            {project.type}
          </span>

          {/* CLICK ARROW */}

          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.8,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.2,
              opacity: 1,
            }}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/30
              backdrop-blur-md
              sm:h-10
              sm:w-10
            "
          >
            <motion.div
              animate={{
                x: [0, 2, 0],
                y: [0, -2, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: "easeInOut",
              }}
            >
              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
                className="text-cyan-400 sm:h-[17px] sm:w-[17px]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className={`
            absolute
            left-5
            right-5
            bottom-5

            ${
              isMobile
                ? "sm:left-6 sm:right-6 sm:bottom-6"
                : "lg:left-9 lg:right-9 lg:bottom-9"
            }
          `}
        >
          <motion.div
            variants={{
              active: {
                y: -2,
              },

              hover: {
                y: -3,
              },
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h3
              className="
                text-[2rem]
                font-medium
                leading-none
                tracking-[-0.05em]
                text-white
                sm:text-4xl
                lg:text-5xl
              "
            >
              {project.title}
            </h3>

            <p
              className="
                mt-2
                max-w-[300px]
                text-[11px]
                leading-relaxed
                text-white/45
                sm:mt-3
                sm:text-sm
              "
            >
              {project.description}
            </p>
          </motion.div>

          {/* ACCENT */}

          <motion.div
            variants={{
              rest: {
                width: isMobile ? 22 : 0,
                opacity: isMobile ? 0.5 : 0,
              },

              active: {
                width: 34,
                opacity: 0.9,
              },

              hover: {
                width: 34,
                opacity: 0.8,
              },
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-4
              h-px
              bg-cyan-400
              shadow-[0_0_8px_rgba(0,240,255,0.7)]
              sm:mt-6
            "
          />
        </div>
      </motion.a>
    );
  };

  /* =====================================================
     MOBILE
  ===================================================== */

  if (isMobile) {
    return (
      <section
        id="work"
        className="
          relative
          bg-[#050505]
          px-4
          py-[80px]
          text-white
          sm:px-6
          sm:py-[100px]
        "
      >
        {/* INTRO */}

        <div className="mb-9 sm:mb-12">
          <p
            className="
              mb-4
              font-mono
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-cyan-400/70
              sm:text-xs
            "
          >
            Selected work
          </p>

          <h2
            className="
              text-[2.55rem]
              font-medium
              leading-[0.92]
              tracking-[-0.055em]
              sm:text-5xl
            "
          >
            A few things
            <br />
            <span className="text-white/30">I've made.</span>
          </h2>
        </div>

        {/* CARDS */}

        <div
          className="
            flex
            flex-col
            gap-4
            sm:gap-5
          "
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>
    );
  }

  /* =====================================================
     DESKTOP
  ===================================================== */

  return (
    <section
      id="work"
      ref={containerRef}
      className="
        relative
        h-[300vh]
        bg-[#050505]
        text-white
      "
    >
      <div
        className="
          sticky
          top-0
          flex
          h-screen
          items-center
          overflow-hidden
        "
      >
        <div className="w-full">
          {/* =================================================
              INTRO
          ================================================= */}

          <div
            className="
              mx-auto
              mb-12
              flex
              max-w-[1200px]
              items-end
              justify-between
              px-6
              lg:px-10
            "
          >
            <div>
              <p
                className="
                  mb-5
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-cyan-400/70
                "
              >
                Selected work
              </p>

              <h2
                className="
                  text-6xl
                  font-medium
                  leading-[0.9]
                  tracking-[-0.05em]
                  lg:text-7xl
                "
              >
                A few things <span className="text-white/30">I've made.</span>
              </h2>
            </div>

            <p
              className="
                hidden
                max-w-[240px]
                text-right
                text-sm
                leading-relaxed
                text-white/30
                md:block
              "
            >
              Interfaces, experiments and digital spaces built with curiosity
              and care.
            </p>
          </div>

          {/* =================================================
              HORIZONTAL TRACK
          ================================================= */}

          <div className="w-full overflow-hidden">
            <motion.div
              style={{ x }}
              className="
                flex
                gap-6
                px-[max(24px,calc((100vw-1200px)/2))]
                pr-32
              "
            >
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </motion.div>
          </div>

          {/* =================================================
              SCROLL HINT
          ================================================= */}

          <div
            className="
              mx-auto
              mt-7
              flex
              max-w-[1200px]
              items-center
              gap-3
              px-6
              lg:px-10
            "
          >
            <div className="h-px w-7 bg-white/15" />

            <span
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-white/25
              "
            >
              Keep scrolling
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
