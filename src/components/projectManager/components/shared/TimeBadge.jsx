import React from "react";
import { Clock, AlertTriangle } from "lucide-react";

function TimeBadge({ dueIn, isOverdue }) {
  const getTimeConfig = (dueIn, isOverdue) => {
    if (isOverdue) {
      return {
        color: "bg-red-500/20 text-red-400 border-red-500/30",
        icon: AlertTriangle,
        text: `${Math.abs(dueIn)} days overdue`
      };
    }
    
    if (dueIn === 0) {
      return {
        color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
        icon: Clock,
        text: "Due today"
      };
    }
    
    if (dueIn <= 3) {
      return {
        color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        icon: Clock,
        text: `${dueIn} days left`
      };
    }
    
    return {
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      icon: Clock,
      text: `${dueIn} days left`
    };
  };

  const config = getTimeConfig(dueIn, isOverdue);
  const IconComponent = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${config.color}`}>
      <IconComponent className="w-3.5 h-3.5" strokeWidth={2} />
      {config.text}
    </div>
  );
}

export default TimeBadge; 