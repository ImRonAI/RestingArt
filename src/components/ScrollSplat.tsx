import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

export default function ScrollSplat() {
  const count = 300;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { scrollYProgress } = useScroll();

  const [bursts, setBursts] = useState<{ x: number, y: number, time: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Create an interactive burst explosion at click coordinates
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setBursts(prev => [...prev, { x: x * 20, y: y * 15, time: performance.now() / 1000 }]);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const particles = useMemo(() => {
    // Exclusively joyful, bright colors requested by user
    const colors = [
      new THREE.Color('#3B82F6'), // Blue
      new THREE.Color('#10B981'), // Green
      new THREE.Color('#EAB308'), // Yellow
      new THREE.Color('#F97316'), // Orange
      new THREE.Color('#EF4444'), // Red
      new THREE.Color('#A855F7'), // Purple
      new THREE.Color('#6366F1'), // Indigo
      new THREE.Color('#14B8A6'), // Teal
      new THREE.Color('#6EE7B7'), // Mint
      new THREE.Color('#C084FC'), // Lavender
      new THREE.Color('#EC4899'), // Pink
      new THREE.Color('#FB7185'), // Coral
      new THREE.Color('#06B6D4'), // Aqua
    ];

    const arr = [];
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      let radialDist = Math.pow(Math.random(), 3) * 45; 
      
      let x = radialDist * Math.sin(phi) * Math.cos(theta);
      let y = radialDist * Math.sin(phi) * Math.sin(theta);
      let z = radialDist * Math.cos(phi) - 10; 


      const speed = 0.05 + Math.random() * 0.25;
      const vx = (x * speed * 0.05) + (Math.random() - 0.5) * 0.5;
      const vy = (y * speed * 0.05) + (Math.random() - 0.5) * 0.5;
      const vz = (z * speed * 0.05) + (Math.random() - 0.5) * 0.5;

      const scale = Math.pow(Math.random(), 3) * 1.0 + 0.05; 
      
      arr.push({ x, y, z, vx, vy, vz, scale, color: colors[i % colors.length] });
    }
    return arr;
  }, []);

  const colorArray = useMemo(() => {
    const arr = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      p.color.toArray(arr, i * 3);
    });
    return arr;
  }, [particles]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const scrollP = scrollYProgress.get();
    
    // Shake off completely to clear the screen
    // Substantially increased gravity to instantly drag particles down the moment scroll passes 2% of page.
    const gravity = scrollP > 0.02 ? (scrollP - 0.02) * 3000 : 0;
    const wobble = scrollP > 0.02 ? Math.sin(time * 25) * (scrollP - 0.02) * 8 : 0;

    const scrollOffset = scrollP * 20; 
    
    // Scale out aggressively so they vanish by 6% scroll
    const fadeOutScale = Math.max(0, 1 - (scrollP * 25));
    
    // Instantly disappear when the center logo pops up at 4.5s
    const popFade = time >= 4.5 ? 0 : 1;
    
    particles.forEach((p, i) => {
      const easeTime = Math.log(1 + time * 3.5);
      
      let currentX = p.x + p.vx * easeTime * 5 + wobble;
      let currentY = p.y + p.vy * easeTime * 5 + scrollOffset - gravity;
      let currentZ = p.z + p.vz * easeTime * 5;

      // Click burst interaction
      bursts.forEach(burst => {
         const timeSinceBurst = time - burst.time;
         if (timeSinceBurst > 0 && timeSinceBurst < 2) {
             const dx = currentX - burst.x;
             const dy = (currentY - scrollOffset) - burst.y;
             const dist = Math.sqrt(dx*dx + dy*dy);
             if (dist < 18) {
                 const force = (18 - dist) * (1 - timeSinceBurst/2);
                 const push = force * 2.5;
                 currentX += (dx / dist) * push;
                 currentY += (dy / dist) * push;
                 currentZ += (Math.random() - 0.5) * push;
             }
         }
      });

      dummy.position.set(currentX, currentY, currentZ);
      dummy.lookAt(currentX + p.vx, currentY + p.vy, currentZ + p.vz);
      
      const velocityMag = Math.sqrt(p.vx*p.vx + p.vy*p.vy + p.vz*p.vz);
      const stretch = 1 + (velocityMag * 10) / (1 + time * 5); 
      
      dummy.scale.set(p.scale * fadeOutScale * popFade, p.scale * fadeOutScale * popFade, p.scale * stretch * fadeOutScale * popFade);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshPhysicalMaterial 
        roughness={0.0}
        metalness={0.1}
        clearcoat={1.0}
        clearcoatRoughness={0.0}
        transmission={0.0}
      />
      <instancedBufferAttribute attach="instanceColor" args={[colorArray, 3]} />
    </instancedMesh>
  );
}
