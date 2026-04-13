import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';

const Login = () => {
  const { login } = useShop();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login({ name: 'Demo User', email: email });
      navigate('/');
    }, 1500);
  };

  return (
    <div 
      className="pt-32 pb-20 px-4 min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0008 0%, #2a000e 50%, #120008 100%)' }}
    >
      {/* Background glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(196,0,106,0.12), transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(89,0,84,0.15), transparent 70%)', filter: 'blur(50px)' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
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
          className="p-8 md:p-12 rounded-[3rem]"
          style={{ 
            background: 'rgba(42,0,14,0.7)',
            border: '1px solid rgba(114,1,55,0.35)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 60px rgba(196,0,106,0.1), 0 30px 60px rgba(0,0,0,0.4)'
          }}
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2" style={{ color: '#f5d0dc' }}>
              WELCOME BACK
            </h1>
            <p style={{ color: '#9b5c70' }} className="font-medium">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest px-1" style={{ color: '#9b5c70' }}>
                Email Address
              </label>
              <div className="relative group">
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-4 pl-12 rounded-2xl outline-none transition-all"
                  style={{ 
                    background: 'rgba(26,0,8,0.6)',
                    border: '1px solid rgba(94,0,9,0.5)',
                    color: '#f5d0dc'
                  }}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" 
                  style={{ color: '#9b5c70' }} size={20} />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black uppercase tracking-widest" style={{ color: '#9b5c70' }}>
                  Password
                </label>
                <button type="button" className="text-[10px] font-black uppercase tracking-widest hover:underline"
                  style={{ color: '#c4006a' }}>
                  Forgot Password?
                </button>
              </div>
              <div className="relative group">
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-4 pl-12 rounded-2xl outline-none transition-all"
                  style={{ 
                    background: 'rgba(26,0,8,0.6)',
                    border: '1px solid rgba(94,0,9,0.5)',
                    color: '#f5d0dc'
                  }}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" 
                  style={{ color: '#9b5c70' }} size={20} />
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
            </div>

            <div className="flex items-center gap-2 px-1">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 rounded"
                style={{ accentColor: '#c4006a' }}
              />
              <label htmlFor="remember" className="text-xs font-bold uppercase cursor-pointer" style={{ color: '#9b5c70' }}>
                Remember me for 30 days
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
              {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-medium" style={{ color: '#9b5c70' }}>
              Don't have an account?{' '}
              <Link to="/signup" 
                className="font-black hover:underline ml-1" 
                style={{ color: '#c4006a' }}
              >
                SIGN UP
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
