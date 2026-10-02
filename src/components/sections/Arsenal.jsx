import React, { useRef, useState } from "react";

import { Canvas, useFrame } from "@react-three/fiber";

import { Float, ContactShadows } from "@react-three/drei";

import { motion, AnimatePresence } from "framer-motion";

import {
  Box,
  Cpu,
  Globe,
  Zap,
  Move,
  Minimize,
  Figma,
  ArrowUpRight,
} from "lucide-react";

import useIsMobile from "../../hooks/useIsMobile";

// ============================================================
// MOBILE CUBE
// ============================================================

const MobileLootCube = ({ onClick }) => {
  const mesh = useRef(null);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.6;
      mesh.current.rotation.y += delta * 0.7;
    }
  });

  return (
    <mesh
      ref={mesh}
      scale={1.4}
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <boxGeometry args={[1.8, 1.8, 1.8]} />

      <meshBasicMaterial wireframe color="#00F0FF" />
    </mesh>
  );
};

// ============================================================
// DESKTOP CUBE
// ============================================================

const DesktopLootCube = ({ onClick, clicking }) => {
  const groupRef = useRef(null);
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const coreRef = useRef(null);

  useFrame((state, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.5;
      outerRef.current.rotation.y += delta * 0.6;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.5;
      innerRef.current.rotation.y -= delta * 0.4;
    }

    if (coreRef.current) {
      coreRef.current.rotation.x += delta;
      coreRef.current.rotation.z += delta;
    }

    if (groupRef.current) {
      const targetScale = clicking ? 0.78 : 1;
      const speed = 14;

      groupRef.current.scale.x +=
        (targetScale - groupRef.current.scale.x) * speed * delta;

      groupRef.current.scale.y +=
        (targetScale - groupRef.current.scale.y) * speed * delta;

      groupRef.current.scale.z +=
        (targetScale - groupRef.current.scale.z) * speed * delta;
    }
  });

  return (
    <Float speed={1.7} rotationIntensity={0.35} floatIntensity={0.7}>
      <group
        ref={groupRef}
        onClick={onClick}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        {/* Outer wireframe */}
        <mesh ref={outerRef}>
          <boxGeometry args={[2.5, 2.5, 2.5]} />

          <meshBasicMaterial
            wireframe
            color="#00F0FF"
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Inner wireframe */}
        <mesh ref={innerRef}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />

          <meshBasicMaterial
            wireframe
            color="#ffffff"
            transparent
            opacity={0.28}
          />
        </mesh>

        {/* Core */}
        <mesh ref={coreRef}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />

          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>

        <ContactShadows
          position={[0, -3, 0]}
          opacity={0.28}
          scale={7}
          blur={3}
          far={4}
        />
      </group>
    </Float>
  );
};

// ============================================================
// MAIN
// ============================================================

const Arsenal = () => {
  const [lootIndex, setLootIndex] = useState(0);
  const [clicking, setClicking] = useState(false);

  const isMobile = useIsMobile();

  // ==========================================================
  // INVENTORY
  // ==========================================================

  const inventory = [
    {
      name: "Three.js",
      number: "01",
      tags: ["WebGL", "Shaders"],
      type: "IMMERSION",
      desc: "Rendering 3D graphics in the browser.",
      icon: <Box size={18} strokeWidth={1.4} />,
    },
    {
      name: "React.js",
      number: "02",
      tags: ["Virtual DOM", "Hooks"],
      type: "CORE TECH",
      desc: "Foundational library for atomic interfaces.",
      icon: <Cpu size={18} strokeWidth={1.4} />,
    },
    {
      name: "Spline",
      number: "03",
      tags: ["3D Modeling", "Web"],
      type: "ASSET GEN",
      desc: "Rapid 3D asset generation.",
      icon: <Globe size={18} strokeWidth={1.4} />,
    },
    {
      name: "Framer",
      number: "04",
      tags: ["Animation", "Gestures"],
      type: "MOTION",
      desc: "Production-ready motion library.",
      icon: <Zap size={18} strokeWidth={1.4} />,
    },
    {
      name: "GSAP",
      number: "05",
      tags: ["Timeline", "ScrollTrigger"],
      type: "ANIMATION",
      desc: "High-performance animation library.",
      icon: <Move size={18} strokeWidth={1.4} />,
    },
    {
      name: "Lenis",
      number: "06",
      tags: ["Scroll", "WebGL Sync"],
      type: "UX FEEL",
      desc: "Standardizing scroll physics.",
      icon: <Minimize size={18} strokeWidth={1.4} />,
    },
    {
      name: "Figma",
      number: "07",
      tags: ["Prototyping", "Design"],
      type: "DESIGN",
      desc: "The blueprint interface.",
      icon: <Figma size={18} strokeWidth={1.4} />,
    },
  ];

  // ==========================================================
  // INTERACTION
  // ==========================================================

  const handleLoot = () => {
    if (clicking) return;

    setClicking(true);

    setTimeout(() => {
      setLootIndex((prev) => (prev + 1) % inventory.length);

      setClicking(false);
    }, 220);
  };

  const item = inventory[lootIndex];

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <section
      id="arsenal"
      className="relative min-h-screen overflow-hidden bg-[#050505] text-white"
    >
      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: ["-5%", "5%", "-5%"],
            y: ["-4%", "4%", "-4%"],
            opacity: [0.025, 0.045, 0.025],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-[18%]
            top-[32%]
            h-[600px]
            w-[600px]
            rounded-full
            bg-cyan-400
            blur-[180px]
          "
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_50%,transparent_10%,#050505_75%)]" />
      </div>

      {/* ======================================================
          THE STACK — ABOVE THE CUBE
      ====================================================== */}

      <div
        className="
    absolute
    left-[236px]
    top-10
    z-30
    flex
    items-center
    gap-4
  "
      >
        <span
          className="
      whitespace-nowrap
      font-mono
      text-[11px]
      uppercase
      tracking-[0.35em]
      text-cyan-400/70
    "
        >
          THE STACK
        </span>
      </div>
      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-[1500px]
          items-center
          px-6
          pb-24
          pt-10
          md:px-10
        "
      >
        <div className="grid w-full grid-cols-1 items-center lg:grid-cols-[1.35fr_0.65fr]">
          {/* ==================================================
              LEFT — 3D OBJECT
          ================================================== */}

          <div className="relative flex h-[470px] items-center justify-center md:h-[650px]">
            {/* Background number */}
            <motion.span
              key={item.number}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="
                pointer-events-none
                absolute
                left-[7%]
                top-1/2
                -translate-y-1/2
                select-none
                text-[30vw]
                font-semibold
                leading-none
                tracking-[-0.12em]
                text-white/[0.018]
                md:text-[23vw]
              "
            >
              {item.number}
            </motion.span>

            {/* Main orbit */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                left-1/2
                top-1/2
                h-[320px]
                w-[320px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-white/[0.035]
                md:h-[500px]
                md:w-[500px]
              "
            />

            {/* Secondary orbit */}
            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[230px]
                w-[230px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-cyan-400/[0.045]
                md:h-[370px]
                md:w-[370px]
              "
            />

            {/* Orbit marker */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                left-1/2
                top-1/2
                h-[350px]
                w-[350px]
                -translate-x-1/2
                -translate-y-1/2
                md:h-[530px]
                md:w-[530px]
              "
            >
              <span
                className="
                  absolute
                  left-1/2
                  top-0
                  h-1
                  w-1
                  -translate-x-1/2
                  rounded-full
                  bg-cyan-400
                  shadow-[0_0_12px_#00F0FF]
                "
              />
            </motion.div>

            {/* 3D canvas */}
            <div className="relative z-10 h-full w-full">
              <Canvas
                camera={{ position: [0, 0, 6] }}
                dpr={[1, isMobile ? 1 : 1.5]}
              >
                {!isMobile && <ambientLight intensity={0.5} />}

                {!isMobile && (
                  <pointLight position={[10, 10, 10]} intensity={1} />
                )}

                {isMobile ? (
                  <MobileLootCube onClick={handleLoot} />
                ) : (
                  <DesktopLootCube onClick={handleLoot} clicking={clicking} />
                )}
              </Canvas>
            </div>

            {/* Technical labels */}
            <div className="absolute left-0 top-[8%] font-mono text-[7px] tracking-[0.3em] text-white/15">
              OBJECT / 3D
            </div>

            <div className="absolute bottom-[10%] left-0 font-mono text-[7px] tracking-[0.3em] text-white/15">
              WEBGL
            </div>

            {/* Interaction */}
            <motion.button
              onClick={handleLoot}
              animate={{
                opacity: [0.35, 0.75, 0.35],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                bottom-[5%]
                left-1/2
                z-30
                -translate-x-1/2
                whitespace-nowrap
                font-mono
                text-[8px]
                tracking-[0.28em]
                text-white/40
                transition-colors
                duration-300
                hover:text-cyan-400
              "
            >
              <span className="hidden sm:inline">CLICK TO EXPLORE</span>

              <span className="sm:hidden">TAP TO EXPLORE</span>

              <span className="ml-2 text-cyan-400/60">→</span>
            </motion.button>
          </div>

          {/* ==================================================
              RIGHT — INFORMATION
          ================================================== */}

          <div className="relative flex items-center lg:pl-8">
            <div className="w-full max-w-[520px]">
              {/* Item header */}
              <div className="mb-8 flex items-center justify-between border-b border-white/[0.08] pb-5">
                <span className="font-mono text-[8px] tracking-[0.3em] text-cyan-400/70">
                  {item.type}
                </span>

                <span className="font-mono text-[8px] tracking-[0.3em] text-white/20">
                  {item.number} / 07
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={lootIndex}
                  initial={{
                    opacity: 0,
                    y: 25,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: -20,
                    filter: "blur(10px)",
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Icon */}
                  <div className="mb-7 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cyan-400">
                    {item.icon}
                  </div>

                  {/* Name */}
                  <h2
                    className="
                      text-4xl
                      font-semibold
                      leading-[0.95]
                      tracking-[-0.045em]
                      text-white
                      md:text-5xl
                    "
                  >
                    {item.name}
                  </h2>

                  {/* Description */}
                  <p
                    className="
                      mt-8
                      max-w-md
                      text-sm
                      font-light
                      leading-7
                      tracking-[0.04em]
                      text-white/35
                      md:text-base
                    "
                  >
                    {item.desc}
                  </p>

                  {/* Tags */}
                  <div className="mt-8 flex gap-6">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="
                          font-mono
                          text-[8px]
                          tracking-[0.25em]
                          text-white/25
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Explore */}
              <div className="mt-14 flex items-center justify-between">
                <button
                  onClick={handleLoot}
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    border-b
                    border-white/10
                    pb-3
                    font-mono
                    text-[8px]
                    tracking-[0.25em]
                    text-white/40
                    transition-colors
                    duration-300
                    hover:border-cyan-400/50
                    hover:text-cyan-400
                  "
                >
                  EXPLORE NEXT
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                    "
                  />
                </button>

                {/* Progress */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-[3px]">
                    {inventory.map((_, index) => (
                      <span
                        key={index}
                        className={`h-[2px] w-4 transition-all duration-500 ${
                          index === lootIndex ? "bg-cyan-400" : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          BOTTOM RIGHT
      ====================================================== */}

      <div
        className="
          absolute
          bottom-10
          right-6
          z-20
          md:right-10
        "
      >
        <span className="font-mono text-[7px] tracking-[0.3em] text-white/15">
          DIGITAL MATERIALS
        </span>
      </div>

      {/* Bottom fade */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          z-10
          h-32
          bg-gradient-to-t
          from-[#050505]
          to-transparent
        "
      />
    </section>
  );
};

export default Arsenal;
