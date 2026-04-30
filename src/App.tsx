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
  const handleEnter = () => {
    // Smoothly scroll down to the secondary hero
    const element = document.getElementById("secondary-hero-section");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative w-full bg-white overflow-x-hidden selection:bg-orange-500/30 selection:text-slate-900">
      
      {/* 3D Canvas Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas 
          style={{ pointerEvents: 'none' }}
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative w-full z-20">
        <section className="relative w-full h-[100dvh] bg-transparent z-[100] flex justify-center items-center">
           <div className="absolute inset-0 bg-white pointer-events-none"></div>
           <HeroOverlay onEnter={handleEnter} fadeOut={false} />
        </section>

        <MainContent entered={true} />
      </div>

    </main>
  );
}
