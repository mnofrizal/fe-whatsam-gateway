"use client"

import { motion } from "framer-motion"
import { Bell } from "lucide-react"

export function Navbar() {
  return (
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
  )
}