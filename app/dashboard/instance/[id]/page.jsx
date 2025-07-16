"use client";

import { motion } from "framer-motion";
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
  RefreshCw,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  SESSION_ENDPOINTS,
  buildApiUrl,
  SESSION_STATUS,
  getSessionStatusVariant,
} from "@/lib/constants";
import { useSessionSocket } from "@/hooks/use-socket";
import QRCodeDisplay from "@/components/ui/qr-code-display";
import SocketStatusIndicator from "@/components/ui/socket-status-indicator";

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

export default function InstanceDetail() {
  const params = useParams();
  const { data: session } = useSession();
  const [instanceData, setInstanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState({
    connect: false,
    disconnect: false,
    restart: false,
    logout: false,
  });

  // Socket.IO integration for real-time updates
  const {
    isConnected: socketConnected,
    connectionError: socketError,
    sessionStatus: realtimeStatus,
  } = useSessionSocket(params.id);

  // Fetch instance data from API
  const fetchInstanceData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        buildApiUrl(SESSION_ENDPOINTS.GET_BY_ID(params.id)),
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch instance: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data?.session) {
        const session = data.data.session;

        // Transform API data to match component expectations
        const transformedData = {
          id: session.id,
          name: session.name,
          displayName: session.displayName, // Use name as displayName if not provided
          phoneNumber: session.phoneNumber,
          status: session.status,
          active: session.status === SESSION_STATUS.CONNECTED ? "Yes" : "No",
          apiKey:
            session.apiKey?.key || "sk_test_1234567890abcdef1234567890abcdef",
          connectionState: session.status,
          connectionAttempts: 0, // Dummy data - not in API response
          lastConnected: session.lastSeenAt
            ? new Date(session.lastSeenAt).toLocaleString()
            : "Never",
          lastDisconnected:
            session.status === SESSION_STATUS.DISCONNECTED
              ? new Date().toLocaleString()
              : "Never",
          created: new Date(session.createdAt).toLocaleString(),
          lastUpdated: new Date().toLocaleString(), // Dummy data - using current time
          createdBy: "System User", // Dummy data - not in API response
          apiKeyStatus: session.apiKey?.isActive ? "Active" : "Inactive",
          messageStats: session.statistics?.messagesSent || 0,
          messagesReceived: session.statistics?.messagesReceived || 0,
          contacts: 4, // Dummy data - not in API response
          reconnectAttempts: 0, // Dummy data - not in API response
          qrAttempts: "0 / 3", // Dummy data - not in API response
          uptime: session.statistics?.uptime || "0m",
          workerId: session.workerId,
          lastError: {
            message:
              session.status === SESSION_STATUS.ERROR
                ? "Connection error occurred"
                : null,
            timestamp:
              session.status === SESSION_STATUS.ERROR
                ? new Date().toLocaleString()
                : null,
          },
        };

        setInstanceData(transformedData);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching instance data:", err);
      setError(err.message);

      // Fallback to dummy data on error
      setInstanceData({
        id: params.id,
        name: "Instance " + params.id,
        displayName: "WhatsApp Instance",
        phoneNumber: "+628517991457",
        status: "ERROR",
        active: "No",
        apiKey: "sk_test_1234567890abcdef1234567890abcdef",
        connectionState: "DISCONNECTED",
        connectionAttempts: 0,
        lastConnected: "Never",
        lastDisconnected: new Date().toLocaleString(),
        created: new Date().toLocaleString(),
        lastUpdated: new Date().toLocaleString(),
        createdBy: "System User",
        apiKeyStatus: "Active",
        messageStats: 0,
        messagesReceived: 0,
        contacts: 0,
        reconnectAttempts: 0,
        qrAttempts: "0 / 3",
        uptime: "0m",
        workerId: null,
        lastError: {
          message: "Failed to load instance data",
          timestamp: new Date().toLocaleString(),
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and when session changes
  useEffect(() => {
    if (session?.accessToken && params.id) {
      fetchInstanceData();
    }
  }, [session, params.id]);

  // Handle real-time status updates from Socket.IO
  const handleRealtimeStatusChange = useCallback(
    (statusData) => {
      if (statusData) {
        // Update instance data with real-time status
        setInstanceData((prev) => {
          if (!prev) return prev; // Guard against null instanceData

          return {
            ...prev,
            status: statusData.status,
            connectionState: statusData.status,
            active:
              statusData.status === SESSION_STATUS.CONNECTED ? "Yes" : "No",
            phoneNumber: statusData.phoneNumber || prev.phoneNumber,
            displayName: statusData.displayName || prev.displayName,
            lastConnected:
              statusData.status === SESSION_STATUS.CONNECTED
                ? new Date().toLocaleString()
                : prev.lastConnected,
            lastDisconnected:
              statusData.status === SESSION_STATUS.DISCONNECTED
                ? new Date().toLocaleString()
                : prev.lastDisconnected,
            lastUpdated: new Date().toLocaleString(),
          };
        });

        // Close QR dialog when connected
        if (statusData.status === SESSION_STATUS.CONNECTED) {
          setShowQRDialog(false);
        }
      }
    },
    [] // Remove instanceData dependency to prevent infinite loop
  );

  // Update instance data when real-time status changes
  useEffect(() => {
    if (realtimeStatus) {
      handleRealtimeStatusChange(realtimeStatus);
    }
  }, [realtimeStatus, handleRealtimeStatusChange]);

  // Connect session function with Socket.IO integration
  const handleConnect = async () => {
    try {
      setActionLoading((prev) => ({ ...prev, connect: true }));

      const response = await fetch(
        buildApiUrl(SESSION_ENDPOINTS.CONNECT(params.id)),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // If status is QR_REQUIRED, show QR dialog
          // Socket.IO will handle real-time QR code updates
          if (data.data.status === SESSION_STATUS.QR_REQUIRED) {
            setShowQRDialog(true);
          }
          // Real-time updates via Socket.IO - no need to refresh manually
        } else {
          throw new Error(data.message || "Failed to connect session");
        }
      } else {
        throw new Error(`Failed to connect: ${response.status}`);
      }
    } catch (err) {
      console.error("Error connecting session:", err);
      alert(`Failed to connect session: ${err.message}`);
    } finally {
      setActionLoading((prev) => ({ ...prev, connect: false }));
    }
  };

  // Disconnect session function
  const handleDisconnect = async () => {
    try {
      setActionLoading((prev) => ({ ...prev, disconnect: true }));

      const response = await fetch(
        buildApiUrl(SESSION_ENDPOINTS.DISCONNECT(params.id)),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert(data.data.message || "Session disconnected successfully");
          // Real-time updates via Socket.IO - no need to refresh manually
        } else {
          throw new Error(data.message || "Failed to disconnect session");
        }
      } else {
        throw new Error(`Failed to disconnect: ${response.status}`);
      }
    } catch (err) {
      console.error("Error disconnecting session:", err);
      alert(`Failed to disconnect session: ${err.message}`);
    } finally {
      setActionLoading((prev) => ({ ...prev, disconnect: false }));
    }
  };

  // Restart session function
  const handleRestart = async () => {
    try {
      setActionLoading((prev) => ({ ...prev, restart: true }));

      const response = await fetch(
        buildApiUrl(SESSION_ENDPOINTS.RESTART(params.id)),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert(data.data.message || "Session restarted successfully");
          // Real-time updates via Socket.IO - no need to refresh manually
        } else {
          throw new Error(data.message || "Failed to restart session");
        }
      } else {
        throw new Error(`Failed to restart: ${response.status}`);
      }
    } catch (err) {
      console.error("Error restarting session:", err);
      alert(`Failed to restart session: ${err.message}`);
    } finally {
      setActionLoading((prev) => ({ ...prev, restart: false }));
    }
  };

  // Logout session function
  const handleLogout = async () => {
    try {
      setActionLoading((prev) => ({ ...prev, logout: true }));

      const response = await fetch(
        buildApiUrl(`/sessions/${params.id}/logout`),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert("Session logged out successfully");
          // Real-time updates via Socket.IO - no need to refresh manually
        } else {
          throw new Error(data.message || "Failed to logout session");
        }
      } else {
        throw new Error(`Failed to logout: ${response.status}`);
      }
    } catch (err) {
      console.error("Error logging out session:", err);
      alert(`Failed to logout session: ${err.message}`);
    } finally {
      setActionLoading((prev) => ({ ...prev, logout: false }));
    }
  };

  const copyApiKey = () => {
    if (instanceData?.apiKey) {
      navigator.clipboard.writeText(instanceData.apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const maskApiKey = (key) => {
    if (!key) return "•".repeat(35);
    if (showApiKey) return key;
    return "•".repeat(35);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case SESSION_STATUS.CONNECTED:
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case SESSION_STATUS.ERROR:
        return "bg-red-50 text-red-700 border-red-200";
      case SESSION_STATUS.DISCONNECTED:
        return "bg-gray-50 text-gray-700 border-gray-200";
      case SESSION_STATUS.QR_REQUIRED:
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case SESSION_STATUS.RECONNECTING:
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Show loading state
  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-3">
            <RefreshCw className="h-6 w-6 animate-spin text-slate-600" />
            <span className="text-lg text-slate-600">
              Loading instance details...
            </span>
          </div>
        </div>
      </main>
    );
  }

  // Show error state if no data
  if (!instanceData) {
    return (
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Failed to Load Instance
            </h2>
            <p className="text-slate-600 mb-4">
              {error || "Instance not found"}
            </p>
            <Button
              onClick={fetchInstanceData}
              className="bg-slate-900 hover:bg-slate-800 cursor-pointer"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-slate-900">
                  {instanceData.name}
                </h1>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(
                    instanceData.status
                  )} font-medium border`}
                >
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
              <SocketStatusIndicator
                isConnected={socketConnected}
                error={socketError}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                onClick={fetchInstanceData}
                disabled={loading}
                className="border-slate-200 text-slate-700 cursor-pointer"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              {instanceData?.status !== SESSION_STATUS.CONNECTED && (
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer"
                  onClick={handleConnect}
                  disabled={actionLoading.connect || loading}
                >
                  {actionLoading.connect ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  Connect Instance
                </Button>
              )}
              {instanceData?.status !== SESSION_STATUS.DISCONNECTED && (
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white shadow-sm cursor-pointer"
                  onClick={handleDisconnect}
                  disabled={actionLoading.disconnect || loading}
                >
                  {actionLoading.disconnect ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  Disconnect
                </Button>
              )}
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm cursor-pointer"
                onClick={handleRestart}
                disabled={actionLoading.restart || loading}
              >
                {actionLoading.restart ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Restart
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm cursor-pointer"
                onClick={handleLogout}
                disabled={actionLoading.logout || loading}
              >
                {actionLoading.logout ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Logout
              </Button>
            </div>
          </div>
        </motion.div>

        {/* API Key Section */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-slate-200/80 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Key className="h-5 w-5 text-slate-600" />
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">
                  Instance API Key
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 font-mono text-sm bg-slate-50 p-3 rounded-lg border border-slate-200">
                    {maskApiKey(instanceData.apiKey)}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="border-slate-200 cursor-pointer"
                  >
                    {showApiKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyApiKey}
                    className="border-slate-200 bg-transparent cursor-pointer"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                {copied && (
                  <p className="text-sm text-emerald-600 font-medium">
                    ✓ API Key copied to clipboard
                  </p>
                )}
              </div>

              <Alert className="bg-blue-50 border border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>API Key Information</strong>
                  <br />
                  This key is automatically generated and used to authenticate
                  API requests to your WhatsApp instance.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </motion.div>

        {/* Information Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
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
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Name
                  </label>
                  <p className="text-slate-900 font-medium mt-1">
                    {instanceData.name}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Display Name
                  </label>
                  <p className="text-slate-900 font-medium mt-1">
                    {instanceData.displayName}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Status
                  </label>
                  <p className="text-red-600 font-semibold mt-1">
                    {instanceData.status}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Active
                  </label>
                  <p className="text-slate-900 font-medium mt-1">
                    {instanceData.active}
                  </p>
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
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <p className="text-slate-900 font-medium mt-1">
                    {instanceData.phoneNumber}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Connection Attempts
                  </label>
                  <p className="text-slate-900 font-medium mt-1">
                    {instanceData.connectionAttempts}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Last Connected
                  </label>
                  <p className="text-slate-600 text-sm mt-1">
                    {instanceData.lastConnected}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Last Disconnected
                  </label>
                  <p className="text-slate-600 text-sm mt-1">
                    {instanceData.lastDisconnected}
                  </p>
                </div>
                {instanceData.workerId && (
                  <div>
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Worker ID
                    </label>
                    <p className="text-slate-900 font-medium mt-1">
                      <Link
                        href={`/dashboard/admin/worker/${instanceData.workerId}`}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {instanceData.workerId}
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
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
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Created
                </label>
                <p className="text-slate-600 text-sm mt-1">
                  {instanceData.created}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Last Updated
                </label>
                <p className="text-slate-600 text-sm mt-1">
                  {instanceData.lastUpdated}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Created By
                </label>
                <p className="text-slate-900 font-medium mt-1">
                  {instanceData.createdBy}
                </p>
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
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  API Status
                </label>
                <p className="text-emerald-600 font-semibold mt-1">
                  {instanceData.apiKeyStatus}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Messages Sent
                </label>
                <p className="text-slate-900 font-medium mt-1">
                  {instanceData.messageStats}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Messages Received
                </label>
                <p className="text-slate-900 font-medium mt-1">
                  {instanceData.messagesReceived}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Uptime
                </label>
                <p className="text-slate-900 font-medium mt-1">
                  {instanceData.uptime}
                </p>
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
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Connection
                </label>
                <p className="text-red-600 font-bold mt-1">
                  {instanceData.connectionState}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Reconnect Attempts
                </label>
                <p className="text-slate-900 font-medium mt-1">
                  {instanceData.reconnectAttempts}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  QR Attempts
                </label>
                <p className="text-slate-900 font-medium mt-1">
                  {instanceData.qrAttempts}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Error Alert - Only show if there's an error */}
        {instanceData.lastError?.message && (
          <motion.div variants={itemVariants}>
            <Alert className="bg-red-50 border border-red-200 shadow-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                <div className="text-red-800">
                  <div className="flex items-center gap-2 mb-2">
                    <strong>Last Error</strong>
                    {instanceData.lastError.timestamp && (
                      <Badge
                        variant="outline"
                        className="bg-red-100 text-red-700 border-red-200 text-xs"
                      >
                        {instanceData.lastError.timestamp}
                      </Badge>
                    )}
                  </div>
                  <p className="font-medium">
                    {instanceData.lastError.message}
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* QR Code Dialog with Socket.IO Integration */}
        <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
          <DialogContent className="sm:max-w-[500px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-center text-slate-900">
                Connect WhatsApp
              </DialogTitle>
              <DialogDescription className="text-center text-slate-600">
                Real-time QR code with Socket.IO integration
              </DialogDescription>
            </DialogHeader>

            {/* Socket.IO QR Code Component */}
            <QRCodeDisplay
              sessionId={params.id}
              onStatusChange={handleRealtimeStatusChange}
            />

            <DialogFooter className="flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowQRDialog(false)}
                className="border-slate-200 cursor-pointer"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </main>
  );
}
