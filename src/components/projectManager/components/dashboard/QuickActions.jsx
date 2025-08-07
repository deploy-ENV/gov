import React, { useState } from "react";
import { 
  Plus, 
  FileText, 
  Truck, 
  MessageSquare, 
  Settings,
  X,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Tooltip from "../shared/Tooltip";

const actions = [
  {
    id: "add-product",
    icon: Plus,
    label: "Add Product",
    color: "from-blue-500 to-blue-600",
    action: () => console.log("Add Product")
  },
  {
    id: "upload-invoice",
    icon: FileText,
    label: "Upload Invoice",
    color: "from-emerald-500 to-emerald-600",
    action: () => console.log("Upload Invoice")
  },
  {
    id: "mark-delivery",
    icon: Truck,
    label: "Mark Delivery",
    color: "from-purple-500 to-purple-600",
    action: () => console.log("Mark Delivery")
  },
  {
    id: "message-supervisor",
    icon: MessageSquare,
    label: "Message Supervisor",
    color: "from-orange-500 to-orange-600",
    action: () => console.log("Message Supervisor")
  }
];

function QuickActionButton({ action, isExpanded, onClick }) {
  const IconComponent = action.icon;
  
  return (
    <Tooltip content={action.label}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white`}
      >
        <IconComponent className="w-5 h-5" />
      </motion.button>
    </Tooltip>
  );
}

export default function QuickActions() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleAction = (action) => {
    action.action();
    // Optionally collapse after action
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const hideActions = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-slate-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white z-50"
      >
        <Plus className="w-5 h-5" />
      </motion.button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="mb-4 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <QuickActionButton
                  action={action}
                  isExpanded={isExpanded}
                  onClick={() => handleAction(action)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <div className="flex flex-col items-end gap-2">
        {/* Close Button */}
        {isExpanded && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={hideActions}
            className="w-10 h-10 bg-red-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}

        {/* Toggle Button */}
        <Tooltip content={isExpanded ? "Collapse" : "Quick Actions"}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleExpanded}
            className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white"
          >
            {isExpanded ? (
              <ChevronDown className="w-6 h-6" />
            ) : (
              <ChevronUp className="w-6 h-6" />
            )}
          </motion.button>
        </Tooltip>
      </div>
    </div>
  );
} 