import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';
import ScrollSplat from './ScrollSplat';

// --- Boutique Sunlight Dust Particles (Delight) ---
function FloatingDust({ count = 200 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const { scrollYProgress } = useScroll();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const scroll = scrollYProgress.get();
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      particle.mx += (state.pointer.x * 10 - particle.mx) * 0.01;
      particle.my += (state.pointer.y * 10 - particle.my) * 0.01;
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10 + scroll * 20
      );
      
      const scale = (s * 2 + 5) * 0.01;
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} transparent opacity={0.6} />
    </instancedMesh>
  );
}

// --- Dynamic Cursor Light ---
function CursorLight() {
  const lightRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(new THREE.Object3D());
  const { viewport } = useThree();
  const vec = useMemo(() => new THREE.Vector3(), []);
  
  useFrame(({ pointer }) => {
    const x = (pointer.x * viewport.width) / 2;
    const y = (pointer.y * viewport.height) / 2;
    vec.set(x, y, 5);
    if (lightRef.current) {
      lightRef.current.position.lerp(vec, 0.1);
      targetRef.current.position.lerp(new THREE.Vector3(x * 0.5, y * 0.5, 3.5), 0.1);
    }
  });

  return (
    <group>
       <primitive object={targetRef.current} position={[0, 0, 3.5]} />
       <spotLight 
         ref={lightRef}
         color="#FFFFFF"
         intensity={10} 
         angle={Math.PI / 3} 
         penumbra={0.6} 
         distance={50} 
         decay={1.2}
         target={targetRef.current}
       />
    </group>
  );
}

function SceneLighting() {
  const { scrollYProgress } = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // 3D Scrolling Parallax
      groupRef.current.position.y = scrollYProgress.get() * 5;
      groupRef.current.rotation.x = scrollYProgress.get() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#fffcf2" />
      <CursorLight />
      <FloatingDust />
      <ScrollSplat />
    </group>
  );
}

export default function Hero3D() {
  return (
    <>
      <SceneLighting />
    </>
  );
}
