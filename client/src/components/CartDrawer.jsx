import React from 'react';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useShop();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] backdrop-blur-sm"
            style={{ background: 'rgba(0,0,0,0.75)' }}
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[110] shadow-2xl flex flex-col"
            style={{ 
              background: 'linear-gradient(160deg, #1a0008 0%, #2a000e 100%)',
              borderLeft: '1px solid rgba(94,0,9,0.5)',
              boxShadow: '-20px 0 60px rgba(196,0,106,0.1)'
            }}
          >
            {/* Header */}
            <div 
              className="p-6 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(94,0,9,0.4)' }}
            >
               <div className="flex items-center gap-3">
                 <ShoppingBag style={{ color: '#c4006a' }} size={24} />
                 <h2 className="text-xl font-black uppercase tracking-tighter" style={{ color: '#f5d0dc' }}>Your Bag ({cart.length})</h2>
               </div>
               <button 
                onClick={onClose}
                className="p-2 rounded-full transition-colors"
                style={{ background: 'rgba(114,1,55,0.15)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(114,1,55,0.3)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(114,1,55,0.15)'}
               >
                 <X size={24} style={{ color: '#f5d0dc' }} />
               </button>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto p-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ background: 'rgba(50,0,18,0.8)', border: '1px solid rgba(94,0,9,0.4)' }}
                  >
                    <ShoppingBag size={32} style={{ color: 'rgba(114,1,55,0.5)' }} />
                  </div>
                  <h3 className="text-lg font-black uppercase mb-2" style={{ color: '#f5d0dc' }}>Empty Bag</h3>
                  <p className="text-sm mb-8" style={{ color: '#9b5c70' }}>Looking for something? Explore our new arrivals.</p>
                  <button 
                    onClick={() => { onClose(); navigate('/shop'); }}
                    className="px-8 py-3 font-black text-xs rounded-full uppercase transition-all hover:scale-105"
                    style={{ 
                      background: 'linear-gradient(135deg, #c4006a, #720137)',
                      color: '#fff',
                      boxShadow: '0 0 20px rgba(196,0,106,0.3)'
                    }}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 group">
                      <div 
                        className="w-24 aspect-[3/4] rounded-xl overflow-hidden flex-shrink-0"
                        style={{ background: 'rgba(50,0,18,0.8)', border: '1px solid rgba(94,0,9,0.3)' }}
                      >
                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                      <div className="flex-grow flex flex-col">
                         <div className="flex justify-between items-start mb-1">
                            <h4 className="font-black text-sm line-clamp-1 uppercase tracking-tight" style={{ color: '#f5d0dc' }}>{item.name}</h4>
                            <button 
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="transition-colors"
                              style={{ color: '#9b5c70' }}
                              onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                              onMouseLeave={e => e.currentTarget.style.color = '#9b5c70'}
                            >
                              <Trash2 size={16} />
                            </button>
                         </div>
                         <p className="text-[10px] font-black uppercase mb-3" style={{ color: '#c4006a' }}>Size: {item.size}</p>
                         
                         <div className="mt-auto flex items-center justify-between">
                            <div 
                              className="flex items-center rounded-lg p-1 px-2"
                              style={{ 
                                background: 'rgba(50,0,18,0.8)',
                                border: '1px solid rgba(94,0,9,0.4)'
                              }}
                            >
                               <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="p-1" style={{ color: '#f5d0dc' }}><Minus size={12} /></button>
                               <span className="w-8 text-center text-xs font-black" style={{ color: '#f5d0dc' }}>{item.quantity}</span>
                               <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="p-1" style={{ color: '#f5d0dc' }}><Plus size={12} /></button>
                            </div>
                            <span className="font-black text-sm" style={{ color: '#f5d0dc' }}>
                               ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div 
                className="p-6"
                style={{ 
                  background: 'rgba(26,0,8,0.8)',
                  borderTop: '1px solid rgba(94,0,9,0.4)'
                }}
              >
                <div className="flex justify-between items-center mb-6">
                   <span className="font-bold uppercase text-xs tracking-widest" style={{ color: '#9b5c70' }}>Subtotal</span>
                   <span className="text-2xl font-black" style={{ color: '#f5d0dc' }}>₹{cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="space-y-4">
                  <button 
                    onClick={handleCheckout}
                    className="w-full h-14 font-black tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{ 
                      background: 'linear-gradient(135deg, #c4006a, #720137)',
                      color: '#fff',
                      boxShadow: '0 0 25px rgba(196,0,106,0.35)'
                    }}
                  >
                    CHECKOUT NOW <ArrowRight size={18} />
                  </button>
                  <Link 
                    to="/cart" 
                    onClick={onClose}
                    className="w-full block text-center py-2 text-xs font-black uppercase tracking-widest transition-colors"
                    style={{ color: '#9b5c70' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f5d0dc'}
                    onMouseLeave={e => e.currentTarget.style.color = '#9b5c70'}
                  >
                    View Full Bag
                  </Link>
                </div>

                <div className="mt-6 flex justify-center gap-6">
                   <div className="flex flex-col items-center gap-1">
                      <Truck size={14} style={{ color: '#c4006a' }} />
                      <span className="text-[8px] font-black uppercase" style={{ color: '#9b5c70' }}>Fast Delivery</span>
                   </div>
                   <div className="flex flex-col items-center gap-1">
                      <ShieldCheck size={14} style={{ color: '#c4006a' }} />
                      <span className="text-[8px] font-black uppercase" style={{ color: '#9b5c70' }}>Secure Pay</span>
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
