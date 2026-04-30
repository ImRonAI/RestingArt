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
          end: "+=180%", // slightly longer for more flow
          pin: true,
          scrub: 1.5, // smoother scrub
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
        "-webkit-clip-path": "inset(0% 0% 0% 0%)",
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
    <section ref={containerRef} id="repurpose" className="relative w-full min-h-[100dvh] z-30 bg-sky-50 text-slate-800 border-t border-slate-200 overflow-hidden pointer-events-auto shrink-0 flex">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-screen py-12 lg:py-20 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16">
        
        {/* Visual Half - The Before/After Image */}
        <div className="w-full flex-1 lg:w-1/2 flex items-center justify-center shrink-0 z-10 lg:pb-0 min-h-[250px] sm:min-h-[300px]">
          <div className="relative w-full aspect-square max-w-[320px] sm:max-w-[500px] lg:max-w-[600px] max-h-[40vh] lg:max-h-[75vh] overflow-hidden rounded-2xl shadow-2xl bg-slate-200 select-none pointer-events-none">
             {/* Drab (Before) Image - Always visible underneath */}
             <div className="absolute inset-0 w-full h-full z-0 block">
               <img 
                  id="drab-before-image"
                  src="/drab.jpeg" 
                  alt="Drab furniture before restoration" 
                  className="w-full h-full object-cover block pointer-events-none"
               />
             </div>

             {/* Fab (After) Image - Revealed via clipPath */}
             <div 
               className="fab-image-container opacity-0 invisible absolute inset-0 w-full h-full z-10 block pointer-events-none"
               style={{ clipPath: "inset(0% 100% 0% 0%)", WebkitClipPath: "inset(0% 100% 0% 0%)" }}
             >
               <img 
                  id="fab-after-image"
                  src="/fab-1.png" 
                  alt="Fabulous furniture after restoration" 
                  className="w-full h-full object-cover block pointer-events-none"
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
        <div className="w-full lg:w-1/2 flex flex-col justify-center relative min-h-[25vh] sm:min-h-[30vh] lg:min-h-[50vh] z-10 shrink-0">
           
           {/* Section 1: DRAB Content */}
           <div className="drab-content absolute inset-0 flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-10 p-2">

             <span className="text-orange-600 uppercase tracking-widest text-[9px] sm:text-xs font-bold mb-2 lg:mb-8 block">
               Donations & Restoration (Scroll to Slide)
             </span>
             <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl mb-3 sm:mb-6 leading-tight text-slate-800 font-medium">
               We take <br/>
               <span className="italic text-sky-600">drab...</span>
             </h2>
             <p className="font-sans text-slate-600 text-xs sm:text-base md:text-lg leading-relaxed max-w-md lg:max-w-lg mb-4 lg:mb-8">
               Well-made furniture shouldn't end up in a landfill. We gladly accept donations of pieces and give them a fresh update.
             </p>
           </div>

           {/* Section 2: FAB Content */}
           <div className="fab-content opacity-0 invisible translate-y-8 absolute inset-0 flex flex-col justify-center items-center lg:items-start text-center lg:text-left z-0">
             <span className="text-sky-600 uppercase tracking-widest text-[9px] sm:text-xs font-bold mb-2 lg:mb-8 block opacity-0">
               .
             </span>
             <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl mb-3 sm:mb-6 leading-tight text-slate-800 font-medium">
               Make it <br/>
               <span className="italic text-sky-600">Fab.</span>
             </h2>
             <p className="font-sans text-slate-800 text-xs sm:text-base md:text-lg leading-relaxed max-w-md lg:max-w-lg font-medium mb-6 lg:mb-10">
               Love your grandma's armchair but hate the pattern? We can sand, stain, and apply expressive art to your favorite old pieces.
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
