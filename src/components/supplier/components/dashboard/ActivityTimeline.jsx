import React from "react";
import { 
  Package, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  FileText,
  MessageSquare,
  AlertTriangle,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";

const activities = [
  // {
  //   id: 1,
  //   date: "July 14",
  //   time: "10:30 AM",
  //   title: "Invoice approved",
  //   description: "Invoice #INV-2024-001 has been approved",
  //   icon: CheckCircle,
  //   type: "success",
  //   color: "text-emerald-400",
  //   bgColor: "bg-emerald-500/20"
  // },
  // {
  //   id: 2,
  //   date: "July 13",
  //   time: "2:15 PM",
  //   title: "Delivery due",
  //   description: "Steel beams delivery for Bridge Construction",
  //   icon: Clock,
  //   type: "pending",
  //   color: "text-amber-400",
  //   bgColor: "bg-amber-500/20"
  // },
  // {
  //   id: 3,
  //   date: "July 11",
  //   time: "11:45 AM",
  //   title: "Payment received",
  //   description: "₹25,000 payment received for Municipal Project",
  //   icon: CreditCard,
  //   type: "success",
  //   color: "text-emerald-400",
  //   bgColor: "bg-emerald-500/20"
  // },
  // {
  //   id: 4,
  //   date: "July 10",
  //   time: "9:20 AM",
  //   title: "Delivery completed",
  //   description: "150 bricks delivered to Project X",
  //   icon: Package,
  //   type: "completed",
  //   color: "text-blue-400",
  //   bgColor: "bg-blue-500/20"
  // },
  // {
  //   id: 5,
  //   date: "July 9",
  //   time: "3:30 PM",
  //   title: "New message",
  //   description: "Message from Project Manager about schedule",
  //   icon: MessageSquare,
  //   type: "info",
  //   color: "text-purple-400",
  //   bgColor: "bg-purple-500/20"
  // },
  // {
  //   id: 6,
  //   date: "July 8",
  //   time: "1:15 PM",
  //   title: "Invoice submitted",
  //   description: "Invoice #INV-2024-002 submitted for review",
  //   icon: FileText,
  //   type: "pending",
  //   color: "text-amber-400",
  //   bgColor: "bg-amber-500/20"
  // }
];

function TimelineItem({ activity, index }) {
  const IconComponent = activity.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative flex items-start gap-4"
    >
      {/* Timeline Line */}
      {index < activities.length - 1 && (
        <div className="absolute left-6 top-12 w-0.5 h-16 bg-slate-600"></div>
      )}
      
      {/* Icon */}
      <div className={`w-12 h-12 rounded-full ${activity.bgColor} flex items-center justify-center flex-shrink-0 z-10 relative`}>
        <IconComponent className={`w-5 h-5 ${activity.color}`} />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-white">{activity.title}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            activity.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
            activity.type === 'pending' ? 'bg-amber-500/20 text-amber-400' :
            activity.type === 'completed' ? 'bg-blue-500/20 text-blue-400' :
            'bg-purple-500/20 text-purple-400'
          }`}>
            {activity.type}
          </span>
        </div>
        
        <div className="text-sm text-gray-300 mb-2">{activity.description}</div>
        
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Calendar className="w-3 h-3" />
          <span>{activity.date}</span>
          <span>•</span>
          <span>{activity.time}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ActivityTimeline() {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Calendar className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <p className="text-sm text-gray-400">Your latest updates and events</p>
        </div>
      </div>
      
      <div className="space-y-2">
        {activities.map((activity, index) => (
          <TimelineItem key={activity.id} activity={activity} index={index} />
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-700">
        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          View all activities →
        </button>
      </div>
    </div>
  );
} 