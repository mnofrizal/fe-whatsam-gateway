"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

export function CreateInstanceDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    instanceName: "",
    displayName: "",
    description: ""
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCreateInstance = () => {
    // Here you would typically handle the instance creation
    console.log("Creating instance:", formData)
    
    // Reset form and close dialog
    setFormData({
      instanceName: "",
      displayName: "",
      description: ""
    })
    setOpen(false)
  }

  const handleCancel = () => {
    // Reset form and close dialog
    setFormData({
      instanceName: "",
      displayName: "",
      description: ""
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Create New Instance
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Instance</DialogTitle>
          <DialogDescription className="text-gray-600">
            Create a new WhatsApp instance to manage your conversations.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="instanceName" className="text-sm font-medium text-gray-700">
              Instance Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="instanceName"
              placeholder="e.g., my-whatsapp-instance"
              value={formData.instanceName}
              onChange={(e) => handleInputChange("instanceName", e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="displayName" className="text-sm font-medium text-gray-700">
              Display Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="displayName"
              placeholder="e.g., My WhatsApp Instance"
              value={formData.displayName}
              onChange={(e) => handleInputChange("displayName", e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Brief description of this instance"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full min-h-[80px] resize-none"
            />
          </div>
        </div>
        
        <DialogFooter className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="px-6"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreateInstance}
            className="bg-green-600 hover:bg-green-700 px-6"
            disabled={!formData.instanceName || !formData.displayName}
          >
            Create Instance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}