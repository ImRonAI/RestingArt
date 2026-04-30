import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MAX_PARTICLES = 150; // 3 bursts * 50 particles

interface Burst {
  time: number;
  color: THREE.Color;
  active: boolean;
}

export default function ScrollSplat() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-allocate particles array
  const particles = useMemo(() => {
    return Array.from({ length: MAX_PARTICLES }).map(() => ({
      x: 0, y: 0, z: 0,
      vx: 0, vy: 0, vz: 0,
      scale: 0,
      lifespan: 0,
      active: false,
      color: new THREE.Color()
    }));
  }, []);

  const colorArray = useMemo(() => new Float32Array(MAX_PARTICLES * 3), []);

  useEffect(() => {
    let particleIdx = 0;

    const handleEmit = (e: Event) => {
      const customEvent = e as CustomEvent;
      const colorHex = customEvent.detail?.color || '#F97316';
      const color = new THREE.Color(colorHex);

      // Emit 50 particles
      for (let i = 0; i < 50; i++) {
        const p = particles[particleIdx % MAX_PARTICLES];
        p.active = true;
        p.x = (Math.random() - 0.5) * 2; // Start near center
        p.y = (Math.random() - 0.5) * 2;
        p.z = Math.random() * -2;
        
        // Tasteful outwards velocity
        const speed = 0.05 + Math.random() * 0.1;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        
        p.vx = Math.sin(phi) * Math.cos(theta) * speed * 2;
        p.vy = Math.sin(phi) * Math.sin(theta) * speed * 2;
        p.vz = Math.cos(phi) * speed * 2 + 0.1; // push slightly forward

        p.scale = Math.random() * 0.3 + 0.1; // Small scale
        p.lifespan = 2.0 + Math.random(); // 2-3 seconds lifespan
        p.color.copy(color);
        
        // Add some variation to color
        p.color.lerp(new THREE.Color('#ffffff'), Math.random() * 0.2);
        
        p.color.toArray(colorArray, (particleIdx % MAX_PARTICLES) * 3);
        
        particleIdx++;
      }
      
      if (meshRef.current) {
         meshRef.current.geometry.attributes.instanceColor.needsUpdate = true;
      }
    };

    window.addEventListener('emit-splat', handleEmit);
    return () => window.removeEventListener('emit-splat', handleEmit);
  }, [particles, colorArray]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    
    particles.forEach((p, i) => {
      if (!p.active) return;
      
      p.lifespan -= delta;
      if (p.lifespan <= 0) {
        p.active = false;
        dummy.scale.set(0, 0, 0);
      } else {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        
        // Gravity
        p.vy -= 0.005;
        // Drag
        p.vx *= 0.95;
        p.vz *= 0.95;
        
        // Shrink over time
        const currentScale = p.scale * Math.max(0, p.lifespan / 2.0);
        
        dummy.position.set(p.x, p.y, p.z);
        
        // Stretch by velocity
        const velocityMag = Math.sqrt(p.vx*p.vx + p.vy*p.vy + p.vz*p.vz);
        const stretch = 1 + velocityMag * 2;
        
        dummy.scale.set(currentScale, currentScale, currentScale * stretch);
        dummy.lookAt(p.x + p.vx, p.y + p.vy, p.z + p.vz);
      }
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, MAX_PARTICLES]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshPhysicalMaterial 
        roughness={0.1}
        metalness={0.1}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
      />
      <instancedBufferAttribute attach="instanceColor" args={[colorArray, 3]} />
    </instancedMesh>
  );
}
