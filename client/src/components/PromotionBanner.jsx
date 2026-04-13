import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PromotionBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59);
      const diff = endOfDay - now;
      if (diff <= 0) { setTimeLeft({ hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="text-white py-3 px-4 relative overflow-hidden flex items-center justify-center z-[60]"
      style={{ 
        background: 'linear-gradient(90deg, #2a000e 0%, #46000D 30%, #42002E 60%, #2a000e 100%)',
        borderBottom: '1px solid rgba(196,0,106,0.2)'
      }}
    >
      {/* Animated shimmer */}
      <motion.div 
        animate={{ opacity: [0.0, 0.4, 0.0], x: ['-100%', '200%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(196,0,106,0.15), transparent)', width: '40%' }}
      />

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative z-10">
        <div className="flex items-center gap-3">
          <div 
            className="flex h-6 w-6 items-center justify-center rounded-full animate-pulse"
            style={{ background: 'linear-gradient(135deg, #c4006a, #720137)' }}
          >
            <Zap size={14} fill="currentColor" />
          </div>
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]" style={{ color: '#f5d0dc' }}>
            Midnight Flash Sale:{' '}
            <span style={{ color: '#c4006a', textShadow: '0 0 12px rgba(196,0,106,0.6)' }}>Flat 50% Off</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {[
              { val: timeLeft.hours, label: 'H' },
              { val: timeLeft.minutes, label: 'M' },
              { val: timeLeft.seconds, label: 'S' }
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-1">
                <span 
                  className="px-2 py-0.5 rounded font-black text-xs min-w-[28px] text-center"
                  style={{ 
                    background: 'rgba(196,0,106,0.15)',
                    border: '1px solid rgba(196,0,106,0.3)',
                    color: '#f5d0dc'
                  }}
                >
                  {String(t.val).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-bold" style={{ color: '#9b5c70' }}>{t.label}</span>
                {i < 2 && <span style={{ color: '#9b5c70' }}>:</span>}
              </div>
            ))}
          </div>
          
          <Link 
            to="/shop?sale=flash" 
            className="hidden sm:flex items-center gap-1 text-[10px] font-black uppercase tracking-widest transition-colors group"
            style={{ color: '#c4006a' }}
            onMouseEnter={e => e.currentTarget.style.color = '#f5d0dc'}
            onMouseLeave={e => e.currentTarget.style.color = '#c4006a'}
          >
            Shop Sale
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;
