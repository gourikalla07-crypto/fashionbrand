import React from 'react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ChevronLeft,
  Truck,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useShop();

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-20 px-6 min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 transition-colors">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-8"
        >
          <ShoppingBag size={48} className="text-zinc-300 dark:text-zinc-700" />
        </motion.div>
        <h2 className="text-3xl font-black dark:text-white mb-4 uppercase tracking-tighter text-center">YOUR BAG IS EMPTY</h2>
        <p className="text-zinc-500 font-medium mb-12 max-w-xs text-center">
          Looks like you haven't added anything to your cart yet. Let's find something amazing for you!
        </p>
        <Link 
          to="/shop" 
          className="px-12 py-4 bg-accent-neon text-white font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent-neon/20"
        >
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 md:px-6 min-h-screen bg-white dark:bg-zinc-950 transition-colors">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-10">
          <Link to="/" className="hover:text-accent-neon transition-colors">Home</Link>
          <ChevronLeft size={14} />
          <span className="text-zinc-600 dark:text-zinc-400">Your Bag</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black dark:text-white mb-12 uppercase tracking-tighter">SHOPPING BAG</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Cart Items List */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.div 
                    key={`${item.id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col sm:flex-row gap-6 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-100 dark:border-zinc-800 group"
                  >
                    <div className="sm:w-32 aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shadow-md">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-between py-2">
                       <div className="flex justify-between items-start">
                         <div>
                            <span className="text-[10px] font-black text-accent-neon uppercase tracking-widest block mb-1">{item.category}</span>
                            <Link to={`/product/${item.id}`} className="text-xl font-black dark:text-white uppercase tracking-tight hover:text-accent-neon transition-colors">
                              {item.name}
                            </Link>
                            <div className="text-sm font-bold text-zinc-500 mt-2 uppercase">Size: {item.size}</div>
                         </div>
                         <button 
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="p-3 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-all"
                         >
                          <Trash2 size={20} />
                         </button>
                       </div>

                       <div className="flex items-center justify-between mt-8">
                          <div className="flex items-center bg-white dark:bg-zinc-950 rounded-xl p-1 px-3 border border-zinc-200 dark:border-zinc-800">
                             <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="p-2 dark:text-white hover:text-accent-neon"><Minus size={14} /></button>
                             <span className="w-8 text-center font-black dark:text-white">{item.quantity}</span>
                             <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="p-2 dark:text-white hover:text-accent-neon"><Plus size={14} /></button>
                          </div>
                          <div className="text-xl font-black dark:text-white">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <Link to="/shop" className="inline-flex items-center gap-2 mt-8 text-sm font-bold dark:text-white group">
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-zinc-900 dark:bg-zinc-900 dark:border dark:border-zinc-800 text-white p-8 md:p-10 rounded-[3rem] sticky top-28 shadow-2xl">
               <h3 className="text-2xl font-black mb-8 border-b border-white/10 pb-6 uppercase tracking-tight">ORDER SUMMARY</h3>
               
               <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-zinc-400 text-sm font-bold">
                    <span>Subtotal</span>
                    <span className="text-white">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-sm font-bold">
                    <span>Shipping</span>
                    <span className="text-green-400 font-black">FREE</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-sm font-bold pb-6">
                    <span>Tax (GST)</span>
                    <span className="text-white">₹0.00</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black pt-6 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-accent-neon">₹{cartTotal.toFixed(2)}</span>
                  </div>
               </div>

               <Link 
                to="/checkout" 
                className="w-full h-16 bg-accent-neon text-white font-black tracking-[0.2em] rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-100 transition-all shadow-xl shadow-accent-neon/10"
               >
                 PROCEED TO CHECKOUT
                 <ArrowRight size={20} />
               </Link>

               <div className="mt-10 grid grid-cols-1 gap-4">
                 {[
                   { icon: Truck, text: "Fast Express Delivery" },
                   { icon: ShieldCheck, text: "100% Security Guaranteed" },
                   { icon: CreditCard, text: "Multiple Payment Options" }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 text-xs text-zinc-400 font-bold uppercase tracking-widest">
                     <item.icon size={16} className="text-accent-neon" />
                     {item.text}
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
