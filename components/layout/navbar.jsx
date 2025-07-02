"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { Breadcrumb } from "./breadcrumb";

export function Navbar() {
  const pathname = usePathname();
  const isInstancePage = pathname.startsWith("/instance/");
  const isWorkerPage = pathname.startsWith("/admin/worker/");

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-slate-200/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`flex justify-between items-center h-16 px-6 lg:px-8 ${
          isInstancePage || isWorkerPage ? "pl-[256px]" : "max-w-7xl mx-auto"
        }`}
      >
        <div className="flex items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <h1 className="text-lg font-semibold text-slate-900">
                WhatsApp API Gateway
              </h1>
            </Link>
            <div className="h-6 border-r border-slate-200"></div>
            <Breadcrumb />
          </div>
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
    </motion.nav>
  );
}
