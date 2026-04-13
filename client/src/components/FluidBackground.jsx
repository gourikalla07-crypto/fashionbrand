import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#1a0008] overflow-hidden">
      {/* Mesh Gradient Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full opacity-60"
        style={{ 
          background: 'radial-gradient(circle, #46000D 0%, transparent 70%)', 
          filter: 'blur(80px)' 
        }}
      />

      <motion.div 
        animate={{ 
          x: [0, -150, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-15%] right-[-10%] w-[70vw] h-[70vw] rounded-full opacity-50"
        style={{ 
          background: 'radial-gradient(circle, #590054 0%, transparent 70%)', 
          filter: 'blur(100px)' 
        }}
      />

      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, 80, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full opacity-40"
        style={{ 
          background: 'radial-gradient(circle, #720137 0%, transparent 70%)', 
          filter: 'blur(60px)' 
        }}
      />

      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[30%] w-[50vw] h-[50vw] rounded-full"
        style={{ 
          background: 'radial-gradient(circle, #5E0009 0%, transparent 60%)', 
          filter: 'blur(90px)' 
        }}
      />

      <motion.div 
        animate={{ 
          x: [0, -30, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full opacity-40"
        style={{ 
          background: 'radial-gradient(circle, #42002E 0%, transparent 70%)', 
          filter: 'blur(50px)' 
        }}
      />

      {/* Grain / Noise Overlay for texture (optional premium touch) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}
      ></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none"></div>
    </div>
  );
};

export default FluidBackground;
