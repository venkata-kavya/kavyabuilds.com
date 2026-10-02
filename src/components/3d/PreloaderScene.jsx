import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const PreloaderScene = () => {
  const cubeRef = useRef();

  useFrame((_, delta) => {
    if (!cubeRef.current) return;

    cubeRef.current.rotation.x += delta * 0.4;
    cubeRef.current.rotation.y += delta * 0.6;
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#00F0FF" wireframe />
    </mesh>
  );
};

export default PreloaderScene;
