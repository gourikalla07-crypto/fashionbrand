import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="pt-40 pb-20 px-6 min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 transition-colors">
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mb-10 shadow-3xl shadow-green-500/30"
      >
        <CheckCircle2 size={64} className="text-white" />
      </motion.div>
      
      <h2 className="text-4xl md:text-6xl font-black dark:text-white mb-6 uppercase tracking-tighter text-center">PAYMENT SUCCESSFUL!</h2>
      <p className="text-zinc-500 font-medium mb-12 max-w-sm text-center text-lg">
        Thank you for your purchase. Your order has been confirmed and is being prepared for shipment.
      </p>

      <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 w-full max-w-md mb-12">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
           <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">Order Reference</span>
           <span className="text-sm font-black dark:text-white truncate max-w-[150px]">{sessionId ? `CS_${sessionId.slice(-8)}` : 'GK-ORDER-2026'}</span>
        </div>
        <div className="flex justify-between items-center">
           <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">Estimated Delivery</span>
           <span className="text-sm font-black text-accent-neon uppercase">3-5 Business Days</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/" 
          className="px-10 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-black rounded-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          CONTINUE SHOPPING
          <ShoppingBag size={20} />
        </Link>
        <button className="px-10 py-4 border-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-black rounded-2xl flex items-center gap-2 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
          <Download size={20} />
          RECEIPT
        </button>
      </div>
    </div>
  );
};

export default Success;
