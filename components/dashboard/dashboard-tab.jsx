"use client"

import { motion } from "framer-motion"
import { Plus, Settings, MoreHorizontal, Trash2 } from "lucide-react"
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

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
}

export function DashboardTab({ instances, setInstances }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
  )
}