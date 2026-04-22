import { motion } from 'motion/react';

export default function RepurposeSection() {
  return (
    <section id="repurpose" className="relative w-full z-10 bg-sky-50 text-slate-800 border-t border-slate-200">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Visual Half */}
        <div className="relative h-[50vh] lg:h-auto min-h-[600px] overflow-hidden">
           <img 
              src="https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=1000&q=80" 
              alt="Raw wood and epoxy materials" 
              className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-105 transition-all duration-1000"
           />
           {/* Playful color overlay instead of stark black */}
           <div className="absolute inset-0 bg-gradient-to-r from-sky-50 to-transparent"></div>
        </div>

        {/* Narrative Half */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center p-10 md:p-20 xl:p-32"
        >
           <span className="text-orange-500 uppercase tracking-wider text-[10px] font-bold mb-6 block">Donations & Restoration</span>
           <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-8 leading-none">
             Give it a <br/>
             <span className="italic text-sky-600">second life.</span>
           </h2>
           
           <p className="font-sans text-slate-600 text-lg leading-relaxed mb-6">
             Well-made furniture shouldn't end up in a landfill. We gladly accept donations of quality pieces and put our woodworkers and upholsterers to work giving them a fresh, modern update.
           </p>
           <p className="font-sans text-slate-600 text-lg leading-relaxed mb-12">
             Love your grandma's armchair but hate the floral pattern? Let us fix it up! We can sand, stain, repair, and reupholster your favorite old pieces so they match your new vibe.
           </p>

           <div className="flex flex-col sm:flex-row gap-6">
             <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full uppercase tracking-wider text-xs font-bold transition-all duration-300 w-fit shadow-md hover:shadow-lg">
               Donate a Piece
             </button>
             <button className="px-8 py-4 border-2 border-slate-300 hover:border-slate-800 text-slate-800 rounded-full uppercase tracking-wider text-xs font-bold transition-all duration-300 w-fit">
               Start a Restoration
             </button>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
