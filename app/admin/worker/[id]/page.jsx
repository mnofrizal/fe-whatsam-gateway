"use client"

import { motion } from "framer-motion"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"
import Link from "next/link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.08,
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

// Mock worker data
const workerData = {
  id: "1",
  name: "Worker-01",
  endpoint: "https://api.worker1.example.com",
  status: "Online",
  version: "v2.1.4",
  uptime: "7d 14h 32m",
  lastSeen: "2 minutes ago",
  region: "US-East-1",
  created: "6/25/2025, 10:30:00 AM",
}

export default function WorkerDetail({ params }) {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 68,
    sessions: 127,
    requests: 1543,
    errors: 3,
    responseTime: 245,
  })

  const [alerts] = useState([
    {
      id: 1,
      type: "warning",
      message: "High memory usage detected",
      timestamp: "2 minutes ago",
    },
    {
      id: 2,
      type: "info",
      message: "Worker restarted successfully",
      timestamp: "1 hour ago",
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(95, prev.memory + (Math.random() - 0.5) * 8)),
        sessions: Math.max(50, Math.min(200, prev.sessions + Math.floor((Math.random() - 0.5) * 20))),
        requests: prev.requests + Math.floor(Math.random() * 10),
        responseTime: Math.max(100, Math.min(500, prev.responseTime + (Math.random() - 0.5) * 50)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "Online":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Offline":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getMetricColor = (value, type) => {
    if (type === "cpu" || type === "memory") {
      if (value > 80) return "text-red-600"
      if (value > 60) return "text-yellow-600"
      return "text-emerald-600"
    }
    return "text-slate-900"
  }

  const getProgressColor = (value) => {
    if (value > 80) return "bg-red-500"
    if (value > 60) return "bg-yellow-500"
    return "bg-emerald-500"
  }

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
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold text-slate-900">WhatsApp API Gateway</h1>

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <ChevronRight className="h-4 w-4" />
                <Link href="/" className="hover:text-slate-900 transition-colors">
                  Dashboard
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/?tab=admin" className="hover:text-slate-900 transition-colors">
                  Admin
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 font-medium">{workerData.name}</span>
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
        </div>
      </motion.nav>

      <div className="flex">
        {/* Sidebar */}
        <motion.div
          className="w-64 bg-white border-r border-slate-200/80 flex-shrink-0 min-h-[calc(100vh-64px)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Server className="h-4 w-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Worker</p>
                  <p className="text-lg font-semibold text-slate-900">{workerData.name}</p>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              <motion.div
                className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-900 bg-slate-100 rounded-lg"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <BarChart3 className="h-4 w-4 mr-3 text-slate-600" />
                Monitoring
              </motion.div>
              <Link href={`/admin/worker/${params.id}/sessions`}>
                <motion.div
                  className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <Users className="h-4 w-4 mr-3" />
                  Sessions
                </motion.div>
              </Link>
              <Link href={`/admin/worker/${params.id}/analytics`}>
                <motion.div
                  className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
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
              <motion.div
                className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Clock className="h-4 w-4 mr-3" />
                Logs
              </motion.div>
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold text-slate-900">{workerData.name}</h1>
                    <Badge variant="outline" className={`${getStatusColor(workerData.status)} font-medium border`}>
                      {workerData.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>{workerData.endpoint}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4" />
                      <span>{workerData.version}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Uptime: {workerData.uptime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
                    <Activity className="h-4 w-4 mr-2" />
                    Restart Worker
                  </Button>
                  <Button variant="outline" className="border-slate-200 text-slate-700 bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Real-time Metrics */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              {/* CPU Usage */}
              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Cpu className="h-4 w-4 text-slate-600" />
                    CPU Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-2xl font-bold ${getMetricColor(metrics.cpu, "cpu")}`}>
                        {metrics.cpu.toFixed(1)}%
                      </span>
                      <TrendingUp className="h-4 w-4 text-slate-400" />
                    </div>
                    <Progress value={metrics.cpu} className="h-2">
                      <div
                        className={`h-full rounded-full transition-all ${getProgressColor(metrics.cpu)}`}
                        style={{ width: `${metrics.cpu}%` }}
                      />
                    </Progress>
                  </div>
                </CardContent>
              </Card>

              {/* Memory Usage */}
              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <HardDrive className="h-4 w-4 text-slate-600" />
                    Memory Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-2xl font-bold ${getMetricColor(metrics.memory, "memory")}`}>
                        {metrics.memory.toFixed(1)}%
                      </span>
                      <TrendingUp className="h-4 w-4 text-slate-400" />
                    </div>
                    <Progress value={metrics.memory} className="h-2">
                      <div
                        className={`h-full rounded-full transition-all ${getProgressColor(metrics.memory)}`}
                        style={{ width: `${metrics.memory}%` }}
                      />
                    </Progress>
                  </div>
                </CardContent>
              </Card>

              {/* Active Sessions */}
              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Users className="h-4 w-4 text-slate-600" />
                    Active Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-slate-900">{metrics.sessions}</span>
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="text-xs text-slate-500">+12 from last hour</div>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Zap className="h-4 w-4 text-slate-600" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-slate-900">{metrics.responseTime.toFixed(0)}ms</span>
                      <TrendingUp className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="text-xs text-slate-500">Avg last 5 minutes</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Charts Section */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Performance Chart */}
              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <BarChart3 className="h-5 w-5 text-slate-600" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                    <div className="text-center space-y-2">
                      <BarChart3 className="h-12 w-12 text-slate-400 mx-auto" />
                      <p className="text-slate-500 text-sm">Real-time performance chart</p>
                      <p className="text-xs text-slate-400">Chart.js/Recharts integration ready</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Session Distribution */}
              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <Users className="h-5 w-5 text-slate-600" />
                    Session Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                    <div className="text-center space-y-2">
                      <Users className="h-12 w-12 text-slate-400 mx-auto" />
                      <p className="text-slate-500 text-sm">Session distribution visualization</p>
                      <p className="text-xs text-slate-400">Pie/Donut chart ready</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Worker Information Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Worker Details */}
              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <Server className="h-5 w-5 text-slate-600" />
                    Worker Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Name</label>
                      <p className="text-slate-900 font-medium mt-1">{workerData.name}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Version</label>
                      <p className="text-slate-900 font-medium mt-1">{workerData.version}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Region</label>
                      <p className="text-slate-900 font-medium mt-1">{workerData.region}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Uptime</label>
                      <p className="text-emerald-600 font-semibold mt-1">{workerData.uptime}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Endpoint</label>
                    <p className="text-slate-600 text-sm mt-1 font-mono break-all">{workerData.endpoint}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <Activity className="h-5 w-5 text-slate-600" />
                    Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        Total Requests
                      </label>
                      <p className="text-slate-900 font-bold text-xl mt-1">{metrics.requests.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Errors</label>
                      <p className="text-red-600 font-bold text-xl mt-1">{metrics.errors}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Success Rate</label>
                      <p className="text-emerald-600 font-bold text-xl mt-1">99.8%</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Last Seen</label>
                      <p className="text-slate-600 text-sm mt-1">{workerData.lastSeen}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Health Alerts */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <AlertTriangle className="h-5 w-5 text-slate-600" />
                    Health Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {alerts.map((alert) => (
                    <Alert
                      key={alert.id}
                      className={`${
                        alert.type === "warning"
                          ? "bg-yellow-50 border border-yellow-200"
                          : "bg-blue-50 border border-blue-200"
                      }`}
                    >
                      <AlertTriangle
                        className={`h-4 w-4 ${alert.type === "warning" ? "text-yellow-600" : "text-blue-600"}`}
                      />
                      <AlertDescription>
                        <div className={`${alert.type === "warning" ? "text-yellow-800" : "text-blue-800"}`}>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{alert.message}</span>
                            <span className="text-xs">{alert.timestamp}</span>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
