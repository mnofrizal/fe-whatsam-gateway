"use client"

import { motion } from "framer-motion"
import { Bell } from "lucide-react"
import { useState } from "react"
import { DashboardTab } from "@/components/dashboard/dashboard-tab"
import { AdminTab } from "@/components/dashboard/admin-tab"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
}

export default function WhatsAppDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  
  // Initial data states
  const [instances, setInstances] = useState([
    {
      id: 1,
      name: "Semen",
      status: "Error",
      createdAt: "7/1/2025",
    },
  ])

  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: "Worker-01",
      endpoint: "https://api.worker1.example.com",
      status: "Online",
      lastSeen: "2 minutes ago",
      createdAt: "7/1/2025",
    },
    {
      id: 2,
      name: "Worker-02",
      endpoint: "https://api.worker2.example.com",
      status: "Offline",
      lastSeen: "1 hour ago",
      createdAt: "6/30/2025",
    },
  ])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <motion.nav
        className="bg-white border-b border-slate-200/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold text-slate-900">WhatsApp API Gateway</h1>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-50"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>

              <motion.div
                className="h-8 w-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                JD
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          {/* Header Section with Tabs */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            {/* Tabs */}
            <div className="border-b border-slate-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "dashboard"
                      ? "border-slate-900 text-slate-900"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("admin")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "admin"
                      ? "border-slate-900 text-slate-900"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  Admin
                </button>
              </nav>
            </div>

            {/* Tab Content Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {activeTab === "dashboard" ? "Dashboard" : "Admin Panel"}
                </h2>
                <p className="text-slate-600 mt-1">
                  {activeTab === "dashboard"
                    ? "Manage your WhatsApp API instances"
                    : "Manage workers and system administration"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tab Content */}
          {activeTab === "dashboard" && (
            <DashboardTab instances={instances} setInstances={setInstances} />
          )}

          {activeTab === "admin" && (
            <AdminTab workers={workers} setWorkers={setWorkers} />
          )}
        </motion.div>
      </main>
    </div>
  )
}