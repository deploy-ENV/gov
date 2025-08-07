import React from "react";
import { Eye, Upload, CheckCircle, Package, MapPin, Users, Building } from "lucide-react";
import StatusBadge from "../shared/StatusBadge";
import TimeBadge from "../shared/TimeBadge";
import CircularProgress from "../shared/CircularProgress";

function DeliveryCard({ delivery, onViewDetails, onUploadProof, onMarkDelivered }) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-slate-600 transition-all hover:shadow-lg">
      {/* Compact Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <h3 className="text-base font-semibold text-white truncate">{delivery.materialName}</h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Building className="w-3 h-3" />
            <span className="truncate">{delivery.projectName}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-1 ml-2">
          <StatusBadge status={delivery.status} isOverdue={delivery.isOverdue} />
          <TimeBadge dueIn={delivery.dueIn} isOverdue={delivery.isOverdue} />
        </div>
      </div>

      {/* Compact Progress & Details */}
      <div className="flex items-center gap-3 mb-3">
        <CircularProgress progress={delivery.progress} size={40} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-300">Progress</span>
            <span className="text-xs font-semibold text-white">{delivery.progress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1.5">
            <div 
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${delivery.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Compact Details Row */}
      <div className="flex items-center gap-4 mb-3 text-xs">
        <div className="flex items-center gap-1">
          <span className="text-gray-400">Qty:</span>
          <span className="text-white font-medium">{delivery.quantity.toLocaleString()} {delivery.unit}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-400">Due:</span>
          <span className="text-white font-medium">{new Date(delivery.expectedDate).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Compact Remarks */}
      {delivery.remarks && (
        <div className="mb-3 p-2 bg-slate-700/30 rounded border border-slate-600">
          <div className="text-xs text-gray-400 mb-1">Remarks</div>
          <div className="text-xs text-gray-300 line-clamp-2">{delivery.remarks}</div>
        </div>
      )}

      {/* Compact Proof Files */}
      {delivery.proofs.length > 0 && (
        <div className="mb-3">
          <div className="text-xs text-gray-400 mb-1">Proofs: {delivery.proofs.length}</div>
          <div className="flex flex-wrap gap-1">
            {delivery.proofs.slice(0, 2).map((proof, index) => (
              <div key={index} className="flex items-center gap-1 px-2 py-1 bg-slate-700/50 rounded text-xs text-gray-300">
                <Package className="w-2.5 h-2.5" />
                <span className="truncate max-w-20">{proof}</span>
              </div>
            ))}
            {delivery.proofs.length > 2 && (
              <span className="text-xs text-gray-400">+{delivery.proofs.length - 2} more</span>
            )}
          </div>
        </div>
      )}

      {/* Compact Action Buttons */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onViewDetails(delivery)}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors"
        >
          <Eye className="w-3 h-3" />
          View
        </button>
        
        {delivery.status !== "Delivered" && (
          <>
            <button
              onClick={() => onUploadProof(delivery)}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs font-medium transition-colors"
            >
              <Upload className="w-3 h-3" />
              Upload
            </button>
            
            {delivery.progress === 100 && (
              <button
                onClick={() => onMarkDelivered(delivery)}
                className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium transition-colors"
              >
                <CheckCircle className="w-3 h-3" />
                Mark Done
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DeliveryCard; 