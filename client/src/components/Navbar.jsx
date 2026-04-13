import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  User,
  ShoppingBag as BagIcon
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, wishlist, isDarkMode, toggleTheme, user, logout } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Footwear', path: '/shop?category=Footwear' },
    { name: 'Summer', path: '/shop?category=Summer' },
    { name: 'Ethnic', path: '/shop?category=Ethnic+Wear' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#D4AF37] py-3 shadow-2xl border-b border-[#A67C00]' 
          : 'bg-black/20 backdrop-blur-md py-5'
      }`}>

        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            className={`lg:hidden p-2 ${scrolled ? 'text-black' : 'text-[#D4AF37]'}`}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button>


          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 group">
            <span className={`text-2xl md:text-3xl font-playfair font-black tracking-tighter ${scrolled ? 'text-black' : 'text-[#D4AF37]'} group-hover:scale-110 transition-transform`}>GK</span>
            <span className={`text-xl md:text-2xl font-inter font-bold tracking-[0.2em] ${scrolled ? 'text-black' : 'text-white'}`}>FASHION</span>
            <span className={`hidden md:inline text-xl font-inter font-light tracking-[0.3em] ${scrolled ? 'text-black/60' : 'text-white/60'} ml-2`}>WORLD</span>
          </Link>



          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-300 
                  ${scrolled 
                    ? (isActive ? 'text-black border-b-2 border-black' : 'text-black/70 hover:text-black') 
                    : (isActive ? 'text-[#D4AF37]' : 'text-white/70 hover:text-white')}
                `}
              >
                {link.name}
              </NavLink>
            ))}

          </div>


          {/* Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-black/10' : 'hover:bg-white/10'}`}
            >
              <Search size={20} className={scrolled ? 'text-black' : 'text-white'} />
            </button>
            
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-black/10' : 'hover:bg-white/10'}`}
            >
              {isDarkMode 
                ? <Sun size={20} className={scrolled ? 'text-black' : 'text-white'} /> 
                : <Moon size={20} className={scrolled ? 'text-black' : 'text-white'} />}
            </button>

            {user ? (
              <div className="flex items-center gap-2 group relative">
                <button className={`flex items-center gap-2 p-2 rounded-full md:rounded-lg transition-colors overflow-hidden ${scrolled ? 'hover:bg-black/10' : 'hover:bg-white/10'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${scrolled ? 'bg-black text-[#D4AF37]' : 'bg-[#D4AF37] text-black'}`}>
                    {user.name[0]}
                  </div>
                  <span className={`hidden md:inline text-xs font-black uppercase tracking-widest ${scrolled ? 'text-black' : 'text-white'}`}>{user.name.split(' ')[0]}</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className={`p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-black/10' : 'hover:bg-white/10'}`}
                title="Login"
              >
                <User size={20} className={scrolled ? 'text-black' : 'text-white'} />
              </Link>
            )}

            <Link 
              to="/wishlist" 
              className={`p-2 rounded-full transition-colors relative ${scrolled ? 'hover:bg-black/10' : 'hover:bg-white/10'}`}
            >
              <Heart size={20} className={scrolled ? 'text-black' : 'text-white'} />
              {wishlist.length > 0 && (
                <span className={`absolute top-1 right-1 w-2 h-2 rounded-full ${scrolled ? 'bg-black' : 'bg-[#D4AF37]'}`}></span>
              )}
            </Link>

            <button 
              onClick={() => setIsCartOpen(true)}
              className={`p-2 rounded-full transition-colors relative group ${scrolled ? 'hover:bg-black/10' : 'hover:bg-white/10'}`}
            >
              <ShoppingBag size={22} className={scrolled ? 'text-black' : 'text-white'} />
              {cartCount > 0 && (
                <span className={`absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] px-1 text-[10px] font-bold rounded-full ${scrolled ? 'bg-black text-[#D4AF37]' : 'bg-[#D4AF37] text-white'}`}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/70 z-[60] backdrop-blur-sm lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[80%] max-w-xs bg-[#1a0008] border-r border-[#5e0009]/40 z-[70] shadow-2xl shadow-[#c4006a]/10 lg:hidden p-6"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-xl font-bold text-[#f5d0dc]">Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full hover:bg-[#720137]/20">
                  <X size={24} className="text-[#f5d0dc]" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-[#f5d0dc] hover:text-[#c4006a] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-10 border-t border-[#5e0009]/40 absolute bottom-10 left-6 right-6">
                <div className="flex items-center gap-4 text-[#9b5c70]">
                  <User size={20} />
                  <span className="text-sm">Account</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-[#1a0008]/98 backdrop-blur-xl px-6 py-20 flex flex-col items-center"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#720137]/20"
            >
              <X size={32} className="text-[#f5d0dc]" />
            </button>
            <div className="w-full max-w-3xl">
              <h2 className="text-3xl font-bold mb-8 text-[#f5d0dc] text-center">Search GK FASHION</h2>
              <div className="relative">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search for products, trends, collections..."
                  className="w-full bg-transparent border-b-2 border-[#5e0009] py-4 text-2xl outline-none focus:border-[#c4006a] transition-colors text-[#f5d0dc] placeholder:text-[#9b5c70]"
                  style={{ background: 'transparent !important', borderColor: undefined }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsSearchOpen(false);
                      navigate(`/shop?q=${e.target.value}`);
                    }
                  }}
                />
                <Search size={28} className="absolute right-2 top-4 text-[#9b5c70]" />
              </div>
              <div className="mt-12">
                <p className="text-sm text-[#9b5c70] uppercase tracking-widest mb-4">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Oversized Hoodie', 'Summer Dress', 'Sherwani', 'Sneakers', 'Silk Saree'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigate(`/shop?q=${tag}`);
                      }}
                      className="px-4 py-2 bg-[#320012] border border-[#5e0009]/50 rounded-full text-sm text-[#f5d0dc] hover:bg-[#c4006a] hover:border-[#c4006a] hover:text-white transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation (Sticky) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#1a0008]/95 backdrop-blur-xl border-t border-[#5e0009]/40 py-2 px-6 flex justify-between items-center z-[40]">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#c4006a]' : 'text-[#9b5c70]'}`}>
          <BagIcon size={20} />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>
        <NavLink to="/shop" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#c4006a]' : 'text-[#9b5c70]'}`}>
          <Search size={20} />
          <span className="text-[10px] font-medium">Search</span>
        </NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#c4006a]' : 'text-[#9b5c70]'} relative`}>
          <Heart size={20} />
          <span className="text-[10px] font-medium">Wishlist</span>
          {wishlist.length > 0 && <span className="absolute top-0 right-1 w-1.5 h-1.5 bg-[#c4006a] rounded-full"></span>}
        </NavLink>
        <button 
          onClick={() => setIsCartOpen(true)}
          className={`flex flex-col items-center gap-1 ${isCartOpen ? 'text-[#c4006a]' : 'text-[#9b5c70]'} relative`}
        >
          <ShoppingBag size={20} />
          <span className="text-[10px] font-medium">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-[16px] px-1 bg-[#c4006a] text-white text-[8px] font-bold rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
};

export default Navbar;
