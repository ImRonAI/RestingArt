/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Canvas } from '@react-three/fiber';
import Hero3D from './components/Hero3D';
import HeroOverlay from './components/HeroOverlay';
import MainContent from './components/MainContent';
import { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!entered) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [entered]);

  const handleEnter = () => {
    setEntered(true);

    // Smoothly scroll down to the MainContent once unlocked
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <main className="relative w-full bg-slate-50 overflow-x-hidden selection:bg-orange-500/30 selection:text-slate-900">
      
      {/* 3D Canvas Layer */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <Canvas 
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>
        </Canvas>
      </div>

      {/* High-Visibility Splat Layer - REMOVED AS REQUESTED */}

      {/* Pure Typography Layer (Hides completely after scrolling past to save DOM) */}
      <div className="relative w-full h-screen z-[100] pointer-events-none">
        <AnimatePresence>
          {!entered && (
            <motion.div 
              exit={{ opacity: 0, filter: 'blur(20px)' }}
              transition={{ duration: 1.0 }}
              className="absolute inset-0 pointer-events-auto"
            >
              <HeroOverlay onEnter={handleEnter} fadeOut={false} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rest of the site */}
      <div className="relative w-full z-20">
        <MainContent entered={entered} />
      </div>

    </main>
  );
}
