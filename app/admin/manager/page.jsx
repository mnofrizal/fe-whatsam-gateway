"use client";

import { motion } from "framer-motion";
import { Users, Crown, TrendingUp, Calendar, Plus, Search } from "lucide-react";

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

export default function ManagerDashboard() {
  // Mock data
  const stats = {
    totalUsers: 147,
    activeUsers: 89,
    totalSubscriptions: 47,
    activeSubscriptions: 42,
    revenueThisMonth: 4200,
    newUsersToday: 8,
  };

  const recentActivities = [
    {
      id: 1,
      type: "user",
      action: "New user registered",
      user: "John Doe",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "subscription",
      action: "Premium subscription activated",
      user: "Jane Smith",
      time: "15 minutes ago",
    },
    {
      id: 3,
      type: "user",
      action: "User updated profile",
      user: "Mike Johnson",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "subscription",
      action: "Subscription renewed",
      user: "Sarah Wilson",
      time: "2 hours ago",
    },
  ];

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
            <h1 className="text-3xl font-bold text-slate-900">Manager Dashboard</h1>
            <p className="text-slate-600 mt-2">
              Manage users, subscriptions, and system analytics
            </p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Search className="h-4 w-4" />
              Search
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add New
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Users</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {stats.totalUsers.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">+12%</span>
              <span className="text-sm text-slate-500 ml-1">from last month</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Subscriptions</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {stats.activeSubscriptions.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Crown className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">+8%</span>
              <span className="text-sm text-slate-500 ml-1">from last month</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Revenue This Month</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  ${stats.revenueThisMonth.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">+23%</span>
              <span className="text-sm text-slate-500 ml-1">from last month</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl border border-slate-200/80 shadow-sm">
          <div className="p-6 border-b border-slate-200/80">
            <h3 className="text-lg font-semibold text-slate-900">Recent Activities</h3>
            <p className="text-sm text-slate-600 mt-1">Latest user and subscription activities</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: activity.id * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    activity.type === 'user' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    {activity.type === 'user' ? (
                      <Users className={`h-4 w-4 ${activity.type === 'user' ? 'text-blue-600' : 'text-purple-600'}`} />
                    ) : (
                      <Crown className={`h-4 w-4 ${activity.type === 'user' ? 'text-blue-600' : 'text-purple-600'}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-600">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-slate-500">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}