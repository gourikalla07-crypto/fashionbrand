import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useShop } from '../context/ShopContext';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  ChevronRight,
  Plus,
  Minus,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist, addRecentlyViewed, recentlyViewed } = useShop();
  
  const product = products.find(p => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdded, setIsAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
      if (product.sizes?.length > 0) setSelectedSize(product.sizes[0]);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center min-h-screen">
        <h2 className="text-3xl font-black mb-4">PRODUCT NOT FOUND</h2>
        <Link to="/shop" className="text-accent-neon font-bold underline">Return to Shop</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some(item => item.id === product.id);
  const completeTheLook = products.filter(p => p.category !== product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="pt-28 pb-20 px-4 md:px-6 bg-white dark:bg-zinc-950 transition-colors">
      <div className="container mx-auto">
        {/* Size Guide Modal */}
        <AnimatePresence>
          {showSizeGuide && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSizeGuide(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl p-8"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Size Guide (cm)</h3>
                  <button onClick={() => setShowSizeGuide(false)} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"><RefreshCw size={20} /></button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-200 dark:border-zinc-800">
                        <th className="py-4 font-black dark:text-white uppercase text-xs">Size</th>
                        <th className="py-4 font-black dark:text-white uppercase text-xs">Chest</th>
                        <th className="py-4 font-black dark:text-white uppercase text-xs">Waist</th>
                        <th className="py-4 font-black dark:text-white uppercase text-xs">Shoulder</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {[
                        { s: 'XS', c: '88-92', w: '74-78', sh: '42' },
                        { s: 'S', c: '92-96', w: '78-82', sh: '44' },
                        { s: 'M', c: '96-100', w: '82-86', sh: '46' },
                        { s: 'L', c: '100-104', w: '86-90', sh: '48' },
                        { s: 'XL', c: '104-108', w: '90-94', sh: '50' }
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-zinc-50 dark:border-zinc-800/50">
                          <td className="py-4 font-black dark:text-white">{row.s}</td>
                          <td className="py-4 text-zinc-500">{row.c}</td>
                          <td className="py-4 text-zinc-500">{row.w}</td>
                          <td className="py-4 text-zinc-500">{row.sh}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-8 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl flex gap-3 italic">
                  <ShieldCheck size={20} className="text-accent-neon shrink-0" />
                  <p className="text-xs text-zinc-500 font-medium">Measurement values are approximate. If you're between sizes, we recommend going one size up for a comfortable fit.</p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-10">
          <Link to="/" className="hover:text-accent-neon transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-accent-neon transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <span className="text-zinc-600 dark:text-zinc-400">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto">
              {[
                "1551061762461-155414bd5772",
                "1556906331-f9b8357738d1",
                "1578681994506-38fcfdd542a5"
              ].map((imgId, i) => (
                <div key={i} className="min-w-[80px] w-20 md:w-24 aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-accent-neon transition-all bg-zinc-100 dark:bg-zinc-900 shadow-sm">
                  <img src={`https://images.unsplash.com/photo-${imgId}?q=80&w=400&auto=format&fit=crop`} className="w-full h-full object-cover" alt="" />
                </div>
              ))}
            </div>
            <div className="flex-grow aspect-[3/4] rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-2xl relative">
              <img 
                src={product.image} 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" 
                alt={product.name} 
              />
              <button 
                onClick={() => toggleWishlist(product)}
                className={`absolute top-6 right-6 p-4 rounded-full shadow-lg transition-all ${
                  isWishlisted ? 'bg-red-500 text-white' : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:scale-110'
                }`}
              >
                <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="text-accent-neon text-xs font-black uppercase tracking-[0.3em] mb-4 block">{product.category}</span>
              <h1 className="text-3xl md:text-5xl font-black dark:text-white mb-4 leading-tight tracking-tight uppercase">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-full">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-black dark:text-white">{product.rating}</span>
                </div>
                <span className="text-sm text-zinc-500 font-bold uppercase tracking-widest">{product.reviews} Reviews</span>
                <div className="h-4 w-[1px] bg-zinc-200 dark:border-zinc-800"></div>
                <span className="text-xs font-black text-green-500 uppercase tracking-widest flex items-center gap-1">
                  <CheckCircle2 size={14} /> In Stock
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-10">
              <span className="text-4xl font-black dark:text-white">₹{product.price}</span>
              {product.oldPrice && (
                <>
                  <span className="text-xl text-zinc-400 line-through font-medium">₹{product.oldPrice}</span>
                  <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    Save {Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-10 text-lg">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && (
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-black dark:text-white uppercase tracking-widest">Select Size</h4>
                  <button onClick={() => setShowSizeGuide(true)} className="text-[10px] font-black text-accent-neon uppercase tracking-widest hover:underline px-2 flex items-center gap-1"><RefreshCw size={12} className="animate-spin-slow" /> Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[60px] h-12 flex items-center justify-center rounded-xl font-black text-sm transition-all border-2 ${
                        selectedSize === size 
                          ? 'border-zinc-900 dark:border-white bg-zinc-900 dark:bg-white text-white dark:text-black' 
                          : 'border-zinc-100 dark:border-zinc-800 text-zinc-500 hover:border-zinc-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-10">
              <h4 className="text-sm font-black dark:text-white uppercase tracking-widest mb-4">Quantity</h4>
              <div className="flex items-center gap-4">
                 <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-xl p-1 px-4 h-12">
                   <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="p-2 dark:text-white hover:text-accent-neon transition-colors"><Minus size={18} /></button>
                   <span className="w-12 text-center font-black text-lg dark:text-white">{quantity}</span>
                   <button onClick={() => setQuantity(q => q+1)} className="p-2 dark:text-white hover:text-accent-neon transition-colors"><Plus size={18} /></button>
                 </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-grow h-16 rounded-2xl font-black tracking-widest flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 ${
                  isAdded 
                    ? 'bg-green-500 text-white' 
                    : 'bg-zinc-900 dark:bg-accent-neon text-white dark:text-black hover:opacity-90'
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 size={24} />
                    ADDED TO BAG
                  </>
                ) : (
                  <>
                    <ShoppingCart size={24} />
                    ADD TO CART
                  </>
                )}
              </button>
              <button className="w-full sm:w-16 h-16 border-2 border-zinc-900 dark:border-white rounded-2xl flex items-center justify-center hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                <Share2 size={24} />
              </button>
            </div>

            {/* Product Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-zinc-100 dark:border-zinc-900">
              {[
                { icon: Truck, title: "Free Express Shipping", sub: "2-4 Business days" },
                { icon: ShieldCheck, title: "100% Authentic Product", sub: "Brand certified" },
                { icon: RefreshCw, title: "Easy Return Policy", sub: "No questions asked" }
              ].map((b, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <b.icon size={20} className="text-accent-neon" />
                  <h5 className="text-[10px] font-black dark:text-white uppercase tracking-wider">{b.title}</h5>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Complete The Look Section */}
        {completeTheLook.length > 0 && (
          <section className="py-24 border-t border-zinc-100 dark:border-zinc-900">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-accent-neon text-xs font-black uppercase tracking-[0.3em] mb-4 block">Style Suggestion</span>
                <h2 className="text-4xl font-black dark:text-white uppercase tracking-tighter">COMPLETE THE LOOK</h2>
              </div>
              <p className="text-zinc-500 max-w-sm font-medium">Curated pairings to help you build the perfect outfit around this piece.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {completeTheLook.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Tabs Section */}
        <div className="mb-24 px-2">
          <div className="flex border-b border-zinc-100 dark:border-zinc-900 gap-10">
            {/* Same as original tabs... */}
            {['description', 'details', 'reviews'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-black uppercase tracking-[0.2em] transition-all relative ${
                  activeTab === tab ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-accent-neon" />
                )}
              </button>
            ))}
          </div>
          <div className="py-12">
            {/* Tab content logic... */}
             <AnimatePresence mode="wait">
                {activeTab === 'description' && (
                  <motion.div 
                    key="desc"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="max-w-4xl"
                  >
                    <p className="text-zinc-600 dark:text-zinc-400 leading-loose text-lg font-medium whitespace-pre-line">
                      {product.description}
                      {"\n\n"}
                      This {product.category} piece is meticulously crafted using high-grade materials to ensure both durability and a premium aesthetic. Designed for the modern Indian youth who refuses to compromise on style or comfort.
                      {"\n\n"}
                      Whether you're hitting the streets of Bangalore or attending a semi-formal event in Delhi, GK FASHION WORLD provides the perfect silhouette for every occasion.
                    </p>
                  </motion.div>
                )}
                {activeTab === 'details' && (
                  <motion.div 
                    key="details"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm"
                  >
                     <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl">
                       <h5 className="font-black mb-6 dark:text-white uppercase tracking-widest">Specifications</h5>
                       <ul className="space-y-4">
                         <li className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                           <span className="text-zinc-500">Material</span>
                           <span className="dark:text-white font-bold">100% Premium Cotton Blend</span>
                         </li>
                         <li className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                           <span className="text-zinc-500">Fit</span>
                           <span className="dark:text-white font-bold">Modern Comfort Fit</span>
                         </li>
                         <li className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                           <span className="text-zinc-500">Care</span>
                           <span className="dark:text-white font-bold">Cold Machine Wash</span>
                         </li>
                         <li className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                           <span className="text-zinc-500">SKU</span>
                           <span className="dark:text-white font-bold">GK-{product.id}-FW26</span>
                         </li>
                       </ul>
                     </div>
                  </motion.div>
                )}
                {activeTab === 'reviews' && (
                  <motion.div 
                    key="reviews"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <div className="mb-12 flex items-center justify-between">
                      <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Customer Reviews ({product.reviews})</h3>
                      <button className="px-6 py-3 border-2 border-zinc-900 dark:border-white rounded-xl font-black text-sm hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                        Write A Review
                      </button>
                    </div>
                    
                    <div className="space-y-8">
                       {[
                         { user: "Aryan K.", rating: 5, date: "Oct 15, 2025", comment: "The best purchase I've made this year. The fit is exactly as shown in the images. High recommend the urban collection!" },
                         { user: "Priya M.", rating: 4, date: "Sep 28, 2025", comment: "Fabric quality is amazing. A bit long for my height but looks great with tucked in style." }
                       ].map((rev, i) => (
                         <div key={i} className="border-b border-zinc-100 dark:border-zinc-900 pb-8">
                           <div className="flex items-center justify-between mb-4">
                             <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-accent-neon/10 flex items-center justify-center font-bold text-accent-neon uppercase">
                                 {rev.user[0]}
                               </div>
                               <div>
                                 <h5 className="font-bold dark:text-white">{rev.user}</h5>
                                 <div className="flex gap-1 text-yellow-400">
                                   {[...Array(rev.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                 </div>
                               </div>
                             </div>
                             <span className="text-xs text-zinc-400 font-bold">{rev.date}</span>
                           </div>
                           <p className="text-zinc-600 dark:text-zinc-400 font-medium">{rev.comment}</p>
                         </div>
                       ))}
                    </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>

        {/* Recently Viewed */}
        {recentlyViewed.length > 1 && (
          <section className="pt-24 border-t border-zinc-100 dark:border-zinc-900">
            <div className="mb-12">
               <span className="text-accent-neon text-xs font-black uppercase tracking-[0.3em] mb-4 block">You might like</span>
               <h2 className="text-4xl font-black dark:text-white">RECENTLY VIEWED</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {recentlyViewed.filter(p => p.id !== product.id).slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
