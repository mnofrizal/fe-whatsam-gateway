"use client"

import { motion } from "framer-motion"
import {
  Users,
  ArrowRightLeft,
  Settings,
  Power,
  Search,
  MoreHorizontal,
  Bell,
  ChevronRight,
  Server,
  BarChart3,
  Shield,
  Globe,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
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
  status: "Online",
}

// Mock sessions data
const initialSessions = [
  {
    id: "sess_001",
    instanceId: "inst_123",
    instanceName: "Business-Main",
    phoneNumber: "+1234567890",
    status: "Active",
    connectedAt: "2025-01-07 10:30:00",
    lastActivity: "2 minutes ago",
    messageCount: 1247,
    dataUsage: "45.2 MB",
  },
  {
    id: "sess_002",
    instanceId: "inst_124",
    instanceName: "Support-Bot",
    phoneNumber: "+1234567891",
    status: "Idle",
    connectedAt: "2025-01-07 09:15:00",
    lastActivity: "15 minutes ago",
    messageCount: 892,
    dataUsage: "32.1 MB",
  },
  {
    id: "sess_003",
    instanceId: "inst_125",
    instanceName: "Marketing-Auto",
    phoneNumber: "+1234567892",
    status: "Disconnected",
    connectedAt: "2025-01-07 08:45:00",
    lastActivity: "1 hour ago",
    messageCount: 456,
    dataUsage: "18.7 MB",
  },
]

export default function WorkerSessions({ params }) {
  const [sessions, setSessions] = useState(initialSessions)
  const [selectedSessions, setSelectedSessions] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isMigrationDialogOpen, setIsMigrationDialogOpen] = useState(false)
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false)

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.instanceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.phoneNumber.includes(searchTerm) ||
      session.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || session.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleSelectSession = (sessionId) => {
    setSelectedSessions((prev) =>
      prev.includes(sessionId) ? prev.filter((id) => id !== sessionId) : [...prev, sessionId],
    )
  }

  const handleSelectAll = () => {
    if (selectedSessions.length === filteredSessions.length) {
      setSelectedSessions([])
    } else {
      setSelectedSessions(filteredSessions.map((session) => session.id))
    }
  }

  const handleBulkOperation = (operation) => {
    alert(`Performing ${operation} on ${selectedSessions.length} sessions`)
    setSelectedSessions([])
  }

  const handleMigrateSession = (sessionId, targetWorker) => {
    alert(`Migrating session ${sessionId} to ${targetWorker}`)
    setIsMigrationDialogOpen(false)
  }

  const toggleMaintenanceMode = () => {
    setIsMaintenanceMode(!isMaintenanceMode)
    alert(`Worker maintenance mode ${!isMaintenanceMode ? "enabled" : "disabled"}`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Idle":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Disconnected":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-3 w-3" />
      case "Idle":
        return <Clock className="h-3 w-3" />
      case "Disconnected":
        return <XCircle className="h-3 w-3" />
      default:
        return <AlertTriangle className="h-3 w-3" />
    }
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
                <Link href={`/admin/worker/${params.id}`} className="hover:text-slate-900 transition-colors">
                  {workerData.name}
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-900 font-medium">Sessions</span>
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
              <Link href={`/admin/worker/${params.id}`}>
                <motion.div
                  className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Monitoring
                </motion.div>
              </Link>
              <motion.div
                className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-900 bg-slate-100 rounded-lg"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Users className="h-4 w-4 mr-3 text-slate-600" />
                Sessions
              </motion.div>
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
              <Link href={`/admin/worker/${params.id}/logs`}>
                <motion.div
                  className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <Clock className="h-4 w-4 mr-3" />
                  Logs
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
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <motion.div className="p-8" variants={containerVariants} initial="hidden" animate="visible">
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">Session Management</h1>
                  <p className="text-slate-600 mt-2">Manage and monitor active sessions on {workerData.name}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={isMaintenanceMode ? "destructive" : "outline"}
                    onClick={toggleMaintenanceMode}
                    className="shadow-sm"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    {isMaintenanceMode ? "Exit Maintenance" : "Maintenance Mode"}
                  </Button>
                  <Dialog open={isMigrationDialogOpen} onOpenChange={setIsMigrationDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                        <ArrowRightLeft className="h-4 w-4 mr-2" />
                        Migrate Sessions
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Session Migration</DialogTitle>
                        <DialogDescription>Select target worker to migrate selected sessions</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select target worker" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="worker-02">Worker-02</SelectItem>
                            <SelectItem value="worker-03">Worker-03</SelectItem>
                            <SelectItem value="worker-04">Worker-04</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsMigrationDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={() => handleMigrateSession("selected", "worker-02")}>Migrate Sessions</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </motion.div>

            {/* Session Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Sessions</p>
                      <p className="text-3xl font-bold text-slate-900 mt-2">{sessions.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-slate-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Active</p>
                      <p className="text-3xl font-bold text-emerald-600 mt-2">
                        {sessions.filter((s) => s.status === "Active").length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-emerald-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Idle</p>
                      <p className="text-3xl font-bold text-yellow-600 mt-2">
                        {sessions.filter((s) => s.status === "Idle").length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Disconnected</p>
                      <p className="text-3xl font-bold text-red-600 mt-2">
                        {sessions.filter((s) => s.status === "Disconnected").length}
                      </p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Filters and Bulk Actions */}
            <motion.div variants={itemVariants} className="mb-6">
              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1 flex items-center gap-4">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Search sessions..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 border-slate-200"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="idle">Idle</SelectItem>
                          <SelectItem value="disconnected">Disconnected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedSessions.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">{selectedSessions.length} selected</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleBulkOperation("restart")}
                          className="border-slate-200"
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Restart
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleBulkOperation("shutdown")}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Power className="h-3 w-3 mr-1" />
                          Shutdown
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sessions Table */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardContent className="p-0">
                  <div className="overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-200/60">
                          <TableHead className="w-12 py-4 px-6">
                            <Checkbox
                              checked={selectedSessions.length === filteredSessions.length}
                              onCheckedChange={handleSelectAll}
                            />
                          </TableHead>
                          <TableHead className="font-semibold text-slate-700 py-4">Session ID</TableHead>
                          <TableHead className="font-semibold text-slate-700 py-4">Instance</TableHead>
                          <TableHead className="font-semibold text-slate-700 py-4">Phone Number</TableHead>
                          <TableHead className="font-semibold text-slate-700 py-4">Status</TableHead>
                          <TableHead className="font-semibold text-slate-700 py-4">Messages</TableHead>
                          <TableHead className="font-semibold text-slate-700 py-4">Data Usage</TableHead>
                          <TableHead className="font-semibold text-slate-700 py-4">Last Activity</TableHead>
                          <TableHead className="font-semibold text-slate-700 py-4 text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSessions.map((session, index) => (
                          <motion.tr
                            key={session.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            className="border-slate-200/60 hover:bg-slate-50/50 transition-colors"
                          >
                            <TableCell className="py-4 px-6">
                              <Checkbox
                                checked={selectedSessions.includes(session.id)}
                                onCheckedChange={() => handleSelectSession(session.id)}
                              />
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="font-mono text-sm text-slate-600">{session.id}</div>
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="font-medium text-slate-900">{session.instanceName}</div>
                              <div className="text-xs text-slate-500">{session.instanceId}</div>
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="font-mono text-sm text-slate-900">{session.phoneNumber}</div>
                            </TableCell>
                            <TableCell className="py-4">
                              <Badge
                                variant="outline"
                                className={`${getStatusColor(session.status)} font-medium border flex items-center gap-1 w-fit`}
                              >
                                {getStatusIcon(session.status)}
                                {session.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="text-slate-900 font-medium">{session.messageCount.toLocaleString()}</div>
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="text-slate-600">{session.dataUsage}</div>
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="text-slate-600 text-sm">{session.lastActivity}</div>
                            </TableCell>
                            <TableCell className="py-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-600">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleMigrateSession(session.id, "worker-02")}>
                                    <ArrowRightLeft className="h-3 w-3 mr-2" />
                                    Migrate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <RefreshCw className="h-3 w-3 mr-2" />
                                    Restart
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                    <Power className="h-3 w-3 mr-2" />
                                    Terminate
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
