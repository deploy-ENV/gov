import React, { useState } from "react";
import { 
  Truck, 
  Calendar, 
  Filter, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Building,
  Package,
  RotateCcw,
  Grid,
  List
} from "lucide-react";
import { motion } from "framer-motion";
import ViewDetailsModal from "../components/ViewDetailsModal";
import { DeliveryCard } from "../components/delivery";
import { StatusBadge, TimeBadge, CircularProgress } from "../components/shared";

const sampleDeliveries = [
  // {
  //   id: 1,
  //   materialName: "Portland Cement",
  //   projectName: "Municipal Infrastructure Upgrade",
  //   quantity: 200,
  //   unit: "Tons",
  //   expectedDate: "2025-01-20",
  //   progress: 75,
  //   status: "In Transit",
  //   dueIn: 3,
  //   isOverdue: false,
  //   remarks: "Package 1 of 3 delivered. Remaining items in transit.",
  //   proofs: ["delivery_receipt_001.pdf", "photo_proof_001.jpg"]
  // },
  // {
  //   id: 2,
  //   materialName: "TMT Steel Bars",
  //   projectName: "Smart City Roadworks",
  //   quantity: 500,
  //   unit: "Kgs",
  //   expectedDate: "2025-01-18",
  //   progress: 100,
  //   status: "Delivered",
  //   dueIn: -1,
  //   isOverdue: false,
  //   remarks: "All items successfully delivered and signed off.",
  //   proofs: ["delivery_receipt_002.pdf", "signature_proof_002.jpg"]
  // },
  // {
  //   id: 3,
  //   materialName: "Red Bricks",
  //   projectName: "Residential Complex",
  //   quantity: 5000,
  //   unit: "Pieces",
  //   expectedDate: "2025-01-15",
  //   progress: 30,
  //   status: "Pending Dispatch",
  //   dueIn: -3,
  //   isOverdue: true,
  //   remarks: "Delay due to weather conditions. Rescheduled for next week.",
  //   proofs: []
  // },
  // {
  //   id: 4,
  //   materialName: "Concrete Pipes",
  //   projectName: "Water Supply Project",
  //   quantity: 50,
  //   unit: "Units",
  //   expectedDate: "2025-01-25",
  //   progress: 0,
  //   status: "Pending Dispatch",
  //   dueIn: 8,
  //   isOverdue: false,
  //   remarks: "Awaiting final quality inspection before dispatch.",
  //   proofs: []
  // },
  // {
  //   id: 5,
  //   materialName: "Steel Beams",
  //   projectName: "Bridge Construction",
  //   quantity: 25,
  //   unit: "Units",
  //   expectedDate: "2025-01-22",
  //   progress: 60,
  //   status: "In Transit",
  //   dueIn: 5,
  //   isOverdue: false,
  //   remarks: "Package 2 of 4 in transit. Expected completion by weekend.",
  //   proofs: ["transit_proof_005.pdf"]
  // },
  // {
  //   id: 6,
  //   materialName: "Sand & Gravel",
  //   projectName: "Highway Extension",
  //   quantity: 1000,
  //   unit: "Cubic Meters",
  //   expectedDate: "2025-01-17",
  //   progress: 90,
  //   status: "In Transit",
  //   dueIn: 0,
  //   isOverdue: false,
  //   remarks: "Final delivery scheduled for tomorrow morning.",
  //   proofs: ["delivery_receipt_006.pdf"]
  // }
];

const projects = ["All", "Municipal Infrastructure Upgrade", "Smart City Roadworks", "Residential Complex", "Water Supply Project", "Bridge Construction", "Highway Extension"];
const statuses = ["All", "Pending Dispatch", "In Transit", "Delivered"];

export default function DeliveryManagement() {
  const [deliveries, setDeliveries] = useState(sampleDeliveries);
  const [filterProject, setFilterProject] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDateRange, setFilterDateRange] = useState({ start: "", end: "" });
  const [viewMode, setViewMode] = useState("grid"); // grid or table
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [viewDetailsModal, setViewDetailsModal] = useState({ isOpen: false, data: null });

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesProject = filterProject === "All" || delivery.projectName === filterProject;
    const matchesStatus = filterStatus === "All" || delivery.status === filterStatus;
    const matchesDateRange = !filterDateRange.start || !filterDateRange.end || 
      (delivery.expectedDate >= filterDateRange.start && delivery.expectedDate <= filterDateRange.end);
    
    return matchesProject && matchesStatus && matchesDateRange;
  });

  const resetFilters = () => {
    setFilterProject("All");
    setFilterStatus("All");
    setFilterDateRange({ start: "", end: "" });
  };

  const handleViewDetails = (delivery) => {
    setViewDetailsModal({ isOpen: true, data: delivery });
  };

  const closeViewDetails = () => {
    setViewDetailsModal({ isOpen: false, data: null });
  };

  const handleUploadProof = (delivery) => {
    console.log("Upload proof for:", delivery);
  };

  const handleMarkDelivered = (delivery) => {
    setDeliveries(prev => prev.map(d => 
      d.id === delivery.id 
        ? { ...d, status: "Delivered", progress: 100, dueIn: 0, isOverdue: false }
        : d
    ));
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">Delivery Management</h2>
          <p className="text-slate-300 mt-1">Track and manage material deliveries across all projects</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-700/50 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === "grid" 
                  ? "bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900" 
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === "table" 
                  ? "bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900" 
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-400" />
            <label className="text-slate-300 text-sm whitespace-nowrap">Project:</label>
            <select
              className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-sm"
              value={filterProject}
              onChange={e => setFilterProject(e.target.value)}
            >
              {projects.map(p => <option key={p} className="bg-slate-700 text-white">{p}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-cyan-400" />
            <label className="text-slate-300 text-sm whitespace-nowrap">Status:</label>
            <select
              className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-sm"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              {statuses.map(s => <option key={s} className="bg-slate-700 text-white">{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-yellow-400" />
            <label className="text-slate-300 text-sm whitespace-nowrap">Date Range:</label>
            <input
              type="date"
              className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-sm"
              value={filterDateRange.start}
              onChange={e => setFilterDateRange(prev => ({ ...prev, start: e.target.value }))}
            />
            <span className="text-slate-300">to</span>
            <input
              type="date"
              className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-sm"
              value={filterDateRange.end}
              onChange={e => setFilterDateRange(prev => ({ ...prev, end: e.target.value }))}
            />
          </div>
          <button
            onClick={resetFilters}
            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition"
            title="Reset all filters"
          >
            <RotateCcw className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Delivery Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeliveries.map((delivery) => (
            <DeliveryCard
              key={delivery.id}
              delivery={delivery}
              onViewDetails={handleViewDetails}
              onUploadProof={handleUploadProof}
              onMarkDelivered={handleMarkDelivered}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="bg-slate-700/50 text-slate-200">
                  <th className="px-6 py-3 text-left">Material</th>
                  <th className="px-6 py-3 text-left">Project</th>
                  <th className="px-6 py-3 text-left">Quantity</th>
                  <th className="px-6 py-3 text-left">Expected Date</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Progress</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeliveries.map((delivery) => (
                  <tr
                    key={delivery.id}
                    className="border-b border-slate-600/40 hover:bg-slate-700/50 transition-all"
                  >
                    <td className="px-6 py-4 text-white">{delivery.materialName}</td>
                    <td className="px-6 py-4 text-slate-300">{delivery.projectName}</td>
                    <td className="px-6 py-4 text-slate-300">{delivery.quantity} {delivery.unit}</td>
                    <td className="px-6 py-4 text-slate-300">{delivery.expectedDate}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={delivery.status} />
                    </td>
                    <td className="px-6 py-4">
                      <CircularProgress progress={delivery.progress} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-2 rounded-full bg-slate-700/50 hover:bg-cyan-400/20 transition"
                          onClick={() => handleViewDetails(delivery)}
                          aria-label="View details"
                        >
                          <Eye className="w-4 h-4 text-cyan-400" />
                        </button>
                        <button
                          className="p-2 rounded-full bg-slate-700/50 hover:bg-emerald-400/20 transition"
                          onClick={() => handleUploadProof(delivery)}
                          aria-label="Upload proof"
                        >
                          <Upload className="w-4 h-4 text-emerald-400" />
                        </button>
                        {delivery.status !== "Delivered" && (
                          <button
                            className="p-2 rounded-full bg-slate-700/50 hover:bg-yellow-400/20 transition"
                            onClick={() => handleMarkDelivered(delivery)}
                            aria-label="Mark as delivered"
                          >
                            <CheckCircle className="w-4 h-4 text-yellow-400" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredDeliveries.length === 0 && (
        <div className="text-center text-slate-300 py-12">
          <Truck className="w-16 h-16 mx-auto mb-4 text-slate-400" />
          <p className="text-lg font-medium text-white">No deliveries found</p>
          <p className="text-sm">Try adjusting your filters or check back later.</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-400/20 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{deliveries.length}</div>
              <div className="text-sm text-slate-300">Total Deliveries</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-400/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {deliveries.filter(d => d.status === "Delivered").length}
              </div>
              <div className="text-sm text-slate-300">Completed</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-400/20 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {deliveries.filter(d => d.status === "In Transit").length}
              </div>
              <div className="text-sm text-slate-300">In Transit</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-400/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {deliveries.filter(d => d.isOverdue).length}
              </div>
              <div className="text-sm text-slate-300">Overdue</div>
            </div>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      <ViewDetailsModal
        isOpen={viewDetailsModal.isOpen}
        onClose={closeViewDetails}
        data={viewDetailsModal.data}
        type="delivery"
      />
    </div>
  );
}