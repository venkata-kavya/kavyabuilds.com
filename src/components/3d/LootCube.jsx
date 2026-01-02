import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";

const LootCube = ({ onClick, clicking }) => {
  const mesh = useRef(null);

  useFrame((state, delta) => {
    if (mesh.current) {
      // Continuous rotation
      mesh.current.rotation.x += delta * 0.2;
      mesh.current.rotation.y += delta * 0.2;

      // Click "squish" effect
      const targetScale = clicking ? 0.8 : 1;
      const speed = 15;
      mesh.current.scale.x +=
        (targetScale - mesh.current.scale.x) * speed * delta;
      mesh.current.scale.y +=
        (targetScale - mesh.current.scale.y) * speed * delta;
      mesh.current.scale.z +=
        (targetScale - mesh.current.scale.z) * speed * delta;
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
        {/* Outer Wireframe Box */}
        <mesh>
          <boxGeometry args={[2.5, 2.5, 2.5]} />
          <meshBasicMaterial wireframe color="#00F0FF" />
        </mesh>

        {/* Inner Ghost Box */}
        <mesh>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshBasicMaterial
            wireframe
            color="white"
            opacity={0.3}
            transparent
          />
        </mesh>

        {/* Core Solid Box */}
        <mesh>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial
            color="#00F0FF"
            emissive="#00F0FF"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>

        {/* Shadow */}
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

export default LootCube;
