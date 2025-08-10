import React from "react";
import { 
  Truck, 
  FileText, 
  CreditCard, 
  Package, 
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Active Deliveries",
    value: 0,
    icon: Truck,
    color: "from-blue-500 to-blue-600",
    badge: "+2 today",
    trend: "up"
  },
  {
    label: "Pending Invoices",
    value: 0,
    icon: FileText,
    color: "from-amber-500 to-amber-600",
    badge: "Due soon",
    trend: "down"
  },
  {
    label: "Payments Received",
    value: 0+'',
    icon: CreditCard,
    color: "from-emerald-500 to-emerald-600",
    badge: "+₹25K",
    trend: "up"
  },
  {
    label: "Total Delivered",
    value: 0,
    icon: Package,
    color: "from-purple-500 to-purple-600",
    badge: "This month",
    trend: "up"
  }
];

function SparklineGraph({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-16 h-8">
      <svg width="64" height="32" viewBox="0 0 64 32" className="w-full h-full">
        <polyline
          fill="none"
          stroke={`url(#${color})`}
          strokeWidth="2"
          points={points}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id={color} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function StatCard({ stat, index }) {
  const IconComponent = stat.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-slate-600 transition-all hover:shadow-lg"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
          <IconComponent className="w-5 h-5 text-white" />
        </div>
        <SparklineGraph 
          data={[12, 19, 15, 25, 22, 30, 28]} 
          color={`gradient-${index}`}
        />
      </div>
      
      <div className="mb-2">
        <div className="text-2xl font-bold text-white">{stat.value}</div>
        <div className="text-sm text-gray-400">{stat.label}</div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded-full ${
          stat.trend === 'up' 
            ? 'bg-emerald-500/20 text-emerald-400' 
            : 'bg-amber-500/20 text-amber-400'
        }`}>
          {stat.badge}
        </span>
        <TrendingUp className={`w-3 h-3 ${
          stat.trend === 'up' ? 'text-emerald-400' : 'text-amber-400'
        }`} />
      </div>
    </motion.div>
  );
}

export default function SmartOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </div>
  );
} 