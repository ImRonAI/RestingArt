import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const PHRASES = [
  { text: "Cozy Up.", color: "#F97316" },    // Orange
  { text: "Stay Awhile.", color: "#3B82F6" },    // Blue
  { text: "Your Happy Place.", color: "#10B981" },   // Green
];

interface Props {
  onEnter: () => void;
  fadeOut: boolean;
}

export default function HeroOverlay({ onEnter, fadeOut }: Props) {
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    // Let the perfectly timed Framer Motion queue finish
    const t = setTimeout(() => {
      setShowFinal(true);
    }, 4500); 
    
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className={`absolute inset-0 z-10 flex flex-col justify-center items-center overflow-hidden ${fadeOut ? 'pointer-events-none' : ''}`}
    >
      
      {/* 
        Ultra-smooth sequential animation mapped completely to CSS keyframes via Framer Motion, 
        bypassing React state intervals which completely fixes the choppiness. 
      */}
      {!showFinal && PHRASES.map((phrase, i) => (
        <motion.h1 
          key={i}
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)', y: 20 }}
          animate={{ 
            opacity: [0, 1, 1, 0], 
            scale: [0.8, 1, 1.05, 1.1], 
            filter: ['blur(15px)', 'blur(0px)', 'blur(0px)', 'blur(15px)'],
            y: [20, 0, -10, -20]
          }}
          transition={{ duration: 1.5, times: [0, 0.2, 0.8, 1], delay: i * 1.5, ease: "easeInOut" }}
          className="font-serif text-5xl md:text-7xl lg:text-[6rem] leading-none text-center text-shadow-sm mix-blend-difference absolute tracking-tighter"
          style={{ color: phrase.color }}
        >
          <span className="italic">{phrase.text}</span>
        </motion.h1>
      ))}

      {showFinal && (
        <motion.div 
          className="flex flex-col items-center relative w-full h-full justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Bulletproof Google Drive hotlinking using the lh3 endpoint. */}
          <motion.img 
            src="https://lh3.googleusercontent.com/d/1nDOUxeJHCAlH9YkKUs_P7-L08z6pVXU4"
            onError={(e) => {
              // Failsafe fallback 
              e.currentTarget.src = "https://drive.google.com/uc?export=view&id=1nDOUxeJHCAlH9YkKUs_P7-L08z6pVXU4";
            }}
            crossOrigin="anonymous"
            alt="Centerpiece Art"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)', y: -20 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative w-[90vw] max-w-2xl h-[40vh] md:h-[45vh] lg:h-[50vh] object-contain z-20 mb-8 drop-shadow-2xl"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="text-center z-20 flex flex-col items-center pointer-events-auto"
          >
            <span className="block text-orange-500 font-sans text-xs md:text-sm tracking-[0.4em] uppercase mb-4 text-shadow-sm bg-white/50 px-6 py-2 rounded-full backdrop-blur-md font-bold">
              Functional Masterpieces
            </span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[9rem] leading-none text-slate-800 text-shadow-sm mb-12 drop-shadow-2xl mix-blend-multiply pointer-events-none">
              Resting Art
            </h1>

            {/* Sophisticated Magnetic Sweep Button */}
            <motion.button 
              onClick={onEnter}
              className="pointer-events-auto relative overflow-hidden rounded-full border border-slate-200 px-10 py-5 bg-white/60 backdrop-blur-xl group shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 font-sans tracking-[0.2em] uppercase text-xs text-slate-700 transition-colors duration-500 group-hover:text-white flex items-center gap-4 font-bold">
                Enter the Store
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 group-hover:bg-white transition-colors duration-500"></div>
              </span>
              
              {/* Magnetic Fill Animation that perfectly sweeps up */}
              <div className="absolute left-0 bottom-0 top-auto right-0 bg-orange-500 h-0 group-hover:h-full transition-all duration-500 ease-[0.16,1,0.3,1] z-0 rounded-full"></div>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
