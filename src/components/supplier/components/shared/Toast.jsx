import React from "react";
import { X } from "lucide-react";

function Toast({ message, onClose, type = "success" }) {
  const getToastStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-emerald-600 text-white";
      case "error":
        return "bg-red-600 text-white";
      case "warning":
        return "bg-amber-600 text-white";
      case "info":
        return "bg-blue-600 text-white";
      default:
        return "bg-emerald-600 text-white";
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in ${getToastStyles(type)}`}>
      {message}
      <button onClick={onClose} className="ml-2 text-white/80 hover:text-white">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default Toast; 