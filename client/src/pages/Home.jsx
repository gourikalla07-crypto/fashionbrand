import React from 'react';
import Hero from '../components/Hero';
import { products, categories, brands } from '../data/products';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Quote, Truck, ShieldCheck, Clock, CreditCard, ShoppingBag, Flame, Zap, Sparkles, Activity, Trophy, Shield, Globe, Crown, Gem, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const footwearProducts = products.filter(p => p.category === "Footwear").slice(0, 4);
  const summerProducts = products.filter(p => p.category === "Summer").slice(0, 4);
  const ethnicProducts = products.filter(p => p.category === "Ethnic Wear").slice(0, 4);
  const featuredProducts = products.filter(p => p.tags?.includes("Trending") || p.tags?.includes("Bestseller")).slice(0, 4);
  const denimProducts = products.filter(p => p.category === "Denim").slice(0, 4);

  return (
    <div className="flex flex-col w-full pb-20">
      <Hero />

      {/* Trust Features */}
      <section className="py-12 border-b border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", sub: "On orders over $99" },
              { icon: ShieldCheck, title: "Secure Payment", sub: "100% data protection" },
              { icon: Clock, title: "24/7 Support", sub: "Live chat assistance" },
              { icon: CreditCard, title: "Easy Returns", sub: "30-day money back" }
            ].map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center group cursor-default">
                <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-neon/10 group-hover:scale-110 transition-all">
                  <f.icon className="text-zinc-600 dark:text-zinc-400 group-hover:text-accent-neon transition-colors" size={24} />
                </div>
                <h4 className="font-bold text-sm mb-1 dark:text-white">{f.title}</h4>
                <p className="text-xs text-zinc-500">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUMMER COLLECTION SECTION */}
      <section id="summer-section" className="py-16 px-4 bg-black">

        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#D4AF37]/50 text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Seasonal Picks</span>
              <h2 className="text-5xl md:text-8xl font-playfair font-black text-[#D4AF37] leading-none tracking-tight uppercase">SUMMER<br />COLLECTION</h2>

            </div>

            <p className="text-zinc-500 max-w-sm mb-2 font-medium">
              Breezy fabrics, vibrant tones, and effortless silhouettes designed for the ultimate summer vibe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {summerProducts.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link to="/shop?category=Summer" className="group flex items-center gap-3 text-lg font-black dark:text-white uppercase tracking-widest border-b-4 border-accent-neon pb-2 hover:translate-x-2 transition-all">
              EXPLORE SUMMER VIBES
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTWEAR SECTION */}
      <section id="footwear-section" className="py-16 px-4 bg-[#0a0a0a]">

        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#D4AF37]/50 text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Step In Style</span>
              <h2 className="text-5xl md:text-8xl font-playfair font-black text-[#D4AF37] leading-none tracking-tight uppercase">FOOTWEAR<br />SHOWCASE</h2>

            </div>

            <p className="text-zinc-500 max-w-sm mb-2 font-medium">
              From high-performance sneakers to elegant evening pumps. Discover footwear that defines your walk.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {footwearProducts.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link to="/shop?category=Footwear" className="group flex items-center gap-3 text-lg font-black dark:text-white uppercase tracking-widest border-b-4 border-[#00f0ff] pb-2 hover:translate-x-2 transition-all">
              SHOP ALL FOOTWEAR
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ETHNIC SECTION */}
      <section id="ethnic-section" className="py-16 px-4 bg-black">

        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#D4AF37]/50 text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Timeless Heritage</span>
              <h2 className="text-5xl md:text-8xl font-playfair font-black text-[#D4AF37] leading-none tracking-tight uppercase">ETHNIC<br />ELEGANCE</h2>

            </div>

            <p className="text-zinc-500 max-w-sm mb-2 font-medium">
              Experience the richness of tradition with our exquisite collection of sarees and premium ethnic wear.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ethnicProducts.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link to="/shop?category=Ethnic+Wear" className="group flex items-center gap-3 text-lg font-black dark:text-white uppercase tracking-widest border-b-4 border-[#ff2a85] pb-2 hover:translate-x-2 transition-all">
              VIEW ETHNIC TRADITION
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* DENIM DROPS SECTION */}
      <section id="denim-section" className="py-16 px-4 bg-[#0a0a0a]">

        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#D4AF37]/70 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Urban Essentials</span>
              <h2 className="text-5xl md:text-7xl font-playfair font-black text-[#D4AF37] leading-[0.9] tracking-tighter uppercase">DENIM<br />DROPS</h2>

            </div>
            <p className="text-zinc-500 max-w-sm mb-2 font-medium">
              Find your perfect fit. From classic vintage washes to modern street-ready silhouettes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {denimProducts.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="hover:scale-105 transition-transform duration-500"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link to="/shop?category=Denim" className="group flex items-center gap-3 text-lg font-black dark:text-white uppercase tracking-widest border-b-4 border-indigo-500 pb-2 hover:translate-x-2 transition-all">
              SHOP ALL DENIM
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 px-4 bg-black">

        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#D4AF37]/70 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Collections</span>
              <h2 className="text-4xl md:text-5xl font-playfair font-black text-[#D4AF37]">SHOP BY CATEGORY</h2>

            </div>
            <Link to="/shop" className="group flex items-center gap-2 text-sm font-bold dark:text-white">
              View All Collections
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[600px] md:h-[800px]">
            {/* Streetwear - Big Card */}
            <Link to="/shop?category=Streetwear" className="md:col-span-6 relative group overflow-hidden rounded-3xl">
              <img src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Streetwear" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <h3 className="text-3xl font-black mb-2">STREETWEAR</h3>
                <p className="text-zinc-200 mb-6 max-w-xs">Elite comfort meets urban aesthetics. Discover the new drops.</p>
                <div className="inline-flex h-10 w-10 bg-white text-black rounded-full items-center justify-center group-hover:scale-110 transition-all">
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>

            <div className="md:col-span-6 grid grid-cols-2 grid-rows-2 gap-4">
              <Link to="/shop?category=Women's+Fashion" className="col-span-2 relative group overflow-hidden rounded-3xl">
                <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Women" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                <div className="absolute bottom-10 left-10 text-white">
                  <h3 className="text-2xl font-black">WOMEN'S STYLE</h3>
                </div>
              </Link>
              <Link to="/shop?category=Ethnic+Wear" className="relative group overflow-hidden rounded-3xl">
                <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Ethnic" />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-6 left-6 text-white text-lg font-bold">ETHNIC</div>
              </Link>
              <Link to="/shop?category=Footwear" className="relative group overflow-hidden rounded-3xl text-white">
                 <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Footwear" />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-6 left-6 text-white text-lg font-bold">FOOTWEAR</div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY BRAND */}
      <section className="py-16 px-4 bg-[#0a0a0a]">

        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37]/70 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Our Partners</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-black text-[#D4AF37] mb-6 uppercase tracking-tighter">SHOP BY BRAND</h2>

            <p className="text-zinc-500 font-medium max-w-xl mx-auto">Explore premium collections from world-renowned global and local fashion labels.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {brands.slice(0, 12).map((brand, i) => {
              const brandColors = {
                'Zara':          { bg: '#1e3538', text: 'text-white', accent: '#ece5db', icon: ShoppingBag },
                'H&M':           { bg: '#5a2d33', text: 'text-white', accent: '#c18f72', icon: Flame },
                'Uniqlo':        { bg: '#7e7a77', text: 'text-white', accent: '#ece5db', icon: Zap },
                'Forever 21':    { bg: '#c18f72', text: 'text-white', accent: '#1e3538', icon: Sparkles },
                'Nike':          { bg: '#1e3538', text: 'text-white', accent: '#7e7a77', icon: Activity },
                'Adidas':        { bg: '#5a2d33', text: 'text-white', accent: '#ece5db', icon: Trophy },
                'Puma':          { bg: '#7e7a77', text: 'text-white', accent: '#c18f72', icon: Zap },
                'Under Armour':  { bg: '#1e3538', text: 'text-white', accent: '#5a2d33', icon: Shield },
                'FabIndia':      { bg: '#c18f72', text: 'text-white', accent: '#1e3538', icon: Globe },
                'Biba':          { bg: '#5a2d33', text: 'text-white', accent: '#ece5db', icon: Crown },
                'Manyavar':      { bg: '#7e7a77', text: 'text-white', accent: '#c18f72', icon: Gem },
                'W for Women':   { bg: '#1e3538', text: 'text-white', accent: '#5a2d33', icon: Heart },
              };
              const colors = brandColors[brand.name] || { bg: '#1e3538', text: 'text-white', accent: '#fff' };

              
              return (
              <Link 
                key={brand.name} 
                to={`/shop?brand=${brand.name}`}
                className={`h-40 flex flex-col items-center justify-center p-6 group transition-all duration-700 hover:-translate-y-2 relative overflow-hidden shadow-sm hover:shadow-2xl`}
                style={{ backgroundColor: colors.bg }}
              >
                {/* Minimalist Texture overlay */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
                  style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}
                ></div>

                <div className="relative z-20 mb-4 w-12 h-12 flex items-center justify-center border border-white/20 group-hover:bg-white/10 transition-all duration-500">
                  {colors.icon && <colors.icon size={24} className={colors.text} />}
                </div>

                <span className={`relative z-20 text-sm font-playfair font-black ${colors.text} tracking-[0.2em] text-center`}>
                  {brand.name.toUpperCase()}
                </span>
                <span className={`relative z-20 text-[10px] font-inter font-bold mt-2 uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-all duration-500 ${colors.text}`}>
                  {brand.category}
                </span>
              </Link>
              );

            })}
          </div>
          
          <div className="mt-12 text-center">
             <Link to="/shop" className="text-sm font-bold border-b-2 border-accent-neon pb-1 hover:text-accent-neon transition-all dark:text-white">
                View All Featured Brands
             </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-[#0a0a0a] px-4 overflow-hidden">

        <div className="container mx-auto">
          <div className="text-center mb-16">
             <span className="text-[#D4AF37]/50 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Handpicked For You</span>
             <h2 className="text-4xl md:text-5xl font-playfair font-black text-[#D4AF37]">TRENDING NOW</h2>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link to="/shop" className="px-10 py-4 border-2 border-zinc-900 dark:border-white font-black hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all rounded-full flex items-center gap-2">
              Explore All Products
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 px-4 bg-black">

        <div className="container mx-auto">
          <div className="relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2670&auto=format&fit=crop" 
              className="w-full h-full object-cover" 
              alt="Promo Banner"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#a134ff]/95 via-[#ff2a85]/80 to-[#00f0ff]/40 flex items-center p-12 md:p-24">
              <div className="max-w-md text-white drop-shadow-lg">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-4 text-[#00f0ff]">Summer Drop</h3>
                <h4 className="text-4xl md:text-6xl font-black mb-8 leading-tight">GET UP TO <br /><span className="text-[#07070a] bg-[#00f0ff] px-2 rounded-lg">50% OFF</span> ALL PREMIUM WEAR</h4>
                <Link to="/shop?brand=Colesth" className="bg-[#07070a] text-white px-8 py-4 rounded-full font-bold hover:scale-105 hover:bg-white hover:text-black transition-all inline-block shadow-2xl">
                  Shop Colesth Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-[#0a0a0a]">

        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
            <span className="text-[#D4AF37]/50 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Reviews</span>
            <h2 className="text-4xl font-playfair font-black mb-8 text-[#D4AF37] leading-tight">WHAT OUR <br />FAM SAYS</h2>

              <div className="flex items-center gap-2 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">Over 50,000 satisfied style enthusiasts worldwide.</p>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  name: "Rahul Sharma", 
                  role: "Model", 
                  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
                  text: "The quality of the oversized hoodies is insane. I've bought from Zara and H&M but GK Fashion World is on another level in terms of fabric feel." 
                },
                { 
                  name: "Ananya Iyer", 
                  role: "Stylist", 
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
                  text: "Finally a brand that understands the balance between modern aesthetics and comfort. The silk sarees are breathtakingly beautiful!" 
                }
              ].map((t, i) => (
                <div key={i} className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl relative group transition-all hover:shadow-xl dark:hover:shadow-accent-neon/5">
                  <Quote className="text-accent-neon/20 absolute top-8 right-8" size={60} />
                  <p className="text-zinc-600 dark:text-zinc-300 relative z-10 mb-8 font-medium leading-relaxed italic">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-accent-neon p-0.5 shadow-lg shadow-accent-neon/10">
                      <img src={t.image} className="w-full h-full object-cover rounded-full" alt={t.name} />
                    </div>
                    <div>
                      <h4 className="font-bold dark:text-white">{t.name}</h4>
                      <p className="text-xs text-zinc-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Style */}
      <section className="py-16 px-4 bg-black overflow-hidden">

        <div className="container mx-auto mb-12 flex flex-col items-center">
          <h2 className="text-2xl font-black mb-2 dark:text-white">FOLLOW @GKFASHIONWORLD</h2>
          <p className="text-zinc-500 text-sm">Tag us to get featured in our daily fashion feed</p>
        </div>
        <div className="flex gap-4 animate-scroll-x">
          {[
            "1523398002811-999ca8dec234",
            "1490481651871-ab68de25d43d",
            "1556821840-3a63f95609a7",
            "1576566588028-4147f3842f27",
            "1515886657613-9f3515b0c78f",
            "1469334031218-e382a71b716b",
            "1496747611176-843222e1e57c",
            "1583391733956-3750e0ff4e8b"
          ].map((id, i) => (
            <div key={i} className="min-w-[250px] md:min-w-[350px] aspect-square rounded-2xl overflow-hidden relative group">
              <img src={`https://images.unsplash.com/photo-${id}?q=80&w=800&auto=format&fit=crop`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Instagram" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold flex items-center gap-1"><Star size={16} /> Shop Look</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
