import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Wand2 } from 'lucide-react';

const AIStylistWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hey there! I am your GK AI Stylist. Looking for some fashion advice or help with an outfit today?' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newMessages = [...messages, { role: 'user', text: inputText }];
    setMessages(newMessages);
    setInputText('');
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "That sounds like a great choice! For that vibe, I recommend pairing our Midnight Hoodie with the Tactical Cargo pants. Would you like me to show you some matching accessories?" 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] max-w-[calc(100vw-2rem)] rounded-[2rem] overflow-hidden flex flex-col"
            style={{ 
              background: 'linear-gradient(160deg, #1a0008, #2a000e)',
              border: '1px solid rgba(196,0,106,0.25)',
              boxShadow: '0 0 50px rgba(196,0,106,0.2), 0 20px 60px rgba(0,0,0,0.6)'
            }}
          >
            {/* Header */}
            <div 
              className="p-6 flex items-center justify-between"
              style={{ 
                background: 'linear-gradient(135deg, rgba(114,1,55,0.4), rgba(89,0,84,0.3))',
                borderBottom: '1px solid rgba(196,0,106,0.2)'
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, #c4006a, #720137)',
                    boxShadow: '0 0 15px rgba(196,0,106,0.5)'
                  }}
                >
                  <Wand2 size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-widest" style={{ color: '#f5d0dc' }}>AI Stylist</h4>
                  <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: '#c4006a' }}>Vibe Consultant Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="transition-colors"
                style={{ color: 'rgba(155,92,112,0.7)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#f5d0dc'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(155,92,112,0.7)'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-grow p-6 h-[320px] overflow-y-auto flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className="max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed"
                    style={msg.role === 'user' 
                      ? { 
                          background: 'linear-gradient(135deg, #c4006a, #720137)',
                          color: '#fff',
                          borderTopRightRadius: '4px',
                          boxShadow: '0 0 15px rgba(196,0,106,0.3)'
                        }
                      : { 
                          background: 'rgba(50,0,18,0.8)',
                          border: '1px solid rgba(94,0,9,0.4)',
                          color: '#f5d0dc',
                          borderTopLeftRadius: '4px'
                        }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSend} 
              className="p-4 flex gap-2"
              style={{ borderTop: '1px solid rgba(94,0,9,0.4)' }}
            >
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask for style advice..."
                className="flex-grow px-4 py-3 rounded-xl text-sm outline-none"
                style={{ 
                  background: 'rgba(50,0,18,0.7)',
                  border: '1px solid rgba(94,0,9,0.4)',
                  color: '#f5d0dc'
                }}
              />
              <button 
                type="submit" 
                className="w-12 h-12 rounded-xl flex items-center justify-center hover:scale-105 transition-all"
                style={{ 
                  background: 'linear-gradient(135deg, #c4006a, #720137)',
                  color: '#fff',
                  boxShadow: '0 0 12px rgba(196,0,106,0.4)'
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all relative group"
        style={{ 
          background: 'linear-gradient(135deg, #c4006a, #720137)',
          boxShadow: '0 0 30px rgba(196,0,106,0.5), 0 8px 25px rgba(0,0,0,0.4)'
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sparkles size={24} className="text-white animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Tooltip */}
        {!isOpen && (
          <div 
            className="absolute right-full mr-4 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ 
              background: 'rgba(42,0,14,0.95)',
              border: '1px solid rgba(196,0,106,0.3)',
              color: '#c4006a',
              boxShadow: '0 0 15px rgba(196,0,106,0.2)'
            }}
          >
            Get Styling Advice
          </div>
        )}
      </button>
    </div>
  );
};

export default AIStylistWidget;
