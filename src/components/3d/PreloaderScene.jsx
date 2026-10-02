import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PreloaderScene = () => {
  const groupRef = useRef();
  const outerRef = useRef();
  const innerRef = useRef();
  const coreRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Overall floating movement
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.045;
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.08;
    }

    // Outer structure — slow, deliberate rotation
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.22;
      outerRef.current.rotation.y += delta * 0.3;
      outerRef.current.rotation.z += delta * 0.08;
    }

    // Inner structure — opposing movement
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.32;
      innerRef.current.rotation.y -= delta * 0.25;
      innerRef.current.rotation.z += delta * 0.12;
    }

    // Core — slightly faster but still restrained
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.7;
      coreRef.current.rotation.y += delta * 0.45;
      coreRef.current.rotation.z += delta * 0.65;

      const pulse = 1 + Math.sin(time * 2.2) * 0.045;
      coreRef.current.scale.setScalar(pulse);
    }

    // Orbital ring
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(time * 0.5) * 0.6;
      ringRef.current.rotation.y += delta * 0.4;
      ringRef.current.rotation.z += delta * 0.18;
    }
  });

  return (
    <group ref={groupRef} scale={0.68}>
      {/* =========================================================
          OUTER STRUCTURE
          ========================================================= */}

      <group ref={outerRef}>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2.5, 2.5, 2.5)]} />
          <lineBasicMaterial
            color="#00F0FF"
            transparent
            opacity={0.5}
            depthWrite={false}
          />
        </lineSegments>

        {/* Slightly smaller secondary frame */}
        <lineSegments scale={0.92}>
          <edgesGeometry args={[new THREE.BoxGeometry(2.5, 2.5, 2.5)]} />
          <lineBasicMaterial
            color="#00F0FF"
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        </lineSegments>
      </group>

      {/* =========================================================
          INNER STRUCTURE
          ========================================================= */}

      <group ref={innerRef}>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.55, 1.55, 1.55)]} />
          <lineBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={0.32}
            depthWrite={false}
          />
        </lineSegments>

        {/* Inner ghost frame */}
        <lineSegments scale={0.88}>
          <edgesGeometry args={[new THREE.BoxGeometry(1.55, 1.55, 1.55)]} />
          <lineBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={0.1}
            depthWrite={false}
          />
        </lineSegments>
      </group>

      {/* =========================================================
          ORBITAL RING
          ========================================================= */}

      <group ref={ringRef} rotation={[Math.PI / 2.4, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.92, 0.008, 8, 96]} />
          <meshBasicMaterial
            color="#00F0FF"
            transparent
            opacity={0.32}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* =========================================================
          CORE
          ========================================================= */}

      <group ref={coreRef}>
        {/* Main core */}
        <mesh>
          <octahedronGeometry args={[0.48, 0]} />
          <meshBasicMaterial color="#00F0FF" toneMapped={false} />
        </mesh>

        {/* Inner core */}
        <mesh scale={0.52}>
          <octahedronGeometry args={[0.48, 0]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={0.8}
            toneMapped={false}
          />
        </mesh>

        {/* Tiny central point */}
        <mesh scale={0.22}>
          <icosahedronGeometry args={[0.48, 0]} />
          <meshBasicMaterial color="#00F0FF" toneMapped={false} />
        </mesh>
      </group>

      {/* =========================================================
          SMALL FLOATING POINTS
          ========================================================= */}

      <mesh position={[1.05, 0.55, 0.15]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.7}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[-1.0, -0.65, 0.25]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.45}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

export default PreloaderScene;
