import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft,
  Store
} from 'lucide-react';

const AdminSidebar = () => {
  const links = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Products', icon: Package, path: '/admin/products' },
    { name: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
    { name: 'Users', icon: Users, path: '/admin/users' },
  ];

  return (
    <aside className="w-64 h-screen bg-zinc-950 text-white flex flex-col fixed left-0 top-0 z-30 border-r border-zinc-800">
      <div className="p-8 pb-12">
        <Link to="/" className="flex items-center gap-2 mb-10 group">
          <ChevronLeft size={16} className="text-accent-neon group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">Back To Store</span>
        </Link>
        <Link to="/admin" className="text-2xl font-black tracking-tighter flex items-center gap-1">
          <span className="text-accent-neon">GK</span>
          <span>ADMIN</span>
        </Link>
      </div>

      <nav className="flex-grow px-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/admin'}
            className={({ isActive }) => `
              flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all
              ${isActive 
                ? 'bg-accent-neon text-black shadow-lg shadow-accent-neon/20' 
                : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}
            `}
          >
            <link.icon size={18} />
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-8 border-t border-zinc-900">
        <button className="flex items-center gap-3 text-zinc-500 hover:text-red-500 font-bold uppercase text-xs tracking-widest transition-colors w-full px-4 py-2">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
