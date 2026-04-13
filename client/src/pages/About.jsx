import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap, Award, ArrowDown } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-20 bg-[#fdf8f9] transition-colors min-height-screen">

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2574&auto=format&fit=crop" 
            className="w-full h-full object-cover" 
            alt="About Hero"
          />

          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-9xl font-playfair font-black text-white tracking-widest uppercase mb-6"
          >
            THE BRANDS <span className="text-[#720137]">LEGACY</span>
          </motion.h1>


          <p className="text-zinc-300 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            Redefining the boundaries of fashion for the bold, the ambitious, and the trendsetters of tomorrow.
          </p>
        </div>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ArrowDown size={30} />
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-[#720137]/10 shadow-2xl shadow-[#720137]/5">
            <span className="text-[#720137]/40 text-xs font-black uppercase tracking-[0.4em] mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-7xl font-playfair font-black text-[#46000D] mb-8 leading-none tracking-tight uppercase">MADE FOR THE <br />NEW GENERATION</h2>


            <div className="space-y-6 text-[#42002E]/80 text-lg leading-relaxed font-medium">
              <h3 className="text-2xl font-black text-[#720137] uppercase tracking-tighter">About GK</h3>
              <p>
                GK is more than just a fashion brand—it’s a statement of style, confidence, and individuality.
              </p>
              <p>
                We create clothing for people who want to stand out, feel comfortable, and express their unique personality. Our designs blend modern trends with timeless style, making every outfit perfect for any occasion.
              </p>
              <p>
                At GK, we believe fashion should be simple, powerful, and accessible to everyone. That’s why we focus on quality, comfort, and creativity in everything we design.
              </p>
            </div>

          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
             <div className="space-y-4">
                <div className="pt-12">
                   <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop" className="rounded-3xl shadow-2xl h-[400px] w-full object-cover" alt="Fashion 1" />
                </div>
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" className="rounded-3xl shadow-xl h-[300px] w-full object-cover" alt="Fashion 3" />
             </div>
             <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop" className="rounded-3xl shadow-2xl h-[500px] w-full object-cover" alt="Fashion 2" />
                <div className="bg-[#720137] rounded-3xl p-8 text-white flex flex-col justify-end h-[200px] shadow-2xl shadow-[#720137]/20">
                   <h4 className="text-3xl font-black tracking-tighter uppercase leading-none">Global <br/>Trends</h4>
                   <p className="text-xs font-bold uppercase tracking-widest mt-4 opacity-70">Curated Daily</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#faebf0] px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-black text-[#46000D] uppercase tracking-tighter">OUR GUIDING PRINCIPLES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Target, title: "Uncompromising Quality", desc: "Every thread, every stitch is verified for perfection before it reaches you." },
              { icon: Users, title: "Community First", desc: "We build our collections based on what YOU want to wear, not what trend lists say." },
              { icon: Zap, title: "Bold Innovation", desc: "Pushing the limits of fabric technology and design aesthetics every single season." }
            ].map((v, i) => (
              <div key={i} className="text-center group">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform">
                   <v.icon size={32} className="text-[#720137]" />
                 </div>

                 <h3 className="text-xl font-playfair font-black text-[#46000D] mb-4 uppercase">{v.title}</h3>
                 <p className="text-[#42002E]/60 font-medium leading-relaxed">{v.desc}</p>

              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
