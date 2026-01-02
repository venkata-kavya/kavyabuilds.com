import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const ContactGlobe = () => {
  const points = useRef(null);

  const sphere = useMemo(() => {
    return random.inSphere(new Float32Array(6000), { radius: 1.3 });
  }, []);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x -= delta * 0.03;
      points.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={points} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#AECFFF"
          size={0.012}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.35}
        />
      </Points>
    </group>
  );
};

export default ContactGlobe;
