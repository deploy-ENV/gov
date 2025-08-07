import React, { useState } from "react";
import { Check, X, Filter, Calendar, Building, User, Package, Wrench, Square, Cylinder, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import ViewDetailsModal from "../components/ViewDetailsModal";

const sampleOrders = [
  {
    id: 1,
    itemName: "Portland Cement",
    itemType: "cement",
    quantity: "200 bags",
    projectName: "Municipal Infrastructure Upgrade",
    requestedBy: "John Contractor",
    requestDate: "2025-01-15",
    status: "Pending",
    remarks: "Urgent delivery needed for foundation work",
  },
  {
    id: 2,
    itemName: "TMT Steel Bars",
    itemType: "steel",
    quantity: "500 kg",
    projectName: "Smart City Roadworks",
    requestedBy: "Sarah Manager",
    requestDate: "2025-01-14",
    status: "Accepted",
    remarks: "Standard delivery timeline acceptable",
  },
  {
    id: 3,
    itemName: "Red Bricks",
    itemType: "bricks",
    quantity: "5000 pieces",
    projectName: "Residential Complex",
    requestedBy: "Mike Builder",
    requestDate: "2025-01-13",
    status: "Rejected",
    remarks: "Stock unavailable, alternative suggested",
  },
  {
    id: 4,
    itemName: "Concrete Pipes",
    itemType: "pipes",
    quantity: "50 units",
    projectName: "Water Supply Project",
    requestedBy: "Lisa Engineer",
    requestDate: "2025-01-12",
    status: "Pending",
    remarks: "Special specifications required",
  },
];

const projects = ["All", "Municipal Infrastructure Upgrade", "Smart City Roadworks", "Residential Complex", "Water Supply Project"];
const statuses = ["All", "Pending", "Accepted", "Rejected"];

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmText, confirmColor }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[6px]" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative z-10 w-full max-w-md mx-auto rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-8 shadow-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-6 text-slate-300">{message}</div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-slate-700/50 text-slate-200 hover:bg-slate-600/50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded text-slate-900 font-semibold shadow-lg hover:brightness-110 transition-all ${confirmColor}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function IncomingOrders() {
  const [orders, setOrders] = useState(sampleOrders);
  const [filterProject, setFilterProject] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewDetailsModal, setViewDetailsModal] = useState({ isOpen: false, data: null });

  const filteredOrders = orders.filter(order => {
    const matchesProject = filterProject === "All" || order.projectName === filterProject;
    const matchesStatus = filterStatus === "All" || order.status === filterStatus;
    const matchesDate = !filterDate || order.requestDate === filterDate;
    return matchesProject && matchesStatus && matchesDate;
  });

  const handleAction = (orderId, action) => {
    setSelectedOrder(orders.find(o => o.id === orderId));
    setConfirmationModal({
      title: action === "accept" ? "Accept Order" : "Reject Order",
      message: action === "accept" 
        ? "Are you sure you want to accept this order?" 
        : "Are you sure you want to reject this order?",
      confirmText: action === "accept" ? "Accept" : "Reject",
      confirmColor: action === "accept" 
        ? "bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400" 
        : "bg-gradient-to-r from-red-400 to-orange-400",
      action
    });
  };

  const confirmAction = () => {
    if (!selectedOrder || !confirmationModal) return;

    setOrders(prev => prev.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, status: confirmationModal.action === "accept" ? "Accepted" : "Rejected" }
        : order
    ));
    setConfirmationModal(null);
    setSelectedOrder(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: "bg-yellow-400/20 text-yellow-400",
      Accepted: "bg-emerald-400/20 text-emerald-400",
      Rejected: "bg-red-400/20 text-red-400"
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const getItemIcon = (itemType) => {
    const icons = {
      cement: Package,
      steel: Wrench,
      bricks: Square,
      pipes: Cylinder
    };
    const IconComponent = icons[itemType] || Package;
    return <IconComponent className="w-4 h-4 text-cyan-400" />;
  };

  const resetFilters = () => {
    setFilterProject("All");
    setFilterStatus("All");
    setFilterDate("");
  };

  const handleViewDetails = (order) => {
    setViewDetailsModal({ isOpen: true, data: order });
  };

  const closeViewDetails = () => {
    setViewDetailsModal({ isOpen: false, data: null });
  };

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-cyan-400">Incoming Orders</h2>
        <div className="flex items-center gap-2 text-slate-300">
          <Filter className="w-5 h-5 text-emerald-400" />
          <span className="text-sm">Manage material requests</span>
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
            <User className="w-4 h-4 text-cyan-400" />
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
            <label className="text-slate-300 text-sm whitespace-nowrap">Date:</label>
            <input
              type="date"
              className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-sm"
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
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

      {/* Orders Table */}
      <div className="rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="bg-slate-700/50 text-slate-200">
                <th className="px-6 py-3 text-left">Item Name</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-left">Project Name</th>
                <th className="px-6 py-3 text-left">Requested By</th>
                <th className="px-6 py-3 text-left">Request Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-600/40 hover:bg-slate-700/50 transition-all"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center">
                        {getItemIcon(order.itemType)}
                      </div>
                      <span className="font-semibold text-white">{order.itemName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{order.quantity}</td>
                  <td className="px-6 py-4 text-slate- Tertiary">
                    <span className="font-semibold text-white">{order.projectName}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{order.requestedBy}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-700/60 text-slate-300 rounded-full text-xs font-medium">
                      {order.requestDate}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {order.status === "Pending" && (
                        <>
                          <button
                            className="p-2 rounded-full bg-emerald-400/20 hover:bg-emerald-400/30 transition"
                            onClick={() => handleAction(order.id, "accept")}
                            aria-label="Accept order"
                          >
                            <Check className="w-4 h-4 text-emerald-400" />
                          </button>
                          <button
                            className="p-2 rounded-full bg-red-400/20 hover:bg-red-400/30 transition"
                            onClick={() => handleAction(order.id, "reject")}
                            aria-label="Reject order"
                          >
                            <X className="w-4 h-4 text-red-400" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="text-center text-slate-300 py-12">No orders found matching the filters.</div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModal}
        onClose={() => setConfirmationModal(null)}
        onConfirm={confirmAction}
        title={confirmationModal?.title}
        message={confirmationModal?.message}
        confirmText={confirmationModal?.confirmText}
        confirmColor={confirmationModal?.confirmColor}
      />

      {/* View Details Modal */}
      <ViewDetailsModal
        isOpen={viewDetailsModal.isOpen}
        onClose={closeViewDetails}
        data={viewDetailsModal.data}
        type="order"
      />
    </div>
  );
}