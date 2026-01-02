import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const PreloaderScene = () => {
  const outerRef = useRef();
  const innerRef = useRef();
  const coreRef = useRef();

  useFrame((state, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.5;
      outerRef.current.rotation.y += delta * 0.6;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.5; // Reverse rotation
      innerRef.current.rotation.y -= delta * 0.4;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 1;
      coreRef.current.rotation.z += delta * 1;
    }
  });

  return (
    <group scale={1}>
      {/* 1. Outer Wireframe Box */}
      <mesh ref={outerRef}>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshBasicMaterial
          wireframe
          color="#00F0FF"
          opacity={0.5}
          transparent
        />
      </mesh>

      {/* 2. Inner Wireframe Box (Creates Tesseract effect) */}
      <mesh ref={innerRef}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshBasicMaterial wireframe color="white" opacity={0.3} transparent />
      </mesh>

      {/* 3. Solid Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#00F0FF" />
      </mesh>
    </group>
  );
};

export default PreloaderScene;
