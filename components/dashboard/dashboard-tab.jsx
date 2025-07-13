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
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  SESSION_ENDPOINTS,
  SESSION_STATUS,
  USER_ROLE,
  buildApiUrl,
  getSessionStatusVariant,
} from "@/lib/constants";

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export function DashboardTab() {
  const { data: session } = useSession();
  const [instances, setInstances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch instances from API
  const fetchInstances = async () => {
    if (!session?.accessToken) return;

    try {
      setError(null);
      const response = await fetch(buildApiUrl(SESSION_ENDPOINTS.GET_ALL), {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch instances: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.data?.sessions) {
        setInstances(data.data.sessions);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching instances:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Load instances on component mount and when session changes
  useEffect(() => {
    fetchInstances();
  }, [session?.accessToken]);

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchInstances();
  };

  // Calculate statistics based on instances
  const totalInstances = instances.length;
  const connectedInstances = instances.filter(
    (instance) => instance.status === SESSION_STATUS.CONNECTED
  ).length;
  const disconnectedInstances = instances.filter(
    (instance) =>
      instance.status === SESSION_STATUS.DISCONNECTED ||
      instance.status === SESSION_STATUS.ERROR
  ).length;

  const handleCreateInstance = async () => {
    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("description");

    if (!nameInput.value.trim() || !session?.accessToken) return;

    try {
      const response = await fetch(buildApiUrl(SESSION_ENDPOINTS.CREATE), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          description: descriptionInput.value.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create instance: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        // Refresh the instances list
        await fetchInstances();
        nameInput.value = "";
        descriptionInput.value = "";
        setIsDialogOpen(false);
      } else {
        throw new Error(data.message || "Failed to create instance");
      }
    } catch (err) {
      console.error("Error creating instance:", err);
      setError(err.message);
    }
  };

  const handleDeleteInstance = async (instanceId) => {
    if (!session?.accessToken) return;

    try {
      const response = await fetch(
        buildApiUrl(SESSION_ENDPOINTS.DELETE(instanceId)),
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete instance: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        // Refresh the instances list
        await fetchInstances();
      } else {
        throw new Error(data.message || "Failed to delete instance");
      }
    } catch (err) {
      console.error("Error deleting instance:", err);
      setError(err.message);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 mx-auto"></div>
          <p className="text-sm text-slate-600 mt-2">Loading instances...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-sm text-red-600 mb-4">Error: {error}</p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
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
                    <p className="text-sm font-medium text-slate-600">
                      Total Instances
                    </p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">
                      {totalInstances}
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
                    <p className="text-sm font-medium text-slate-600">
                      Connected
                    </p>
                    <p className="text-3xl font-bold text-emerald-600 mt-2">
                      {connectedInstances}
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
                      Disconnected
                    </p>
                    <p className="text-3xl font-bold text-red-500 mt-2">
                      {disconnectedInstances}
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

      {/* Instances Section */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Your Instances
            </h3>
            <p className="text-sm text-slate-600">
              Manage and monitor your WhatsApp API instances
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              size="sm"
              className="border-slate-200 text-slate-700"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>

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
                  <DialogDescription>
                    Create a new WhatsApp API instance for your business.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Instance Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter instance name"
                      className="border-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Optional description"
                      className="border-slate-200"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-slate-900 hover:bg-slate-800"
                    onClick={handleCreateInstance}
                  >
                    Create Instance
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Instances Table */}
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
                      Phone Number
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4">
                      Status
                    </TableHead>
                    {session?.user?.role === USER_ROLE.ADMINISTRATOR && (
                      <TableHead className="font-semibold text-slate-700 py-4">
                        Worker
                      </TableHead>
                    )}
                    <TableHead className="font-semibold text-slate-700 py-4">
                      Created
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4 text-right">
                      Actions
                    </TableHead>
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
                          href={`/dashboard/instance/${instance.id}`}
                          className="font-medium text-slate-900 hover:text-slate-700 transition-colors"
                        >
                          {instance.name}
                        </Link>
                      </TableCell>
                      <TableCell className="py-4 text-slate-600">
                        {instance.phoneNumber || "Not connected"}
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge
                          variant={getSessionStatusVariant(instance.status)}
                          className="font-medium"
                        >
                          {instance.status}
                        </Badge>
                      </TableCell>
                      {session?.user?.role === USER_ROLE.ADMINISTRATOR && (
                        <TableCell className="py-4 text-slate-600">
                          {instance.worker ? (
                            <Link
                              href={`/dashboard/admin/worker/${instance.workerId}`}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              {instance.worker.endpoint}
                            </Link>
                          ) : (
                            <span className="text-slate-400">No worker</span>
                          )}
                        </TableCell>
                      )}
                      <TableCell className="py-4 text-slate-600">
                        {new Date(instance.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/dashboard/instance/${instance.id}`}>
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
                                onClick={() =>
                                  handleDeleteInstance(instance.id)
                                }
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
  );
}
