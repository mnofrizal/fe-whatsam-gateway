"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import { DashboardTab } from "@/components/dashboard/dashboard-tab";
import { WorkerTab } from "@/components/dashboard/worker-tab";
import { ManagerTab } from "@/components/dashboard/manager-tab";

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
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function WhatsAppDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Initial data states
  const [instances, setInstances] = useState([
    {
      id: 1,
      name: "Semen",
      status: "Error",
      createdAt: "7/1/2025",
    },
  ]);

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
  ]);

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
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
                onClick={() => setActiveTab("worker")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "worker"
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                Worker
              </button>
              <button
                onClick={() => setActiveTab("manager")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "manager"
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                Manager
              </button>
            </nav>
          </div>

          {/* Tab Content Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {activeTab === "dashboard"
                  ? "Dashboard"
                  : activeTab === "worker"
                  ? "Worker Panel"
                  : "Manager Dashboard"}
              </h2>
              <p className="text-slate-600 mt-1">
                {activeTab === "dashboard"
                  ? "Manage your WhatsApp API instances"
                  : activeTab === "worker"
                  ? "Manage workers and system administration"
                  : "Monitor user statistics and subscription analytics"}
              </p>
            </div>
            {activeTab === "manager" && (
              <Link href="/admin/manager">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Manage Panel
                </motion.button>
              </Link>
            )}
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === "dashboard" && (
          <DashboardTab instances={instances} setInstances={setInstances} />
        )}

        {activeTab === "worker" && (
          <WorkerTab workers={workers} setWorkers={setWorkers} />
        )}

        {activeTab === "manager" && <ManagerTab />}
      </motion.div>
    </main>
  );
}
