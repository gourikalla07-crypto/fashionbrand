import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { products, categories, brands } from '../data/products';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, Search, X, ChevronDown, LayoutGrid, List, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category');
  const initialBrand = queryParams.get('brand');
  const initialSearch = queryParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory || 'All');
  const [activeBrands, setActiveBrands] = useState(initialBrand ? [initialBrand] : []);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('Featured');
  const [priceRange, setPriceRange] = useState([299, 1500]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    if (initialCategory) setActiveCategory(initialCategory);
    if (initialBrand) setActiveBrands([initialBrand]);
    if (initialSearch) setSearchQuery(initialSearch);
  }, [initialCategory, initialBrand, initialSearch]);

  const toggleBrand = (brandName) => {
    setActiveBrands(prev => 
      prev.includes(brandName) 
        ? prev.filter(b => b !== brandName) 
        : [...prev, brandName]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesBrand = activeBrands.length === 0 || activeBrands.includes(p.brand);
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesCategory && matchesBrand && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Rating') return b.rating - a.rating;
      return 0; // Featured
    });
  }, [activeCategory, activeBrands, searchQuery, priceRange, sortBy]);

  const [externalProducts, setExternalProducts] = useState([]);
  const [isSearchingExternal, setIsSearchingExternal] = useState(false);
  const [hasFallback, setHasFallback] = useState(false);

  useEffect(() => {
    if (searchQuery && filteredProducts.length === 0) {
      setIsSearchingExternal(true);
      fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/search?q=${searchQuery}`)
        .then(res => res.json())
        .then(data => {
          if (data.source === 'external') {
            setExternalProducts(data.data);
            setHasFallback(true);
          } else {
            setExternalProducts([]);
            setHasFallback(false);
          }
        })
        .catch(err => {
          console.error(err);
          setHasFallback(false);
        })
        .finally(() => setIsSearchingExternal(false));
    } else {
      setExternalProducts([]);
      setHasFallback(false);
    }
  }, [searchQuery, filteredProducts.length]);

  const displayProducts = hasFallback ? externalProducts : filteredProducts;

  return (
    <div className="pt-28 pb-20 px-4 md:px-6 min-h-screen transition-colors" style={{ background: 'linear-gradient(135deg, #1a0008 0%, #2a000e 50%, #120008 100%)' }}>
      <div className="container mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-7xl font-playfair font-black mb-2 uppercase tracking-tight text-white">
              {activeCategory === 'All' ? 'OUR COLLECTION' : activeCategory}
            </h1>

            <p className="text-sm font-medium uppercase tracking-widest leading-none" style={{ color: '#9b5c70' }}>
              Showing {filteredProducts.length} results
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
             <div className="relative group">
               <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all shadow-sm"
                style={{ background: 'rgba(50,0,18,0.8)', border: '1px solid rgba(94,0,9,0.4)', color: '#f5d0dc' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #c4006a, #720137)'; e.currentTarget.style.borderColor = 'transparent'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(50,0,18,0.8)'; e.currentTarget.style.borderColor = 'rgba(94,0,9,0.4)'; }}
               >
                 <SlidersHorizontal size={18} />
                 Filters
               </button>
             </div>
             
             <div className="relative group min-w-[180px]">
               <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none px-6 py-3 bg-zinc-100 dark:bg-zinc-900 rounded-full font-bold text-sm dark:text-white outline-none cursor-pointer focus:ring-2 ring-accent-neon transition-all"
               >
                 <option>Featured</option>
                 <option>Price: Low to High</option>
                 <option>Price: High to Low</option>
                 <option>Rating</option>
               </select>
               <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 dark:text-white" />
             </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(activeCategory !== 'All' || searchQuery || activeBrands.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-8">
            {activeCategory !== 'All' && (
              <button 
                onClick={() => setActiveCategory('All')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                style={{ background: 'rgba(196,0,106,0.12)', color: '#c4006a', border: '1px solid rgba(196,0,106,0.25)' }}
              >
                Category: {activeCategory} <X size={14} />
              </button>
            )}
            {activeBrands.map(brand => (
              <button 
                key={brand}
                onClick={() => toggleBrand(brand)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                style={{ background: 'rgba(196,0,106,0.12)', color: '#c4006a', border: '1px solid rgba(196,0,106,0.25)' }}
              >
                Brand: {brand} <X size={14} />
              </button>
            ))}
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                style={{ background: 'rgba(196,0,106,0.12)', color: '#c4006a', border: '1px solid rgba(196,0,106,0.25)' }}
              >
                Search: {searchQuery} <X size={14} />
              </button>
            )}
            {(activeCategory !== 'All' || activeBrands.length > 0 || searchQuery) && (
              <button 
                onClick={() => {setActiveCategory('All'); setActiveBrands([]); setSearchQuery('');}}
                className="text-xs font-black text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest ml-2"
              >
                Clear All
              </button>
            )}
          </div>
        )}

        {/* Smart Search Feedback */}
        {hasFallback && !isSearchingExternal && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-2xl flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center text-yellow-600 dark:text-yellow-500 shrink-0">
              <Search size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-yellow-800 dark:text-yellow-400">No exact match found</h4>
              <p className="text-xs text-yellow-600 dark:text-yellow-500/80 font-medium mt-0.5">Showing similar items from our global partners instead.</p>
            </div>
          </motion.div>
        )}

        {/* Product Grid */}
        {isSearchingExternal ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 size={48} className="animate-spin mb-6" style={{ color: '#c4006a' }} />
            <h3 className="text-2xl font-black uppercase tracking-tighter" style={{ color: '#f5d0dc' }}>Searching Partners...</h3>
            <p className="font-medium mt-2" style={{ color: '#9b5c70' }}>Checking global inventory for matching items.</p>
          </div>
        ) : displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 rounded-[3rem]" style={{ background: 'rgba(42,0,14,0.5)', border: '1px solid rgba(94,0,9,0.3)' }}>
            <Search size={64} className="mb-6" style={{ color: 'rgba(114,1,55,0.4)' }} />
            <h3 className="text-2xl font-black mb-2" style={{ color: '#f5d0dc' }}>NO PRODUCTS FOUND</h3>
            <p className="font-medium" style={{ color: '#9b5c70' }}>Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => {setActiveCategory('All'); setActiveBrands([]); setSearchQuery('');}}
              className="mt-8 px-8 py-3 font-bold rounded-full hover:scale-105 transition-all"
              style={{ background: 'linear-gradient(135deg, #c4006a, #720137)', color: '#fff', boxShadow: '0 0 20px rgba(196,0,106,0.35)' }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Filter Sidebar / Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/60 z-[110] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm z-[120] shadow-2xl p-8 overflow-y-auto"
              style={{ background: 'linear-gradient(160deg, #1a0008, #2a000e)', borderLeft: '1px solid rgba(94,0,9,0.5)' }}
            >
              <div className="flex items-center justify-between mb-10 pb-6" style={{ borderBottom: '1px solid rgba(94,0,9,0.4)' }}>
                <h2 className="text-2xl font-black tracking-tight" style={{ color: '#f5d0dc' }}>FILTERS</h2>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 rounded-full transition-colors" style={{ background: 'rgba(114,1,55,0.15)' }}>
                  <X size={24} style={{ color: '#f5d0dc' }} />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-10">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6" style={{ color: '#c4006a' }}>Categories</h4>
                <div className="flex flex-col gap-3">
                  {['All', ...categories].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-left py-1 text-base font-bold transition-all ${
                        activeCategory === cat ? 'translate-x-2' : ''
                      }`}
                      style={{ color: activeCategory === cat ? '#f5d0dc' : '#9b5c70' }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-10">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6" style={{ color: '#c4006a' }}>Brands</h4>
                <div className="grid grid-cols-2 gap-3">
                  {brands.map(brand => (
                    <button 
                      key={brand.name}
                      onClick={() => toggleBrand(brand.name)}
                      className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all"
                      style={activeBrands.includes(brand.name)
                        ? { background: 'linear-gradient(135deg, #c4006a, #720137)', color: '#fff', border: '1px solid transparent', boxShadow: '0 0 12px rgba(196,0,106,0.3)' }
                        : { background: 'rgba(50,0,18,0.7)', color: '#9b5c70', border: '1px solid rgba(94,0,9,0.4)' }
                      }
                    >
                      {brand.name.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-10">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6" style={{ color: '#c4006a' }}>Price Range</h4>
                <div className="px-2">
                  <input 
                    type="range" 
                    min="299" 
                    max="1500" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([299, parseInt(e.target.value)])}
                    className="w-full"
                    style={{ accentColor: '#c4006a' }}
                  />
                  <div className="flex justify-between mt-4">
                    <span className="text-sm font-bold" style={{ color: '#f5d0dc' }}>₹299</span>
                    <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(196,0,106,0.12)', color: '#c4006a', border: '1px solid rgba(196,0,106,0.25)' }}>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full py-4 rounded-xl font-black tracking-widest mt-6 transition-all hover:scale-[1.02] active:scale-95"
                style={{ background: 'linear-gradient(135deg, #c4006a, #720137)', color: '#fff', boxShadow: '0 0 20px rgba(196,0,106,0.3)' }}
              >
                APPLY FILTERS
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
