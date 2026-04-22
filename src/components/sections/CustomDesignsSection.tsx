import { motion } from 'motion/react';

export default function CustomDesignsSection() {
  return (
    <section id="custom" className="relative w-full py-40 px-6 z-10 bg-white text-slate-800 border-t border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        
        <div className="flex-1 lg:pr-12">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
           >
              <span className="text-sky-500 uppercase tracking-wider text-xs font-bold mb-6 block">Interior Consultations</span>
              <h2 className="font-serif text-5xl md:text-7xl mb-8">Need some help?</h2>
              <p className="font-sans text-slate-600 text-lg leading-relaxed mb-10">
                Not sure if that sectional will fit, or having trouble picking a fabric color? Our design team is here to help! Whether you need a quick second opinion or a full room makeover, we offer free interior consultations to make sure you get pieces you absolutely love.
              </p>
              
              <ul className="space-y-6 mb-12 border-l-[3px] border-orange-200 pl-6 rounded-l-md">
                <li>
                  <h4 className="font-serif text-2xl text-slate-800 mb-2">1. Say Hello</h4>
                  <p className="font-sans text-sm text-slate-500">Reach out for a quick virtual or in-store chat.</p>
                </li>
                <li>
                  <h4 className="font-serif text-2xl text-slate-800 mb-2">2. Pick Your Pieces</h4>
                  <p className="font-sans text-sm text-slate-500">Get personalized fabric swatches and layout advice.</p>
                </li>
                <li>
                  <h4 className="font-serif text-2xl text-slate-800 mb-2">3. Enjoy Your Home</h4>
                  <p className="font-sans text-sm text-slate-500">Kick back and relax with smooth, free delivery.</p>
                </li>
              </ul>
           </motion.div>
        </div>

        {/* Lead Gen Form */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1"
        >
           <form className="bg-sky-50 p-10 md:p-16 border border-sky-100 shadow-xl rounded-2xl relative overflow-hidden">
             {/* Playful blob */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-bl-full opacity-50 pointer-events-none"></div>

             <h3 className="font-serif text-3xl mb-8 text-slate-800 relative z-10">Talk to a Designer</h3>
             
             <div className="space-y-6 relative z-10">
               <div className="flex flex-col gap-2">
                 <label className="font-sans text-[10px] uppercase tracking-wider text-slate-500 font-bold">First Name</label>
                 <input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all" placeholder="Jane" />
               </div>
               
               <div className="flex flex-col gap-2">
                 <label className="font-sans text-[10px] uppercase tracking-wider text-slate-500 font-bold">Email</label>
                 <input type="email" className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all" placeholder="jane@example.com" />
               </div>

               <div className="flex flex-col gap-2">
                 <label className="font-sans text-[10px] uppercase tracking-wider text-slate-500 font-bold">What are you working on?</label>
                 <textarea rows={3} className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all resize-none" placeholder="Redoing the living room, need a new sofa!"></textarea>
               </div>

               <button type="button" className="w-full py-4 mt-8 bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg text-white uppercase tracking-wider text-xs font-bold transition-all duration-300 rounded-full">
                 Request Design Help
               </button>
             </div>
           </form>
        </motion.div>

      </div>
    </section>
  );
}
