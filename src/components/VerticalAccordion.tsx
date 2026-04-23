import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { ChevronRight, ChevronLeft, ShoppingCart } from 'lucide-react';

const CATEGORIES = [
  {
    id: "living-room",
    title: "Living Room",
    description: "As the premier boutique furniture store in Salt Lake City, our living room collection features modern coffee tables and handcrafted seating designed for both style and comfort.",
    video: "https://player.vimeo.com/external/370331493.sd.mp4?s=7b235871fe43370b471ffae702008ba569bda662&profile_id=139&oauth2_token_id=57447761",
    products: [
      { id: 1, name: "Luxury Sofa", price: "$2,400", img: "/twofer.jpg" },
      { id: 2, name: "Alpine Coffee Table", price: "$850", img: "/couple.jpg" },
      { id: 3, name: "Bespoke Chair", price: "$1,200", img: "/yas.png" },
      { id: 4, name: "Utah Pine Console", price: "$1,100", img: "/one.png" }
    ]
  },
  {
    id: "dining-room",
    title: "Dining Room",
    description: "Discover handcrafted dining tables that serve as the heart of your home. Our boutique selection brings natural wood finishes and luxury design to your Salt Lake City space.",
    video: "https://player.vimeo.com/external/403814885.sd.mp4?s=63e7d6928e35a12003889c2b4da677ff879201f9&profile_id=139&oauth2_token_id=57447761",
    products: [
      { id: 5, name: "Harvest Table", price: "$3,200", img: "/five.jpg" },
      { id: 6, name: "Gallery Bench", price: "$950", img: "/gallery.jpg" },
      { id: 7, name: "Wasatch Chair", price: "$450", img: "/eleven.jpg" },
      { id: 8, name: "Summit Credenza", price: "$2,800", img: "/Another One.jpg" }
    ]
  },
  {
    id: "kitchen",
    title: "Kitchen",
    description: "Elevate your kitchen with custom islands and barstools. We specialize in functional boutique furniture that stands up to the demands of a busy Utah household.",
    video: "https://player.vimeo.com/external/405105212.sd.mp4?s=9105421a8f6d895690b220311f48651a511394c4&profile_id=139&oauth2_token_id=57447761",
    products: [
      { id: 9, name: "Walnut Stool", price: "$350", img: "/three.jpg" },
      { id: 10, name: "Stone Island", price: "$4,500", img: "/four.jpg" },
      { id: 11, name: "Morning Nook", price: "$1,800", img: "/coffeeshop.png" },
      { id: 12, name: "Sunlight Cart", price: "$1,200", img: "/sunshine.png" }
    ]
  },
  {
    id: "bedroom",
    title: "Bedroom",
    description: "Rest easy with our boutique bedroom furniture. From handcrafted chests to bespoke bed frames, we create a sanctuary with high-quality natural materials.",
    video: "https://player.vimeo.com/external/403814674.sd.mp4?s=7a8a18388d5e89d532087611629737190013f9f2&profile_id=139&oauth2_token_id=57447761",
    products: [
      { id: 13, name: "Cloud Bed", price: "$3,500", img: "/bedroom.jpg" },
      { id: 14, name: "Nightstand Set", price: "$1,200", img: "/nine.jpg" },
      { id: 15, name: "Evening Mirror", price: "$750", img: "/grokSingleLady.png" },
      { id: 16, name: "Cozy Ottoman", price: "$600", img: "/grokSingleLady-1.png" }
    ]
  },
  {
    id: "family-room",
    title: "Family Room",
    description: "Our Salt Lake City family room furniture is built for real life. Rugged, stylish, and perfect for lounging, our sectionals bring a boutique feel to your home.",
    video: "https://player.vimeo.com/external/405105210.sd.mp4?s=d00e700a40237e8c37edc9c99187140e698889b9&profile_id=139&oauth2_token_id=57447761",
    products: [
      { id: 17, name: "Rugged Sectional", price: "$4,200", img: "/foursome.png" },
      { id: 18, name: "Media Base", price: "$1,800", img: "/grokFamily.jpg" },
      { id: 19, name: "Side Table", price: "$450", img: "/two.jpg" },
      { id: 20, name: "Soft Pouf", price: "$300", img: "/three.jpg" }
    ]
  },
  {
    id: "backyard",
    title: "Backyard",
    description: "Experience boutique outdoor living with our weather-resistant tables and patio sets. Perfect for the rugged Utah landscape and summer gatherings.",
    video: "https://player.vimeo.com/external/403814880.sd.mp4?s=d83d8e9e62319c5c16223405797087090013f9f2&profile_id=139&oauth2_token_id=57447761",
    products: [
      { id: 21, name: "Mountain Picnic Table", price: "$1,500", img: "/six.jpg" },
      { id: 22, name: "Sunny Recliner", price: "$850", img: "/sunshine.png" },
      { id: 23, name: "Patio Set", price: "$2,800", img: "/foursome.png" },
      { id: 24, name: "Outdoor Fire Pit", price: "$1,200", img: "/yas.png" }
    ]
  },
  {
    id: "office",
    title: "The Office",
    description: "Work in style with luxury boardroom tables and ergonomic office furniture. Our boutique designs help you stay productive in a beautiful Salt Lake workspace.",
    video: "https://player.vimeo.com/external/405105206.sd.mp4?s=58d34346e9a66d66e74ca07d8d4850fa740660a9&profile_id=139&oauth2_token_id=57447761",
    products: [
      { id: 25, name: "Boardroom Table", price: "$5,500", img: "/eight.jpg" },
      { id: 26, name: "Gallery Desk", price: "$2,200", img: "/gallery.jpg" },
      { id: 27, name: "Boutique Swivel", price: "$1,100", img: "/one.png" },
      { id: 28, name: "Bookcase Set", price: "$2,400", img: "/nine.jpg" }
    ]
  }
];

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VerticalAccordion() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.accordion-item');
      
        const totalProducts = CATEGORIES.reduce((acc, cat) => acc + cat.products.length, 0);
        
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalProducts * 1500}`, // Hugely expanded scroll distance to force deceleration
          pin: true,     
          scrub: 3,      // CRITICAL FIX: Heavy 3-second inertia smoothing to completely eliminate manual scroll jitter/manic input
          invalidateOnRefresh: true,
        }
      });

      items.forEach((item, i) => {
        const imageStrip = item.querySelector('.image-strip');
        
        // 1. Horizontal Scroll Images (The current active section)
        if (imageStrip) {
          tl.to(imageStrip, { 
            x: () => {
                const parent = imageStrip.parentElement;
                return parent ? -(imageStrip.scrollWidth - parent.clientWidth) : 0;
            }, 
            ease: "none",
            duration: 40 // Massively lengthened proportion so traversing takes the vast majority of the scrub phase
          });
        }
        
        // 2. Synchronized Section Transition (if not the last section)
        if (i < items.length - 1) {
          const currentContent = item.querySelector('.cat-content');
          const currentTabTitle = item.querySelector('.tab-title');
          
          const nextItem = items[i + 1];
          const nextContent = nextItem.querySelector('.cat-content');
          const nextTabTitle = nextItem.querySelector('.tab-title');

          const transLabel = `trans_${i}`;
          tl.addLabel(transLabel);

          // Majestic, heavily damped structural morph that feels perfectly engineered
          // We use power2.inOut for an elegant, non-abrupt velocity curve
          // CRITICAL: We move the opacity fades INTO the exact same timeline position as the flex morph
          // so the content crossfades flawlessly as the container unmasks it, avoiding any sequential jarring.
          tl.to(item, { flex: 1, duration: 16, backgroundColor: '#f8fafc', ease: 'power2.inOut' }, transLabel);
          tl.to(currentContent, { autoAlpha: 0, duration: 16, ease: 'power2.inOut' }, transLabel);
          tl.to(currentTabTitle, { color: '#94a3b8', duration: 16, ease: 'power1.out' }, transLabel);

          tl.to(nextItem, { flex: 20, duration: 16, backgroundColor: '#ffffff', ease: 'power2.inOut' }, transLabel);
          tl.to(nextContent, { autoAlpha: 1, duration: 16, ease: 'power2.inOut' }, transLabel);
          tl.to(nextTabTitle, { color: '#f97316', duration: 16, ease: 'power1.in' }, transLabel);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="accordion-wrapper relative w-full h-[100dvh] bg-slate-900 pointer-events-auto z-20 overflow-hidden">
      <div className="w-full h-full flex flex-col md:flex-row bg-slate-50">
        {CATEGORIES.map((cat, i) => (
          <div
            key={cat.id}
            className="accordion-item relative flex flex-col md:flex-row overflow-hidden border-b md:border-b-0 md:border-r border-slate-200/50"
            // Set first item explicitly to Open state
            style={{ 
                flex: i === 0 ? 20 : 1, 
                backgroundColor: i === 0 ? '#ffffff' : '#f8fafc' 
            }}
          >
              {/* Vertical Tab */}
            <div className="flex-shrink-0 flex items-center justify-center p-4 md:p-0 h-[8vh] md:h-full w-full md:w-[80px] z-30 pointer-events-none">
              <h3 className={`tab-title font-sans tracking-[0.3em] uppercase text-[10px] md:rotate-180 md:[writing-mode:vertical-rl] whitespace-nowrap font-bold transition-colors duration-500 ${i === 0 ? 'text-orange-500' : 'text-slate-400'}`}>
                {cat.title}
              </h3>
            </div>

            {/* Expansive Content Window - STRICTLY SIZED TO PREVENT REFLOW CHAOS DURING ANIMATION */}
            <div 
                className="cat-content flex-grow flex flex-col md:flex-row relative h-full overflow-hidden shrink-0 min-h-[calc(100dvh-48vh)] min-w-[100vw] md:min-h-full md:min-w-[calc(100vw-480px)]"
                style={{ 
                    visibility: i === 0 ? 'visible' : 'hidden', 
                    opacity: i === 0 ? 1 : 0 
                }}
            >
              {/* Left: Beautiful Typography & Context */}
              <div className="w-full md:w-5/12 h-[35%] md:h-full flex flex-col justify-center p-6 md:p-12 lg:p-24 z-20 bg-white">
                <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tighter mb-4 md:mb-8 text-slate-900 leading-[1.1]">
                  {cat.title}
                </h2>
                <div className="relative pl-4 md:pl-6">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-full"></div>
                  <p className="font-sans text-slate-500 text-xs md:text-sm lg:text-base leading-relaxed max-w-sm line-clamp-3 md:line-clamp-none">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Right: HORIZONTAL SCROLL THROUGH IMAGES */}
              <div className="w-full md:w-7/12 h-[65%] md:h-full relative overflow-hidden bg-slate-50 flex items-center p-0">
                  
                  {/* Background Ambience */}
                  <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale mix-blend-multiply">
                      <source src={cat.video} type="video/mp4" />
                    </video>
                  </div>

                  {/* The Image Strip sliding track */}
                  <div className="image-strip flex h-full items-center absolute inset-y-0 left-0 pointer-events-auto">
                    {cat.products.map((prod) => (
                        <div key={prod.id} className="w-screen md:w-[50vw] lg:w-[40vw] h-full flex items-center justify-center p-4 md:p-12 shrink-0 relative">
                            {/* The Stunning Image */}
                            <img 
                                src={prod.img} 
                                alt={prod.name} 
                                className="w-full h-full max-h-[50vh] md:max-h-[70vh] object-contain filter drop-shadow-2xl z-10" 
                            />

                            {/* Elegantly Floating Tag */}
                            <div className="absolute bottom-4 left-4 md:bottom-12 md:left-12 bg-white/95 backdrop-blur-md p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl z-20 flex items-center gap-4 md:gap-8 border border-white/20">
                                <div>
                                    <h4 className="font-serif text-lg md:text-2xl lg:text-3xl text-slate-900 mb-1 leading-none">{prod.name}</h4>
                                    <p className="font-sans font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs text-orange-500 mt-1 md:mt-2">{prod.price}</p>
                                </div>
                                <button className="h-10 w-10 md:h-14 md:w-14 lg:h-16 lg:w-16 rounded-full bg-slate-900 hover:bg-orange-500 hover:scale-110 text-white flex items-center justify-center transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] shrink-0">
                                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
