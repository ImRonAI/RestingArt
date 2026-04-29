import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RepurposeSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pin the section and animate contents based on scroll progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Scroll depth for the animation length
          pin: true,
          scrub: 1.0,
          invalidateOnRefresh: true,
        }
      });

      // Set initial states for GSAP immediately to prevent overlap
      gsap.set(".fab-content", { autoAlpha: 0, y: 30, visibility: "hidden" });
      gsap.set(".drab-content", { autoAlpha: 1, y: 0, visibility: "visible" });
      gsap.set(".fab-image-container", { autoAlpha: 0, visibility: "hidden" });

      // 1. Reveal "Fab" image container from right to left using clipPath
      // Immediately make it visible so it can be revealed by clipPath without CSS overlap breaking it
      tl.to(".fab-image-container", {
        autoAlpha: 1,
        duration: 0.01
      }, 0);

      tl.to(".fab-image-container", {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        duration: 20
      }, 0);

      // 2. Move the slider handle to the right
      tl.to(".slider-handle", {
        left: "100%",
        ease: "none",
        duration: 20
      }, 0);

      // 3. Text crossfade (Drab leaves, Fab enters)
      tl.to(".drab-content", {
        autoAlpha: 0,
        y: -30,
        ease: "power2.inOut",
        duration: 8
      }, 0); // Start fading out drab immediately

      tl.to(".fab-content", {
        autoAlpha: 1,
        y: 0,
        ease: "power2.inOut",
        duration: 8
      }, 12); // Bring in fab smoothly after drab is gone

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="repurpose" className="relative w-full h-[100dvh] z-30 bg-sky-50 text-slate-800 border-t border-slate-200 overflow-hidden pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        
        {/* Visual Half - The Before/After Image */}
        <div className="w-full flex-1 lg:w-1/2 flex items-center justify-center shrink-0 z-10 pb-8 lg:pb-0 min-h-[300px]">
          <div className="relative w-full aspect-square max-w-[500px] lg:max-w-[600px] max-h-[50vh] lg:max-h-[75vh] overflow-hidden rounded-2xl shadow-2xl bg-slate-200 select-none pointer-events-none">
             {/* Drab (Before) Image - Always visible underneath */}
             <div className="absolute inset-0 w-full h-full">
               <img 
                  src="/drab.png" 
                  alt="Drab furniture before restoration" 
                  className="w-full h-full object-cover"
               />
             </div>

             {/* Fab (After) Image - Revealed via clipPath */}
             <div 
               className="fab-image-container opacity-0 invisible absolute inset-0 w-full h-full z-10"
               style={{ clipPath: "inset(0% 100% 0% 0%)" }}
             >
               <img 
                  src="/fab.png" 
                  alt="Fabulous furniture after restoration" 
                  className="w-full h-full object-cover"
               />
             </div>

             {/* Slider Handle / Line */}
             <div 
               className="slider-handle absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center -ml-[2px]"
               style={{ left: "0%" }}
             >
               <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex gap-1 items-center justify-center shadow-2xl border border-slate-200 text-slate-800 absolute">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
               </div>
             </div>
          </div>
        </div>

        {/* Narrative Half (Absolute Crossfading Content) */}
        <div className="w-full lg:w-1/2 flex items-center relative h-[40vh] lg:h-[60vh] z-10">
           
           {/* Section 1: DRAB Content */}
           <div className="drab-content absolute inset-0 flex flex-col justify-center z-10">

             <span className="text-orange-600 uppercase tracking-widest text-[10px] sm:text-xs font-bold mb-4 lg:mb-8 block">
               Donations & Restoration (Scroll to Slide)
             </span>
             <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6 leading-tight text-slate-800 font-medium">
               We take <br/>
               <span className="italic text-sky-600">drab...</span>
             </h2>
             <p className="font-sans text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mb-8">
               Well-made furniture shouldn't end up in a landfill. We gladly accept donations of quality pieces and put our woodworkers to work giving them a fresh, modern update.
             </p>
           </div>

           {/* Section 2: FAB Content */}
           <div className="fab-content opacity-0 invisible translate-y-8 absolute inset-0 flex flex-col justify-center z-0">
             <span className="text-sky-600 uppercase tracking-widest text-[10px] sm:text-xs font-bold mb-4 lg:mb-8 block opacity-0">
               .
             </span>
             <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6 leading-tight text-slate-800 font-medium">
               Make it <br/>
               <span className="italic text-sky-600">Fab.</span>
             </h2>
             <p className="font-sans text-slate-800 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg font-medium mb-10">
               Love your grandma's armchair but hate the pattern? Let us fix it up! We can sand, stain, repair, and apply wildly expressive art to your favorite old pieces.
             </p>

             {/* Buttons */}
             <div className="flex flex-col sm:flex-row gap-4 flex-wrap pb-4">
               <button className="px-6 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full uppercase tracking-wider text-xs font-bold transition-all shadow-md hover:shadow-lg inline-block w-auto pointer-events-auto">
                 Donate a Piece
               </button>
               <button className="px-6 py-4 border-2 border-slate-300 hover:border-slate-800 text-slate-800 rounded-full uppercase tracking-wider text-xs font-bold transition-all inline-block w-auto pointer-events-auto">
                 Start a Restoration
               </button>
             </div>
           </div>

        </div>
      </div>
    </section>
  );
}
