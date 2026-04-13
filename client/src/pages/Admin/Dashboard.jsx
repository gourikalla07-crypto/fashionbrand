import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Package
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, change, icon: Icon, isUp }) => (
  <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-accent-neon">
        <Icon size={24} />
      </div>
      {change && (
        <span className={`flex items-center gap-1 text-xs font-black ${isUp ? 'text-green-500' : 'text-red-500'}`}>
          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}%
        </span>
      )}
    </div>
    <h3 className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-1">{title}</h3>
    <p className="text-3xl font-black dark:text-white">{value}</p>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black dark:text-white uppercase tracking-tighter">DASHBOARD OVERVIEW</h1>
          <p className="text-zinc-500 font-medium mt-1">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-3 bg-zinc-900 dark:bg-accent-neon text-white dark:text-black font-black text-xs rounded-xl uppercase tracking-widest hover:scale-105 transition-all">Download Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$24.5k" change="12" isUp={true} icon={DollarSign} />
        <StatCard title="Total Orders" value="456" change="8" isUp={true} icon={ShoppingBag} />
        <StatCard title="New Customers" value="89" change="4" isUp={false} icon={Users} />
        <StatCard title="Total Products" value="11" change="0" isUp={true} icon={Package} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-black dark:text-white uppercase tracking-tight">Recent Orders</h2>
            <button className="text-accent-neon font-bold text-xs uppercase tracking-widest">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  <th className="pb-6 text-xs font-black text-zinc-400 uppercase tracking-widest">Order ID</th>
                  <th className="pb-6 text-xs font-black text-zinc-400 uppercase tracking-widest">Customer</th>
                  <th className="pb-6 text-xs font-black text-zinc-400 uppercase tracking-widest">Status</th>
                  <th className="pb-6 text-xs font-black text-zinc-400 uppercase tracking-widest">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
                {[
                  { id: 'GK-923', name: 'Rahul S.', status: 'Delivered', color: 'text-green-500', amount: '$129.00' },
                  { id: 'GK-922', name: 'Ananya I.', status: 'Processing', color: 'text-accent-neon', amount: '$45.00' },
                  { id: 'GK-921', name: 'Aryan K.', status: 'Shipped', color: 'text-blue-500', amount: '$249.00' },
                  { id: 'GK-920', name: 'Priya M.', status: 'Cancelled', color: 'text-red-500', amount: '$89.00' },
                ].map((order, i) => (
                  <tr key={i} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="py-6 text-sm font-black dark:text-white">{order.id}</td>
                    <td className="py-6 text-sm font-bold text-zinc-600 dark:text-zinc-400">{order.name}</td>
                    <td className={`py-6 text-[10px] font-black uppercase tracking-widest ${order.color}`}>
                       <span className={`px-3 py-1 bg-current opacity-20 rounded-full mr-2`}></span>
                       {order.status}
                    </td>
                    <td className="py-6 text-sm font-black dark:text-white">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-zinc-950 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-accent-neon/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
           <h2 className="text-xl font-black mb-10 uppercase tracking-tight">Store Activity</h2>
           <div className="space-y-10">
              {[
                { time: '2m ago', text: 'New order received #GK-923', icon: Package },
                { time: '15m ago', text: 'New user registration: Simran J.', icon: Users },
                { time: '1h ago', text: 'Inventory low: Obsidian Cargo Pants', icon: Clock },
                { time: '3h ago', text: 'Sale campaign "SUMMER50" activated', icon: TrendingUp },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start relative pb-10 last:pb-0">
                  {i !== 3 && <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-zinc-800"></div>}
                  <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center relative z-10 text-accent-neon">
                    <item.icon size={12} />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">{item.text}</p>
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{item.time}</span>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
