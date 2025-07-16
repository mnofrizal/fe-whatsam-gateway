"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";

/**
 * Custom hook for Socket.IO client management
 * Handles connection, authentication, and cleanup
 */
export const useSocket = () => {
  const { data: session } = useSession();
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    // Only connect if we have a valid session with access token
    if (!session?.accessToken) {
      return;
    }

    // Prevent multiple connections
    if (socketRef.current?.connected) {
      return;
    }

    // Initialize Socket.IO client with authentication
    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000",
      {
        auth: {
          token: session.accessToken,
        },
        transports: ["polling", "websocket"], // Try polling first, then upgrade to websocket
        timeout: 20000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        upgrade: true, // Allow transport upgrade
      }
    );

    socketRef.current = socket;

    // Connection event handlers
    socket.on("connect", () => {
      console.log("Socket.IO connected");
      setIsConnected(true);
      setConnectionError(null);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket.IO disconnected:", reason);
      setIsConnected(false);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
      setConnectionError(error.message);
      setIsConnected(false);
    });

    socket.on("connected", (data) => {
      console.log("Socket.IO connection confirmed:", data);
    });

    // Cleanup function
    return () => {
      if (socket) {
        socket.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
    };
  }, [session?.accessToken]);

  // Return socket instance and connection state
  return {
    socket: socketRef.current,
    isConnected,
    connectionError,
  };
};

/**
 * Custom hook for session-specific Socket.IO events
 * Handles session subscription and real-time updates
 */
export const useSessionSocket = (sessionId) => {
  const { socket, isConnected, connectionError } = useSocket();
  const [qrCode, setQrCode] = useState(null);
  const [sessionStatus, setSessionStatus] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    if (!socket || !isConnected || !sessionId) {
      return;
    }

    // Join session room (as per HOW_EMIT.md documentation)
    socket.emit("join_session", sessionId);
    console.log(`Joined session room: ${sessionId}`);

    // Session room join confirmation handler
    const handleSessionJoined = (data) => {
      console.log("Successfully joined session room:", data);
    };

    // QR Code update handler
    const handleQrCodeUpdate = (data) => {
      if (data.sessionId === sessionId) {
        console.log("QR Code updated:", data);
        setQrCode(data.qrCode);
        setLastUpdate(data.timestamp);
      }
    };

    // Session status change handler
    const handleSessionStatusChange = (data) => {
      if (data.sessionId === sessionId) {
        console.log("Session status changed:", data);
        setSessionStatus(data);
        setLastUpdate(data.timestamp);

        // Clear QR code when connected
        if (data.status === "CONNECTED") {
          setQrCode(null);
        }
      }
    };

    // Connection error handler
    const handleConnectionError = (data) => {
      if (data.sessionId === sessionId) {
        console.error("Session connection error:", data);
        setLastUpdate(data.timestamp);
      }
    };

    // Register event listeners
    socket.on("session_joined", handleSessionJoined);
    socket.on("qr_code_updated", handleQrCodeUpdate);
    socket.on("session_status_changed", handleSessionStatusChange);
    socket.on("connection_error", handleConnectionError);

    // Cleanup function
    return () => {
      if (socket) {
        socket.emit("leave_session", sessionId);
        socket.off("session_joined", handleSessionJoined);
        socket.off("qr_code_updated", handleQrCodeUpdate);
        socket.off("session_status_changed", handleSessionStatusChange);
        socket.off("connection_error", handleConnectionError);
        console.log(`Left session room: ${sessionId}`);
      }
    };
  }, [socket, isConnected, sessionId]);

  return {
    socket,
    isConnected,
    connectionError,
    qrCode,
    sessionStatus,
    lastUpdate,
  };
};
