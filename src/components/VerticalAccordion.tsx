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

export default function VerticalAccordion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalSections = CATEGORIES.length;
    const progressPerSection = 1 / totalSections;
    
    const index = Math.min(Math.floor(latest / progressPerSection), totalSections - 1);
    
    if (index !== activeIndex && index >= 0) {
      setActiveIndex(index);
    }

    const sectionStart = index * progressPerSection;
    const sectionProgress = (latest - sectionStart) / progressPerSection;
    
    const scroller = scrollerRefs.current[index];
    if (scroller) {
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      scroller.scrollLeft = sectionProgress * maxScroll;
    }
  });

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const scrollTarget = (index / CATEGORIES.length) * containerRef.current.scrollHeight;
    window.scrollTo({
      top: containerRef.current.offsetTop + scrollTarget,
      behavior: 'smooth'
    });
  };

  const shiftHorizontal = (dir: 'left' | 'right', index: number) => {
    const scroller = scrollerRefs.current[index];
    if (scroller) {
      const amount = scroller.clientWidth * 0.8;
      scroller.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-[700vh] bg-white">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col md:flex-row">
        {CATEGORIES.map((cat, i) => {
          const isActive = activeIndex === i;

          return (
            <motion.div
              key={cat.id}
              className="relative flex flex-col md:flex-row flex-1 overflow-hidden transition-all duration-700 bg-white border-l border-slate-50"
              animate={{ 
                flex: isActive ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 16) : 1,
              }}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    className="absolute inset-0 z-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    exit={{ opacity: 0 }}
                  >
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale">
                      <source src={cat.video} type="video/mp4" />
                    </video>
                  </motion.div>
                )}
              </AnimatePresence>

              <div 
                className={`relative z-40 p-6 flex md:flex-col justify-between items-center h-full border-r border-slate-100 transition-all duration-500 shrink-0 md:w-[80px] cursor-pointer ${isActive ? 'bg-white shadow-xl' : 'bg-slate-50 opacity-60 hover:opacity-100'}`}
                onClick={() => scrollToIndex(i)}
              >
                <h3 className={`font-sans tracking-[0.2em] uppercase text-[10px] md:rotate-180 md:[writing-mode:vertical-rl] whitespace-nowrap font-bold transition-all ${isActive ? 'text-orange-600' : 'text-slate-400'}`}>
                  {cat.title}
                </h3>
                <div className={`mt-auto transition-transform ${isActive ? 'text-orange-500' : 'text-slate-300'}`}>
                  <ChevronRight size={18} />
                </div>
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    className="relative z-20 flex flex-col justify-center p-8 md:p-16 h-full w-full overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="max-w-6xl w-full">
                      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                        <motion.h2 className="font-serif text-6xl md:text-8xl text-slate-900 tracking-tighter">
                          {cat.title}
                        </motion.h2>
                        
                        <div className="flex gap-4">
                          <button 
                            onClick={(e) => { e.stopPropagation(); shiftHorizontal('left', i); }}
                            className="p-4 rounded-full border border-slate-200 bg-white/80 backdrop-blur hover:bg-orange-500 hover:text-white transition-all shadow-lg"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); shiftHorizontal('right', i); }}
                            className="p-4 rounded-full border border-slate-200 bg-white/80 backdrop-blur hover:bg-orange-500 hover:text-white transition-all shadow-lg"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </div>

                      <motion.div className="bg-white/95 p-8 rounded-2xl border border-slate-100 shadow-2xl relative mb-12 max-w-2xl">
                        <div className="absolute top-0 left-0 w-1.5 bg-orange-500 h-full"></div>
                        <p className="font-sans text-slate-500 text-sm leading-relaxed">
                          {cat.description}
                        </p>
                      </motion.div>

                      <div 
                        ref={el => scrollerRefs.current[i] = el}
                        className="flex gap-8 overflow-x-auto no-scrollbar pb-12 scroll-smooth pointer-events-auto"
                      >
                        {cat.products.map((p) => (
                          <div 
                            key={p.id}
                            className="group relative min-w-[280px] md:min-w-[340px] bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all"
                          >
                            <div className="aspect-[4/5] overflow-hidden bg-slate-50 relative">
                              <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all"></div>
                              <button className="absolute bottom-6 right-6 p-5 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-2xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-bold uppercase tracking-widest text-[10px] flex items-center gap-3">
                                <ShoppingCart size={18} />
                                Add To Cart
                              </button>
                            </div>
                            <div className="p-8">
                              <h5 className="font-serif text-2xl text-slate-800 mb-2">{p.name}</h5>
                              <p className="font-sans font-bold text-orange-600 text-sm tracking-widest">{p.price}</p>
                            </div>
                          </div>
                        ))}
                        <div className="min-w-[100px] h-full invisible" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
