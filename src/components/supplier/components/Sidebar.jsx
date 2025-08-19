import React, { useState, useMemo, useEffect } from "react";
import { Home, Box, ClipboardList, Truck, CreditCard, History, MessageCircle, Shield, User, UserCircle, LogOut, ChevronDown } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { logout } from "../../../services/authService";
import Cookies from "js-cookie";
const navItems = [
  { id: 'overview', label: "Overview", icon: Home, path: "" },
  { id: 'catalog', label: "Product Catalog", icon: Box, path: "product-catalog" },
  { id: 'orders', label: "Incoming Orders", icon: ClipboardList, path: "incoming-orders" },
  { id: 'delivery', label: "Delivery Management", icon: Truck, path: "delivery-management" },
  { id: 'funds', label: "Payment & Fund Tracker", icon: CreditCard, path: "fund-tracker" },
  { id: 'history', label: "Delivery History", icon: History, path: "delivery-history" },
  { id: 'messaging', label: "Messaging", icon: MessageCircle, path: "messaging" },
];

export default function Sidebar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [data,setData] = useState(null) 
    // console.log("data:",(data));
    useEffect(() => {
      setData(JSON.parse(Cookies.get("userData")))
    }, []);
  

  // Get the base path (e.g., /dashboard/supplier)
  const basePath = location.pathname.split('/').slice(0, 3).join('/');
  // Get the current path segment after the base path
  const currentPath = location.pathname.replace(new RegExp(`^${basePath}/?`), '');
  // Get the first segment of the current path
  const subPath = currentPath.split('/')[0] || '';

  return (
    <div className="w-72 bg-slate-800/60 backdrop-blur-xl border-r border-slate-700/50 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-yellow-500/5"></div>

      {/* Logo */}
      <div className="flex items-center gap-3 p-6 relative z-10">
        <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-300 rounded-xl flex items-center justify-center">
          <Shield className="w-6 h-6 text-slate-900" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">
          SecurePortal
        </h1>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-4 relative z-10 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          // For overview, match empty path or root
          const isActive = (item.path === "" && (subPath === "" || subPath === "supplier")) || 
                         subPath === item.path;
          
          return (
            <Link
              key={item.id}
              to={`${basePath}/${item.path}`}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
              onClick={(e) => {
                // Only prevent default if we're already on the target path
                if (isActive) {
                  e.preventDefault();
                }
              }}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <span>{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-6 left-4 right-4 bg-slate-700/50 rounded-xl p-4 backdrop-blur-sm  z-10">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setIsProfileOpen((v) => !v)}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-slate-900" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{data?.username}</p>
            <p className="text-xs text-slate-400">{data?.email}</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
        </div>
        {isProfileOpen && (
          <div className="mt-3 bg-slate-600/50 rounded-lg p-2 flex flex-col gap-3">
            <button 
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-500/50 rounded-md transition-colors"
              onClick={() => { 
                setIsProfileOpen(false); 
                navigate(`${basePath}/profile`); 
              }}
            >
              <UserCircle className="w-4 h-4" />
              Profile
            </button>
             <Link >
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-red-400/40 text-red-400/90 hover:bg-slate-500/50 rounded-md transition-colors"
                        onClick={logout}
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
              </Link>
          </div>
        )}
      </div>
    </div>
  );
}