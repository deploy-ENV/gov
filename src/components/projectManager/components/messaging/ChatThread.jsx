import React from "react";
import { Pin, Check, CheckCheck } from "lucide-react";

function ChatThread({ thread, isSelected, onSelect, onPinToggle }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "seen":
        return <CheckCheck className="w-4 h-4 text-blue-400" />;
      case "delivered":
        return <Check className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`p-4 rounded-lg cursor-pointer transition-all hover:bg-slate-700/50 ${
        isSelected ? "bg-slate-700/70 border-l-4 border-blue-400" : ""
      }`}
      onClick={() => onSelect(thread.id)}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {thread.avatar}
          </div>
          {thread.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-800"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-white truncate">{thread.name}</span>
            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${thread.roleColor}`}>
              {thread.roleIcon}
              {thread.role}
            </div>
            {thread.pinned && (
              <Pin className="w-3 h-3 text-amber-400" />
            )}
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-300 truncate">{thread.lastMessage}</span>
            {thread.unreadCount > 0 && (
              <span className="ml-auto bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 font-semibold">
                {thread.unreadCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{thread.timestamp}</span>
            <span className="text-xs text-gray-400">{thread.project}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatThread; 