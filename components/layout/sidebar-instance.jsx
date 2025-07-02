"use client";

import { motion } from "framer-motion";
import { Key, BarChart3, Zap, Clock, Webhook } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function SidebarInstance({ instanceData }) {
  const params = useParams();
  const pathname = usePathname();

  const getLinkClass = (path) => {
    const fullPath = `/instance/${params.id}${path}`;
    const isActive = pathname === fullPath;
    return isActive
      ? "flex items-center px-3 py-2.5 text-sm font-medium text-slate-900 bg-slate-100 rounded-lg"
      : "flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors";
  };

  return (
    <motion.div
      className="fixed top-16 w-64 bg-white border-r border-slate-200/80 flex-shrink-0 min-h-[calc(100vh-64px)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <Zap className="h-4 w-4 text-slate-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Instance
              </p>
              <p className="text-lg font-semibold text-slate-900">
                {instanceData.name}
              </p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          <Link href={`/instance/${params.id}`}>
            <motion.div
              className={getLinkClass("")}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <BarChart3 className="h-4 w-4 mr-3 text-slate-600" />
              Dashboard
            </motion.div>
          </Link>
          <Link href={`/instance/${params.id}/settings`}>
            <motion.div
              className={getLinkClass("/settings")}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Key className="h-4 w-4 mr-3" />
              Settings
            </motion.div>
          </Link>
          <motion.div
            className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Webhook className="h-4 w-4 mr-3" />
            Webhook
          </motion.div>
          <motion.div
            className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Zap className="h-4 w-4 mr-3" />
            Automation
          </motion.div>
          <motion.div
            className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Clock className="h-4 w-4 mr-3" />
            Integrations
          </motion.div>
        </nav>
      </div>
    </motion.div>
  );
}
