import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Real vector paint splatters for authentic look
const SPLAT_PATHS = [
  // Splat 1: Big splash
  "M40,-5 C50,-10 60,-5 63,5 C66,15 65,25 60,30 C50,40 30,35 20,30 C5,20 0,5 5,-5 C10,-15 25,-20 40,-5 Z M80,-20 C85,-25 90,-20 85,-15 C80,-10 75,-15 80,-20 Z M-10,35 C-5,30 0,35 -5,40 C-10,45 -15,40 -10,35 Z",
  // Splat 2: Drippy
  "M25,0 C45,-5 55,10 50,25 C45,45 25,60 15,45 C0,25 0,10 25,0 Z M65,10 C70,5 75,10 70,15 C65,20 60,15 65,10 Z M5,45 C15,45 10,65 5,60 C0,55 -5,45 5,45 Z",
  // Splat 3: Scattered
  "M30,10 C40,0 55,20 50,30 C45,40 25,45 20,40 C10,30 15,20 30,10 Z M10,-5 C15,-10 20,-5 15,0 C10,5 5,0 10,-5 Z M70,30 C80,25 80,35 70,40 C60,45 60,35 70,30 Z M40,60 C45,55 50,60 45,65 C40,70 35,65 40,60 Z",
  // Splat 4: Hard splat
  "M35,20 C50,15 60,30 55,40 C50,55 35,60 25,50 C10,40 15,25 35,20 Z M65,5 C70,0 75,5 70,10 C65,15 60,10 65,5 Z M0,25 C5,20 10,25 5,30 C0,35 -5,30 0,25 Z M20,70 C25,65 30,70 25,75 C20,80 15,75 20,70 Z M80,50 C85,45 90,50 85,55 C80,60 75,55 80,50 Z"
];

interface SplatData {
  id: number;
  x: number;
  y: number;
  color: string;
  path: string;
  rotation: number;
  scale: number;
}

export default function DOMSplatter() {
  const [splats, setSplats] = useState<SplatData[]>([]);

  useEffect(() => {
    let splatId = 0;

    const handleEmit = (e: Event) => {
      const customEvent = e as CustomEvent;
      const color = customEvent.detail?.color || "#F97316";
      
      // Use exact clientX / clientY if provided, otherwise random position
      const evtX = customEvent.detail?.clientX;
      const evtY = customEvent.detail?.clientY;

      const x = evtX !== undefined ? evtX : window.innerWidth / 2 + (Math.random() - 0.5) * 400;
      const y = evtY !== undefined ? evtY : window.innerHeight / 2 + (Math.random() - 0.5) * 400;

      const newSplat: SplatData = {
        id: ++splatId,
        x,
        y,
        color,
        path: SPLAT_PATHS[Math.floor(Math.random() * SPLAT_PATHS.length)],
        rotation: Math.random() * 360,
        scale: 1 + Math.random() * 2.5, // BIG visceral splatters
      };

      setSplats((prev) => [...prev, newSplat]);

      // Remove splat after a few seconds so DOM doesn't get bloated
      setTimeout(() => {
        setSplats((prev) => prev.filter((s) => s.id !== newSplat.id));
      }, 4000);
    };

    window.addEventListener("emit-splat", handleEmit);
    return () => window.removeEventListener("emit-splat", handleEmit);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[200] overflow-hidden">
      <AnimatePresence>
        {splats.map((splat) => (
          <motion.div
            key={splat.id}
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: [1, 0.9, 0], scale: [splat.scale * 1.2, splat.scale, splat.scale] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.5, ease: "easeOut", times: [0, 0.1, 1] }}
            className="absolute drop-shadow-2xl mix-blend-multiply"
            style={{
              left: splat.x,
              top: splat.y,
              transform: `translate(-50%, -50%) rotate(${splat.rotation}deg)`,
              // Shift it slightly so the center of the random SVG aligns roughly with the click
              marginLeft: "-25px",
              marginTop: "-25px",
            }}
          >
            <svg
              width="100"
              height="100"
              viewBox="-20 -20 120 120"
              fill={splat.color}
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-md"
            >
              <path d={splat.path} />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
