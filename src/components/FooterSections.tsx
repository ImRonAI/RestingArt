import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const SECTIONS = [
  { id: "blog", title: "The Design Blog", subtitle: "Tips & Inspiration", desc: "Easy ways to style your home, pick the right rug, and keep your plants alive." },
  { id: "sustainability", title: "Sustainability", subtitle: "Eco-Friendly", desc: "We use sustainably sourced woods and fabrics that are easy on the earth." },
  { id: "faq", title: "How It Works", subtitle: "FAQ & Guide", desc: "Everything you need to know about placing an order, from click to delivery." },
  { id: "shipping", title: "Smooth Delivery", subtitle: "Shipping & Returns", desc: "Fast, friendly delivery straight into your living room. No heavy lifting required." },
];

export default function FooterSections() {
  return (
    <section className="relative w-full z-10 bg-slate-50 text-slate-800 py-32 px-6 md:px-16 container mx-auto border-t border-slate-200">
      
      <div className="mb-20 text-center">
        <h2 className="font-serif text-5xl md:text-7xl mb-6">Explore More</h2>
        <div className="w-1 h-20 bg-gradient-to-b from-orange-300 to-transparent mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {SECTIONS.map((sec, i) => (
          <motion.a
            href={`#${sec.id}`}
            key={sec.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{ y: -5 }}
            className="group relative border border-slate-200 bg-white p-10 hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full rounded-2xl"
          >
            {/* Hover Glow */}
            <div className="absolute -inset-px bg-gradient-to-b from-sky-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"></div>

            <span className="block font-sans font-bold text-sky-500 text-[10px] uppercase tracking-wider mb-4 relative z-10">
              {sec.subtitle}
            </span>
            <h3 className="font-serif text-2xl lg:text-3xl mb-4 text-slate-800 group-hover:text-orange-500 transition-colors duration-300 relative z-10">
              {sec.title}
            </h3>
            <p className="font-sans text-sm text-slate-500 leading-relaxed mb-10 flex-grow relative z-10">
              {sec.desc}
            </p>

            <div className="flex items-center text-xs tracking-wider uppercase font-bold text-slate-800 group-hover:text-orange-500 mt-auto transition-colors duration-300 relative z-10">
              <span className="mr-4">Read More</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* 13. Contact / Schedule a Consultation (The Main CTA Footer block) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0 }}
        className="mt-32 max-w-5xl mx-auto bg-sky-50 p-12 md:p-24 text-center relative overflow-hidden border border-sky-100 rounded-[3rem] shadow-sm"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay opacity-30 pointer-events-none blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply opacity-50 pointer-events-none blur-3xl"></div>
        <div className="relative z-10">
           <span className="text-orange-500 tracking-wider uppercase text-xs font-bold mb-8 block">Reach Out</span>
           <h2 className="font-serif text-5xl md:text-7xl mb-8 text-slate-800">Let's chat.</h2>
           <p className="text-slate-600 max-w-xl mx-auto mb-12 text-lg">
             Have questions about a product? Need design advice? Or just want to say hi? We'd love to hear from you. Our team is always ready to help you make your house a home.
           </p>
           <button className="px-10 py-5 bg-orange-500 text-white font-bold uppercase tracking-wider text-xs hover:bg-orange-600 transition-colors duration-300 rounded-full shadow-lg hover:shadow-xl">
             Contact Us
           </button>
        </div>
      </motion.div>

    </section>
  );
}
