import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import FluidBackground from './FluidBackground';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-16">
      <FluidBackground />

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
        {/* Main Title Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative px-12 py-10 md:px-20 md:py-16 border border-[#D4AF37]/20 backdrop-blur-[2px] text-center"

        >
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#D4AF37]"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#D4AF37]"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#D4AF37]"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#D4AF37]"></div>


          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-playfair font-black tracking-widest text-[#D4AF37] mb-4 leading-none"
          >
            ABSTRACT BLOOM <span className="text-3xl md:text-4xl text-[#A67C00] ml-4">2026</span>
          </motion.h1>



          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-2xl uppercase tracking-[0.5em] text-white/70 font-inter"
          >
            “Where Colors Come Alive.”

          </motion.p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 flex flex-col sm:flex-row items-center gap-6"
        >
          <Link 
            to="/shop" 
            className="px-10 py-4 font-bold tracking-widest uppercase border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 group"
          >
            Explore Collection
          </Link>

          
          <button 
            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
          >
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white transition-colors">
              <Play size={16} fill="white" className="ml-1" />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest">Watch Film</span>
          </button>
        </motion.div>
      </div>

      {/* Side Label (Vertical) */}
      <div className="absolute left-10 bottom-24 hidden xl:block">
        <span className="origin-left -rotate-90 block text-xs font-medium uppercase tracking-[0.4em] text-white/40 whitespace-nowrap">
          GK FASHION BRAND / SYMBOL OF ELEGANCE
        </span>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;

