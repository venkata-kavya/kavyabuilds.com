import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const PreloaderScene = () => {
  const group = useRef();

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.8;
      group.current.rotation.x += delta * 0.4;
    }
  });

  return (
    <>
      <group ref={group} scale={0.9}>
        <mesh>
          <icosahedronGeometry args={[1.4, 1]} />
          <meshBasicMaterial
            wireframe
            color="#00F0FF"
            transparent
            opacity={0.3}
          />
        </mesh>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <icosahedronGeometry args={[0.9, 0]} />
          <meshBasicMaterial
            wireframe
            color="white"
            transparent
            opacity={0.15}
          />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.4, 0]} />
          <meshBasicMaterial color="#00F0FF" toneMapped={false} />
        </mesh>
      </group>
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          height={300}
          intensity={1.5}
        />
      </EffectComposer>
    </>
  );
};
export default PreloaderScene;
