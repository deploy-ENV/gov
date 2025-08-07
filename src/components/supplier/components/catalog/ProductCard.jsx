import React from "react";
import { Edit, Trash2, Package, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import Tooltip from "../shared/Tooltip";

function ProductCard({ product, onEdit, onDelete }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "In Stock":
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case "Low Stock":
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      default:
        return <Package className="w-4 h-4 text-gray-400" />;
    }
  };

  const getUpdateBadgeColor = (timeAgo) => {
    if (timeAgo.includes('h') && parseInt(timeAgo) <= 1) return "bg-emerald-600/20 text-emerald-400";
    if (timeAgo.includes('h') || timeAgo.includes('d') && parseInt(timeAgo) <= 1) return "bg-blue-600/20 text-blue-400";
    return "bg-amber-600/20 text-amber-400";
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            {product.isNew && (
              <span className="px-2 py-0.5 bg-emerald-600/20 text-emerald-400 text-xs rounded-full font-medium">
                New
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Category: {product.category}</span>
            <span>•</span>
            <span>Unit: {product.unit}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getUpdateBadgeColor(product.updated)}`}>
            {product.updated}
          </div>
          {getStatusIcon(product.status)}
        </div>
      </div>

      {/* Price and Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-700/50 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Price</div>
          <div className="text-lg font-bold text-white">
            ₹{product.price.toLocaleString()}
          </div>
        </div>
        <div className="bg-slate-700/50 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Sold (This Week)</div>
          <div className="text-lg font-bold text-white">{product.sold}</div>
        </div>
      </div>

      {/* Sales Trend */}
      <div className="mb-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-300">Weekly Sales</span>
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">{product.sold}</span>
          <span className="text-xs text-gray-400">vs</span>
          <span className="text-sm text-gray-300">{product.lastWeek} last week</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Tooltip content="Edit Product">
          <button
            onClick={() => onEdit(product)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </Tooltip>
        
        <Tooltip content="Delete Product">
          <button
            onClick={() => onDelete(product)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default ProductCard; 