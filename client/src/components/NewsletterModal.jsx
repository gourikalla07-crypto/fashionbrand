import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenNewsletter');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('hasSeenNewsletter', 'true');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsOpen(false), 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 backdrop-blur-md"
            style={{ background: 'rgba(0,0,0,0.85)' }}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row min-h-[500px]"
            style={{ 
              background: 'linear-gradient(145deg, #1a0008, #2a000e)',
              border: '1px solid rgba(196,0,106,0.25)',
              boxShadow: '0 0 80px rgba(196,0,106,0.2), 0 40px 80px rgba(0,0,0,0.6)'
            }}
          >
            {/* Decorative glow orbs */}
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(196,0,106,0.2), transparent 70%)', filter: 'blur(40px)' }} />
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(89,0,84,0.2), transparent 70%)', filter: 'blur(40px)' }} />

            {/* Image Section */}
            <div className="md:w-1/2 relative shrink-0 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                alt="Newsletter"
                style={{ mixBlendMode: 'luminosity' }}
              />
              <div className="absolute inset-0" 
                style={{ background: 'linear-gradient(to top, rgba(26,0,8,0.95) 0%, rgba(114,1,55,0.3) 50%, transparent 100%)' }} 
              />
              <div className="absolute bottom-10 left-10 text-white z-10">
                <span 
                  className="text-xs font-black uppercase tracking-[0.3em] mb-2 block"
                  style={{ color: '#c4006a', textShadow: '0 0 12px rgba(196,0,106,0.6)' }}
                >
                  Exclusive Access
                </span>
                <h3 className="text-3xl font-black uppercase leading-tight" style={{ color: '#f5d0dc' }}>
                  JOIN THE<br />GK MEMBER CLUB
                </h3>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative z-10">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 transition-colors"
                style={{ color: '#9b5c70' }}
                onMouseEnter={e => e.currentTarget.style.color = '#f5d0dc'}
                onMouseLeave={e => e.currentTarget.style.color = '#9b5c70'}
              >
                <X size={24} />
              </button>

              <div className="mb-10 text-center md:text-left">
                <div 
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
                  style={{ 
                    background: 'rgba(196,0,106,0.12)',
                    border: '1px solid rgba(196,0,106,0.25)',
                    color: '#c4006a'
                  }}
                >
                  <Sparkles size={12} />
                  SPECIAL OFFER
                </div>
                <h2 
                  className="text-4xl md:text-5xl font-black mb-4 leading-[0.9] tracking-tighter uppercase"
                  style={{ color: '#f5d0dc' }}
                >
                  GET 10% OFF
                </h2>
                <p style={{ color: '#9b5c70' }} className="font-medium">
                  Signup today for exclusive early access to drops, member-only discounts, and our style guide.
                </p>
              </div>

              {isSubscribed ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-3xl flex flex-col items-center text-center gap-2"
                  style={{ 
                    background: 'rgba(196,0,106,0.1)',
                    border: '1px solid rgba(196,0,106,0.25)'
                  }}
                >
                  <CheckCircle2 size={40} className="mb-2" style={{ color: '#c4006a' }} />
                  <h4 className="font-black tracking-widest uppercase" style={{ color: '#c4006a' }}>WELCOME TO THE FAM!</h4>
                  <p className="text-xs font-bold uppercase" style={{ color: '#9b5c70' }}>Check your email for the discount code.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="relative group">
                    <Mail 
                      className="absolute left-4 top-4 transition-colors" 
                      style={{ color: '#9b5c70' }} 
                      size={20} 
                    />
                    <input 
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full h-14 px-12 rounded-2xl outline-none transition-all font-medium"
                      style={{ 
                        background: 'rgba(50,0,18,0.7)',
                        border: '1px solid rgba(114,1,55,0.4)',
                        color: '#f5d0dc'
                      }}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full h-14 font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                    style={{ 
                      background: 'linear-gradient(135deg, #c4006a, #720137)',
                      color: '#fff',
                      boxShadow: '0 0 30px rgba(196,0,106,0.35)'
                    }}
                  >
                    CLAIM MY CODE
                    <ArrowRight size={20} />
                  </button>
                  <p className="text-[10px] font-bold uppercase text-center mt-2 tracking-wider" style={{ color: 'rgba(155,92,112,0.6)' }}>
                    By joining, you agree to our Terms & Privacy Policy
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterModal;
