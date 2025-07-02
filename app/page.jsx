"use client"

import { motion } from "framer-motion"
import { Bell, Plus, Trash2, Settings, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Link from "next/link"

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
  const [isWorkerDialogOpen, setIsWorkerDialogOpen] = useState(false)

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [instances, setInstances] = useState([
    {
      id: 1,
      name: "Semen",
      status: "Error",
      createdAt: "7/1/2025",
    },
  ])

  // Calculate statistics based on instances
  const totalInstances = instances.length
  const activeInstances = instances.filter((instance) => instance.status === "Active").length
  const disconnectedInstances = instances.filter(
    (instance) => instance.status === "Disconnected" || instance.status === "Error",
  ).length

  const handleCreateInstance = () => {
    const nameInput = document.getElementById("name")
    const descriptionInput = document.getElementById("description")

    if (nameInput.value.trim()) {
      const newInstance = {
        id: instances.length + 1,
        name: nameInput.value.trim(),
        status: "Active",
        createdAt: new Date().toLocaleDateString(),
      }
      setInstances([...instances, newInstance])
      nameInput.value = ""
      descriptionInput.value = ""
      setIsDialogOpen(false)
    }
  }

  const handleDeleteInstance = (instanceId) => {
    setInstances(instances.filter((inst) => inst.id !== instanceId))
  }

  const handleCreateWorker = () => {
    const nameInput = document.getElementById("worker-name")
    const endpointInput = document.getElementById("worker-endpoint")

    if (nameInput.value.trim() && endpointInput.value.trim()) {
      const newWorker = {
        id: workers.length + 1,
        name: nameInput.value.trim(),
        endpoint: endpointInput.value.trim(),
        status: "Online",
        lastSeen: "Just now",
        createdAt: new Date().toLocaleDateString(),
      }
      setWorkers([...workers, newWorker])
      nameInput.value = ""
      endpointInput.value = ""
      setIsWorkerDialogOpen(false)
    }
  }

  const handleDeleteWorker = (workerId) => {
    setWorkers(workers.filter((worker) => worker.id !== workerId))
  }

  const handleTestConnection = (workerId) => {
    // Simulate connection test
    alert(`Testing connection for worker ${workerId}...`)
  }

  const getWorkerStatusColor = (status) => {
    switch (status) {
      case "Online":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Offline":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Error":
        return "bg-red-50 text-red-700 border-red-200"
      case "Disconnected":
        return "bg-gray-50 text-gray-700 border-gray-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
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

          {activeTab === "dashboard" && (
            <>
              {/* Stats Cards */}
              <motion.div variants={itemVariants}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                    <Card className="bg-white border border-slate-200/80 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-600">Total Instances</p>
                            <p className="text-3xl font-bold text-slate-900 mt-2">{totalInstances}</p>
                          </div>
                          <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center">
                            <div className="h-6 w-6 bg-slate-600 rounded"></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                    <Card className="bg-white border border-slate-200/80 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-600">Active</p>
                            <p className="text-3xl font-bold text-emerald-600 mt-2">{activeInstances}</p>
                          </div>
                          <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                            <div className="h-6 w-6 bg-emerald-500 rounded-full"></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                    <Card className="bg-white border border-slate-200/80 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-600">Disconnected</p>
                            <p className="text-3xl font-bold text-red-500 mt-2">{disconnectedInstances}</p>
                          </div>
                          <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center">
                            <div className="h-6 w-6 bg-red-500 rounded-full"></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>

              {/* Instances Section */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Your Instances</h3>
                    <p className="text-sm text-slate-600">Manage and monitor your WhatsApp API instances</p>
                  </div>

                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
                          <Plus className="h-4 w-4 mr-2" />
                          New Instance
                        </Button>
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create New Instance</DialogTitle>
                        <DialogDescription>Create a new WhatsApp API instance for your business.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Instance Name</Label>
                          <Input id="name" placeholder="Enter instance name" className="border-slate-200" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Input id="description" placeholder="Optional description" className="border-slate-200" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-slate-900 hover:bg-slate-800" onClick={handleCreateInstance}>
                          Create Instance
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Instances Table */}
                <Card className="bg-white border border-slate-200/80 shadow-md">
                  <CardContent className="p-0">
                    <div className="overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-slate-200/60">
                            <TableHead className="font-semibold text-slate-700 py-4 px-6">Name</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4">Status</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4">Created</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4 text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {instances.map((instance, index) => (
                            <motion.tr
                              key={instance.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.05, duration: 0.3 }}
                              className="border-slate-200/60 hover:bg-slate-50/50 transition-colors"
                            >
                              <TableCell className="py-4 px-6">
                                <Link
                                  href={`/instance/${instance.id}`}
                                  className="font-medium text-slate-900 hover:text-slate-700 transition-colors"
                                >
                                  {instance.name}
                                </Link>
                              </TableCell>
                              <TableCell className="py-4">
                                <Badge
                                  variant="outline"
                                  className={`${getStatusColor(instance.status)} font-medium border`}
                                >
                                  {instance.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="py-4 text-slate-600">{instance.createdAt}</TableCell>
                              <TableCell className="py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Link href={`/instance/${instance.id}`}>
                                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-slate-200 text-slate-700 bg-transparent"
                                      >
                                        <Settings className="h-3 w-3 mr-1" />
                                        Manage
                                      </Button>
                                    </motion.div>
                                  </Link>

                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="text-slate-400 hover:text-slate-600"
                                        >
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </motion.div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        className="text-red-600 focus:text-red-600"
                                        onClick={() => handleDeleteInstance(instance.id)}
                                      >
                                        <Trash2 className="h-3 w-3 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}

          {activeTab === "admin" && (
            <>
              {/* Worker Stats */}
              <motion.div variants={itemVariants}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                    <Card className="bg-white border border-slate-200/80 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-600">Total Workers</p>
                            <p className="text-3xl font-bold text-slate-900 mt-2">{workers.length}</p>
                          </div>
                          <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center">
                            <div className="h-6 w-6 bg-slate-600 rounded"></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                    <Card className="bg-white border border-slate-200/80 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-600">Online</p>
                            <p className="text-3xl font-bold text-emerald-600 mt-2">
                              {workers.filter((worker) => worker.status === "Online").length}
                            </p>
                          </div>
                          <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                            <div className="h-6 w-6 bg-emerald-500 rounded-full"></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                    <Card className="bg-white border border-slate-200/80 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-600">Offline</p>
                            <p className="text-3xl font-bold text-red-500 mt-2">
                              {workers.filter((worker) => worker.status === "Offline").length}
                            </p>
                          </div>
                          <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center">
                            <div className="h-6 w-6 bg-red-500 rounded-full"></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>

              {/* Workers Section */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Workers</h3>
                    <p className="text-sm text-slate-600">Manage and monitor your API workers</p>
                  </div>

                  <Dialog open={isWorkerDialogOpen} onOpenChange={setIsWorkerDialogOpen}>
                    <DialogTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Worker
                        </Button>
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Worker</DialogTitle>
                        <DialogDescription>Add a new API worker to your system.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="worker-name">Worker Name</Label>
                          <Input id="worker-name" placeholder="Enter worker name" className="border-slate-200" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="worker-endpoint">Endpoint URL</Label>
                          <Input
                            id="worker-endpoint"
                            placeholder="https://api.example.com"
                            className="border-slate-200"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsWorkerDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-slate-900 hover:bg-slate-800" onClick={handleCreateWorker}>
                          Add Worker
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Workers Table */}
                <Card className="bg-white border border-slate-200/80 shadow-md">
                  <CardContent className="p-0">
                    <div className="overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-slate-200/60">
                            <TableHead className="font-semibold text-slate-700 py-4 px-6">Name</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4">Endpoint</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4">Status</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4">Last Seen</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4">Created</TableHead>
                            <TableHead className="font-semibold text-slate-700 py-4 text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {workers.map((worker, index) => (
                            <motion.tr
                              key={worker.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.05, duration: 0.3 }}
                              className="border-slate-200/60 hover:bg-slate-50/50 transition-colors"
                            >
                              <TableCell className="py-4 px-6">
                                <div className="font-medium text-slate-900">{worker.name}</div>
                              </TableCell>
                              <TableCell className="py-4">
                                <div className="text-sm text-slate-600 font-mono max-w-xs truncate">
                                  {worker.endpoint}
                                </div>
                              </TableCell>
                              <TableCell className="py-4">
                                <Badge
                                  variant="outline"
                                  className={`${getWorkerStatusColor(worker.status)} font-medium border`}
                                >
                                  {worker.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="py-4 text-slate-600 text-sm">{worker.lastSeen}</TableCell>
                              <TableCell className="py-4 text-slate-600">{worker.createdAt}</TableCell>
                              <TableCell className="py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-slate-200 text-slate-700 bg-transparent"
                                      onClick={() => handleTestConnection(worker.id)}
                                    >
                                      Test
                                    </Button>
                                  </motion.div>

                                  <Link href={`/admin/worker/${worker.id}`}>
                                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-slate-200 text-slate-700 bg-transparent"
                                      >
                                        <Settings className="h-3 w-3 mr-1" />
                                        Manage
                                      </Button>
                                    </motion.div>
                                  </Link>

                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="text-slate-400 hover:text-slate-600"
                                        >
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </motion.div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        className="text-red-600 focus:text-red-600"
                                        onClick={() => handleDeleteWorker(worker.id)}
                                      >
                                        <Trash2 className="h-3 w-3 mr-2" />
                                        Remove
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </motion.div>
      </main>
    </div>
  )
}
