"use client"

import { motion } from "framer-motion"
import {
  Key,
  Eye,
  EyeOff,
  Copy,
  Clock,
  BarChart3,
  Zap,
  AlertCircle,
  Phone,
  User,
  Activity,
  Webhook,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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

// Mock data - in real app this would come from API based on the ID
const instanceData = {
  id: "1",
  name: "Semen",
  displayName: "Aya",
  phoneNumber: "628517991457",
  status: "ERROR",
  active: "Yes",
  apiKey: "sk_test_1234567890abcdef1234567890abcdef",
  connectionState: "DISCONNECTED",
  connectionAttempts: 0,
  lastConnected: "7/1/2025, 2:10:32 PM",
  lastDisconnected: "7/1/2025, 2:12:15 PM",
  created: "7/1/2025, 7:50:56 AM",
  lastUpdated: "7/1/2025, 2:31:04 PM",
  createdBy: "Muhammad Naufal",
  apiKeyStatus: "Active",
  messageStats: 1,
  contacts: 4,
  reconnectAttempts: 0,
  qrAttempts: "0 / 3",
  lastError: {
    message: "Failed to initialize on startup; instanceId is not defined",
    timestamp: "7/1/2025, 2:31:04 PM",
  },
}

export default function InstanceDetail({ params }) {
  const [showApiKey, setShowApiKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showQRDialog, setShowQRDialog] = useState(false)

  const copyApiKey = () => {
    navigator.clipboard.writeText(instanceData.apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const maskApiKey = (key) => {
    if (showApiKey) return key
    return "•".repeat(35)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "ERROR":
        return "bg-red-50 text-red-700 border-red-200"
      case "DISCONNECTED":
        return "bg-gray-50 text-gray-700 border-gray-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
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
                <Zap className="h-4 w-4 text-slate-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Instance</p>
                <p className="text-lg font-semibold text-slate-900">{instanceData.name}</p>
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
              Dashboard
            </motion.div>
            <Link href={`/instance/${params.id}/settings`}>
              <motion.div
                className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
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

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
          {/* Breadcrumb */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Link href="/" className="hover:text-slate-900 transition-colors">
                Dashboard
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-slate-900 font-medium">{instanceData.name}</span>
            </div>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl font-bold text-slate-900">{instanceData.name}</h1>
                  <Badge variant="outline" className={`${getStatusColor(instanceData.status)} font-medium border`}>
                    {instanceData.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{instanceData.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{instanceData.displayName}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                  onClick={() => setShowQRDialog(true)}
                >
                  Connect Instance
                </Button>
                <Button variant="outline" className="border-slate-200 text-slate-700 bg-transparent">
                  Disconnect
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">Restart</Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm">Logout</Button>
              </div>
            </div>
          </motion.div>

          {/* API Key Section */}
          <motion.div variants={itemVariants} className="mb-8">
            <Card className="bg-white border border-slate-200/80 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <Key className="h-5 w-5 text-slate-600" />
                  API Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Instance API Key</label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 font-mono text-sm bg-slate-50 p-3 rounded-lg border border-slate-200">
                      {maskApiKey(instanceData.apiKey)}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="border-slate-200"
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyApiKey}
                      className="border-slate-200 bg-transparent"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  {copied && <p className="text-sm text-emerald-600 font-medium">✓ API Key copied to clipboard</p>}
                </div>

                <Alert className="bg-blue-50 border border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>API Key Information</strong>
                    <br />
                    This key is automatically generated and used to authenticate API requests to your WhatsApp
                    instance.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </motion.div>

          {/* Information Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Basic Information */}
            <Card className="bg-white border border-slate-200/80 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <User className="h-5 w-5 text-slate-600" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Name</label>
                    <p className="text-slate-900 font-medium mt-1">{instanceData.name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Display Name</label>
                    <p className="text-slate-900 font-medium mt-1">{instanceData.displayName}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Status</label>
                    <p className="text-red-600 font-semibold mt-1">{instanceData.status}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Active</label>
                    <p className="text-slate-900 font-medium mt-1">{instanceData.active}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connection Information */}
            <Card className="bg-white border border-slate-200/80 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <Activity className="h-5 w-5 text-slate-600" />
                  Connection Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Phone Number</label>
                    <p className="text-slate-900 font-medium mt-1">{instanceData.phoneNumber}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Connection Attempts
                    </label>
                    <p className="text-slate-900 font-medium mt-1">{instanceData.connectionAttempts}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Last Connected
                    </label>
                    <p className="text-slate-600 text-sm mt-1">{instanceData.lastConnected}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Last Disconnected
                    </label>
                    <p className="text-slate-600 text-sm mt-1">{instanceData.lastDisconnected}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Timestamps */}
            <Card className="bg-white border border-slate-200/80 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <Clock className="h-5 w-5 text-slate-600" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Created</label>
                  <p className="text-slate-600 text-sm mt-1">{instanceData.created}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Last Updated</label>
                  <p className="text-slate-600 text-sm mt-1">{instanceData.lastUpdated}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Created By</label>
                  <p className="text-slate-900 font-medium mt-1">{instanceData.createdBy}</p>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="bg-white border border-slate-200/80 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <BarChart3 className="h-5 w-5 text-slate-600" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">API Status</label>
                  <p className="text-emerald-600 font-semibold mt-1">{instanceData.apiKeyStatus}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Messages</label>
                  <p className="text-slate-900 font-medium mt-1">{instanceData.messageStats}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Contacts</label>
                  <p className="text-slate-900 font-medium mt-1">{instanceData.contacts}</p>
                </div>
              </CardContent>
            </Card>

            {/* Real-time Status */}
            <Card className="bg-white border border-slate-200/80 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <Zap className="h-5 w-5 text-slate-600" />
                  Live Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Connection</label>
                  <p className="text-red-600 font-bold mt-1">{instanceData.connectionState}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Reconnect Attempts
                  </label>
                  <p className="text-slate-900 font-medium mt-1">{instanceData.reconnectAttempts}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">QR Attempts</label>
                  <p className="text-slate-900 font-medium mt-1">{instanceData.qrAttempts}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Error Alert */}
          <motion.div variants={itemVariants}>
            <Alert className="bg-red-50 border border-red-200 shadow-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                <div className="text-red-800">
                  <div className="flex items-center gap-2 mb-2">
                    <strong>Last Error</strong>
                    <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 text-xs">
                      {instanceData.lastError.timestamp}
                    </Badge>
                  </div>
                  <p className="font-medium">{instanceData.lastError.message}</p>
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* QR Code Dialog */}
          <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
            <DialogContent className="sm:max-w-[400px] bg-white">
              <DialogHeader>
                <DialogTitle className="text-center text-slate-900">Connect WhatsApp</DialogTitle>
                <DialogDescription className="text-center text-slate-600">
                  Scan this QR code with your WhatsApp mobile app
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center py-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
                  <img src="/placeholder.svg?height=200&width=200" alt="WhatsApp QR Code" className="w-48 h-48" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm text-slate-600">Open WhatsApp → Settings → Linked Devices → Link a Device</p>
                  <p className="text-xs text-slate-500">QR Code expires in 60 seconds</p>
                </div>
              </div>
              <DialogFooter className="flex justify-center gap-3">
                <Button variant="outline" onClick={() => setShowQRDialog(false)} className="border-slate-200">
                  Cancel
                </Button>
                <Button
                  className="bg-slate-900 hover:bg-slate-800 text-white"
                  onClick={() => {
                    setShowQRDialog(false)
                  }}
                >
                  Refresh QR Code
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </div>
  )
}