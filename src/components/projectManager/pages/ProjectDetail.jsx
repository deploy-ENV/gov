import React from "react";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

// Placeholder data for demonstration
const projectData = {
  // "1": {
  //   name: "Municipal Infrastructure Upgrade",
  //   materials: ["Cement", "Steel", "Bricks"],
  //   deliveries: [
  //     { date: "12 May 2025", item: "Cement", qty: "200 bags", status: "Delivered" },
  //     { date: "15 May 2025", item: "Steel", qty: "500 kg", status: "Pending" },
  //   ],
  //   progress: 60,
  // },
};

export default function ProjectDetail() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const project = projectData[projectId] || projectData["1"];
  const hasPending = project.deliveries.some(d => d.status !== "Delivered");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurry background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[12px]" onClick={() => navigate(-1)} />
      {/* Popup card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative z-10 w-full max-w-3xl mx-auto rounded-xl bg-[#1a1f36] shadow-2xl border border-slate-700 p-8 md:p-10"
      >
        <button
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <div className="text-2xl font-bold text-white mb-2">{project.name}</div>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.materials.map((mat) => (
                <span key={mat} className="px-3 py-1 rounded-full bg-blue-900/60 text-blue-200 text-xs font-semibold">{mat}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg width="72" height="72" viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="32" fill="none" stroke="#334155" strokeWidth="8" />
              <circle
                cx="36"
                cy="36"
                r="32"
                fill="none"
                stroke="#10B981"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 32}
                strokeDashoffset={2 * Math.PI * 32 * (1 - project.progress / 100)}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.6s' }}
              />
              <text x="36" y="42" textAnchor="middle" className="fill-white font-bold text-lg">{project.progress}%</text>
            </svg>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600/20 text-emerald-400">{project.progress}% Complete</span>
          </div>
        </div>
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full text-sm text-gray-300">
            <thead>
              <tr className="bg-[#23294a] text-gray-200">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Item</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {project.deliveries.map((d, i) => (
                <tr key={i} className="border-b border-slate-700">
                  <td className="px-4 py-2">{d.date}</td>
                  <td className="px-4 py-2">{d.item}</td>
                  <td className="px-4 py-2">{d.qty}</td>
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${d.status === "Delivered" ? "bg-emerald-600/20 text-emerald-400" : "bg-amber-600/20 text-amber-400"}`}>{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {hasPending && (
          <div className="flex justify-end mt-8">
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-emerald-500 text-white font-semibold shadow flex items-center gap-2 hover:scale-105 transition-transform">
              <HelpCircle className="w-5 h-5" /> Request Support
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
} 