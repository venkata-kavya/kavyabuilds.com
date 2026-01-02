import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Cpu, Globe, Zap, Move, Minimize, Figma } from "lucide-react";

const LootCube = ({ onClick, clicking }) => {
  const mesh = useRef(null);
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2;
      mesh.current.rotation.y += delta * 0.2;
      const targetScale = clicking ? 0.8 : 1;
      mesh.current.scale.lerp(
        { x: targetScale, y: targetScale, z: targetScale },
        0.1
      );
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group
        ref={mesh}
        onClick={onClick}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <mesh>
          <boxGeometry args={[2.5, 2.5, 2.5]} />
          <meshBasicMaterial wireframe color="#00F0FF" />
        </mesh>
        <mesh>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshBasicMaterial
            wireframe
            color="white"
            opacity={0.3}
            transparent
          />
        </mesh>
        <mesh>
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
          opacity={0.5}
          scale={10}
          blur={2.5}
          far={4}
        />
      </group>
    </Float>
  );
};

const Arsenal = () => {
  const [lootIndex, setLootIndex] = useState(0);
  const [clicking, setClicking] = useState(false);

  const inventory = [
    {
      name: "THREE.JS",
      tags: ["WebGL", "Shaders"],
      type: "IMMERSION",
      desc: "Rendering 3D graphics in the browser.",
      icon: <Box size={32} />,
    },
    {
      name: "REACT.JS",
      tags: ["Virtual DOM", "Hooks"],
      type: "CORE_TECH",
      desc: "Foundational library for atomic interfaces.",
      icon: <Cpu size={32} />,
    },
    {
      name: "SPLINE",
      tags: ["3D Modeling", "Web"],
      type: "ASSET_GEN",
      desc: "Rapid 3D asset generation.",
      icon: <Globe size={32} />,
    },
    {
      name: "FRAMER",
      tags: ["Animation", "Gestures"],
      type: "MOTION",
      desc: "Production-ready motion library.",
      icon: <Zap size={32} />,
    },
    {
      name: "GSAP",
      tags: ["Timeline", "ScrollTrigger"],
      type: "ANIMATION",
      desc: "High-performance animation library.",
      icon: <Move size={32} />,
    },
    {
      name: "LENIS",
      tags: ["Scroll", "WebGL Sync"],
      type: "UX_FEEL",
      desc: "Standardizing scroll physics.",
      icon: <Minimize size={32} />,
    },
    {
      name: "FIGMA",
      tags: ["Prototyping", "Design"],
      type: "DESIGN",
      desc: "The blueprint interface.",
      icon: <Figma size={32} />,
    },
  ];

  const handleLoot = () => {
    if (clicking) return;
    setClicking(true);
    setTimeout(() => {
      setLootIndex((prev) => (prev + 1) % inventory.length);
      setClicking(false);
    }, 200);
  };

  const item = inventory[lootIndex];

  return (
    <section
      id="arsenal"
      className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 items-center">
        <div className="h-[500px] w-full relative">
          <div className="absolute top-0 left-0 font-mono text-xs text-cyan-500">
            /// MY STACK
          </div>
          <Canvas camera={{ position: [0, 0, 6] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <LootCube onClick={handleLoot} clicking={clicking} />
          </Canvas>
          <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-xs text-gray-500 tracking-widest">
            [ CLICK TO DEPLOY ]
          </div>
        </div>
        <div className="flex justify-center lg:justify-start pl-12 md:pl-40 h-[400px] items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={lootIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-96 bg-gradient-to-br from-white/10 to-black/80 backdrop-blur-2xl border border-white/10 p-8 rounded-xl shadow-2xl relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                <div className="p-3 bg-black/40 rounded-lg border border-white/10 text-cyan-400">
                  {item.icon}
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] text-gray-500 mb-1">
                    /// MODULE_0{lootIndex + 1}
                  </div>
                  <div className="font-mono text-[10px] font-bold text-cyan-400 tracking-widest bg-cyan-900/20 px-2 py-1 rounded">
                    {item.type}
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">
                {item.name}
              </h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed mb-8">
                {item.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
export default Arsenal;
