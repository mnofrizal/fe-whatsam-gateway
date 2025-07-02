"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bell, User, LogOut, AlertCircle, CheckCircle, Info, Clock } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Breadcrumb } from "./breadcrumb";

export function Navbar() {
  const pathname = usePathname();
  const isInstancePage = pathname.startsWith("/instance/");
  const isWorkerPage = pathname.startsWith("/admin/worker/");
  const isManagerPage = pathname.startsWith("/admin/manager");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Mock notification data
  const notifications = [
    {
      id: 1,
      type: "error",
      title: "Instance Connection Failed",
      message: "Semen instance failed to connect",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "success",
      title: "Worker Online",
      message: "Worker-01 is now online and ready",
      time: "15 minutes ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "API Key Updated",
      message: "Instance API key has been regenerated",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      type: "warning",
      title: "High Memory Usage",
      message: "Worker-02 memory usage is at 85%",
      time: "2 hours ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-slate-200/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`flex justify-between items-center h-16 px-6 lg:px-8 ${
          isInstancePage || isWorkerPage || isManagerPage ? "ml-64" : "max-w-7xl mx-auto"
        }`}
      >
        <div className="flex items-center">
          {!(isInstancePage || isWorkerPage || isManagerPage) && (
            <div className="flex items-center gap-4">
              <Link href="/">
                <h1 className="text-lg font-semibold text-slate-900">
                  WhatsApp API Gateway
                </h1>
              </Link>
              <div className="h-6 border-r border-slate-200"></div>
            </div>
          )}
          <div className="ml-4">
            <Breadcrumb />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification Panel */}
          <div className="relative" ref={notificationRef}>
            <motion.button
              className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-50"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </motion.button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200/80 py-2 z-50 max-h-96 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-slate-200/80 flex justify-between items-center">
                  <h3 className="text-sm font-medium text-slate-900">Notifications</h3>
                  <Link href="/notifications">
                    <span 
                      className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => setIsNotificationOpen(false)}
                    >
                      View All
                    </span>
                  </Link>
                </div>
                
                <div className="max-h-72 overflow-y-auto">
                  {notifications.slice(0, 4).map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer border-l-4 ${
                        notification.read 
                          ? 'border-transparent bg-white' 
                          : 'border-blue-400 bg-blue-50/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${
                            notification.read ? 'text-slate-700' : 'text-slate-900'
                          }`}>
                            {notification.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            <Clock className="h-3 w-3 text-slate-400" />
                            <span className="text-xs text-slate-400">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {notifications.length === 0 && (
                  <div className="px-4 py-8 text-center text-slate-500">
                    <Bell className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-sm">No notifications</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <motion.button
              className="p-1 rounded-lg hover:bg-slate-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="h-8 w-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
            </motion.button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200/80 py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-slate-200/80">
                  <p className="text-sm font-medium text-slate-900">John Doe</p>
                  <p className="text-xs text-slate-500">john.doe@example.com</p>
                </div>
                
                <Link href="/profile">
                  <motion.div
                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </motion.div>
                </Link>
                
                <motion.div
                  className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    // Handle logout logic here
                    console.log('Logout clicked');
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
