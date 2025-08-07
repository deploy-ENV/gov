import React from "react";
import { Check, CheckCheck, Download, Eye } from "lucide-react";

function MessageBubble({ message, isOwn }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "seen":
        return <CheckCheck className="w-4 h-4 text-blue-400" />;
      case "delivered":
        return <Check className="w-4 h-4 text-gray-400" />;
      case "sent":
        return <Check className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const renderAttachment = (attachment) => {
    const getFileIcon = (type) => {
      switch (type) {
        case "pdf":
          return "📄";
        case "image":
          return "🖼️";
        case "document":
          return "📋";
        default:
          return "📎";
      }
    };

    return (
      <div key={attachment.name} className="mt-2 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getFileIcon(attachment.type)}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{attachment.name}</div>
            <div className="text-xs text-gray-400">{attachment.size}</div>
          </div>
          <button className="p-1 hover:bg-slate-600 rounded transition-colors">
            <Download className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-xs lg:max-w-md ${isOwn ? "order-2" : "order-1"}`}>
        {!isOwn && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-white">{message.sender}</span>
            <span className="text-xs text-gray-400">({message.senderRole})</span>
          </div>
        )}
        
        <div className={`rounded-lg p-3 ${
          isOwn 
            ? "bg-blue-600 text-white" 
            : "bg-slate-700 text-gray-100"
        }`}>
          <div className="text-sm">{message.text}</div>
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2">
              {message.attachments.map(renderAttachment)}
            </div>
          )}
        </div>
        
        <div className={`flex items-center gap-2 mt-1 ${isOwn ? "justify-end" : "justify-start"}`}>
          <span className="text-xs text-gray-400">{message.timestamp}</span>
          {isOwn && getStatusIcon(message.status)}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble; 