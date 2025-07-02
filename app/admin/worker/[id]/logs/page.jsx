"use client";

import { motion } from "framer-motion";
import {
  Search,
  Download,
  RefreshCw,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Bell,
  ChevronRight,
  Server,
  BarChart3,
  Users,
  Settings,
  Shield,
  Globe,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

// Mock worker data
const workerData = {
  id: "1",
  name: "Worker-01",
};

// Mock log data
const initialLogs = [
  {
    id: 1,
    timestamp: "2025-01-07 14:32:15",
    level: "INFO",
    category: "SESSION",
    message: "Session sess_001 established successfully for instance inst_123",
    details: "Connection established from IP 192.168.1.100",
  },
  {
    id: 2,
    timestamp: "2025-01-07 14:31:45",
    level: "WARN",
    category: "MEMORY",
    message: "Memory usage exceeded 80% threshold",
    details: "Current usage: 85.2% (3.4GB/4GB)",
  },
  {
    id: 3,
    timestamp: "2025-01-07 14:30:22",
    level: "ERROR",
    category: "API",
    message: "Failed to process webhook request",
    details: "HTTP 500 - Internal server error for endpoint /webhook/message",
  },
  {
    id: 4,
    timestamp: "2025-01-07 14:29:18",
    level: "INFO",
    category: "SYSTEM",
    message: "Worker health check completed",
    details: "All systems operational - CPU: 45%, Memory: 68%",
  },
  {
    id: 5,
    timestamp: "2025-01-07 14:28:55",
    level: "DEBUG",
    category: "SESSION",
    message: "Session heartbeat received from sess_002",
    details: "Latency: 12ms, Status: Active",
  },
];

export default function WorkerLogs({ params }) {
  const [logs, setLogs] = useState(initialLogs);
  const [filteredLogs, setFilteredLogs] = useState(initialLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulate real-time log updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        timestamp: new Date()
          .toLocaleString("sv-SE")
          .replace("T", " ")
          .slice(0, 19),
        level: ["INFO", "WARN", "ERROR", "DEBUG"][
          Math.floor(Math.random() * 4)
        ],
        category: ["SESSION", "API", "SYSTEM", "MEMORY", "NETWORK"][
          Math.floor(Math.random() * 5)
        ],
        message: "New log entry generated",
        details: "Simulated real-time log entry",
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 49)]); // Keep only 50 logs
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Filter logs based on search and filters
  useEffect(() => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (levelFilter !== "all") {
      filtered = filtered.filter(
        (log) => log.level.toLowerCase() === levelFilter.toLowerCase()
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (log) => log.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    setFilteredLogs(filtered);
  }, [logs, searchTerm, levelFilter, categoryFilter, dateFilter]);

  const getLevelColor = (level) => {
    switch (level) {
      case "ERROR":
        return "bg-red-50 text-red-700 border-red-200";
      case "WARN":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "INFO":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "DEBUG":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case "ERROR":
        return <XCircle className="h-3 w-3" />;
      case "WARN":
        return <AlertTriangle className="h-3 w-3" />;
      case "INFO":
        return <Info className="h-3 w-3" />;
      case "DEBUG":
        return <CheckCircle className="h-3 w-3" />;
      default:
        return <Info className="h-3 w-3" />;
    }
  };

  const handleExportLogs = () => {
    const logData = filteredLogs
      .map(
        (log) =>
          `${log.timestamp} [${log.level}] ${log.category}: ${log.message} - ${log.details}`
      )
      .join("\n");

    const blob = new Blob([logData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `worker-${params.id}-logs-${
      new Date().toISOString().split("T")[0]
    }.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      className="p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Log Viewer</h1>
            <p className="text-slate-600 mt-2">
              Monitor and analyze worker logs in real-time
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant={autoRefresh ? "default" : "outline"}
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="shadow-sm"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`}
              />
              {autoRefresh ? "Auto Refresh On" : "Auto Refresh Off"}
            </Button>
            <Button
              onClick={handleExportLogs}
              variant="outline"
              className="shadow-sm bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Log Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card className="bg-white border border-slate-200/80 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Logs</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {logs.length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200/80 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Errors</p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {logs.filter((log) => log.level === "ERROR").length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200/80 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Warnings</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">
                  {logs.filter((log) => log.level === "WARN").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200/80 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Info</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {logs.filter((log) => log.level === "INFO").length}
                </p>
              </div>
              <Info className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="mb-6">
        <Card className="bg-white border border-slate-200/80 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200"
                />
              </div>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="warn">Warning</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="debug">Debug</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="session">Session</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="memory">Memory</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Logs Display */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white border border-slate-200/80 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Log Entries ({filteredLogs.length})</span>
              {autoRefresh && (
                <Badge
                  variant="outline"
                  className="bg-emerald-50 text-emerald-700 border-emerald-200"
                >
                  Live
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[600px] overflow-y-auto">
              <div className="space-y-1 p-4">
                {filteredLogs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02, duration: 0.3 }}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                  >
                    <div className="flex-shrink-0 text-xs text-slate-500 font-mono w-32">
                      {log.timestamp}
                    </div>
                    <div className="flex-shrink-0">
                      <Badge
                        variant="outline"
                        className={`${getLevelColor(
                          log.level
                        )} font-medium border flex items-center gap-1`}
                      >
                        {getLevelIcon(log.level)}
                        {log.level}
                      </Badge>
                    </div>
                    <div className="flex-shrink-0">
                      <Badge
                        variant="outline"
                        className="bg-slate-50 text-slate-700 border-slate-200"
                      >
                        {log.category}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-slate-900 font-medium">
                        {log.message}
                      </div>
                      <div className="text-slate-600 text-sm mt-1">
                        {log.details}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
