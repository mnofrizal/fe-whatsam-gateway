"use client";

import { motion } from "framer-motion";
import { Plus, Settings, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export function WorkerTab({ workers, setWorkers }) {
  const [isWorkerDialogOpen, setIsWorkerDialogOpen] = useState(false);

  const handleCreateWorker = () => {
    const nameInput = document.getElementById("worker-name");
    const endpointInput = document.getElementById("worker-endpoint");

    if (nameInput.value.trim() && endpointInput.value.trim()) {
      const newWorker = {
        id: workers.length + 1,
        name: nameInput.value.trim(),
        endpoint: endpointInput.value.trim(),
        status: "Online",
        lastSeen: "Just now",
        createdAt: new Date().toLocaleDateString(),
      };
      setWorkers([...workers, newWorker]);
      nameInput.value = "";
      endpointInput.value = "";
      setIsWorkerDialogOpen(false);
    }
  };

  const handleDeleteWorker = (workerId) => {
    setWorkers(workers.filter((worker) => worker.id !== workerId));
  };

  const handleTestConnection = (workerId) => {
    // Simulate connection test
    alert(`Testing connection for worker ${workerId}...`);
  };

  const getWorkerStatusColor = (status) => {
    switch (status) {
      case "Online":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Offline":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <>
      {/* Worker Stats */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
            <Card className="bg-white border border-slate-200/80 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Total Workers
                    </p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {workers.length}
                    </p>
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
                      {
                        workers.filter((worker) => worker.status === "Online")
                          .length
                      }
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
                    <p className="text-sm font-medium text-slate-600">
                      Offline
                    </p>
                    <p className="text-3xl font-bold text-red-500 mt-2">
                      {
                        workers.filter((worker) => worker.status === "Offline")
                          .length
                      }
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
            <p className="text-sm text-slate-600">
              Manage and monitor your API workers
            </p>
          </div>

          <Dialog
            open={isWorkerDialogOpen}
            onOpenChange={setIsWorkerDialogOpen}
          >
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
                <DialogDescription>
                  Add a new API worker to your system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="worker-name">Worker Name</Label>
                  <Input
                    id="worker-name"
                    placeholder="Enter worker name"
                    className="border-slate-200"
                  />
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
                <Button
                  variant="outline"
                  onClick={() => setIsWorkerDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-slate-900 hover:bg-slate-800"
                  onClick={handleCreateWorker}
                >
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
                    <TableHead className="font-semibold text-slate-700 py-4 px-6">
                      Name
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4">
                      Endpoint
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4">
                      Last Seen
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4">
                      Created
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4 text-right">
                      Actions
                    </TableHead>
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
                        <div className="font-medium text-slate-900">
                          {worker.name}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-sm text-slate-600 font-mono max-w-xs truncate">
                          {worker.endpoint}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge
                          variant="outline"
                          className={`${getWorkerStatusColor(
                            worker.status
                          )} font-medium border`}
                        >
                          {worker.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 text-slate-600 text-sm">
                        {worker.lastSeen}
                      </TableCell>
                      <TableCell className="py-4 text-slate-600">
                        {worker.createdAt}
                      </TableCell>
                      <TableCell className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
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
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
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
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                              >
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
  );
}
