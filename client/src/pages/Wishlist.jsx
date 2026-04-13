import React from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Wishlist = () => {
  const { wishlist } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="pt-40 pb-20 px-6 min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 transition-colors">
        <div className="w-32 h-32 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-8">
          <Heart size={48} className="text-zinc-300 dark:text-zinc-700" />
        </div>
        <h2 className="text-3xl font-black dark:text-white mb-4 uppercase tracking-tighter text-center">YOUR WISHLIST IS EMPTY</h2>
        <p className="text-zinc-500 font-medium mb-12 max-w-xs text-center">
          Save your favorite pieces here to keep an eye on them.
        </p>
        <Link 
          to="/shop" 
          className="px-12 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          EXPLORE SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 md:px-6 min-h-screen bg-white dark:bg-zinc-950 transition-colors">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
           <div>
             <span className="text-accent-neon text-xs font-black uppercase tracking-[0.3em] mb-4 block">Personal Collection</span>
             <h1 className="text-4xl md:text-5xl font-black dark:text-white mb-2 uppercase tracking-tighter">Your Wishlist</h1>
             <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">{wishlist.length} Items Saved</p>
           </div>
           <Link to="/shop" className="group flex items-center gap-2 text-sm font-bold dark:text-white">
              Back to Shopping
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
