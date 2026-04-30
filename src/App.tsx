/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import HeroOverlay from './components/HeroOverlay';
import MainContent from './components/MainContent';
import { useState, useEffect } from 'react';
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
      
      <div className="relative w-full z-20">
        <section className="relative w-full h-[100dvh] bg-transparent z-[100] flex justify-center items-center overflow-hidden">
           <div className="absolute inset-0 bg-white pointer-events-none"></div>

           <HeroOverlay onEnter={handleEnter} fadeOut={false} />
        </section>

        <MainContent entered={true} />
      </div>

    </main>
  );
}
