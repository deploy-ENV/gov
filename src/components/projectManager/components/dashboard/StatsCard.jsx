import React from "react";
import { motion } from "framer-motion";

function StatsCard({ card, index }) {
  // Semantic badge color by card index
  let badgeClass = "";
  if (index === 0) badgeClass = "bg-blue-600/20 text-blue-400";
  else if (index === 1) badgeClass = "bg-emerald-600/20 text-emerald-400";
  else if (index === 2) badgeClass = "bg-indigo-600/20 text-indigo-400";
  else if (index === 3) badgeClass = "bg-amber-600/20 text-amber-400";

  const IconComponent = card.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.10)" }}
      className="relative rounded-xl bg-[#182033] shadow-md border border-slate-700 p-6 flex flex-col gap-2 transition-all min-h-[140px]"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#232b3b]">
          <IconComponent className="w-7 h-7 text-slate-300" />
        </div>
        <div className="flex-1">
          <div className="text-2xl font-bold text-white">{card.value}</div>
          <div className="text-gray-200 font-medium text-sm mt-1">{card.label}</div>
        </div>
        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium shadow-sm hover:brightness-110 transition ${badgeClass}`}>
          {card.badge}
        </span>
      </div>
    </motion.div>
  );
}

export default StatsCard; 