"use client";

import { motion } from "framer-motion";
import {
  Key,
  Clock,
  BarChart3,
  Zap,
  AlertCircle,
  Webhook,
  Save,
  Shield,
  Globe,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

// Mock data
const instanceData = {
  id: "1",
  name: "WhatsApp Instance",
};

export default function InstanceSettings({ params }) {
  const [proxyEnabled, setProxyEnabled] = useState(false);
  const [proxySettings, setProxySettings] = useState({
    host: "",
    port: "",
    username: "",
    password: "",
    type: "http",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Simulate save
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleProxyChange = (field, value) => {
    setProxySettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Instance Settings
              </h1>
              <p className="text-slate-600 mt-2">
                Configure your WhatsApp instance settings and proxy
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
                onClick={handleSave}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </motion.div>
          </div>

          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <Alert className="bg-emerald-50 border border-emerald-200">
                <AlertCircle className="h-4 w-4 text-emerald-600" />
                <AlertDescription className="text-emerald-800">
                  <strong>Settings saved successfully!</strong>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </motion.div>

        {/* Proxy Configuration */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-slate-200/80 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Shield className="h-5 w-5 text-slate-600" />
                Proxy Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium text-slate-700">
                    Enable Proxy
                  </Label>
                  <p className="text-xs text-slate-500">
                    Route WhatsApp traffic through a proxy server
                  </p>
                </div>
                <Switch
                  checked={proxyEnabled}
                  onCheckedChange={setProxyEnabled}
                />
              </div>

              {proxyEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 pt-4 border-t border-slate-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="proxy-host">Proxy Host</Label>
                      <Input
                        id="proxy-host"
                        placeholder="proxy.example.com"
                        value={proxySettings.host}
                        onChange={(e) =>
                          handleProxyChange("host", e.target.value)
                        }
                        className="border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proxy-port">Port</Label>
                      <Input
                        id="proxy-port"
                        placeholder="8080"
                        value={proxySettings.port}
                        onChange={(e) =>
                          handleProxyChange("port", e.target.value)
                        }
                        className="border-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="proxy-username">
                        Username (Optional)
                      </Label>
                      <Input
                        id="proxy-username"
                        placeholder="username"
                        value={proxySettings.username}
                        onChange={(e) =>
                          handleProxyChange("username", e.target.value)
                        }
                        className="border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proxy-password">
                        Password (Optional)
                      </Label>
                      <Input
                        id="proxy-password"
                        type="password"
                        placeholder="password"
                        value={proxySettings.password}
                        onChange={(e) =>
                          handleProxyChange("password", e.target.value)
                        }
                        className="border-slate-200"
                      />
                    </div>
                  </div>

                  <Alert className="bg-blue-50 border border-blue-200">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Proxy Information</strong>
                      <br />
                      Configure proxy settings to route your WhatsApp instance
                      traffic through a proxy server. This can help with IP
                      restrictions or network configurations.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* General Settings */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-slate-200/80 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Key className="h-5 w-5 text-slate-600" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instance-name">Instance Name</Label>
                  <Input
                    id="instance-name"
                    defaultValue={instanceData.name}
                    className="border-slate-200"
                    placeholder="Enter instance name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display-name">Display Name</Label>
                  <Input
                    id="display-name"
                    defaultValue="Aya"
                    className="border-slate-200"
                    placeholder="Enter display name"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-slate-700">
                      Auto Reconnect
                    </Label>
                    <p className="text-xs text-slate-500">
                      Automatically reconnect when connection is lost
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-slate-700">
                      Message Logging
                    </Label>
                    <p className="text-xs text-slate-500">
                      Log all incoming and outgoing messages
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-slate-700">
                      Webhook Notifications
                    </Label>
                    <p className="text-xs text-slate-500">
                      Send webhook notifications for events
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </main>
  );
}
