import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Camera, Globe, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Network error. Please make sure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-28 pb-20 px-4 md:px-6 min-h-screen transition-colors" style={{ background: 'linear-gradient(135deg, #1a0008 0%, #2a000e 50%, #120008 100%)' }}>
      <div className="container mx-auto">
        <div className="text-center mb-20">
           <span className="text-xs font-black uppercase tracking-[0.3em] mb-4 block" style={{ color: '#9b5c70' }}>Get In Touch</span>
           <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter leading-none" style={{ background: 'linear-gradient(135deg, #c4006a, #590054)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>WE'D LOVE TO <br />HEAR FROM YOU</h1>
           <p className="font-medium max-w-xl mx-auto" style={{ color: '#9b5c70' }}>Have a question about your order, our collections, or just want to say hi? Our team is always here to help.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-8">
              {[
                { icon: Mail, label: "Email Us", val: "support@gkfashion.com" },
                { icon: Phone, label: "Call Us", val: "+91 98765 43210" },
                { icon: MapPin, label: "Visit Our Studio", val: "Jodhpur, Rajasthan, IN" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110" style={{ background: 'rgba(114,1,55,0.2)', border: '1px solid rgba(114,1,55,0.4)', color: '#9b5c70' }} onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #c4006a, #720137)'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(114,1,55,0.2)'; e.currentTarget.style.color = '#9b5c70'; }}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: '#9b5c70' }}>{item.label}</h4>
                    <p className="text-lg font-black" style={{ color: '#f5d0dc' }}>{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-12" style={{ borderTop: '1px solid rgba(94,0,9,0.4)' }}>
               <h4 className="text-xs font-black uppercase tracking-widest mb-6" style={{ color: '#9b5c70' }}>Social Connect</h4>
               <div className="flex gap-4">
                  {[Camera, Send, Globe].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:-translate-y-1"
                      style={{ background: 'rgba(114,1,55,0.2)', border: '1px solid rgba(114,1,55,0.4)', color: '#9b5c70' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #c4006a, #720137)'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(114,1,55,0.2)'; e.currentTarget.style.color = '#9b5c70'; }}
                    >
                      <Icon size={20} />
                    </a>
                  ))}
               </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-[2rem] overflow-hidden grayscale contrast-125 dark:invert h-64 shadow-2xl">
               <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Map" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
             <div className="p-8 md:p-12 rounded-[3rem] relative overflow-hidden" style={{ background: 'rgba(42,0,14,0.6)', border: '1px solid rgba(114,1,55,0.3)', backdropFilter: 'blur(20px)', boxShadow: '0 0 50px rgba(196,0,106,0.08)' }}>
                {isSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 z-10 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center p-12 text-center"
                  >
                    <CheckCircle2 size={64} className="text-green-500 mb-6" />
                    <h3 className="text-3xl font-black dark:text-white mb-4">MESSAGE SENT!</h3>
                    <p className="text-zinc-500 mb-8 font-medium">Thank you for reaching out. A style consultant will get back to you within 24 hours.</p>
                    <button onClick={() => setIsSubmitted(false)} className="px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black font-black rounded-xl">SEND ANOTHER</button>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest px-1" style={{ color: '#9b5c70' }}>Full Name</label>
                      <input 
                        required name="name" value={formData.name} onChange={handleInputChange}
                        placeholder="John Doe" type="text" 
                        className="w-full p-4 rounded-2xl outline-none transition-all"
                        style={{ background: 'rgba(26,0,8,0.6)', border: '1px solid rgba(94,0,9,0.5)', color: '#f5d0dc' }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest px-1" style={{ color: '#9b5c70' }}>Email Address</label>
                      <input 
                        required name="email" value={formData.email} onChange={handleInputChange}
                        placeholder="john@example.com" type="email" 
                        className="w-full p-4 rounded-2xl outline-none transition-all"
                        style={{ background: 'rgba(26,0,8,0.6)', border: '1px solid rgba(94,0,9,0.5)', color: '#f5d0dc' }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest px-1">Subject</label>
                    <input 
                      required 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Order Inquiry / Collaboration" 
                      type="text" 
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl outline-none focus:border-accent-neon dark:text-white transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest px-1">Your Message</label>
                    <textarea 
                      required 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us what's on your mind..." 
                      rows="6" 
                      className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl outline-none focus:border-accent-neon dark:text-white transition-all resize-none"
                    ></textarea>
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full h-16 font-black tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: 'linear-gradient(135deg, #c4006a, #720137)', color: '#fff', boxShadow: '0 0 25px rgba(196,0,106,0.35)' }}>
                    {isLoading ? (
                      <>
                        SENDING...
                        <Loader2 size={20} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        SEND MESSAGE
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </form>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
