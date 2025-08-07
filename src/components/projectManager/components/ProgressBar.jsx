import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ value, max, label, tooltip }) {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-slate-300">{label}</span>
        <span className="text-xs text-slate-400">{percent}% ({value.toLocaleString()} / {max.toLocaleString()})</span>
      </div>
      <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden group" title={tooltip}>
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-emerald-500 shadow-lg"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ borderRadius: 999 }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xs text-slate-200 font-semibold drop-shadow-sm">
            {tooltip && (
              <span className="hidden group-hover:inline bg-slate-900/90 px-2 py-1 rounded shadow text-xs absolute top-[-2.2rem] left-1/2 -translate-x-1/2 whitespace-nowrap z-10">{tooltip}</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
} 