import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';

const UTAH_REGIONS = [
  { 
    id: 'downtown-slc', 
    name: 'Downtown Salt Lake City', 
    subtitle: 'The Urban Sophistication Hub', 
    blurb: 'Sculptural modular furniture in a downtown Salt Lake City loft—custom urban seating and artistic side tables for young professionals seeking unique Utah interior design.',
    desc: 'Downtown Salt Lake City living demands furniture that maximizes style and function in compact footprints. Resting Art\'s sculptural sofas, modular seating, and artistic side tables transform small-space lofts into showroom-worthy urban sanctuaries. Whether you\'re furnishing a one-bedroom condo near City Creek or styling an open-plan apartment in the Marmalade District, our custom furniture Salt Lake City young professionals choose brings bold silhouettes and unexpected materials (think: muted gold metallic accents, terracotta upholstery, charcoal wood grains) into minimalist industrial spaces. Each piece functions as furniture and art installation—perfect for the design-forward urbanite who refuses cookie-cutter aesthetics.', 
    img: '/nine.jpg',
    lat: 40.7608,
    lng: -111.8910,
    link: '/utah-furniture/salt-lake-city/downtown'
  },
  { 
    id: 'avenues', 
    name: 'The Avenues', 
    subtitle: 'Historic Preservation', 
    blurb: 'Art-inspired mid-century furniture in a historic Salt Lake City Avenues craftsman bungalow—bold teal sofa and sculptural coffee table blending vintage charm with modern Utah design.',
    desc: 'The Avenues\' historic homes deserve furniture that honors their architectural heritage while bringing fresh, contemporary energy. Resting Art\'s custom furniture Salt Lake City homeowners trust blends mid-century silhouettes, bold jewel tones, and sculptural wood detailing—perfect for craftsman bungalows, Victorian parlors, and renovated historic homes. Our teal velvet sofas, terracotta accent chairs, and artistic dining tables complement original wood floors and built-in shelving without competing with period details. For Avenues residents who appreciate the past but live firmly in the present, Resting Art offers heirloom-quality furniture that becomes part of your home\'s evolving story.', 
    img: '/couple.jpg',
    lat: 40.7766,
    lng: -111.8624,
    link: '/utah-furniture/salt-lake-city/avenues'
  },
  { 
    id: 'sugar-house', 
    name: 'Sugar House', 
    subtitle: 'Walkable Mid-Century Charm', 
    blurb: 'Sculptural dining table and mid-century modern furniture in a Sugar House Salt Lake City home—custom walnut table and artistic seating for Utah\'s most walkable neighborhood.',
    desc: 'Sugar House homeowners know that great design doesn\'t follow trends—it tells a story. Resting Art\'s modern furniture Salt Lake City families choose brings sculptural dining tables, bold accent seating, and artistic coffee tables into mid-century bungalows and updated cottages. Our pieces honor Sugar House\'s mid-century heritage while adding contemporary edge: think walnut tables with unexpected pedestal bases, terracotta velvet dining chairs that spark conversation, and low-profile sofas that complement (not overwhelm) vintage architecture. For families who entertain in their backyards, host dinner parties weekly, and want furniture that grows with them, Resting Art offers heirloom quality furniture designed to be passed down.', 
    img: '/four.jpg',
    lat: 40.7226,
    lng: -111.8587,
    link: '/utah-furniture/salt-lake-city/sugar-house'
  },
  { 
    id: '9th-and-9th', 
    name: '9th & 9th', 
    subtitle: 'Trendiest Eclectic District', 
    blurb: 'Bold velvet armchair and artistic furniture in a 9th & 9th Salt Lake City apartment—sculptural seating and custom tables for Utah\'s trendiest neighborhood.',
    desc: 'The 9th & 9th neighborhood doesn\'t do boring—and neither should your furniture. Resting Art\'s sculptural armchairs, artistic side tables, and bold accent pieces bring gallery-worthy design to compact apartments, vintage bungalows, and creative spaces. Our deep teal velvet chairs with unexpected wooden arms, charcoal dining tables with hairpin legs, and muted-gold floor lamps transform small footprints into curated sanctuaries. For 9th & 9th residents who thrift vintage finds, support local artists, and Instagram their interiors, Resting Art offers artisan furniture Salt Lake City creatives seek—pieces that start conversations and never blend into the background.', 
    img: '/three.jpg',
    lat: 40.7501,
    lng: -111.8654,
    link: '/utah-furniture/salt-lake-city/9th-and-9th'
  },
  { 
    id: 'east-bench', 
    name: 'East Bench / Foothill', 
    subtitle: 'Mountain Views & Modernism', 
    blurb: 'Low-profile modern furniture in an East Bench Salt Lake City home with mountain views—sculptural coffee table and minimalist seating for luxury Utah hillside living.',
    desc: 'East Bench and Foothill homes are built for the view—and Resting Art\'s furniture is designed not to compete with it. Our low-profile sofas, sculptural coffee tables, and minimalist accent chairs bring artistic form to mountain modern interiors without blocking sightlines. Custom furniture Salt Lake City homeowners with million-dollar views choose features clean horizontal lines, natural materials (live-edge wood, linen, leather), and unexpected details (muted gold inlay, asymmetrical joinery) that reward closer inspection. For families who entertain on hillside decks, work from home offices overlooking the Wasatch, and want furniture as thoughtfully designed as their architecture, Resting Art offers modern Utah interior design at its most refined.', 
    img: '/eleven.jpg',
    lat: 40.7424,
    lng: -111.8210,
    link: '/utah-furniture/salt-lake-city/east-bench'
  },
  { 
    id: 'park-city-old-town', 
    name: 'Old Town Park City', 
    subtitle: 'Historic Mining Luxury', 
    blurb: 'Custom reclaimed wood dining table in a historic Park City Old Town home—artistic furniture blending Victorian charm with modern Utah ski resort luxury.',
    desc: 'Old Town Park City\'s historic homes deserve furniture that honors their mining-town heritage while delivering modern luxury. Resting Art\'s custom furniture Park City homeowners choose features reclaimed Utah juniper dining tables with live-edge character, sculptural seating that complements exposed brick and original wood floors, and bold accent pieces that bridge Victorian architecture with contemporary style. Our mix-and-match dining chairs (terracotta velvet, charcoal linen) bring playful sophistication to formal dining rooms, while cream bouclé sofas anchor living areas designed for cozy après-ski evenings. For Old Town residents who entertain in historic spaces and want furniture as unique as their address, Resting Art delivers heirloom quality furniture with a story.', 
    img: '/bedroom.jpg',
    lat: 40.6461,
    lng: -111.4980,
    link: '/utah-furniture/park-city/old-town'
  },
  { 
    id: 'deer-valley', 
    name: 'Deer Valley', 
    subtitle: 'Ultra-Luxury Estates', 
    blurb: 'Ultra-luxury sculptural furniture in a Deer Valley Park City estate—massive sectional, artistic coffee table, and bold leather chairs for Utah\'s most exclusive ski resort homes.',
    desc: 'Deer Valley\'s multi-million-dollar estates demand furniture at the same caliber as their architecture and views. Resting Art\'s custom furniture Park City luxury homeowners invest in includes oversized sectionals that fill great rooms with vaulted ceilings, sculptural coffee tables that serve as functional art installations (blackened wood, muted gold inlay, dramatic scale), and statement accent chairs that inject personality into otherwise neutral mountain-modern palettes. Our pieces are designed for entertaining at the highest level—après-ski gatherings, Sundance Film Festival parties, family reunions in luxury settings. For Deer Valley homeowners who view furniture as part of their art collection and demand heirloom quality furniture, Resting Art offers limited-production pieces that appreciate alongside the real estate.', 
    img: '/gallery.jpg',
    lat: 40.6231,
    lng: -111.4820,
    link: '/utah-furniture/park-city/deer-valley'
  },
  { 
    id: 'canyons-village', 
    name: 'Canyons Village & Kimball Junction', 
    subtitle: 'Modern Resort Living', 
    blurb: 'Modern modular furniture in a Canyons Village Park City condo—sculptural coffee table and flexible seating for family-friendly Utah ski resort living.',
    desc: 'Canyons Village and Kimball Junction families need furniture that handles active ski lifestyles while maintaining resort-worthy aesthetics. Resting Art\'s modular sectionals in performance fabrics, sculptural coffee tables built to withstand ski boots and hot cocoa spills, and flexible dining tables that expand for family gatherings bring durability and artistry to modern mountain condos. Our pieces work equally well for full-time families and vacation rental properties—they\'re built to last through years of use while photographing beautifully for rental listings. For Park City homeowners who want modern furniture Utah ski towns demand (function, durability, style), Resting Art delivers sculptural forms and high-quality materials that don\'t compromise.', 
    img: '/eight.jpg',
    lat: 40.6860,
    lng: -111.5540,
    link: '/utah-furniture/park-city/canyons-village'
  },
  { 
    id: 'provo', 
    name: 'Provo & Orem', 
    subtitle: 'The University & Family Hub', 
    blurb: 'Affordable modern furniture for Provo Utah students and young families—compact sculptural sofa and artistic coffee table bringing personality to BYU-area apartments.',
    desc: 'Provo and Orem residents—from BYU students furnishing first apartments to young families filling newly built homes—need furniture that balances style, durability, and value. Resting Art\'s custom furniture Provo buyers seek brings sculptural coffee tables, modular seating, and playful dining pieces into student housing, starter homes, and family-centric interiors. Our terracotta and teal accent pieces inject personality into builder-basic townhomes, while compact modular sofas maximize small apartments without sacrificing design. For Utah County families who entertain extended relatives weekly, host study groups, and want modern furniture Utah County\'s growing sophistication demands, Resting Art offers artisan furniture that grows with life stages—from college to first home to forever home.', 
    img: '/grokFamily.jpg',
    lat: 40.2338,
    lng: -111.6585,
    link: '/utah-furniture/provo'
  },
  { 
    id: 'lehi', 
    name: 'Lehi', 
    subtitle: 'The Silicon Slopes Tech Hub', 
    blurb: 'Modern tech-worker furniture in a Lehi Utah Silicon Slopes home—sculptural sectional, artistic credenza, and flexible dining table for Utah\'s fastest-growing city.',
    desc: 'Lehi\'s tech workers are furnishing brand-new homes at breakneck speed, and they demand furniture that matches their innovative careers. Resting Art brings custom furniture Lehi homeowners choose: modular sectionals for open-plan living rooms, sculptural desks for dedicated home offices, and expandable dining tables for hosting team dinners and extended family gatherings. Our pieces blend seamlessly into modern new-build interiors (gray floors, white walls, vaulted ceilings) while adding artistic edge—think walnut credenzas with muted gold hardware, charcoal linen sectionals with unexpected joinery, and light oak dining tables with geometric bases. For Silicon Slopes professionals who want modern furniture Utah\'s tech community seeks (smart, functional, conversation-starting), Resting Art delivers artisan furniture that signals sophistication and supports the remote-work lifestyle.', 
    img: '/five.jpg',
    lat: 40.3916,
    lng: -111.8508,
    link: '/utah-furniture/lehi'
  },
  { 
    id: 'american-fork', 
    name: 'American Fork', 
    subtitle: 'The Family-Forward Suburb', 
    blurb: 'Family-friendly modern farmhouse furniture in American Fork Utah—durable sectional, reclaimed wood coffee table, and expandable dining table for growing families.',
    desc: 'American Fork families need furniture that handles real life—kids, pets, weekly family dinners, homework sessions at the dining table—while still looking beautiful. Resting Art\'s custom furniture American Fork homeowners trust combines heirloom-quality construction with family-friendly durability: cream bouclé sectionals in stain-resistant performance fabrics, reclaimed wood coffee tables built to withstand toy trucks and board games, and expandable dining tables that seat eight for Sunday dinners and contract for weeknight meals. Our modern farmhouse aesthetic (white oak, natural edges, industrial metal accents) fits seamlessly into American Fork\'s dominant interior style while elevating it with sculptural forms and artistic details. For families who want furniture Utah\'s best suburban communities deserve—functional, beautiful, and built to last decades—Resting Art delivers.', 
    img: '/twofer.jpg',
    lat: 40.3802,
    lng: -111.8027,
    link: '/utah-furniture/american-fork'
  },
  { 
    id: 'draper', 
    name: 'Draper', 
    subtitle: 'The Affluent Tech-Family Enclave', 
    blurb: 'Luxury sculptural furniture in a Draper Utah custom home—oversized leather sectional, live-edge coffee table, and bold velvet chairs for Utah\'s most affluent neighborhoods.',
    desc: 'Draper\'s luxury homes demand furniture at the highest caliber—and Resting Art delivers. Our custom furniture Draper homeowners invest in includes oversized leather sectionals designed for great rooms with vaulted ceilings, live-edge coffee tables that serve as functional sculptures (5+ feet long, walnut or Utah juniper, blackened steel bases), and statement accent chairs that inject personality into otherwise neutral luxury palettes. Each piece is built for the executive lifestyle: entertaining clients at home, hosting extended family gatherings, and creating spaces that photograph beautifully for luxury listings. For Draper residents in SunCrest, Draper Heights, and Corner Canyon who view furniture as part of their investment portfolio and demand heirloom quality furniture, Resting Art offers limited-production pieces that appreciate alongside the real estate.', 
    img: '/two.jpg',
    lat: 40.5247,
    lng: -111.8638,
    link: '/utah-furniture/draper'
  },
  { 
    id: 'ogden', 
    name: 'Ogden', 
    subtitle: 'The Revitalizing Railroad Town', 
    blurb: 'Industrial modern furniture in a historic Ogden Utah loft—sculptural sofa, reclaimed wood coffee table, and bold accent chair for Utah\'s revitalizing railroad town.',
    desc: 'Ogden\'s revitalization is attracting design-forward millennials who are transforming historic buildings and mid-century homes into stylish sanctuaries. Resting Art brings custom furniture Ogden homeowners seek to blend industrial-chic loft living with warm, artistic touches: charcoal linen sofas that complement exposed brick, reclaimed wood coffee tables that honor the city\'s railroad heritage, and terracotta accent chairs that soften industrial spaces. Our pieces work equally well in converted downtown lofts, updated mid-century neighborhoods, and new construction. For Ogden buyers who secured homeownership at rates far above the national average and want modern furniture Utah\'s most underrated city deserves, Resting Art offers artisan furniture that elevates without inflating budgets.', 
    img: '/gallery.jpg',
    lat: 41.2230,
    lng: -111.9738,
    link: '/utah-furniture/ogden'
  },
  { 
    id: 'logan', 
    name: 'Logan', 
    subtitle: 'The College Town', 
    blurb: 'Affordable modern furniture for Logan Utah students—compact sculptural sofa and artistic coffee table bringing style to Utah State University apartments.',
    desc: 'Logan\'s students, young professionals, and families need furniture that balances affordability with style—and Resting Art has solutions for every life stage. Our compact modular sofas, sculptural coffee tables, and flexible dining pieces work in tight student apartments, first homes, and family spaces. Target USU students with entry-level Resting Art pieces (performance fabric accent chairs, small-scale tables, modular ottomans) that move between apartments and survive roommate situations. For Logan\'s growing millennial homeowner population who want modern furniture Utah\'s most affordable markets deserve, Resting Art offers artisan furniture that grows with them—from student living to starter home to forever home.', 
    img: '/grokSingleLady.png',
    lat: 41.7370,
    lng: -111.8338,
    link: '/utah-furniture/logan'
  },
  { 
    id: 'st-george', 
    name: 'St. George', 
    subtitle: 'Desert Retirement & Resort Haven', 
    blurb: 'Desert-inspired luxury furniture in a St. George Utah home—cream linen sectional, sculptural coffee table, and terracotta chairs blending Southwestern style with modern design.',
    desc: 'St. George\'s retirees and second-home owners seek furniture that balances desert-resort luxury with comfortable, lived-in elegance. Resting Art brings custom furniture St. George homeowners choose for year-round golf-community living and seasonal retreats: cream linen sectionals that stay cool in desert heat, sculptural coffee tables with organic forms that echo red-rock landscapes, and terracotta leather chairs that complement Southwestern palettes without feeling cliché. Our pieces work beautifully in 55+ communities like SunRiver, luxury desert estates, and vacation condos. For St. George residents who entertain grandchildren, host golf buddies, and want heirloom quality furniture built for decades of desert living, Resting Art offers artisan furniture Utah\'s Dixie region deserves.', 
    img: '/six.jpg',
    lat: 37.0965,
    lng: -113.5684,
    link: '/utah-furniture/st-george'
  },
  { 
    id: 'holladay', 
    name: 'Holladay', 
    subtitle: 'The Established Luxury Enclave', 
    blurb: 'Sophisticated luxury furniture in a Holladay Utah home—leather sofa, live-edge coffee table, and bouclé armchairs for Salt Lake County\'s most established neighborhoods.',
    desc: 'Holladay\'s established luxury homes demand furniture with quiet confidence—pieces that whisper sophistication rather than shout trends. Resting Art brings custom furniture Holladay homeowners invest in for the long term: leather sofas with impeccable construction and sculptural walnut legs, live-edge coffee tables in Utah juniper that serve as functional art, and cream bouclé armchairs that balance elegance with comfort. Our pieces complement (never compete with) Holladay\'s architectural maturity—mid-century modern updates, traditional homes with contemporary interiors, and custom builds with high-end finishes. For Holladay residents who view furniture as generational investment and demand heirloom quality furniture, Resting Art offers artisan pieces that appreciate in value and become family treasures.', 
    img: '/eleven.jpg',
    lat: 40.6713,
    lng: -111.8153,
    link: '/utah-furniture/holladay'
  }
];

const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ color: "#F3F1E7" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#545454" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#F3F1E7" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#E0DCD1" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#ea580c" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial", stylers: [{ visibility: "off" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#cbd5e1" }] },
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#e5e3db" }] },
];

function MapController({ activeId }: { activeId: string }) {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;
    const activeRegion = UTAH_REGIONS.find((r) => r.id === activeId);
    if (activeRegion) {
      map.panTo({ lat: activeRegion.lat, lng: activeRegion.lng });
      // Zoom in a bit more for close chic view
      map.setZoom(12);
    }
  }, [activeId, map]);

  return null;
}

export default function UtahNeighborhoodsSection() {
  const [activeId, setActiveId] = useState(UTAH_REGIONS[0].id);
  const [hoveredMarkerId, setHoveredMarkerId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeRegion = UTAH_REGIONS.find(r => r.id === activeId) || UTAH_REGIONS[0];

  return (
    <section id="utah" className="relative w-full bg-[#EAE8E3] text-slate-900 border-t border-black/10 overflow-hidden">
      
      {/* Header */}
      <div className="w-full px-6 lg:px-16 pt-32 pb-12">
         <span className="text-orange-600 tracking-[0.3em] font-sans uppercase text-[10px] md:text-xs font-bold mb-6 block">
            The Local Vernacular
         </span>
         <h2 className="font-serif text-5xl md:text-8xl lg:text-[8rem] leading-[0.9] tracking-tighter text-slate-900 mb-8 max-w-5xl">
            Designed for <br/> <span className="italic text-slate-600">Utah Living.</span>
         </h2>
         <p className="font-sans text-slate-600 text-lg md:text-xl max-w-2xl leading-relaxed">
           From the high alpine chalets to the southern desert oasis, different homes demand different aesthetics. We've curated distinct styling parameters tailored to our favorite regional architectures.
         </p>
      </div>

      {/* Region Navigation Selector */}
      <div className="w-full px-6 lg:px-16 pb-8 relative z-30">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 items-center">
          {UTAH_REGIONS.map((region) => (
            <button
              key={region.id}
              onClick={() => setActiveId(region.id)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-xs uppercase tracking-widest font-sans font-bold transition-all border ${
                activeId === region.id 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xl' 
                  : 'bg-white/50 text-slate-600 border-slate-200 hover:bg-white hover:border-slate-300'
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>

      {/* Split Interactive Layout */}
      <div className="flex flex-col lg:flex-row w-full px-6 lg:px-16 pb-40 gap-16 relative">
        
        {/* Left/Top: Google Map Integration */}
        <div className="w-full lg:w-1/2 h-[60vh] lg:h-[80vh] sticky top-[10vh] rounded-[2rem] overflow-hidden shadow-2xl z-20 bg-[#F3F1E7] border-4 border-white/50">
           <APIProvider apiKey={(import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY || ''}>
              <Map
                defaultZoom={12}
                defaultCenter={{ lat: UTAH_REGIONS[0].lat, lng: UTAH_REGIONS[0].lng }}
                mapId="DEMO_MAP_ID"
                disableDefaultUI={true}
                gestureHandling={isMobile ? "cooperative" : "greedy"}
                className="w-full h-full"
                styles={MAP_STYLES}
              >
                <MapController activeId={activeId} />
                
                {UTAH_REGIONS.map((region) => (
                   <AdvancedMarker 
                     key={region.id} 
                     position={{ lat: region.lat, lng: region.lng }}
                     onMouseEnter={() => setHoveredMarkerId(region.id)}
                     onMouseLeave={() => setHoveredMarkerId(null)}
                     onClick={() => setActiveId(region.id)}
                     zIndex={activeId === region.id ? 100 : hoveredMarkerId === region.id ? 90 : 1}
                   >
                     {/* Chic Minimalist Marker */}
                     <div className={`w-5 h-5 rounded-full border-4 shadow-xl transition-all duration-300 ${activeId === region.id ? 'bg-orange-600 border-white scale-125' : 'bg-slate-800 border-[#EAE8E3] hover:scale-110'}`} />
                     
                     {/* Map Hover Popup Overlay - Shows Image & Blurb when hovered */}
                     <AnimatePresence>
                       {(hoveredMarkerId === region.id && activeId !== region.id) && !isMobile && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl pointer-events-none"
                            style={{ transformOrigin: 'bottom center', zIndex: 90 }}
                          >
                             <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3">
                               <img src={region.img} alt={region.name} className="w-full h-full object-cover" />
                             </div>
                             <div className="px-2 pb-2">
                                <h4 className="font-serif text-base leading-tight mb-1 text-slate-900">{region.name}</h4>
                                <p className="font-sans text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{region.blurb}</p>
                             </div>
                          </motion.div>
                       )}
                     </AnimatePresence>
                   </AdvancedMarker>
                ))}
              </Map>
           </APIProvider>
        </div>

        {/* Right/Bottom: Single Active Region Display */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start z-10">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeRegion.id}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
               className="group rounded-[2rem] p-8 lg:p-12 bg-white shadow-xl border border-white/50 text-slate-900 w-full"
             >
               <span className="font-sans font-bold text-[10px] uppercase tracking-[0.2em] mb-4 block text-orange-600">
                  {UTAH_REGIONS.findIndex(r => r.id === activeRegion.id) + 1 < 10 ? `0${UTAH_REGIONS.findIndex(r => r.id === activeRegion.id) + 1}` : UTAH_REGIONS.findIndex(r => r.id === activeRegion.id) + 1} — {activeRegion.subtitle}
               </span>
               <h3 className="font-serif text-5xl lg:text-6xl tracking-tight mb-8">
                 {activeRegion.name}
               </h3>
               
               <div className="mb-8 rounded-3xl overflow-hidden aspect-[4/3] relative group/img cursor-pointer shadow-lg" onClick={() => window.location.href = activeRegion.link}>
                 <img src={activeRegion.img} alt={activeRegion.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-105" />
                 <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover/img:bg-black/20" />
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-500">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-6 py-3 rounded-full text-xs tracking-widest uppercase font-sans shadow-2xl font-bold">Read Full Strategy</span>
                 </div>
               </div>

               <p className="font-sans text-slate-800 font-medium italic text-xl leading-relaxed mb-8 border-l-2 border-orange-600 pl-6">
                  "{activeRegion.blurb}"
               </p>
               
               <p className="font-sans text-slate-600 leading-relaxed text-base lg:text-lg mb-12">
                  {activeRegion.desc}
               </p>
               
               <a href={activeRegion.link} className="inline-block font-sans text-sm font-bold tracking-widest uppercase text-slate-900 hover:text-orange-600 transition-colors border-b-2 border-slate-900 hover:border-orange-600 pb-2">
                  Discover {activeRegion.name} &rarr;
               </a>
             </motion.div>
           </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
