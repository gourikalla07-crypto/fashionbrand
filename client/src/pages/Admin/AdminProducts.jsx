import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, Eye } from 'lucide-react';

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black dark:text-white uppercase tracking-tighter">PRODUCT CATALOG</h1>
          <p className="text-zinc-500 font-medium mt-1">Manage your inventory, prices, and product details.</p>
        </div>
        <Link to="/admin/products/add" className="flex items-center gap-2 px-8 py-4 bg-accent-neon text-black font-black text-sm rounded-xl uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-accent-neon/20">
          <Plus size={20} />
          Add New Product
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
        {/* Filters & Search */}
        <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row gap-4">
           <div className="relative flex-grow">
             <input 
              type="text" 
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 p-4 pl-12 rounded-2xl outline-none focus:border-accent-neon dark:text-white transition-all"
             />
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
           </div>
           <button className="flex items-center gap-2 px-6 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all">
             <Filter size={18} />
             Filters
           </button>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/20">
                <th className="p-8 text-xs font-black text-zinc-400 uppercase tracking-widest">Product</th>
                <th className="p-8 text-xs font-black text-zinc-400 uppercase tracking-widest">Category</th>
                <th className="p-8 text-xs font-black text-zinc-400 uppercase tracking-widest">Price</th>
                <th className="p-8 text-xs font-black text-zinc-400 uppercase tracking-widest">Stock</th>
                <th className="p-8 text-xs font-black text-zinc-400 uppercase tracking-widest">Rating</th>
                <th className="p-8 text-xs font-black text-zinc-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                  <td className="p-8 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                       <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                          <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
                       </div>
                       <div>
                          <p className="font-black dark:text-white text-sm line-clamp-1 max-w-[200px]">{p.name}</p>
                          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">ID: GK-PROD-{p.id}</p>
                       </div>
                    </div>
                  </td>
                  <td className="p-8">
                    <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-8 font-black dark:text-white">₹{p.price}</td>
                  <td className="p-8">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-bold dark:text-white">Active</span>
                     </div>
                  </td>
                  <td className="p-8">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-black dark:text-white">{p.rating}</span>
                      <p className="text-[10px] text-zinc-400">({p.reviews})</p>
                    </div>
                  </td>
                  <td className="p-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-accent-neon rounded-xl transition-all">
                          <Edit2 size={16} />
                       </button>
                       <button className="p-3 bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all">
                          <Trash2 size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
