import { motion } from 'motion/react';

export default function UtahNeighborhoodsSection() {
  return (
    <section id="utah" className="relative w-full py-40 px-6 z-10 bg-slate-50 text-slate-800 border-t border-slate-200 overflow-hidden">
      
      <div className="max-w-7xl mx-auto mb-20 text-center">
         <span className="text-orange-500 tracking-wider font-bold uppercase text-[10px] mb-4 block">Local Love</span>
         <h2 className="font-serif text-5xl md:text-7xl mb-6">Utah Styles</h2>
         <p className="max-w-2xl mx-auto font-sans text-slate-600 text-lg">
           Different homes call for different vibes. We've curated three specific collections tailored to the lifestyles and architecture of our favorite Utah neighborhoods.
         </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Alpine */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="group relative h-[500px] overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all"
        >
          <img src="https://images.unsplash.com/photo-1542662580798-cb5800049f50?w=800&q=80" alt="Alpine Utah" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
             <h3 className="font-serif text-4xl text-white mb-2">Alpine</h3>
             <p className="font-sans text-sm text-slate-200 mb-4">Mountain-modern natural woods mixed with cozy, oversized seating.</p>
             <span className="text-orange-400 uppercase tracking-wider text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">View Collection &rarr;</span>
          </div>
        </motion.div>

        {/* Salt Lake */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="group relative h-[500px] overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all md:mt-16"
        >
          <img src="https://images.unsplash.com/photo-1582260662758-c5097c5aeab1?w=800&q=80" alt="Salt Lake City" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
             <h3 className="font-serif text-4xl text-white mb-2">SLC Core</h3>
             <p className="font-sans text-sm text-slate-200 mb-4">Sleek, apartment-friendly designs for lofts and city living.</p>
             <span className="text-orange-400 uppercase tracking-wider text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">View Collection &rarr;</span>
          </div>
        </motion.div>

        {/* Park City */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="group relative h-[500px] overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all"
        >
          <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80" alt="Park City" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
             <h3 className="font-serif text-4xl text-white mb-2">Park City</h3>
             <p className="font-sans text-sm text-slate-200 mb-4">Warm, luxurious fabrics and elevated chalet-inspired statement pieces.</p>
             <span className="text-orange-400 uppercase tracking-wider text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">View Collection &rarr;</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
