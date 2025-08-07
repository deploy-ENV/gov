import React from "react";
import { ArrowRight, Package, Archive } from "lucide-react";
import CircularProgress from "../shared/CircularProgress";

function ProjectSummary({ project, onViewDetails }) {
  return (
    <div className="col-span-2 rounded-xl bg-[#1a1f36] shadow-lg border border-slate-700 p-8 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-lg font-bold text-white mb-1">{project.name}</div>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.materials.map((mat) => {
              let icon = null;
              if (mat === "Cement") icon = <Package className="w-4 h-4 text-blue-300" />;
              else if (mat === "Steel") icon = <Archive className="w-4 h-4 text-blue-300" />;
              else if (mat === "Bricks") icon = <Package className="w-4 h-4 text-blue-300" />;
              else icon = <Package className="w-4 h-4 text-blue-300" />;
              return (
                <span key={mat} className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-900/60 text-blue-200 text-xs font-semibold">
                  {icon}
                  {mat}
                </span>
              );
            })}
          </div>
          <div className="text-gray-400 text-sm">
            Last Delivery: <span className="text-white font-semibold">{project.lastDelivery}</span>
          </div>
        </div>
        
        {/* Circular Progress Bar */}
        <div className="flex flex-col items-center gap-2">
          <CircularProgress progress={project.progress} size={96} />
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.statusColor} text-white`}>
            {project.status}
          </span>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold shadow hover:scale-105 transition-transform flex items-center gap-2"
          onClick={onViewDetails}
        >
          View Details <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default ProjectSummary; 