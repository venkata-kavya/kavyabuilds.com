import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  {
    label: "WORK",
    id: "work",
  },
  {
    label: "ARSENAL",
    id: "arsenal",
  },
  {
    label: "CONTACT",
    id: "contact",
  },
];

const MorphingInterface = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("work");
  const [hoveredItem, setHoveredItem] = useState(null);

  const { scrollY } = useScroll();

  /* =====================================================
     DETECT HERO / SCROLL STATE
  ===================================================== */

  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = window.innerHeight * 0.2;

    setIsScrolled(latest > threshold);
  });

  /* =====================================================
     ACTIVE SECTION TRACKING
  ===================================================== */

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  /* =====================================================
     SCROLL TO SECTION
  ===================================================== */

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setActiveSection(id);
  };

  return (
    <LayoutGroup>
      <motion.div
        layout
        layoutId="nav-capsule"
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          mass: 0.9,
        }}
        className={cn(
          /* POSITION */

          "fixed",
          "left-1/2",
          "-translate-x-1/2",
          "z-[9999]",

          /* SIZE */

          "h-[52px]",

          /* GLASS */

          "backdrop-blur-xl",
          "backdrop-saturate-150",
          "bg-black/[0.28]",
          "border",
          "border-white/[0.12]",

          /* DEPTH */

          "shadow-[0_10px_50px_rgba(0,0,0,0.35)]",

          /* PERFORMANCE */

          "transform-gpu",
          "overflow-hidden",

          /* SHAPE */

          "rounded-full",

          isScrolled ? "top-5" : "bottom-10",
        )}
        style={{
          width: isScrolled ? "min(94vw, 520px)" : "min(90vw, 500px)",
        }}
      >
        <AnimatePresence mode="popLayout">
          {/* =================================================
              HERO STATE
          ================================================= */}

          {!isScrolled ? (
            <motion.button
              key="explore"
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => handleScrollTo("work")}
              className="
                relative
                w-full
                h-full
                flex
                items-center
                justify-center
                gap-3
                px-6
                overflow-hidden
                cursor-pointer
                group
              "
            >
              {/* Glass light sweep */}

              <motion.div
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  -left-1/2
                  w-1/2
                  bg-gradient-to-r
                  from-transparent
                  via-white/[0.08]
                  to-transparent
                  skew-x-[-20deg]
                "
                animate={{
                  x: ["0%", "400%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
              />

              {/* Text */}

              <span
                className="
                  relative
                  z-10
                  font-mono
                  text-[10px]
                  sm:text-xs
                  tracking-[0.22em]
                  text-white/80
                  transition-all
                  duration-500
                  group-hover:text-white
                  group-hover:tracking-[0.28em]
                "
              >
                START EXPLORING
              </span>

              {/* Animated arrow */}

              <motion.div
                className="
                  relative
                  z-10
                  flex
                  items-center
                  justify-center
                "
                animate={{
                  y: [0, 5, 0],
                  opacity: [0.45, 1, 0.45],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowDown
                  className="
                    w-[15px]
                    h-[15px]
                    text-white/70
                    transition-colors
                    duration-300
                    group-hover:text-cyan-400
                  "
                  strokeWidth={1.5}
                />
              </motion.div>

              {/* Bottom glow */}

              <motion.div
                className="
                  absolute
                  bottom-0
                  left-[20%]
                  right-[20%]
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-cyan-400/40
                  to-transparent
                "
                animate={{
                  opacity: [0.2, 0.7, 0.2],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
          ) : (
            /* =================================================
               SCROLLED NAVBAR
            ================================================= */

            <motion.nav
              key="navbar"
              initial={{
                opacity: 0,
                y: -5,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -5,
                scale: 0.97,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                flex
                h-full
                w-full
                items-center
                justify-between
                px-3
                sm:px-4
              "
            >
              {/* =================================================
                  BRAND
              ================================================= */}

              <button
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="
                  group
                  relative
                  flex
                  h-full
                  shrink-0
                  items-center
                  px-3
                  sm:px-4
                  cursor-pointer
                "
              >
                <span
                  className="
                    font-mono
                    text-[10px]
                    sm:text-xs
                    font-bold
                    tracking-[0.14em]
                    text-cyan-400
                    transition-all
                    duration-300
                    group-hover:text-cyan-300
                    group-hover:tracking-[0.18em]
                  "
                >
                  KAVYABUILDS
                </span>

                {/* tiny hover line */}

                <motion.span
                  className="
                    absolute
                    bottom-[7px]
                    left-3
                    right-3
                    h-px
                    origin-left
                    bg-cyan-400
                  "
                  initial={{
                    scaleX: 0,
                    opacity: 0,
                  }}
                  whileHover={{
                    scaleX: 1,
                    opacity: 0.6,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                />
              </button>

              {/* =================================================
                  NAVIGATION
              ================================================= */}

              <div
                className="
                  relative
                  flex
                  h-[40px]
                  items-center
                  rounded-full
                  bg-white/[0.025]
                  border
                  border-white/[0.06]
                  p-1
                "
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;

                  const isHovered = hoveredItem === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleScrollTo(item.id)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="
                        relative
                        h-full
                        min-w-[70px]
                        sm:min-w-[86px]
                        px-3
                        sm:px-4
                        rounded-full
                        flex
                        items-center
                        justify-center
                        cursor-pointer
                      "
                    >
                      {/* Hover background */}

                      {isHovered && (
                        <motion.div
                          layoutId="nav-hover"
                          className="
                            absolute
                            inset-0
                            rounded-full
                            bg-white/[0.055]
                          "
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Active background */}

                      {isActive && (
                        <motion.div
                          layoutId="nav-active"
                          className="
                            absolute
                            inset-[2px]
                            rounded-full
                            border
                            border-cyan-400/10
                            bg-cyan-400/[0.035]
                          "
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Text */}

                      <span
                        className={cn(
                          "relative z-10",
                          "font-mono",
                          "text-[9px]",
                          "sm:text-[10px]",
                          "tracking-[0.12em]",
                          "transition-colors",
                          "duration-300",
                          isActive
                            ? "text-white"
                            : "text-white/45 hover:text-white/80",
                        )}
                      >
                        {item.label}
                      </span>

                      {/* Active cyan indicator */}

                      {isActive && (
                        <motion.span
                          layoutId="active-dot"
                          className="
                            absolute
                            bottom-[4px]
                            h-[2px]
                            w-[14px]
                            rounded-full
                            bg-cyan-400
                            shadow-[0_0_8px_rgba(0,240,255,0.8)]
                          "
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
};

export default MorphingInterface;
