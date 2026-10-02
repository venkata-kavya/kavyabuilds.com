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

  // Same horizontal scrolling behavior
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-52%"]);

  const projects = [
    {
      title: "Aura",
      type: "iOS inspired",
      description:
        "A calm, tactile interface built around simplicity and motion.",
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
      link: "https://aura-one-drab.vercel.app",
    },
    {
      title: "Neo Brutal",
      type: "Anti-design",
      description:
        "A bold visual system exploring contrast, structure and personality.",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
      link: "https://dorksense-three.vercel.app",
    },
    {
      title: "Mosaic OS",
      type: "Application",
      description:
        "A modular workspace designed around information and interaction.",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
      link: "https://mosaic-liart.vercel.app",
    },
  ];

  const ProjectCard = ({ project }) => (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover="hover"
      className="
        group
        relative
        flex-shrink-0
        w-[520px]
        h-[420px]
        lg:w-[560px]
        lg:h-[470px]
        rounded-xl
        overflow-hidden
        border
        border-white/[0.08]
        bg-[#0a0a0a]
        cursor-pointer
      "
    >
      {/* IMAGE */}
      <motion.img
        src={project.img}
        alt={project.title}
        variants={{
          hover: {
            scale: 1.035,
          },
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          grayscale
          opacity-55
          group-hover:grayscale-0
          group-hover:opacity-75
          transition-all
          duration-700
        "
      />

      {/* DARK GRADIENT */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-black/20
          to-transparent
        "
      />

      {/* TOP META */}
      <div
        className="
          absolute
          top-7
          left-7
          right-7
          flex
          items-center
          justify-between
        "
      >
        <span
          className="
            text-[11px]
            font-mono
            tracking-[0.16em]
            text-white/45
          "
        >
          {project.type}
        </span>

        <motion.div
          variants={{
            hover: {
              opacity: 1,
              scale: 1,
              y: 0,
            },
          }}
          initial={{
            opacity: 0,
            scale: 0.8,
            y: 5,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            w-10
            h-10
            rounded-full
            border
            border-white/20
            bg-black/30
            backdrop-blur-md
            flex
            items-center
            justify-center
          "
        >
          <ArrowUpRight size={17} strokeWidth={1.5} className="text-cyan-400" />
        </motion.div>
      </div>

      {/* CONTENT */}
      <div
        className="
          absolute
          left-7
          right-7
          bottom-7
          lg:left-9
          lg:right-9
          lg:bottom-9
        "
      >
        <motion.div
          variants={{
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
              text-4xl
              lg:text-5xl
              font-medium
              tracking-[-0.045em]
              text-white
            "
          >
            {project.title}
          </h3>

          <p
            className="
              mt-3
              max-w-[360px]
              text-sm
              leading-relaxed
              text-white/45
            "
          >
            {project.description}
          </p>
        </motion.div>

        {/* SMALL ACCENT */}
        <motion.div
          variants={{
            hover: {
              width: 34,
              opacity: 0.8,
            },
          }}
          initial={{
            width: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            h-px
            bg-cyan-400
            mt-6
          "
        />
      </div>
    </motion.a>
  );

  /* ================= MOBILE ================= */

  if (isMobile) {
    return (
      <section
        id="work"
        className="
          relative
          bg-[#050505]
          text-white
          py-32
          px-6
        "
      >
        <div className="mb-14">
          <p
            className="
              text-xs
              font-mono
              tracking-[0.25em]
              uppercase
              text-cyan-400/70
              mb-5
            "
          >
            Selected work
          </p>

          <h2
            className="
              text-5xl
              font-medium
              tracking-[-0.045em]
              leading-[0.95]
            "
          >
            A few things
            <br />
            <span className="text-white/30">I've made.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>
    );
  }

  /* ================= DESKTOP ================= */

  return (
    <section
      id="work"
      ref={containerRef}
      className="
        relative
        h-[250vh]
        bg-[#050505]
        text-white
      "
    >
      <div
        className="
          sticky
          top-0
          h-screen
          flex
          items-center
          overflow-hidden
        "
      >
        <div className="w-full">
          {/* SECTION INTRO */}
          <div
            className="
              max-w-[1200px]
              mx-auto
              px-6
              lg:px-10
              mb-12
              flex
              items-end
              justify-between
            "
          >
            <div>
              <p
                className="
                  text-xs
                  font-mono
                  tracking-[0.25em]
                  uppercase
                  text-cyan-400/70
                  mb-5
                "
              >
                Selected work
              </p>

              <h2
                className="
                  text-6xl
                  lg:text-7xl
                  font-medium
                  tracking-[-0.05em]
                  leading-[0.9]
                "
              >
                A few things <span className="text-white/30">I've made.</span>
              </h2>
            </div>

            <p
              className="
                hidden
                md:block
                max-w-[240px]
                text-sm
                leading-relaxed
                text-white/30
                text-right
              "
            >
              Interfaces, experiments and digital spaces built with curiosity
              and care.
            </p>
          </div>

          {/* HORIZONTAL TRACK */}
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

          {/* SCROLL HINT */}
          <div
            className="
              max-w-[1200px]
              mx-auto
              px-6
              lg:px-10
              mt-7
              flex
              items-center
              gap-3
            "
          >
            <div className="w-7 h-px bg-white/15" />

            <span
              className="
                text-[10px]
                font-mono
                tracking-[0.18em]
                uppercase
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
