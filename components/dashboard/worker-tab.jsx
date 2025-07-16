"use client";

import { motion } from "framer-motion";
import {
  Plus,
  Settings,
  MoreHorizontal,
  Trash2,
  RefreshCw,
} from "lucide-react";
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
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  WORKER_ENDPOINTS,
  buildApiUrl,
  WORKER_STATUS,
  getWorkerStatusVariant,
} from "@/lib/constants";
import { useSession } from "next-auth/react";

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export function WorkerTab() {
  const { data: session } = useSession();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWorkerDialogOpen, setIsWorkerDialogOpen] = useState(false);

  // Fetch workers from API
  const fetchWorkers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(buildApiUrl(WORKER_ENDPOINTS.GET_ALL), {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch workers: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data?.workers) {
        setWorkers(data.data.workers);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching workers:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch workers on component mount and when session changes
  useEffect(() => {
    if (session?.accessToken) {
      fetchWorkers();
    }
  }, [session]);

  const handleCreateWorker = async () => {
    const nameInput = document.getElementById("worker-name");
    const endpointInput = document.getElementById("worker-endpoint");

    if (nameInput.value.trim() && endpointInput.value.trim()) {
      try {
        const response = await fetch(buildApiUrl(WORKER_ENDPOINTS.CREATE), {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameInput.value.trim(),
            endpoint: endpointInput.value.trim(),
          }),
        });

        if (response.ok) {
          nameInput.value = "";
          endpointInput.value = "";
          setIsWorkerDialogOpen(false);
          // Refresh workers list
          fetchWorkers();
        } else {
          throw new Error("Failed to create worker");
        }
      } catch (err) {
        console.error("Error creating worker:", err);
        alert("Failed to create worker. Please try again.");
      }
    }
  };

  const handleDeleteWorker = async (workerId) => {
    try {
      const response = await fetch(
        buildApiUrl(WORKER_ENDPOINTS.DELETE(workerId)),
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Refresh workers list
        fetchWorkers();
      } else {
        throw new Error("Failed to delete worker");
      }
    } catch (err) {
      console.error("Error deleting worker:", err);
      alert("Failed to delete worker. Please try again.");
    }
  };

  const handleTestConnection = (workerId) => {
    // Simulate connection test
    alert(`Testing connection for worker ${workerId}...`);
  };

  // Calculate worker statistics
  const totalWorkers = workers.length;
  const onlineWorkers = workers.filter(
    (worker) => worker.status === WORKER_STATUS.ONLINE
  ).length;
  const offlineWorkers = workers.filter(
    (worker) => worker.status === WORKER_STATUS.OFFLINE
  ).length;
  const maintenanceWorkers = workers.filter(
    (worker) => worker.status === WORKER_STATUS.MAINTENANCE
  ).length;

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Format last heartbeat helper
  const formatLastHeartbeat = (dateString) => {
    const now = new Date();
    const heartbeat = new Date(dateString);
    const diffInMinutes = Math.floor((now - heartbeat) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <>
      {/* Worker Stats */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
            <Card className="bg-white border border-slate-200/80 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Total Workers
                    </p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {loading ? "..." : totalWorkers}
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
                      {loading ? "..." : onlineWorkers}
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
                    <p className="text-3xl font-bold text-red-600 mt-2">
                      {loading ? "..." : offlineWorkers}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <div className="h-6 w-6 bg-red-500 rounded-full"></div>
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
                      Maintenance
                    </p>
                    <p className="text-3xl font-bold text-amber-500 mt-2">
                      {loading ? "..." : maintenanceWorkers}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <div className="h-6 w-6 bg-amber-500 rounded-full"></div>
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

          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={fetchWorkers}
                disabled={loading}
                className="border-slate-200 text-slate-700"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </motion.div>

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
        </div>

        {/* Workers Table */}
        <Card className="bg-white border border-slate-200/80 shadow-md">
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200/60">
                    <TableHead className="font-semibold text-slate-700 py-4 px-6">
                      Worker ID
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4">
                      Endpoint
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4">
                      Total Sessions
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4">
                      Last Heartbeat
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
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-8 text-center">
                        <div className="flex items-center justify-center">
                          <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                          Loading workers...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={7} className="py-8 text-center">
                        <div className="text-red-600">Error: {error}</div>
                      </TableCell>
                    </TableRow>
                  ) : workers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="py-8 text-center text-slate-500"
                      >
                        No workers found
                      </TableCell>
                    </TableRow>
                  ) : (
                    workers.map((worker, index) => (
                      <motion.tr
                        key={worker.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="border-slate-200/60 hover:bg-slate-50/50 transition-colors"
                      >
                        <TableCell className="py-4 px-6">
                          <div className="font-medium text-slate-900">
                            {worker.id}
                          </div>
                          <div className="text-sm text-slate-500">
                            {worker.description}
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="text-sm text-slate-600 font-mono max-w-xs truncate">
                            {worker.endpoint}
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <Badge
                            variant={getWorkerStatusVariant(worker.status)}
                            className="font-medium"
                          >
                            {worker.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4 text-slate-600">
                          <div className="text-lg font-semibold text-slate-900">
                            {worker.sessionCount || 0}
                          </div>
                          <div className="text-xs text-slate-500">sessions</div>
                        </TableCell>
                        <TableCell className="py-4 text-slate-600 text-sm">
                          {formatLastHeartbeat(worker.lastHeartbeat)}
                        </TableCell>
                        <TableCell className="py-4 text-slate-600">
                          {formatDate(worker.createdAt)}
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

                            <Link href={`/dashboard/admin/worker/${worker.id}`}>
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
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
