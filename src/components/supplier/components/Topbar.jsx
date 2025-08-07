import React, { useState, useRef, useEffect } from "react";
import { Bell, Search } from "lucide-react";

// Accept className as a prop
export default function Topbar({ onProfile, onSettings, onLogout, className = "" }) {
  return (
    <header className={`bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">Overview</h2>
          <p className="text-slate-400 mt-1">
            Summary of orders, deliveries, payments and communication
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search orders, products..."
              className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            />
          </div>
          <button className="relative p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
            <Bell className="w-5 h-5 text-slate-300" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
}