import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  Send, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer 
      className="pt-20 pb-10 border-t transition-colors"
      style={{ 
        background: 'linear-gradient(to bottom, #1a0008, #120005)',
        borderColor: 'rgba(94,0,9,0.4)'
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div>
            <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-1 mb-6">
              <span style={{ color: '#c4006a', filter: 'drop-shadow(0 0 8px rgba(196,0,106,0.6))' }}>GK</span>
              <span style={{ color: '#f5d0dc' }}>FASHION</span>
              <span style={{ color: '#9b5c70' }} className="font-light">WORLD</span>
            </Link>
            <p className="mb-8 leading-relaxed max-w-sm" style={{ color: '#9b5c70' }}>
              Empowering your personal style through curated high-end fashion. We blend modern street aesthetics with timeless elegance.
            </p>
            <div className="flex items-center gap-4">
              {[Camera, Send, Globe].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ 
                    background: 'rgba(114,1,55,0.2)',
                    border: '1px solid rgba(114,1,55,0.4)',
                    color: '#9b5c70'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#c4006a'; e.currentTarget.style.borderColor = 'rgba(196,0,106,0.5)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(196,0,106,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#9b5c70'; e.currentTarget.style.borderColor = 'rgba(114,1,55,0.4)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6" style={{ color: '#f5d0dc' }}>Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Shop All', 'Collections', 'About GK', 'Sustainability'].map(item => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : '/shop'} 
                    className="transition-colors inline-block"
                    style={{ color: '#9b5c70' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c4006a'}
                    onMouseLeave={e => e.currentTarget.style.color = '#9b5c70'}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="font-bold mb-6" style={{ color: '#f5d0dc' }}>Help & Support</h4>
            <ul className="space-y-4">
              {['Contact Us', 'Shipping Policy', 'Returns & Exchanges', 'Privacy Policy', 'FAQs'].map(item => (
                <li key={item}>
                  <Link 
                    to={item === 'Contact Us' ? '/contact' : '#'} 
                    className="transition-colors inline-block"
                    style={{ color: '#9b5c70' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c4006a'}
                    onMouseLeave={e => e.currentTarget.style.color = '#9b5c70'}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-6" style={{ color: '#f5d0dc' }}>Newsletter</h4>
            <p className="mb-6 text-sm" style={{ color: '#9b5c70' }}>
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            {subscribed ? (
              <div 
                className="flex items-center gap-2 font-bold text-sm p-4 rounded-xl"
                style={{ 
                  color: '#c4006a',
                  background: 'rgba(196,0,106,0.1)',
                  border: '1px solid rgba(196,0,106,0.25)'
                }}
              >
                <CheckCircle2 size={18} />
                THANKS FOR SUBSCRIBING!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative group">
                <input 
                  required
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full py-3 px-4 pr-12 rounded-lg outline-none transition-colors"
                  style={{ 
                    background: 'rgba(50,0,18,0.6)',
                    border: '1px solid rgba(114,1,55,0.4)',
                    color: '#f5d0dc'
                  }}
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1.5 p-2 rounded-md hover:scale-105 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #c4006a, #720137)', color: '#fff' }}
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div 
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6"
          style={{ borderColor: 'rgba(94,0,9,0.4)' }}
        >
          <p className="text-sm" style={{ color: '#9b5c70' }}>
            © {new Date().getFullYear()} GK FASHION WORLD. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 text-sm" style={{ color: '#9b5c70' }}>
              <MapPin size={14} style={{ color: '#c4006a' }} />
              Gurgaon, India
            </span>
            <span className="flex items-center gap-2 text-sm" style={{ color: '#9b5c70' }}>
              <Phone size={14} style={{ color: '#c4006a' }} />
              +91 98765 43210
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
