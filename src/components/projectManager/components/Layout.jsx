import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-text font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
