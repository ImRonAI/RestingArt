import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll, useTransform } from 'framer-motion';

function Droplet({ progress, delay, color }: { progress: any, delay: number, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Custom transform for each droplet to "fly at screen"
  // Starts far back (z: -10) and flies past camera (z: 5)
  const z = useTransform(progress, [delay, delay + 0.2], [-20, 10]);
  const opacity = useTransform(progress, [delay, delay + 0.02, delay + 0.18, delay + 0.2], [0, 1, 1, 0]);
  const scale = useTransform(progress, [delay, delay + 0.2], [0.1, 5]);

  const x = useMemo(() => (Math.random() - 0.5) * 10, []);
  const y = useMemo(() => (Math.random() - 0.5) * 10, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(x, y, z.get());
      meshRef.current.scale.setScalar(scale.get());
      // @ts-ignore
      meshRef.current.material.opacity = opacity.get();
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={color} transparent depthTest={false} />
    </mesh>
  );
}

export default function ScrollSplat() {
  const { scrollYProgress } = useScroll();
  
  // User wants half the amount (from previous versions which usually had ~1000)
  // Let's do a clean set of 24 high-impact droplets
  const droplets = useMemo(() => {
    const colors = ["#F97316", "#3B82F6", "#10B981", "#EAB308", "#8B5CF6", "#EF4444"];
    return new Array(24).fill(0).map((_, i) => ({
      delay: 0.1 + (i * 0.01), // Staggered entry
      color: colors[i % colors.length]
    }));
  }, []);

  return (
    <group>
      {droplets.map((d, i) => (
        <Droplet key={i} progress={scrollYProgress} delay={d.delay} color={d.color} />
      ))}
    </group>
  );
}
