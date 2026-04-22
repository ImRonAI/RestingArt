import { motion } from 'motion/react';

export default function ShowroomSection() {
  return (
    <section className="relative w-full py-40 px-6 md:px-16 z-10 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Narrative Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex-1"
        >
          <span className="block text-sky-500 font-sans text-[10px] tracking-wider font-bold uppercase mb-6">
            Salt Lake City Showroom
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-slate-800 leading-none mb-8">
            Come say <br/>
            <span className="italic text-sky-600">hello.</span>
          </h2>
          <p className="font-sans text-slate-600 leading-relaxed mb-10 max-w-xl text-lg">
            Furniture shopping shouldn't be stressful—it should be fun! Drop by our flagship Salt Lake City location to sit on our sofas, check out the wood finishes in person, and chat with our friendly design team. We promise not to hover.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button className="px-8 py-4 bg-orange-500 text-white rounded-full font-bold uppercase tracking-wider text-xs hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl block text-center">
              Get Directions
            </button>
            <button className="px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-full font-bold uppercase tracking-wider text-xs hover:border-slate-300 hover:bg-slate-50 transition-colors block text-center">
              Book a Virtual Tour
            </button>
          </div>
        </motion.div>

        {/* Visual Side */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex-1 w-full relative"
        >
          <div className="aspect-[4/5] bg-sky-50 rounded-3xl overflow-hidden relative shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80" 
              alt="Resting Art Showroom in Salt Lake City" 
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000"
            />
          </div>
          {/* Playful accent blob */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-200 rounded-full mix-blend-multiply blur-2xl opacity-70 pointer-events-none z-[-1]"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-200 rounded-full mix-blend-multiply blur-2xl opacity-70 pointer-events-none z-[-1]"></div>
        </motion.div>
        
      </div>
    </section>
  );
}
