"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sidebar } from "@/components/sidebar"
import { 
  ArrowLeft, 
  Phone, 
  Key, 
  Clock,
  BarChart3,
  Activity,
  AlertCircle,
  Copy,
  Eye,
  EyeOff
} from "lucide-react"
import Link from "next/link"

export function InstanceManager({ instanceId = "semen" }) {
  const [showApiKey, setShowApiKey] = useState(false)
  const [instanceData] = useState({
    name: "Semen",
    displayName: "Aya",
    phoneNumber: "6285179971457",
    status: "ERROR",
    active: "Yes",
    connectionAttempts: 0,
    lastConnected: "7/1/2025, 2:10:32 PM",
    lastDisconnected: "7/1/2025, 2:12:15 PM",
    created: "7/1/2025, 7:50:56 AM",
    lastUpdated: "7/1/2025, 2:31:04 PM",
    createdBy: "Muhammad Naufal",
    apiKey: "wa_k8x9m2n4p7q1r5s8t3u6v9w2z5a8b1c4",
    messageStats: 1,
    contacts: 4,
    connectionState: "DISCONNECTED",
    reconnectAttempts: 0,
    qrAttempts: "0 / 3",
    lastError: {
      message: "Failed to initialize on startup; instanceId is not defined",
      occurred: "7/1/2025, 2:31:04 PM"
    }
  })

  const copyToClipboard = () => {
    navigator.clipboard.writeText(instanceData.apiKey)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentInstance={instanceData.name} />
      
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-gray-900">{instanceData.name}</h1>
              <div className="flex items-center text-gray-600">
                <Phone className="mr-2 h-4 w-4" />
                {instanceData.phoneNumber}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="destructive" className="bg-red-100 text-red-800">
                {instanceData.status}
              </Badge>
              <Button className="bg-green-600 hover:bg-green-700">
                Connect Instance
              </Button>
              <Button variant="secondary">
                Disconnect Instance
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Restart Instance
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Logout Instance
              </Button>
            </div>
          </div>
        </div>

        {/* API Key Section */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Key className="h-5 w-5" />
              <CardTitle>API Key</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Instance API Key
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      value={showApiKey ? instanceData.apiKey : "•".repeat(instanceData.apiKey.length)}
                      readOnly
                      className="pr-20 font-mono text-sm bg-gray-50"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={copyToClipboard}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-sm font-medium mb-1">ℹ️ API Key Information</p>
                <p className="text-blue-700 text-sm">
                  This API key is automatically generated for your instance. Use it to authenticate API requests to this WhatsApp instance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Name</label>
                <p className="text-gray-900">{instanceData.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Display Name</label>
                <p className="text-gray-900">{instanceData.displayName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <p className="text-red-600 font-medium">{instanceData.status}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Active</label>
                <p className="text-gray-900">{instanceData.active}</p>
              </div>
            </CardContent>
          </Card>

          {/* Connection Information */}
          <Card>
            <CardHeader>
              <CardTitle>Connection Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                <p className="text-gray-900">{instanceData.phoneNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Connection Attempts</label>
                <p className="text-gray-900">{instanceData.connectionAttempts}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Last Connected</label>
                <p className="text-gray-900">{instanceData.lastConnected}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Last Disconnected</label>
                <p className="text-gray-900">{instanceData.lastDisconnected}</p>
              </div>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <CardTitle>Timestamps</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Created</label>
                <p className="text-gray-900">{instanceData.created}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Last Updated</label>
                <p className="text-gray-900">{instanceData.lastUpdated}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Created By</label>
                <p className="text-gray-900">{instanceData.createdBy}</p>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <CardTitle>Statistics</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">API Key Status</label>
                <p className="text-green-600 font-medium">Active</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Message Stats</label>
                <p className="text-gray-900">{instanceData.messageStats}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Contacts</label>
                <p className="text-gray-900">{instanceData.contacts}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Status */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <CardTitle>Real-time Status</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Connection State</label>
                <p className="text-red-600 font-medium">{instanceData.connectionState}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Reconnect Attempts</label>
                <p className="text-gray-900">{instanceData.reconnectAttempts}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">QR Attempts</label>
                <p className="text-gray-900">{instanceData.qrAttempts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Last Error */}
        <Card className="border-red-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <CardTitle className="text-red-600">Last Error</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-800 font-medium mb-2">{instanceData.lastError.message}</p>
              <p className="text-red-600 text-sm">Occurred at {instanceData.lastError.occurred}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}