"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Users,
  MessageSquare,
  Clock,
  Download,
  Bell,
  ChevronRight,
  Server,
  Settings,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
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

// Mock analytics data
const analyticsData = {
  performance: {
    avgResponseTime: 245,
    uptime: 99.8,
    throughput: 1247,
    errorRate: 0.2,
  },
  usage: {
    totalSessions: 127,
    activeSessions: 89,
    totalMessages: 15420,
    dataTransferred: "2.4 GB",
  },
  trends: {
    responseTime: [220, 235, 245, 240, 250, 245, 238],
    sessionCount: [95, 102, 89, 127, 134, 121, 127],
    messageVolume: [1200, 1350, 1180, 1420, 1380, 1290, 1247],
    errorCount: [2, 1, 3, 0, 2, 1, 0],
  },
};

export default function WorkerAnalytics({ params }) {
  const [timeRange, setTimeRange] = useState("7d");
  const [metricType, setMetricType] = useState("performance");
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    // Simulate export delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("PDF report exported successfully!");
    setIsExporting(false);
  };

  const handleExportCSV = () => {
    const csvData = [
      ["Metric", "Value", "Unit"],
      [
        "Average Response Time",
        analyticsData.performance.avgResponseTime,
        "ms",
      ],
      ["Uptime", analyticsData.performance.uptime, "%"],
      ["Throughput", analyticsData.performance.throughput, "req/min"],
      ["Error Rate", analyticsData.performance.errorRate, "%"],
      ["Total Sessions", analyticsData.usage.totalSessions, "count"],
      ["Active Sessions", analyticsData.usage.activeSessions, "count"],
      ["Total Messages", analyticsData.usage.totalMessages, "count"],
      ["Data Transferred", analyticsData.usage.dataTransferred, "GB"],
    ];

    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `worker-${params.id}-analytics-${
      new Date().toISOString().split("T")[0]
    }.csv`;
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
            <h1 className="text-3xl font-bold text-slate-900">
              Analytics & Reporting
            </h1>
            <p className="text-slate-600 mt-2">
              Comprehensive performance analytics and usage statistics
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleExportCSV}
              variant="outline"
              className="shadow-sm bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? "Generating..." : "Export PDF"}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card className="bg-white border border-slate-200/80 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-slate-600">
                  Response Time
                </span>
              </div>
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                Avg
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-slate-900">
                {analyticsData.performance.avgResponseTime}ms
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-600">-12ms from last week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200/80 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-medium text-slate-600">
                  Uptime
                </span>
              </div>
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 border-emerald-200"
              >
                Excellent
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-slate-900">
                {analyticsData.performance.uptime}%
              </div>
              <Progress
                value={analyticsData.performance.uptime}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200/80 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-slate-600">
                  Throughput
                </span>
              </div>
              <Badge
                variant="outline"
                className="bg-purple-50 text-purple-700 border-purple-200"
              >
                req/min
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-slate-900">
                {analyticsData.performance.throughput}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-600">+8% from last week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200/80 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-slate-600">
                  Error Rate
                </span>
              </div>
              <Badge
                variant="outline"
                className="bg-red-50 text-red-700 border-red-200"
              >
                Low
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-slate-900">
                {analyticsData.performance.errorRate}%
              </div>
              <Progress
                value={analyticsData.performance.errorRate}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Usage Statistics */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        <Card className="bg-white border border-slate-200/80 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-slate-600" />
              Session Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-900">
                  {analyticsData.usage.totalSessions}
                </div>
                <div className="text-sm text-slate-600">Total Sessions</div>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-600">
                  {analyticsData.usage.activeSessions}
                </div>
                <div className="text-sm text-slate-600">Active Sessions</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">
                  Session Utilization
                </span>
                <span className="text-sm font-medium text-slate-900">
                  {Math.round(
                    (analyticsData.usage.activeSessions /
                      analyticsData.usage.totalSessions) *
                      100
                  )}
                  %
                </span>
              </div>
              <Progress
                value={
                  (analyticsData.usage.activeSessions /
                    analyticsData.usage.totalSessions) *
                  100
                }
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200/80 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-slate-600" />
              Message & Data Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {analyticsData.usage.totalMessages.toLocaleString()}
                </div>
                <div className="text-sm text-slate-600">Total Messages</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {analyticsData.usage.dataTransferred}
                </div>
                <div className="text-sm text-slate-600">Data Transferred</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">
                  Messages per Session
                </span>
                <span className="text-sm font-medium text-slate-900">
                  {Math.round(
                    analyticsData.usage.totalMessages /
                      analyticsData.usage.totalSessions
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">
                  Avg Data per Session
                </span>
                <span className="text-sm font-medium text-slate-900">
                  18.9 MB
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Historical Data Visualization */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
      >
        <Card className="bg-white border border-slate-200/80 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-slate-600" />
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center space-y-2">
                <BarChart3 className="h-12 w-12 text-slate-400 mx-auto" />
                <p className="text-slate-500 text-sm">
                  Response Time & Throughput Chart
                </p>
                <div className="flex justify-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Response Time</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <span>Throughput</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200/80 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-slate-600" />
              Session Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center space-y-2">
                <PieChart className="h-12 w-12 text-slate-400 mx-auto" />
                <p className="text-slate-500 text-sm">
                  Session Status Distribution
                </p>
                <div className="flex justify-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                    <span>Active (70%)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>Idle (25%)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Error (5%)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Analytics Table */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white border border-slate-200/80 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-slate-600" />
              Detailed Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">
                      Metric
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">
                      Current
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">
                      Previous
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">
                      Change
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-900">
                      Average Response Time
                    </td>
                    <td className="py-3 px-4 text-slate-900">245ms</td>
                    <td className="py-3 px-4 text-slate-600">257ms</td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        -4.7%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 border-emerald-200"
                      >
                        Good
                      </Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-900">
                      Peak Response Time
                    </td>
                    <td className="py-3 px-4 text-slate-900">892ms</td>
                    <td className="py-3 px-4 text-slate-600">1.2s</td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        -25.7%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-200"
                      >
                        Fair
                      </Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-900">Success Rate</td>
                    <td className="py-3 px-4 text-slate-900">99.8%</td>
                    <td className="py-3 px-4 text-slate-600">99.6%</td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +0.2%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 border-emerald-200"
                      >
                        Excellent
                      </Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-900">Memory Usage</td>
                    <td className="py-3 px-4 text-slate-900">68%</td>
                    <td className="py-3 px-4 text-slate-600">72%</td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        -5.6%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 border-emerald-200"
                      >
                        Good
                      </Badge>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-900">CPU Usage</td>
                    <td className="py-3 px-4 text-slate-900">45%</td>
                    <td className="py-3 px-4 text-slate-600">48%</td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        -6.3%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 border-emerald-200"
                      >
                        Good
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
