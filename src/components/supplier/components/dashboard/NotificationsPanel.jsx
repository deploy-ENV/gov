import React, { useState } from "react";
import { 
  Bell, 
  Package, 
  CreditCard, 
  FileText, 
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Clock,
  X,
  Settings
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const notifications = [
  // {
  //   id: 1,
  //   type: "order",
  //   icon: Package,
  //   title: "New order assigned",
  //   message: "You have a new delivery order for Municipal Project",
  //   time: "2 minutes ago",
  //   color: "from-blue-500 to-blue-600",
  //   bgColor: "bg-blue-500/20",
  //   textColor: "text-blue-400",
  //   isRead: false
  // },
  // {
  //   id: 2,
  //   type: "payment",
  //   icon: CreditCard,
  //   title: "Payment cleared",
  //   message: "Payment of ₹25,000 has been processed",
  //   time: "1 hour ago",
  //   color: "from-emerald-500 to-emerald-600",
  //   bgColor: "bg-emerald-500/20",
  //   textColor: "text-emerald-400",
  //   isRead: false
  // },
  // {
  //   id: 3,
  //   type: "invoice",
  //   icon: FileText,
  //   title: "Invoice approved",
  //   message: "Invoice #INV-2024-001 has been approved",
  //   time: "3 hours ago",
  //   color: "from-purple-500 to-purple-600",
  //   bgColor: "bg-purple-500/20",
  //   textColor: "text-purple-400",
  //   isRead: true
  // },
  // {
  //   id: 4,
  //   type: "message",
  //   icon: MessageSquare,
  //   title: "New message",
  //   message: "Project Manager sent you a message",
  //   time: "5 hours ago",
  //   color: "from-orange-500 to-orange-600",
  //   bgColor: "bg-orange-500/20",
  //   textColor: "text-orange-400",
  //   isRead: true
  // },
  // {
  //   id: 5,
  //   type: "reminder",
  //   icon: Clock,
  //   title: "Delivery reminder",
  //   message: "Steel beams delivery is due tomorrow",
  //   time: "1 day ago",
  //   color: "from-amber-500 to-amber-600",
  //   bgColor: "bg-amber-500/20",
  //   textColor: "text-amber-400",
  //   isRead: true
  // }
];

function NotificationItem({ notification, onMarkRead, onDelete }) {
  const IconComponent = notification.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg border transition-all hover:shadow-md ${
        notification.isRead 
          ? 'bg-slate-800/50 border-slate-700' 
          : 'bg-slate-800 border-slate-600'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg ${notification.bgColor} flex items-center justify-center flex-shrink-0`}>
          <IconComponent className={`w-5 h-5 ${notification.textColor}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">{notification.title}</span>
              {!notification.isRead && (
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              )}
            </div>
            <button
              onClick={() => onDelete(notification.id)}
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          
          <div className="text-sm text-gray-300 mb-2">{notification.message}</div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{notification.time}</span>
            {!notification.isRead && (
              <button
                onClick={() => onMarkRead(notification.id)}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function NotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [activeFilter, setActiveFilter] = useState("all");

  const unreadCount = notificationsList.filter(n => !n.isRead).length;

  const markAsRead = (id) => {
    setNotificationsList(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const deleteNotification = (id) => {
    setNotificationsList(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const filteredNotifications = notificationsList.filter(notification => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !notification.isRead;
    return notification.type === activeFilter;
  });

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
          >
            <span className="text-xs text-white font-semibold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          </motion.div>
        )}
      </button>

      {/* Notifications Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-12 w-80 bg-slate-800 rounded-xl border border-slate-700 shadow-2xl z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Mark all read
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-1">
                {[
                  { key: "all", label: "All" },
                  { key: "unread", label: "Unread" },
                  { key: "order", label: "Orders" },
                  { key: "payment", label: "Payments" }
                ].map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      activeFilter === filter.key
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications.length > 0 ? (
                <div className="p-4 space-y-3">
                  {filteredNotifications.map(notification => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkRead={markAsRead}
                      onDelete={deleteNotification}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <div className="text-sm">No notifications</div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700">
              <button className="w-full text-sm text-blue-400 hover:text-blue-300 transition-colors">
                View all notifications →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 