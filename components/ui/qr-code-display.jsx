"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Loader2, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useSessionSocket } from "@/hooks/use-socket";

/**
 * QR Code Display Component with Socket.IO integration
 * Displays real-time QR codes for WhatsApp authentication
 */
const QRCodeDisplay = ({ sessionId, onStatusChange }) => {
  const { isConnected, connectionError, qrCode, sessionStatus, lastUpdate } =
    useSessionSocket(sessionId);

  const [qrImageUrl, setQrImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate QR code image from raw string
  const generateQRCodeImage = (qrString) => {
    if (!qrString) return null;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      qrString
    )}`;
  };

  // Update QR image when QR code changes
  useEffect(() => {
    if (qrCode) {
      setImageLoading(true);
      setImageError(false);
      const imageUrl = generateQRCodeImage(qrCode);
      setQrImageUrl(imageUrl);
    } else {
      setQrImageUrl(null);
      setImageLoading(false);
    }
  }, [qrCode]);

  // Handle image load events
  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  // Notify parent component of status changes
  useEffect(() => {
    if (sessionStatus && onStatusChange) {
      onStatusChange(sessionStatus);
    }
  }, [sessionStatus, onStatusChange]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const qrVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.1 },
    },
  };

  // Connection status indicator
  const ConnectionStatus = () => (
    <div className="flex items-center gap-2 mb-4">
      {isConnected ? (
        <Badge
          variant="outline"
          className="bg-emerald-50 text-emerald-700 border-emerald-200"
        >
          <Wifi className="h-3 w-3 mr-1" />
          Connected
        </Badge>
      ) : (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200"
        >
          <WifiOff className="h-3 w-3 mr-1" />
          Disconnected
        </Badge>
      )}
      {lastUpdate && (
        <span className="text-xs text-slate-500">
          Updated: {new Date(lastUpdate).toLocaleTimeString()}
        </span>
      )}
    </div>
  );

  // Show connection error
  if (connectionError) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center p-6"
      >
        <ConnectionStatus />
        <Alert className="bg-red-50 border border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Connection Error</strong>
            <br />
            {connectionError}
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  // Show loading state when not connected
  if (!isConnected) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center p-6"
      >
        <ConnectionStatus />
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-slate-600 mb-3" />
          <p className="text-sm text-slate-600">Connecting to server...</p>
        </div>
      </motion.div>
    );
  }

  // Show session connected state
  if (sessionStatus?.status === "CONNECTED") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center p-6"
      >
        <ConnectionStatus />
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-emerald-100 p-3 rounded-full">
              <Wifi className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-emerald-800 mb-2">
            WhatsApp Connected!
          </h3>
          <p className="text-emerald-700 mb-2">{sessionStatus.phoneNumber}</p>
          {sessionStatus.displayName && (
            <p className="text-sm text-emerald-600">
              {sessionStatus.displayName}
            </p>
          )}
        </div>
      </motion.div>
    );
  }

  // Show QR code or waiting state
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center p-6"
    >
      <ConnectionStatus />

      <AnimatePresence mode="wait">
        {qrImageUrl ? (
          <motion.div
            key="qr-code"
            variants={qrVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm inline-block">
              <div className="relative">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-lg">
                    <Loader2 className="h-6 w-6 animate-spin text-slate-600" />
                  </div>
                )}
                {imageError ? (
                  <div className="w-48 h-48 flex items-center justify-center bg-slate-100 rounded-lg">
                    <div className="text-center">
                      <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <p className="text-sm text-red-600">
                        Failed to load QR code
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setImageError(false);
                          setImageLoading(true);
                        }}
                        className="mt-2"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Retry
                      </Button>
                    </div>
                  </div>
                ) : (
                  <img
                    src={qrImageUrl}
                    alt="WhatsApp QR Code"
                    className="w-48 h-48 rounded-lg"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{ display: imageLoading ? "none" : "block" }}
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-slate-700 font-medium">
                Scan this QR code with WhatsApp
              </p>
              <p className="text-xs text-slate-500">
                Open WhatsApp → Settings → Linked Devices → Link a Device
              </p>
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                Real-time updates enabled
              </Badge>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="waiting"
            variants={qrVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <div className="w-48 h-48 mx-auto flex items-center justify-center bg-slate-100 rounded-lg border border-slate-200">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-600">Generating QR code...</p>
                <p className="text-xs text-slate-500 mt-1">
                  Waiting for server response
                </p>
              </div>
            </div>

            <Alert className="bg-blue-50 border border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Real-time Connection Active</strong>
                <br />
                QR code will appear automatically when ready. No need to
                refresh!
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QRCodeDisplay;
