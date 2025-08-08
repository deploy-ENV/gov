import React, { useState } from "react";
import {
  Package,
  FileText,
  Clock,
  Building,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Filter,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ViewDetailsModal from "../components/ViewDetailsModal";

const deliveries = [
  // {
  //   id: "DEL-0015",
  //   project: "Smart Road Phase 1",
  //   items: [
  //     { name: "Bricks", icon: <Package className="w-4 h-4 text-slate-300" />, qty: "1200", unit: "pcs" },
  //     { name: "Cement", icon: <Package className="w-4 h-4 text-slate-300" />, qty: "50", unit: "bags" },
  //   ],
  //   date: "2025-07-05",
  //   status: "Delivered",
  //   proof: "proof-del-0015.pdf",
  //   supervisor: "Amit Sharma",
  //   remarks: "Delivered on time. No issues reported."
  // },
  // {
  //   id: "DEL-0016",
  //   project: "Bridge Construction",
  //   items: [
  //     { name: "Steel Rods", icon: <Package className="w-4 h-4 text-slate-300" />, qty: "30", unit: "tons" }
  //   ],
  //   date: "2025-07-03",
  //   status: "Partial",
  //   proof: "proof-del-0016.pdf",
  //   supervisor: "Priya Verma",
  //   remarks: "Partial delivery due to supply chain delay."
  // },
  // {
  //   id: "DEL-0017",
  //   project: "School Renovation",
  //   items: [
  //     { name: "Bricks", icon: <Package className="w-4 h-4 text-slate-300" />, qty: "5000", unit: "pcs" }
  //   ],
  //   date: "2025-07-01",
  //   status: "Failed",
  //   proof: "proof-del-0017.pdf",
  //   supervisor: "Rakesh Singh",
  //   remarks: "Delivery failed due to vehicle breakdown."
  // },
];

const statusConfig = {
  Delivered: {
    color: "bg-emerald-400/20 text-emerald-400",
    icon: <CheckCircle className="w-4 h-4" />,
    label: "Delivered",
  },
  Partial: {
    color: "bg-yellow-400/20 text-yellow-400",
    icon: <AlertCircle className="w-4 h-4" />,
    label: "Partially Delivered",
  },
  Failed: {
    color: "bg-red-400/20 text-red-400",
    icon: <AlertCircle className="w-4 h-4" />,
    label: "Failed",
  },
};

const projects = ["All Projects", ...Array.from(new Set(deliveries.map((d) => d.project)))];
const statuses = ["All", ...Object.keys(statusConfig)];

export default function DeliveryHistory() {
  const [filterProject, setFilterProject] = useState("All Projects");
  const [filterStatus, setFilterStatus] = useState("All");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [modal, setModal] = useState({ open: false, data: null });

  // Filtering logic
  let filtered = deliveries.filter((d) =>
    (filterProject === "All Projects" || d.project === filterProject) &&
    (filterStatus === "All" || d.status === filterStatus) &&
    (!dateRange.start || d.date >= dateRange.start) &&
    (!dateRange.end || d.date <= dateRange.end)
  );

  return (
    <div className="p-4 md:p-6 font-sans min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Delivery History</h2>
      
      {/* Filters Panel */}
      <div className="rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-md px-6 py-5 mb-6 flex flex-wrap gap-4 items-center text-sm min-h-[64px]">
        {/* Project Filter */}
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-emerald-400" />
          <label className="text-slate-300 text-xs whitespace-nowrap">Project:</label>
          <select
            className="px-3 py-2 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-xs"
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
          >
            {projects.map((proj) => (
              <option key={proj} className="bg-slate-700 text-white">{proj}</option>
            ))}
          </select>
        </div>
        {/* Status Filter as Dropdown */}
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <label className="text-slate-300 text-xs whitespace-nowrap">Status:</label>
          <select
            className="px-3 py-2 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-xs"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} className="bg-slate-700 text-white">{status}</option>
            ))}
          </select>
        </div>
        {/* Date Range */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-yellow-400" />
          <label className="text-slate-300 text-xs whitespace-nowrap">Date:</label>
          <input
            type="date"
            className="px-3 py-2 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-xs"
            value={dateRange.start}
            onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
          />
          <span className="text-slate-300">to</span>
          <input
            type="date"
            className="px-3 py-2 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-xs"
            value={dateRange.end}
            onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
          />
        </div>
        {/* Reset Button */}
        <button
          onClick={() => {
            setFilterProject("All Projects");
            setFilterStatus("All");
            setDateRange({ start: "", end: "" });
          }}
          className="ml-auto flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-700/50 text-slate-200 hover:bg-slate-600/50 transition text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
        >
          <RotateCcw className="w-4 h-4 text-slate-300" /> Reset
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((delivery) => (
          <motion.div
            key={delivery.id}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.2)", 
              borderColor: "rgb(16, 185, 129, 0.5)" 
            }}
            className="rounded-lg bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-md p-4 transition-all duration-200 hover:border-emerald-400/50 hover:shadow-emerald-500/20"
          >
            {/* Card Header with Status */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold text-white text-lg">{delivery.id}</span>
              </div>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[delivery.status].color} border border-slate-600/50`}>
                {statusConfig[delivery.status].icon}
                {statusConfig[delivery.status].label}
              </span>
            </div>

            {/* Card Content - Key-Value Layout */}
            <div className="space-y-3">
              {/* Project */}
              <div className="flex items-start gap-3">
                <span className="text-xs font-semibold text-emerald-400 min-w-[80px] flex-shrink-0">Project:</span>
                <div className="flex items-center gap-2 flex-1">
                  <Building className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300 text-sm">{delivery.project}</span>
                </div>
              </div>

              {/* Items & Quantity */}
              <div className="flex items-start gap-3">
                <span className="text-xs font-semibold text-yellow-400 min-w-[80px] flex-shrink-0">Items:</span>
                <div className="flex flex-col gap-1 flex-1">
                  {delivery.items.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-700/50 text-xs text-slate-300 font-semibold">
                      {item.icon}
                      {item.name} <span className="text-slate-400">({item.qty} {item.unit})</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-cyan-400 min-w-[80px] flex-shrink-0">Date:</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="text-slate-300 text-sm">{new Date(delivery.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>
              </div>

              {/* Proof */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-cyan-400 min-w-[80px] flex-shrink-0">Proof:</span>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <button
                    className="p-2 rounded-full bg-slate-700/50 hover:bg-cyan-400/20 transition"
                    title="View Proof"
                    onClick={() => setModal({ open: true, data: delivery })}
                  >
                    <Eye className="w-4 h-4 text-cyan-400" />
                  </button>
                  <a
                    href={`/${delivery.proof}`}
                    download
                    className="p-2 rounded-full bg-slate-700/50 hover:bg-emerald-400/20 transition"
                    title="Download Proof"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <div className="flex gap-2 mt-4 pt-3 border-t border-slate-600/50">
              <button
                className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 hover:brightness-110 shadow-lg shadow-emerald-500/20 transition-all text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                onClick={() => setModal({ open: true, data: delivery })}
              >
                View Details
              </button>
              <a
                href={`/${delivery.proof}`}
                download
                className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 hover:brightness-110 shadow-lg shadow-emerald-500/20 transition-all text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400/50 flex items-center justify-center gap-1"
                title="Download Receipt"
              >
                <Download className="w-4 h-4" /> Receipt
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View Details Modal */}
      <AnimatePresence>
        {modal.open && (
          <ViewDetailsModal
            isOpen={modal.open}
            onClose={() => setModal({ open: false, data: null })}
            data={{
              itemName: modal.data.items.map(i => i.name).join(", "),
              projectName: modal.data.project,
              quantity: modal.data.items.map(i => `${i.qty} ${i.unit}`).join(", "),
              expectedDate: new Date(modal.data.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
              status: modal.data.status,
              remarks: modal.data.remarks,
              supervisor: modal.data.supervisor,
              proof: modal.data.proof,
            }}
            type="delivery"
          />
        )}
      </AnimatePresence>
    </div>
  );
}