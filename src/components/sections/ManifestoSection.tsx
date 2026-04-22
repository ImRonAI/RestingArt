import { motion } from 'motion/react';

export default function ManifestoSection() {
  return (
    <section id="story" className="relative w-full py-32 md:py-48 px-6 z-10 bg-emerald-50 text-emerald-900 border-t border-emerald-100 overflow-hidden">
      
      {/* Background Graphic */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none flex justify-center items-center">
         <h2 className="font-serif text-[15vw] leading-none text-emerald-900 select-none whitespace-nowrap overflow-hidden rotate-[-5deg]">
           Make Yourself At Home
         </h2>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="block text-emerald-600 font-sans font-bold text-xs tracking-wider uppercase mb-8"
        >
          Our Promise
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-12"
        >
          We don't just sell furniture. <br/>
          <span className="italic text-emerald-700">We help you build a home.</span>
        </motion.h2>

        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, delay: 0.5 }}
           className="h-1.5 w-24 bg-orange-400 mx-auto mb-12 rounded-full"
        />

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-sans text-emerald-800 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
        >
          At Resting Art, we believe your space should reflect your personality, not a sterile catalog. We skip the mass-produced junk and focus on bringing you high-quality, beautifully designed pieces that stand up to spills, pets, and everyday life. Because the best furniture isn't just looked at—it's lived in.
        </motion.p>
      </div>
    </section>
  );
}
