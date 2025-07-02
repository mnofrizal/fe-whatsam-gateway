"use client";

import { motion } from "framer-motion";
import { Users, Crown, TrendingUp, Calendar } from "lucide-react";

export function ManagerTab() {
  // Mock data - in real app this would come from API
  const userStats = {
    totalUsers: 147,
    activeUsers: 89,
    newUsersThisMonth: 23,
    growthRate: 15.8,
  };

  const subscriptionStats = {
    totalSubscriptions: 47,
    activeSubscriptions: 42,
    premiumSubscriptions: 18,
    expiringSoon: 5,
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* User Stats Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">User Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Users</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {userStats.totalUsers.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">
                +{userStats.growthRate}%
              </span>
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
                <p className="text-sm font-medium text-slate-600">Active Users</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {userStats.activeUsers.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Activity Rate</span>
                <span className="text-slate-900 font-medium">
                  {((userStats.activeUsers / userStats.totalUsers) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${(userStats.activeUsers / userStats.totalUsers) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">New Users</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {userStats.newUsersThisMonth.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-slate-500">This month</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Growth Rate</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  +{userStats.growthRate}%
                </p>
              </div>
              <div className="h-12 w-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-slate-500">Monthly growth</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subscription Stats Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Subscription Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Subscriptions</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {subscriptionStats.totalSubscriptions.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                <Crown className="h-6 w-6 text-indigo-600" />
              </div>
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
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {subscriptionStats.activeSubscriptions.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Crown className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Active Rate</span>
                <span className="text-slate-900 font-medium">
                  {((subscriptionStats.activeSubscriptions / subscriptionStats.totalSubscriptions) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${(subscriptionStats.activeSubscriptions / subscriptionStats.totalSubscriptions) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Premium Plans</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {subscriptionStats.premiumSubscriptions.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Crown className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-slate-500">
                {((subscriptionStats.premiumSubscriptions / subscriptionStats.totalSubscriptions) * 100).toFixed(1)}% of total
              </span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {subscriptionStats.expiringSoon.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-slate-500">Next 30 days</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}