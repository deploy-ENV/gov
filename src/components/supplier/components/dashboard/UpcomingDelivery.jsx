import React from "react";
import { Calendar, PackageCheck } from "lucide-react";

function UpcomingDelivery({ delivery }) {
  return (
    <div className="rounded-xl bg-[#1a1f36] shadow-lg border border-slate-700 p-8 flex flex-col gap-4">
      <div className="flex items-center gap-3 mb-2">
        <Calendar className="w-6 h-6 text-blue-400" />
        <div className="text-lg font-bold text-white">Upcoming Delivery</div>
      </div>
      
      <div className="text-gray-300 font-semibold">{delivery.project}</div>
      
      <div className="flex items-center gap-2 text-sm">
        <PackageCheck className="w-4 h-4 text-emerald-400" />
        <span className="text-gray-400">Items:</span>
        {delivery.items.map((item) => (
          <span key={item} className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-200 text-xs font-semibold ml-1">
            {item}
          </span>
        ))}
      </div>
      
      <div className="flex items-center gap-2 text-sm">
        <Calendar className="w-4 h-4 text-blue-400" />
        <span className="text-gray-400">Due:</span>
        <span className="text-white font-semibold">{delivery.due}</span>
      </div>
      
      <div className="flex items-center gap-2 mt-2">
        <span className="px-3 py-1 rounded-full bg-amber-500/90 text-xs text-white font-semibold shadow">
          {delivery.countdown}
        </span>
      </div>
    </div>
  );
}

export default UpcomingDelivery; 