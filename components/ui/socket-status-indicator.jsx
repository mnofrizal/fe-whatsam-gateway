"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, AlertTriangle } from "lucide-react";
import { useSocket } from "@/hooks/use-socket";

/**
 * Socket.IO Connection Status Indicator Component
 * Shows real-time connection status with visual feedback
 */
const SocketStatusIndicator = ({ className = "" }) => {
  const { isConnected, connectionError } = useSocket();

  if (connectionError) {
    return (
      <Badge
        variant="outline"
        className={`bg-yellow-50 text-yellow-700 border-yellow-200 ${className}`}
      >
        <AlertTriangle className="h-3 w-3 mr-1" />
        Connection Issue
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className={`${
        isConnected
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-red-50 text-red-700 border-red-200"
      } ${className}`}
    >
      {isConnected ? (
        <>
          <Wifi className="h-3 w-3 mr-1" />
          Real-time Active
        </>
      ) : (
        <>
          <WifiOff className="h-3 w-3 mr-1" />
          Real-time Inactive
        </>
      )}
    </Badge>
  );
};

export default SocketStatusIndicator;
