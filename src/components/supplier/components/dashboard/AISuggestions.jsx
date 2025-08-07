import React, { useState, useEffect } from "react";
import { 
  AlertTriangle, 
  Clock, 
  FileText, 
  Truck, 
  MessageSquare, 
  CheckCircle,
  X,
  Bell,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const suggestions = [
  {
    id: 1,
    type: "urgent",
    icon: Clock,
    message: "2 deliveries are due in 2 days",
    action: "View Deliveries",
    color: "from-amber-500 to-orange-500"
  },
  {
    id: 2,
    type: "reminder",
    icon: FileText,
    message: "1 invoice hasn't been uploaded",
    action: "Upload Now",
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: 3,
    type: "success",
    icon: CheckCircle,
    message: "Payment of ₹25,000 received",
    action: "View Details",
    color: "from-emerald-500 to-green-500"
  },
  {
    id: 4,
    type: "info",
    icon: MessageSquare,
    message: "New message from Project Manager",
    action: "Reply",
    color: "from-purple-500 to-pink-500"
  }
];

function SuggestionCard({ suggestion, onDismiss, onAction }) {
  const IconComponent = suggestion.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`bg-gradient-to-r ${suggestion.color} rounded-lg p-4 text-white shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <IconComponent className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium mb-1">{suggestion.message}</div>
            <button
              onClick={() => onAction(suggestion)}
              className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
            >
              {suggestion.action}
            </button>
          </div>
        </div>
        <button
          onClick={() => onDismiss(suggestion.id)}
          className="text-white/70 hover:text-white transition-colors ml-2"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function AISuggestions() {
  const [activeSuggestions, setActiveSuggestions] = useState(suggestions);
  const [isExpanded, setIsExpanded] = useState(false);

  const dismissSuggestion = (id) => {
    setActiveSuggestions(prev => prev.filter(s => s.id !== id));
  };

  const handleAction = (suggestion) => {
    // Handle different actions based on suggestion type
    console.log('Action clicked:', suggestion);
  };

  const urgentSuggestions = activeSuggestions.filter(s => s.type === 'urgent');
  const otherSuggestions = activeSuggestions.filter(s => s.type !== 'urgent');

  return (
    <div className="space-y-4">
      {/* AI Assistant Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">AI Assistant</div>
          <div className="text-xs text-gray-400">Smart suggestions for your workflow</div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-auto text-gray-400 hover:text-white transition-colors"
        >
          <Bell className="w-4 h-4" />
        </button>
      </div>

      {/* Urgent Suggestions */}
      {urgentSuggestions.length > 0 && (
        <div className="space-y-2">
          {urgentSuggestions.map(suggestion => (
            <SuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              onDismiss={dismissSuggestion}
              onAction={handleAction}
            />
          ))}
        </div>
      )}

      {/* Other Suggestions (Expandable) */}
      {otherSuggestions.length > 0 && (
        <div>
          {isExpanded ? (
            <AnimatePresence>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2"
              >
                {otherSuggestions.map(suggestion => (
                  <SuggestionCard
                    key={suggestion.id}
                    suggestion={suggestion}
                    onDismiss={dismissSuggestion}
                    onAction={handleAction}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full text-left p-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500/20 rounded flex items-center justify-center">
                  <Bell className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-sm text-gray-300">
                  {otherSuggestions.length} more suggestions
                </span>
              </div>
            </button>
          )}
        </div>
      )}

      {/* No Suggestions State */}
      {activeSuggestions.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <div className="text-sm">All caught up! No pending actions.</div>
        </div>
      )}
    </div>
  );
}

export default AISuggestions; 