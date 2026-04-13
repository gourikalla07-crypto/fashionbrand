import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { toggleWishlist, wishlist, addToCart } = useShop();
  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col h-full overflow-hidden transition-all duration-700 bg-black border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
    >

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden" style={{ background: 'rgba(26,0,8,0.8)' }}>
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img 
            src={product.image} 
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        {/* Golden image overlay on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #D4AF37, transparent)' }}
        ></div>


        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          {product.tags?.map(tag => (
            <span 
              key={tag} 
              className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-black/80 border border-[#D4AF37]/30 text-[#D4AF37] backdrop-blur-sm"
            >
              {tag}
            </span>

          ))}
          {product.oldPrice && (
            <span className="px-3 py-1 bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg"
            >
              SALE -{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </span>
          )}

        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={() => toggleWishlist(product)}
            className={`p-3 rounded-full shadow-lg transition-all ${
              isWishlisted ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.5)]' : 'bg-black/90 border border-[#D4AF37]/30 text-[#D4AF37]'
            }`}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>

        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            onClick={() => addToCart(product)}
            className="w-full py-3 bg-[#D4AF37] text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all shadow-2xl"
          >
            <ShoppingCart size={16} />
            Add To Cart
          </button>
        </div>

      </div>

      {/* Info Container */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]/60 italic">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
            <span className="text-[10px] font-black text-[#D4AF37]">{product.rating}</span>
          </div>
        </div>
        
        <div className="mb-1">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            {product.brand}
          </span>
        </div>
        
        <Link to={`/product/${product.id}`} className="block mb-3">
          <h3 
            className="font-playfair text-lg font-black transition-colors line-clamp-1 leading-tight text-white hover:text-[#D4AF37]"
          >
            {product.name}
          </h3>
        </Link>


        
        <div className="mt-auto flex items-center gap-3">
          <span className="text-xl font-playfair font-black text-[#D4AF37]">
            ₹{product.price}
          </span>

          {product.oldPrice && (
            <span className="text-sm font-medium line-through text-white/30">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default ProductCard;
