"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft,
  Home,
  Settings,
  Zap,
  Puzzle
} from "lucide-react"
import Link from "next/link"

export function Sidebar({ currentInstance }) {
  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      active: true
    },
    {
      icon: Settings,
      label: "Settings",
      active: false
    },
    {
      icon: Zap,
      label: "Automation",
      active: false
    },
    {
      icon: Puzzle,
      label: "Integrations",
      active: false
    }
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      {/* Instance Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Instance</h2>
        <p className="text-gray-600">{currentInstance}</p>
      </div>

      {/* Back to Dashboard */}
      <Link href="/" className="block mb-6">
        <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>

      {/* Menu Items */}
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant={item.active ? "secondary" : "ghost"}
            className={`w-full justify-start ${
              item.active 
                ? "bg-green-50 text-green-700 hover:bg-green-100" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  )
}