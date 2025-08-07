import React from "react";

export default function ProjectOverview() {
  return (
    <div className="rounded-xl bg-[#1A1F36]/80 border border-gray-700 shadow-md p-8 mt-2 backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <div className="text-lg font-bold text-white mb-1">Municipal Infrastructure Upgrade</div>
          <div className="text-sm text-emerald-400 font-semibold">Materials Supplied: Cement, Steel, Bricks</div>
        </div>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <div className="text-gray-300 text-sm">Delivery Completed</div>
          <div className="w-40 bg-gray-800 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-600 h-3 rounded-full" style={{ width: '60%' }} />
          </div>
          <div className="text-white font-bold ml-2">60%</div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2">
        <div className="text-gray-400 text-sm">Last Delivery: <span className="text-white font-semibold">12 May 2025</span></div>
        <button className="mt-3 md:mt-0 px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold shadow hover:scale-105 transition-transform">View Details</button>
      </div>
    </div>
  );
} 