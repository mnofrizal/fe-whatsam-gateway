"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal } from "lucide-react"
import Link from "next/link"

export function Dashboard() {
  const instances = [
    {
      id: 1,
      name: "Semen",
      status: "ERROR",
      createdAt: "7/1/2025",
    }
  ]

  const stats = {
    total: 1,
    active: 0,
    disconnected: 0
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">WhatsApp Panel</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Create New Instance
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Instances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Instances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Disconnected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{stats.disconnected}</div>
          </CardContent>
        </Card>
      </div>

      {/* Instances Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Instances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 uppercase text-sm">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 uppercase text-sm">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 uppercase text-sm">
                    Created At
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600 uppercase text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {instances.map((instance) => (
                  <tr key={instance.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">{instance.name}</td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant={instance.status === "ERROR" ? "destructive" : "default"}
                        className={
                          instance.status === "ERROR" 
                            ? "bg-red-100 text-red-800 hover:bg-red-100" 
                            : ""
                        }
                      >
                        {instance.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{instance.createdAt}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link href={`/instance/${instance.name.toLowerCase()}`}>
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                            Manage
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}