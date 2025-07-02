"use client"

import { motion } from "framer-motion"
import {
  Bell,
  Plus,
  Settings,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Mail,
  MessageSquare,
  Webhook,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronRight,
  Server,
  BarChart3,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
}

// Mock alert rules
const initialAlertRules = [
  {
    id: 1,
    name: "High CPU Usage",
    description: "Alert when CPU usage exceeds 80%",
    metric: "cpu_usage",
    condition: "greater_than",
    threshold: 80,
    severity: "warning",
    enabled: true,
    channels: ["email", "webhook"],
    lastTriggered: "2 hours ago",
    triggerCount: 3,
  },
  {
    id: 2,
    name: "Memory Critical",
    description: "Critical alert when memory usage exceeds 90%",
    metric: "memory_usage",
    condition: "greater_than",
    threshold: 90,
    severity: "critical",
    enabled: true,
    channels: ["email", "slack", "webhook"],
    lastTriggered: "Never",
    triggerCount: 0,
  },
  {
    id: 3,
    name: "Response Time Degradation",
    description: "Alert when average response time exceeds 500ms",
    metric: "response_time",
    condition: "greater_than",
    threshold: 500,
    severity: "warning",
    enabled: false,
    channels: ["email"],
    lastTriggered: "1 day ago",
    triggerCount: 1,
  },
  {
    id: 4,
    name: "Session Count Low",
    description: "Alert when active sessions drop below 10",
    metric: "active_sessions",
    condition: "less_than",
    threshold: 10,
    severity: "info",
    enabled: true,
    channels: ["slack"],
    lastTriggered: "Never",
    triggerCount: 0,
  },
]

// Mock recent alerts
const recentAlerts = [
  {
    id: 1,
    rule: "High CPU Usage",
    severity: "warning",
    message: "CPU usage reached 85% at 14:32",
    timestamp: "2025-01-07 14:32:15",
    status: "resolved",
  },
  {
    id: 2,
    rule: "High CPU Usage",
    severity: "warning",
    message: "CPU usage reached 82% at 12:15",
    timestamp: "2025-01-07 12:15:30",
    status: "resolved",
  },
  {
    id: 3,
    rule: "Response Time Degradation",
    severity: "warning",
    message: "Average response time reached 520ms",
    timestamp: "2025-01-06 16:45:22",
    status: "resolved",
  },
]

export default function WorkerAlerts({ params }) {
  const [alertRules, setAlertRules] = useState(initialAlertRules)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newRule, setNewRule] = useState({
    name: "",
    description: "",
    metric: "",
    condition: "",
    threshold: "",
    severity: "warning",
    channels: [],
  })

  const handleToggleRule = (ruleId) => {
    setAlertRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const handleDeleteRule = (ruleId) => {
    setAlertRules((prev) => prev.filter((rule) => rule.id !== ruleId))
  }

  const handleCreateRule = () => {
    const rule = {
      id: Date.now(),
      ...newRule,
      threshold: Number.parseFloat(newRule.threshold),
      enabled: true,
      lastTriggered: "Never",
      triggerCount: 0,
    }
    setAlertRules((prev) => [...prev, rule])
    setNewRule({
      name: "",
      description: "",
      metric: "",
      condition: "",
      threshold: "",
      severity: "warning",
      channels: [],
    })
    setIsCreateDialogOpen(false)
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "bg-red-50 text-red-700 border-red-200"
      case "warning":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "info":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical":
        return <XCircle className="h-3 w-3" />
      case "warning":
        return <AlertTriangle className="h-3 w-3" />
      case "info":
        return <Info className="h-3 w-3" />
      default:
        return <CheckCircle className="h-3 w-3" />
    }
  }

  const getChannelIcon = (channel) => {
    switch (channel) {
      case "email":
        return <Mail className="h-3 w-3" />
      case "slack":
        return <MessageSquare className="h-3 w-3" />
      case "webhook":
        return <Webhook className="h-3 w-3" />
      default:
        return <Bell className="h-3 w-3" />
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
                <span className="text-slate-900 font-medium">Alerts</span>
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
                className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-900 bg-slate-100 rounded-lg"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Bell className="h-4 w-4 mr-3 text-slate-600" />
                Alerts
              </motion.div>
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
                  <h1 className="text-3xl font-bold text-slate-900">Alert Configuration</h1>
                  <p className="text-slate-600 mt-2">Configure and manage alert rules for {workerData.name}</p>
                </div>

                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Alert Rule
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Create Alert Rule</DialogTitle>
                      <DialogDescription>Configure a new alert rule for monitoring worker metrics</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="rule-name">Rule Name</Label>
                        <Input
                          id="rule-name"
                          placeholder="Enter rule name"
                          value={newRule.name}
                          onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rule-description">Description</Label>
                        <Textarea
                          id="rule-description"
                          placeholder="Enter rule description"
                          value={newRule.description}
                          onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Metric</Label>
                          <Select
                            value={newRule.metric}
                            onValueChange={(value) => setNewRule({ ...newRule, metric: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select metric" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cpu_usage">CPU Usage</SelectItem>
                              <SelectItem value="memory_usage">Memory Usage</SelectItem>
                              <SelectItem value="response_time">Response Time</SelectItem>
                              <SelectItem value="active_sessions">Active Sessions</SelectItem>
                              <SelectItem value="error_rate">Error Rate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Condition</Label>
                          <Select
                            value={newRule.condition}
                            onValueChange={(value) => setNewRule({ ...newRule, condition: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="greater_than">Greater than</SelectItem>
                              <SelectItem value="less_than">Less than</SelectItem>
                              <SelectItem value="equals">Equals</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="threshold">Threshold</Label>
                          <Input
                            id="threshold"
                            type="number"
                            placeholder="Enter threshold value"
                            value={newRule.threshold}
                            onChange={(e) => setNewRule({ ...newRule, threshold: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Severity</Label>
                          <Select
                            value={newRule.severity}
                            onValueChange={(value) => setNewRule({ ...newRule, severity: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="info">Info</SelectItem>
                              <SelectItem value="warning">Warning</SelectItem>
                              <SelectItem value="critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateRule}>Create Rule</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            {/* Alert Statistics */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Rules</p>
                      <p className="text-3xl font-bold text-slate-900 mt-2">{alertRules.length}</p>
                    </div>
                    <Bell className="h-8 w-8 text-slate-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Active Rules</p>
                      <p className="text-3xl font-bold text-emerald-600 mt-2">
                        {alertRules.filter((rule) => rule.enabled).length}
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
                      <p className="text-sm font-medium text-slate-600">Recent Alerts</p>
                      <p className="text-3xl font-bold text-yellow-600 mt-2">{recentAlerts.length}</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Critical Rules</p>
                      <p className="text-3xl font-bold text-red-600 mt-2">
                        {alertRules.filter((rule) => rule.severity === "critical").length}
                      </p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Alert Rules Table */}
            <motion.div variants={itemVariants} className="mb-8">
              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-slate-600" />
                    Alert Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-200/60">
                          <TableHead className="font-semibold text-slate-700 py-4 px-6">Rule Name</TableHead>
                          <TableHead className="font-semibold text-slate-700 py-4">Metric</TableHead>
                          <TableHead className="font-semibold text-slate-700 py-4">Condition</TableHead>
                          <TableHead className="font-semibold text-slate-700 py-4">Severity</TableHead>
                          <TableHead className="font-semibold text-slate-700 py-4">Channels</TableHead>
                          <TableHead className="font-semibold text-slate-700 py-4">Status</TableHead>
                          <TableHead className="font-semibold text-slate-700 py-4">Last Triggered</TableHead>
                          <TableHead className="font-semibold text-slate-700 py-4 text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {alertRules.map((rule, index) => (
                          <motion.tr
                            key={rule.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            className="border-slate-200/60 hover:bg-slate-50/50 transition-colors"
                          >
                            <TableCell className="py-4 px-6">
                              <div>
                                <div className="font-medium text-slate-900">{rule.name}</div>
                                <div className="text-sm text-slate-500">{rule.description}</div>
                              </div>
                            </TableCell>
                            <TableCell className="py-4">
                              <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
                                {rule.metric.replace("_", " ")}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4">
                              <span className="text-slate-600">
                                {rule.condition.replace("_", " ")} {rule.threshold}
                              </span>
                            </TableCell>
                            <TableCell className="py-4">
                              <Badge
                                variant="outline"
                                className={`${getSeverityColor(rule.severity)} font-medium border flex items-center gap-1 w-fit`}
                              >
                                {getSeverityIcon(rule.severity)}
                                {rule.severity}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="flex items-center gap-1">
                                {rule.channels.map((channel) => (
                                  <Badge
                                    key={channel}
                                    variant="outline"
                                    className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1"
                                  >
                                    {getChannelIcon(channel)}
                                    {channel}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="py-4">
                              <Switch checked={rule.enabled} onCheckedChange={() => handleToggleRule(rule.id)} />
                            </TableCell>
                            <TableCell className="py-4">
                              <div className="text-slate-600 text-sm">{rule.lastTriggered}</div>
                              <div className="text-xs text-slate-500">{rule.triggerCount} times</div>
                            </TableCell>
                            <TableCell className="py-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-600">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="h-3 w-3 mr-2" />
                                    Edit Rule
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Settings className="h-3 w-3 mr-2" />
                                    Test Rule
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600"
                                    onClick={() => handleDeleteRule(rule.id)}
                                  >
                                    <Trash2 className="h-3 w-3 mr-2" />
                                    Delete
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

            {/* Recent Alerts */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border border-slate-200/80 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-slate-600" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAlerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <Badge
                          variant="outline"
                          className={`${getSeverityColor(alert.severity)} font-medium border flex items-center gap-1`}
                        >
                          {getSeverityIcon(alert.severity)}
                          {alert.severity}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-slate-900">{alert.rule}</div>
                          <div className="text-xs text-slate-500">{alert.timestamp}</div>
                        </div>
                        <div className="text-slate-600 text-sm mt-1">{alert.message}</div>
                      </div>
                      <div className="flex-shrink-0">
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          {alert.status}
                        </Badge>
                      </div>
                    </motion.div>
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
