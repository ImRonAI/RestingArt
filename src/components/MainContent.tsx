import { useRef, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import VerticalAccordion from './VerticalAccordion';
import ShowroomSection from './sections/ShowroomSection';
import ManifestoSection from './sections/ManifestoSection';
import CustomDesignsSection from './sections/CustomDesignsSection';
import RepurposeSection from './sections/RepurposeSection';
import UtahNeighborhoodsSection from './sections/UtahNeighborhoodsSection';
import FooterSections from './FooterSections';

export default function MainContent({ entered = false }: { entered?: boolean }) {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Robust playback trigger that reacts to both interaction and browser strictness
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Direct DOM manipulation for attributes that React props sometimes handle inconsistently
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');

    if (entered) {
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay was blocked or failed:", err);
          // Retry on subsequent interaction if needed, or handle gracefullly
        });
      }
    }
  }, [entered]);

  return (
    <div ref={containerRef} className="relative w-full bg-transparent overflow-visible">
      
      {/* 1. Cinematic Entry: Wasatch Work of Art */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black z-10">
        {/* User's Background Video from public folder */}
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 pointer-events-none"
          src="/background.mp4"
        />

        <motion.div 
          className="relative z-20 text-center flex flex-col items-center px-4 mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          <span className="block text-white/60 font-sans text-[10px] tracking-[0.4em] uppercase mb-4 font-bold">
            Salt Lake City, Utah
          </span>
          <h2 className="font-serif text-6xl md:text-8xl lg:text-[8rem] leading-none text-offwhite mb-8 tracking-tighter">
            The Wasatch <br/> <span className="italic text-offwhite/90">Work of Art</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <a href="/about-us" className="px-8 py-4 border border-offwhite/30 rounded-full text-offwhite uppercase tracking-widest text-xs hover:bg-offwhite hover:text-charcoal transition-colors duration-500 backdrop-blur-md">
              Our Story
            </a>
            <a href="/shop" className="px-8 py-4 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 rounded-full text-white uppercase tracking-widest text-xs hover:scale-105 transition-all duration-500 font-bold shadow-lg shadow-green-500/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 text-shadow-sm">Shop Now</span>
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-[10px] uppercase tracking-widest text-white mb-2 font-bold">Scroll To Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </section>

      {/* 2. Shop All: Product Discovery - MAKE IN VIEW AND PROMINENT */}
      <section className="relative w-full py-40 px-10 border-t border-offwhite/10 z-20 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-7xl text-slate-900 mb-8 tracking-tight"
          >
            Make Your Space Your Own
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-slate-500 font-sans leading-relaxed mb-16 text-lg md:text-xl"
          >
            Welcome to Resting Art! We're a boutique online furniture store dedicated to helping you find beautiful, cozy, and thoughtfully designed pieces. Less art gallery, more "stay in all weekend and love your room."
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <a href="/shop" className="group relative inline-flex items-center gap-4 px-12 py-6 bg-slate-900 text-white rounded-full overflow-hidden transition-all hover:pr-16">
              <span className="font-bold uppercase tracking-widest text-sm">Shop All Collections</span>
              <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all">→</div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 3-7. The Vertical Accordion of Areas */}
      <VerticalAccordion />

      {/* High impact structural sections separating out from the footer grid */}
      <ShowroomSection />
      <ManifestoSection />
      <CustomDesignsSection />
      <UtahNeighborhoodsSection />
      <RepurposeSection />

      {/* The remaining utility sections (Blog, Sustainability, Shipping, FAQ, Final CTA) */}
      <FooterSections />

    </div>
  );
}
