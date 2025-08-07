import React from "react";
import { AlertTriangle, CheckCircle, Truck, Clock } from "lucide-react";

function StatusBadge({ status, isOverdue }) {
  const getStatusConfig = (status, isOverdue) => {
    if (isOverdue) {
      return {
        color: "bg-red-500/20 text-red-400 border-red-500/30",
        icon: AlertTriangle,
        text: "Overdue"
      };
    }
    
    switch (status) {
      case "Delivered":
        return {
          color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
          icon: CheckCircle,
          text: "Delivered"
        };
      case "In Transit":
        return {
          color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
          icon: Truck,
          text: "In Transit"
        };
      case "Pending Dispatch":
        return {
          color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
          icon: Clock,
          text: "Pending"
        };
      default:
        return {
          color: "bg-slate-500/20 text-slate-400 border-slate-500/30",
          icon: Clock,
          text: status
        };
    }
  };

  const config = getStatusConfig(status, isOverdue);
  const IconComponent = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${config.color}`}>
      <IconComponent className="w-3.5 h-3.5" strokeWidth={2} />
      {config.text}
    </div>
  );
}

export default StatusBadge; 