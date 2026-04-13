import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors">
      <AdminSidebar />
      <main className="flex-grow ml-64 p-12">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
