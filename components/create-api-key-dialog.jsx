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
import { Plus, Key, Copy, Eye, EyeOff } from "lucide-react"

export function CreateApiKeyDialog() {
  const [open, setOpen] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const [generatedKey, setGeneratedKey] = useState("")
  const [isGenerated, setIsGenerated] = useState(false)
  const [formData, setFormData] = useState({
    keyName: "",
    description: "",
    permissions: "full"
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateApiKey = () => {
    // Generate a random API key (in real app, this would come from backend)
    const key = `wa_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    setGeneratedKey(key)
    setIsGenerated(true)
    setShowKey(true)
  }

  const handleCreateApiKey = () => {
    if (!isGenerated) {
      generateApiKey()
    } else {
      // Here you would typically save the API key
      console.log("Creating API key:", { ...formData, key: generatedKey })
      
      // Reset form and close dialog
      setFormData({
        keyName: "",
        description: "",
        permissions: "full"
      })
      setGeneratedKey("")
      setIsGenerated(false)
      setShowKey(false)
      setOpen(false)
    }
  }

  const handleCancel = () => {
    // Reset form and close dialog
    setFormData({
      keyName: "",
      description: "",
      permissions: "full"
    })
    setGeneratedKey("")
    setIsGenerated(false)
    setShowKey(false)
    setOpen(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedKey)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Generate API Key
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center">
            <Key className="mr-2 h-5 w-5" />
            {isGenerated ? "API Key Generated" : "Generate New API Key"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {isGenerated 
              ? "Your API key has been generated. Make sure to copy it now as you won't be able to see it again."
              : "Create a new API key to access the WhatsApp API for this instance."
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {!isGenerated ? (
            <>
              <div className="grid gap-2">
                <Label htmlFor="keyName" className="text-sm font-medium text-gray-700">
                  API Key Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="keyName"
                  placeholder="e.g., Production Key, Development Key"
                  value={formData.keyName}
                  onChange={(e) => handleInputChange("keyName", e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of this API key usage"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="w-full min-h-[80px] resize-none"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="permissions" className="text-sm font-medium text-gray-700">
                  Permissions
                </Label>
                <select
                  id="permissions"
                  value={formData.permissions}
                  onChange={(e) => handleInputChange("permissions", e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="full">Full Access</option>
                  <option value="read">Read Only</option>
                  <option value="send">Send Messages Only</option>
                </select>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-sm font-medium text-gray-700">
                  API Key Name
                </Label>
                <p className="text-gray-900 font-medium">{formData.keyName}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-sm font-medium text-gray-700">
                  Generated API Key
                </Label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      value={showKey ? generatedKey : "•".repeat(generatedKey.length)}
                      readOnly
                      className="pr-20 font-mono text-sm"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => setShowKey(!showKey)}
                      >
                        {showKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
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

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-yellow-800 text-sm font-medium mb-1">⚠️ Important Security Notice</p>
                <p className="text-yellow-700 text-sm">
                  Make sure to copy and store this API key securely. You won't be able to see it again after closing this dialog.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="px-6"
          >
            {isGenerated ? "Close" : "Cancel"}
          </Button>
          <Button 
            onClick={handleCreateApiKey}
            className="bg-green-600 hover:bg-green-700 px-6"
            disabled={!isGenerated && !formData.keyName}
          >
            {isGenerated ? "Save API Key" : "Generate Key"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}