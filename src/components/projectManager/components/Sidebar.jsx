import React, { useState, useEffect } from "react";
import {
  Home,
  PlusSquare,
  FolderOpen,
  Gavel,
  Users,
  BarChart2,
  FileText,
  MessageCircle,
  FileDown,
  IndianRupee,
  Box,
  Shield,
  User,
  UserCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../../services/authService";
import Cookies from "js-cookie";
const menu = [
  { name: "Dashboard Home", icon: <Home size={20} />, id: "", color: "text-blue-600" },
  { name: "Create Project", icon: <PlusSquare size={20} />, id: "create-project", color: "text-green-600" },
  { name: "All My Projects", icon: <FolderOpen size={20} />, id: "all-projects", color: "text-amber-600" },
  { name: "Fund Requests", icon: <IndianRupee size={20} />, id: "fund-requests", color: "text-cyan-600" },
  { name: "Documents & Blueprints", icon: <FileText size={20} />, id: "documents", color: "text-indigo-600" },
  { name: "Internal Chat", icon: <MessageCircle size={20} />, id: "chat", color: "text-pink-600" },
  { name: "View Bids", icon: <Gavel size={20} />, id: "view-bids", color: "text-red-600" },
  { name: "Assign Supervisor", icon: <Users size={20} />, id: "assign-team", color: "text-teal-600" },
  { name: "Product Catalog", icon: <Box size={20} />, id: "product-catalog", color: "text-orange-600" },
  { name: "Export Reports", icon: <FileDown size={20} />, id: "reports", color: "text-yellow-600" },
];

export default function Sidebar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [data,setData] = useState(null) 
  useEffect(() => {
    setData(JSON.parse(Cookies.get("userData")))
  }, []);
  console.log("data:",(data));
  // Update active tab based on URL
  useEffect(() => {
     
    const currentPath = location.pathname.replace("/dashboard/pm/", "");
    const mainSegment = currentPath.split("/")[0]; // Get only the first segment after /dashboard/pm
    setActiveTab(mainSegment);
  }, [location]);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <aside className="w-72 bg-slate-800/60 backdrop-blur-xl border-r border-slate-700/50 relative">
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
      <nav
        className="mt-4 px-4 relative z-10"
        style={{
          scrollbarColor: "#475569 #1e293b",
          scrollbarWidth: "thin",
        }}
      >
        {menu.map((item) => {
          const isActive = activeTab === item.id || (activeTab === "" && item.id === "");
          return (
            <Link
              key={item.id || "dashboard"}
              to={item.id ? `/dashboard/pm/${item.id}` : "/dashboard/pm"}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300
                ${
                  isActive
                    ? 'bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
            >
              <span
                className={`${
                  isActive ? "opacity-100" : "opacity-70"
                } group-hover:opacity-100 transition-opacity`}
              >
                {React.cloneElement(item.icon, {
                  className: `w-5 h-5 ${isActive ? "text-current" : "text-gray-500"}`,
                })}
              </span>
              <span className="flex-1 break-words whitespace-normal">{item.name}</span>
              {isActive && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full ml-auto"></div>}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-6 left-4 right-4 bg-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3 cursor-pointer" onClick={toggleProfileDropdown}>
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-slate-900" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{data?.username}</p>
            <p className="text-xs text-slate-400">{data?.email}</p>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
              isProfileOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        {isProfileOpen && (
          <div className="mt-3 bg-slate-600/50 rounded-lg p-2 flex flex-col gap-3">
            <button
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-500/50 rounded-md transition-colors"
              onClick={() => setIsProfileOpen(false)}
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

      
    </aside>
  );
}
