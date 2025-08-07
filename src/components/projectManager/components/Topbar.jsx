import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, User, Settings, LogOut, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import NotificationsPanel from "./dashboard/NotificationsPanel";
import { useNavigate } from 'react-router-dom';

export default function Topbar({ onProfile, onSettings, onLogout, className = "" }) {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  };

  const handleProfile = () => {
    setDropdown(false);
    navigate('/profile');
  };

  const handleSettings = () => {
    setDropdown(false);
    navigate('/settings');
  };

  return (
    <header className={`flex items-center justify-between px-8 py-4 bg-gradient-to-r from-[#16204d] to-[#15192c] border-b border-slate-800 shadow-md dark:bg-govt-dark dark:border-govt-dark/80 rounded-b-2xl flex-shrink-0 ${className}`}>
      <div className="flex-1">
        <div className="relative w-80">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </span>
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#23294a] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-full hover:bg-accent/10 transition shadow-card">
          <Bell className="text-primary" size={22} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full border-2 border-card" />
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdown((v) => !v)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 hover:shadow-card focus:outline-none focus:ring-2 focus:ring-accent/20 transition"
          >
            <User className="text-primary" size={22} />
            <span className="font-semibold text-text">Project Manager</span>
            <ChevronDown className="ml-1" size={16} />
          </button>
          {dropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-50">
              <button
                onClick={handleProfile}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-primary hover:bg-accent/10 rounded-t-xl"
              >
                <User size={16} /> Profile
              </button>
              <button
                onClick={handleSettings}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-primary hover:bg-accent/10"
              >
                <Settings size={16} /> Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-error hover:bg-error/10 rounded-b-xl"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
