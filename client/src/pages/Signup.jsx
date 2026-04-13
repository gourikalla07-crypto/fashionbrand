import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';

const Signup = () => {
  const { login } = useShop();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', terms: false });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.terms) return alert("Please accept the terms and conditions");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login({ name: formData.name, email: formData.email });
      navigate('/');
    }, 1500);
  };

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const fieldStyle = {
    background: 'rgba(26,0,8,0.6)',
    border: '1px solid rgba(94,0,9,0.5)',
    color: '#f5d0dc'
  };

  return (
    <div 
      className="pt-32 pb-20 px-4 min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0008 0%, #2a000e 50%, #120008 100%)' }}
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,0,106,0.1), transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(89,0,84,0.12), transparent 70%)', filter: 'blur(50px)' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold tracking-tighter inline-flex items-center gap-1">
            <span style={{ color: '#c4006a', filter: 'drop-shadow(0 0 10px rgba(196,0,106,0.7))' }}>GK</span>
            <span style={{ color: '#f5d0dc' }}>FASHION</span>
            <span style={{ color: '#9b5c70' }} className="font-light">WORLD</span>
          </Link>
        </div>

        <div 
          className="p-8 md:p-12 rounded-[3.5rem]"
          style={{ 
            background: 'rgba(42,0,14,0.7)',
            border: '1px solid rgba(114,1,55,0.35)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 60px rgba(196,0,106,0.1), 0 30px 60px rgba(0,0,0,0.4)'
          }}
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2" style={{ color: '#f5d0dc' }}>
              CREATE ACCOUNT
            </h1>
            <p style={{ color: '#9b5c70' }} className="font-medium">Join the GK FASHION WORLD community today.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest px-1" style={{ color: '#9b5c70' }}>Full Name</label>
              <div className="relative group">
                <input 
                  required name="name" type="text" 
                  value={formData.name} onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full p-4 pl-12 rounded-2xl outline-none transition-all"
                  style={fieldStyle}
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: '#9b5c70' }} size={20} />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest px-1" style={{ color: '#9b5c70' }}>Email Address</label>
              <div className="relative group">
                <input 
                  required name="email" type="email" 
                  value={formData.email} onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full p-4 pl-12 rounded-2xl outline-none transition-all"
                  style={fieldStyle}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: '#9b5c70' }} size={20} />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest px-1" style={{ color: '#9b5c70' }}>Password</label>
              <div className="relative group">
                <input 
                  required name="password" type={showPassword ? "text" : "password"} 
                  value={formData.password} onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full p-4 pl-12 rounded-2xl outline-none transition-all"
                  style={fieldStyle}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: '#9b5c70' }} size={20} />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: '#9b5c70' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#f5d0dc'}
                  onMouseLeave={e => e.currentTarget.style.color = '#9b5c70'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-[10px] px-1 font-bold" style={{ color: 'rgba(155,92,112,0.6)' }}>
                MUST BE AT LEAST 8 CHARACTERS WITH SYMBOLS
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 px-1">
              <input 
                required name="terms" checked={formData.terms} onChange={handleInputChange}
                type="checkbox" id="terms" 
                className="mt-1 w-4 h-4 rounded"
                style={{ accentColor: '#c4006a' }}
              />
              <label htmlFor="terms" className="text-xs font-bold uppercase cursor-pointer leading-relaxed" style={{ color: '#9b5c70' }}>
                I agree to the{' '}
                <Link to="/terms" style={{ color: '#f5d0dc' }} className="underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" style={{ color: '#f5d0dc' }} className="underline">Privacy Policy</Link>
              </label>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full h-16 font-black tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ 
                background: isLoading 
                  ? 'rgba(196,0,106,0.5)' 
                  : 'linear-gradient(135deg, #c4006a, #720137)',
                color: '#fff',
                boxShadow: '0 0 30px rgba(196,0,106,0.35)'
              }}
            >
              {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-medium" style={{ color: '#9b5c70' }}>
              Already have an account?{' '}
              <Link to="/login" className="font-black hover:underline ml-1" style={{ color: '#c4006a' }}>
                SIGN IN
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
