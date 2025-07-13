"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Cpu,
  HardDrive,
  Users,
  AlertTriangle,
  TrendingUp,
  Server,
  Clock,
  Bell,
  ChevronRight,
  Zap,
  BarChart3,
  Settings,
  Shield,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function SidebarWorker({ workerData }) {
  const params = useParams();
  const pathname = usePathname();

  const getLinkClass = (path) => {
    const fullPath = `/dashboard/admin/worker/${params.id}${path}`;
    const isActive = pathname === fullPath;
    return isActive
      ? "flex items-center px-3 py-2.5 text-sm font-medium text-slate-900 bg-slate-100 rounded-lg"
      : "flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors";
  };

  return (
    <motion.div
      className="fixed top-0 w-64 bg-white border-r border-slate-200/80 flex-shrink-0 min-h-screen z-[60]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-16 flex items-center px-6 border-b border-slate-200/80">
        <Link href="/dashboard">
          <h2 className="text-lg font-semibold text-slate-900 cursor-pointer hover:text-slate-700 transition-colors">
            WhatsApp API Gateway
          </h2>
        </Link>
      </div>
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Server className="h-4 w-4 text-slate-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Worker
              </p>
              <p className="text-lg font-semibold text-slate-900">
                {workerData.name}
              </p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          <Link href={`/dashboard/admin/worker/${params.id}`}>
            <motion.div
              className={getLinkClass("")}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <BarChart3 className="h-4 w-4 mr-3 text-slate-600" />
              Monitoring
            </motion.div>
          </Link>
          <Link href={`/dashboard/admin/worker/${params.id}/sessions`}>
            <motion.div
              className={getLinkClass("/sessions")}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Users className="h-4 w-4 mr-3" />
              Sessions
            </motion.div>
          </Link>
          <Link href={`/dashboard/admin/worker/${params.id}/analytics`}>
            <motion.div
              className={getLinkClass("/analytics")}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <TrendingUp className="h-4 w-4 mr-3" />
              Analytics
            </motion.div>
          </Link>
          <motion.div
            className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Settings className="h-4 w-4 mr-3" />
            Configuration
          </motion.div>
          <motion.div
            className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Shield className="h-4 w-4 mr-3" />
            Security
          </motion.div>
          <motion.div
            className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Globe className="h-4 w-4 mr-3" />
            Network
          </motion.div>
          <Link href={`/dashboard/admin/worker/${params.id}/logs`}>
            <motion.div
              className={getLinkClass("/logs")}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Clock className="h-4 w-4 mr-3" />
              Logs
            </motion.div>
          </Link>
        </nav>
      </div>
    </motion.div>
  );
}
