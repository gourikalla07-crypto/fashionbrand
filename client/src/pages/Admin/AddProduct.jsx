import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Upload, 
  X, 
  CheckCircle2, 
  DollarSign,
  Tag, 
  Layers, 
  Plus
} from 'lucide-react';
import { categories } from '../../data/products';
import { motion } from 'framer-motion';

const AddProduct = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Streetwear',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    sizes: [],
    tags: []
  });

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "38", "40", "42", "44", "7", "8", "9", "10"];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleSize = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) 
        ? prev.sizes.filter(s => s !== size) 
        : [...prev.sizes, size]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => navigate('/admin/products'), 2000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <Link to="/admin/products" className="flex items-center gap-2 group">
          <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-full group-hover:bg-accent-neon group-hover:text-white transition-all">
            <ChevronLeft size={20} />
          </div>
          <span className="text-sm font-black dark:text-white uppercase tracking-widest">Back to Catalog</span>
        </Link>
        <h1 className="text-2xl font-black dark:text-white uppercase tracking-tighter">ADD NEW PRODUCT</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Product Name</label>
                <input 
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Urban Black Leather Jacket"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 p-4 rounded-2xl outline-none focus:border-accent-neon dark:text-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Description</label>
                <textarea 
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Describe the material, fit, and style..."
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 p-4 rounded-2xl outline-none focus:border-accent-neon dark:text-white transition-all resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Sale Price (₹)</label>
                    <div className="relative">
                      <input 
                        required
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 p-4 pl-12 rounded-2xl outline-none focus:border-accent-neon dark:text-white transition-all"
                      />
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Compare Price (₹)</label>
                    <div className="relative">
                      <input 
                        name="oldPrice"
                        type="number"
                        value={formData.oldPrice}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 p-4 pl-12 rounded-2xl outline-none focus:border-accent-neon dark:text-white transition-all opacity-60"
                      />
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-6">
              <h3 className="text-sm font-black dark:text-white uppercase tracking-widest">Inventory & Variants</h3>
              <div className="space-y-4">
                 <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">Available Sizes</label>
                 <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => (
                      <button 
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all border-2 ${
                          formData.sizes.includes(size)
                            ? 'bg-accent-neon border-accent-neon text-black'
                            : 'bg-transparent border-zinc-100 dark:border-zinc-800 text-zinc-400 hover:border-zinc-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-8">
           <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-6">
              <h3 className="text-sm font-black dark:text-white uppercase tracking-widest">Product Media</h3>
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-2xl bg-zinc-50 dark:bg-zinc-950 border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center p-6 text-center group hover:border-accent-neon transition-all relative overflow-hidden">
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="text-zinc-400" size={24} />
                      </div>
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-loose">Upload or paste image URL</p>
                    </>
                  )}
                </div>
                <input 
                  required
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 p-4 rounded-xl text-xs outline-none focus:border-accent-neon dark:text-white transition-all"
                />
              </div>
           </div>

           <div className="bg-zinc-950 text-white p-8 rounded-[2.5rem] shadow-2xl space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-accent-neon">Organization</h3>
              
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">Category</label>
                <div className="relative">
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl outline-none focus:border-accent-neon text-sm font-bold appearance-none"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <Layers className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`w-full h-16 rounded-2xl font-black tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 ${
                    isSuccess 
                      ? 'bg-green-500 text-white' 
                      : 'bg-accent-neon text-black hover:opacity-90'
                  }`}
                >
                  {isSubmitting ? (
                    'CREATING...'
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 size={20} />
                      SAVED
                    </>
                  ) : (
                    <>
                      <Plus size={20} />
                      PUBLISH PRODUCT
                    </>
                  )}
                </button>
              </div>
           </div>
        </div>
      </form>

      {/* Success Modal Overlay */}
      {isSuccess && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center px-4"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white dark:bg-zinc-900 p-12 rounded-[3rem] text-center max-w-sm shadow-2xl"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/20">
              <CheckCircle2 size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-black dark:text-white uppercase tracking-tight mb-4">PRODUCT CREATED!</h2>
            <p className="text-zinc-500 font-medium mb-8">"{formData.name}" has been added to your catalog successfully.</p>
            <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
               <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 2 }}
                className="h-full bg-green-500" 
               />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AddProduct;
