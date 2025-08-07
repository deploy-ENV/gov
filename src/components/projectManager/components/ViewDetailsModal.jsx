import React from "react";
import { X, Calendar, User, Package, Building, Clock, MessageSquare, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ViewDetailsModal({ isOpen, onClose, data, type = "order" }) {
  if (!isOpen || !data) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
      case "Accepted":
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case "Pending":
      case "Pending Dispatch":
        return <Clock className="w-4 h-4 text-amber-400" />;
      case "Rejected":
      case "Overdue":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case "In Transit":
        return <Package className="w-4 h-4 text-blue-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
      case "Accepted":
        return "bg-emerald-600/20 text-emerald-400 border-emerald-500/30";
      case "Pending":
      case "Pending Dispatch":
        return "bg-amber-600/20 text-amber-400 border-amber-500/30";
      case "Rejected":
      case "Overdue":
        return "bg-red-600/20 text-red-400 border-red-500/30";
      case "In Transit":
        return "bg-blue-600/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-slate-600/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur and overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative z-10 w-full max-w-xl mx-4 rounded-xl bg-[#1a1f36] shadow-2xl border border-slate-700 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-slate-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {type === "order" ? "Order Details" : "Delivery Details"}
              </h2>
              <p className="text-xs text-slate-400">
                Complete information and status
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
          >
            <X className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Main Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Item/Project Name */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Package className="w-3 h-3" />
                <span>Item Name</span>
              </div>
              <p className="text-white font-semibold text-base">
                {data.itemName || data.name || data.materialName}
              </p>
            </div>

            {/* Project Name */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Building className="w-3 h-3" />
                <span>Project Name</span>
              </div>
              <p className="text-white font-semibold text-sm">
                {data.projectName}
              </p>
            </div>

            {/* Quantity */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Package className="w-3 h-3" />
                <span>Quantity</span>
              </div>
              <p className="text-white font-semibold text-sm">
                {data.quantity} {data.unit}
              </p>
            </div>

            {/* Requested By */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <User className="w-3 h-3" />
                <span>Requested By</span>
              </div>
              <p className="text-white font-semibold text-sm">
                {data.requestedBy || "N/A"}
              </p>
            </div>

            {/* Request Date */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="w-3 h-3" />
                <span>Request Date</span>
              </div>
              <p className="text-white font-semibold text-sm">
                {data.requestDate || data.expectedDate || "N/A"}
              </p>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <AlertCircle className="w-3 h-3" />
                <span>Status</span>
              </div>
              <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(data.status)}`}>
                {getStatusIcon(data.status)}
                {data.status}
              </div>
            </div>
          </div>

          {/* Remarks Section */}
          {(data.remarks || data.description) && (
            <div className="border-t border-slate-700 pt-3">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <MessageSquare className="w-3 h-3" />
                <span>Remarks</span>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {data.remarks || data.description || "No additional remarks available."}
                </p>
              </div>
            </div>
          )}

          {/* Additional Details for Orders */}
          {type === "order" && data.status === "Pending" && (
            <div className="border-t border-slate-700 pt-3">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <AlertCircle className="w-3 h-3" />
                <span>Action Required</span>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <p className="text-amber-300 text-xs">
                  This order is pending your approval. Please review the details and take appropriate action.
                </p>
              </div>
            </div>
          )}

          {/* Additional Details for Deliveries */}
          {type === "delivery" && (
            <div className="border-t border-slate-700 pt-3">
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>Expected Delivery</span>
                  </div>
                  <p className="text-white font-semibold text-sm">
                    {data.expectedDate}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-slate-700 bg-slate-800/30">
          {type === "order" && data.status === "Pending" && (
            <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors text-sm font-medium">
              Take Action
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
} 