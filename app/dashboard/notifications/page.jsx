"use client";

import { motion } from "framer-motion";
import { Bell, AlertCircle, CheckCircle, Info, Clock, Search, Filter, MoreHorizontal, Trash2, MarkAsUnread, Eye } from "lucide-react";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterRead, setFilterRead] = useState("all");

  // Extended notification data
  const notifications = [
    {
      id: 1,
      type: "error",
      title: "Instance Connection Failed",
      message: "Semen instance failed to connect to WhatsApp servers. Please check your network connection and try again.",
      time: "2 minutes ago",
      timestamp: "2025-01-02 14:45:00",
      read: false,
      priority: "high",
    },
    {
      id: 2,
      type: "success",
      title: "Worker Online",
      message: "Worker-01 is now online and ready to process requests. All systems are operational.",
      time: "15 minutes ago",
      timestamp: "2025-01-02 14:32:00",
      read: false,
      priority: "medium",
    },
    {
      id: 3,
      type: "info",
      title: "API Key Updated",
      message: "Instance API key has been regenerated for security purposes. Please update your applications with the new key.",
      time: "1 hour ago",
      timestamp: "2025-01-02 13:47:00",
      read: true,
      priority: "low",
    },
    {
      id: 4,
      type: "warning",
      title: "High Memory Usage",
      message: "Worker-02 memory usage is at 85%. Consider restarting the worker or upgrading your plan.",
      time: "2 hours ago",
      timestamp: "2025-01-02 12:47:00",
      read: true,
      priority: "medium",
    },
    {
      id: 5,
      type: "success",
      title: "Backup Completed",
      message: "Daily backup has been completed successfully. All data is safely stored.",
      time: "3 hours ago",
      timestamp: "2025-01-02 11:47:00",
      read: true,
      priority: "low",
    },
    {
      id: 6,
      type: "error",
      title: "Payment Failed",
      message: "Monthly subscription payment failed. Please update your payment method to avoid service interruption.",
      time: "1 day ago",
      timestamp: "2025-01-01 14:47:00",
      read: false,
      priority: "high",
    },
    {
      id: 7,
      type: "info",
      title: "New Feature Available",
      message: "Webhook automation is now available for all Pro subscribers. Check out the new features in your dashboard.",
      time: "2 days ago",
      timestamp: "2024-12-31 10:20:00",
      read: true,
      priority: "low",
    },
    {
      id: 8,
      type: "warning",
      title: "Rate Limit Warning",
      message: "You're approaching your API rate limit for this month. Consider upgrading your plan.",
      time: "3 days ago",
      timestamp: "2024-12-30 16:15:00",
      read: true,
      priority: "medium",
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      default:
        return "border-l-blue-500";
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || notification.type === filterType;
    const matchesRead = filterRead === "all" || 
                       (filterRead === "unread" && !notification.read) ||
                       (filterRead === "read" && notification.read);
    
    return matchesSearch && matchesType && matchesRead;
  });

  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    high: notifications.filter(n => n.priority === "high").length,
  };

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
            <p className="text-slate-600 mt-2">
              Stay updated with system alerts and important messages
            </p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Eye className="h-4 w-4" />
              Mark All Read
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Notifications</p>
                <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Unread</p>
                <p className="text-2xl font-bold text-slate-900">{stats.unread}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-red-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">High Priority</p>
                <p className="text-2xl font-bold text-slate-900">{stats.high}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="error">Errors</option>
              <option value="warning">Warnings</option>
              <option value="success">Success</option>
              <option value="info">Info</option>
            </select>
            
            <select
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </motion.div>

        {/* Notifications List */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-200/80">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`p-6 hover:bg-slate-50 transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${
                  !notification.read ? 'bg-blue-50/30' : 'bg-white'
                }`}
              >
                <div className="flex items-start gap-4">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className={`text-sm font-medium ${
                          notification.read ? 'text-slate-700' : 'text-slate-900'
                        }`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-slate-400" />
                            <span className="text-xs text-slate-400">
                              {notification.time}
                            </span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            notification.priority === 'high' ? 'bg-red-100 text-red-700' :
                            notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {notification.priority}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-1 text-slate-400 hover:text-slate-600 rounded"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredNotifications.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              <Bell className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No notifications found</h3>
              <p className="text-slate-600">
                {searchTerm || filterType !== "all" || filterRead !== "all" 
                  ? "Try adjusting your filters or search terms." 
                  : "You're all caught up! No new notifications."}
              </p>
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {filteredNotifications.length > 0 && (
          <motion.div variants={itemVariants} className="flex justify-between items-center">
            <div className="text-sm text-slate-500">
              Showing {filteredNotifications.length} of {notifications.length} notifications
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50 transition-colors">
                Next
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}