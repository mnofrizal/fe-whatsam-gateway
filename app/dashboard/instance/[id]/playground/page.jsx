"use client";

import { motion } from "framer-motion";
import {
  Send,
  MessageSquare,
  Phone,
  Image,
  FileText,
  Play,
  Copy,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  MESSAGING_ENDPOINTS,
  buildApiUrl,
  SESSION_ENDPOINTS,
} from "@/lib/constants";

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

export default function PlaygroundPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [instanceData, setInstanceData] = useState(null);
  const [fetchingInstance, setFetchingInstance] = useState(true);

  // Form states for different message types
  const [textMessage, setTextMessage] = useState({
    to: "",
    message: "",
  });

  const [mediaMessage, setMediaMessage] = useState({
    to: "",
    caption: "",
    mediaUrl: "",
    mediaType: "image",
  });

  const [contactMessage, setContactMessage] = useState({
    to: "",
    contactName: "",
    contactPhone: "",
  });

  // Fetch instance data to get API key
  const fetchInstanceData = async () => {
    try {
      setFetchingInstance(true);
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
        setInstanceData(data.data.session);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching instance data:", err);
      setError("Failed to load instance data. Please refresh the page.");
    } finally {
      setFetchingInstance(false);
    }
  };

  // Fetch instance data on component mount
  useEffect(() => {
    if (session?.accessToken && params.id) {
      fetchInstanceData();
    }
  }, [session, params.id]);

  const handleSendMessage = async (type) => {
    if (!instanceData?.apiKey?.key) {
      setError("Instance API key not available. Please refresh the page.");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      let endpoint, payload;

      switch (type) {
        case "text":
          endpoint = MESSAGING_ENDPOINTS.SEND_TEXT;
          payload = {
            to: textMessage.to,
            message: textMessage.message,
          };
          break;
        case "media":
          endpoint = MESSAGING_ENDPOINTS.SEND_MEDIA;
          payload = {
            to: mediaMessage.to,
            mediaUrl: mediaMessage.mediaUrl,
            caption: mediaMessage.caption || undefined,
            mediaType: mediaMessage.mediaType,
          };
          break;
        case "contact":
          endpoint = MESSAGING_ENDPOINTS.SEND_CONTACT;
          payload = {
            to: contactMessage.to,
            contactName: contactMessage.contactName,
            contactPhone: contactMessage.contactPhone,
          };
          break;
        default:
          throw new Error("Invalid message type");
      }

      const response = await fetch(buildApiUrl(endpoint), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${instanceData.apiKey.key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResponse(data);
      } else {
        throw new Error(
          data.message || `HTTP ${response.status}: Failed to send message`
        );
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    }
  };

  const downloadResponse = () => {
    if (response) {
      const blob = new Blob([JSON.stringify(response, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `whatsapp-response-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Show loading state while fetching instance data
  if (fetchingInstance) {
    return (
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-3">
            <RefreshCw className="h-6 w-6 animate-spin text-slate-600" />
            <span className="text-lg text-slate-600">
              Loading playground...
            </span>
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
          <div className="flex items-center gap-4 mb-6">
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Play className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                API Playground
              </h1>
              <p className="text-slate-600 mt-1">
                Test WhatsApp API endpoints for instance{" "}
                {instanceData?.name || params.id}
              </p>
            </div>
          </div>

          <Alert className="bg-blue-50 border border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>API Playground</strong>
              <br />
              This playground allows you to test WhatsApp API endpoints in
              real-time. Make sure your instance is connected before sending
              messages.
            </AlertDescription>
          </Alert>

          {instanceData && (
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Instance: {instanceData.name}
                  </p>
                  <p className="text-xs text-slate-600">
                    Status: {instanceData.status} | Phone:{" "}
                    {instanceData.phoneNumber || "Not connected"}
                  </p>
                </div>
                <Badge
                  variant={
                    instanceData.status === "CONNECTED"
                      ? "default"
                      : "secondary"
                  }
                  className={
                    instanceData.status === "CONNECTED"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {instanceData.status}
                </Badge>
              </div>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - API Testing */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Card className="bg-white border border-slate-200/80 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <MessageSquare className="h-5 w-5 text-slate-600" />
                  Send Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="text" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="text">Text Message</TabsTrigger>
                    <TabsTrigger value="media">Media Message</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                  </TabsList>

                  {/* Text Message Tab */}
                  <TabsContent value="text" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="text-to">Phone Number</Label>
                        <Input
                          id="text-to"
                          placeholder="+628517991457"
                          value={textMessage.to}
                          onChange={(e) =>
                            setTextMessage({
                              ...textMessage,
                              to: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="text-message">Message</Label>
                        <Textarea
                          id="text-message"
                          placeholder="Enter your message here..."
                          rows={4}
                          value={textMessage.message}
                          onChange={(e) =>
                            setTextMessage({
                              ...textMessage,
                              message: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button
                        onClick={() => handleSendMessage("text")}
                        disabled={
                          loading || !textMessage.to || !textMessage.message
                        }
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Text Message
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Media Message Tab */}
                  <TabsContent value="media" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="media-to">Phone Number</Label>
                        <Input
                          id="media-to"
                          placeholder="+628517991457"
                          value={mediaMessage.to}
                          onChange={(e) =>
                            setMediaMessage({
                              ...mediaMessage,
                              to: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="media-url">Media URL</Label>
                        <Input
                          id="media-url"
                          placeholder="https://example.com/image.jpg"
                          value={mediaMessage.mediaUrl}
                          onChange={(e) =>
                            setMediaMessage({
                              ...mediaMessage,
                              mediaUrl: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="media-caption">
                          Caption (Optional)
                        </Label>
                        <Textarea
                          id="media-caption"
                          placeholder="Enter caption here..."
                          rows={3}
                          value={mediaMessage.caption}
                          onChange={(e) =>
                            setMediaMessage({
                              ...mediaMessage,
                              caption: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button
                        onClick={() => handleSendMessage("media")}
                        disabled={
                          loading || !mediaMessage.to || !mediaMessage.mediaUrl
                        }
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Image className="mr-2 h-4 w-4" />
                            Send Media Message
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Contact Message Tab */}
                  <TabsContent value="contact" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="contact-to">Phone Number</Label>
                        <Input
                          id="contact-to"
                          placeholder="+628517991457"
                          value={contactMessage.to}
                          onChange={(e) =>
                            setContactMessage({
                              ...contactMessage,
                              to: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact-name">Contact Name</Label>
                        <Input
                          id="contact-name"
                          placeholder="John Doe"
                          value={contactMessage.contactName}
                          onChange={(e) =>
                            setContactMessage({
                              ...contactMessage,
                              contactName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact-phone">Contact Phone</Label>
                        <Input
                          id="contact-phone"
                          placeholder="+1234567890"
                          value={contactMessage.contactPhone}
                          onChange={(e) =>
                            setContactMessage({
                              ...contactMessage,
                              contactPhone: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button
                        onClick={() => handleSendMessage("contact")}
                        disabled={
                          loading ||
                          !contactMessage.to ||
                          !contactMessage.contactName ||
                          !contactMessage.contactPhone
                        }
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <User className="mr-2 h-4 w-4" />
                            Send Contact
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Response */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Card className="bg-white border border-slate-200/80 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <FileText className="h-5 w-5 text-slate-600" />
                    API Response
                  </div>
                  {response && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={copyResponse}
                        className="border-slate-200"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={downloadResponse}
                        className="border-slate-200"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading && (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <RefreshCw className="h-8 w-8 animate-spin text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-600">Sending message...</p>
                    </div>
                  </div>
                )}

                {error && (
                  <Alert className="bg-red-50 border border-red-200">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {response && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Success
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {new Date(response.timestamp).toLocaleString()}
                      </Badge>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-4">
                      <pre className="text-sm text-slate-800 overflow-x-auto">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                          Message ID
                        </label>
                        <p className="text-slate-900 font-mono mt-1">
                          {response.data?.messageId || "N/A"}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                          Status
                        </label>
                        <p className="text-slate-900 font-medium mt-1">
                          {response.data?.status || "N/A"}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                          To
                        </label>
                        <p className="text-slate-900 font-medium mt-1">
                          {response.data?.to || "N/A"}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                          Success
                        </label>
                        <p className="text-slate-900 font-medium mt-1">
                          {response.success ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!loading && !response && !error && (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <Smartphone className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-500">
                        Send a message to see the API response here
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Examples */}
            <Card className="bg-white border border-slate-200/80 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <Clock className="h-5 w-5 text-slate-600" />
                  Quick Examples
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-900 mb-1">
                      Text Message
                    </p>
                    <p className="text-xs text-slate-600">
                      Send a simple text message to any WhatsApp number
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-900 mb-1">
                      Media Message
                    </p>
                    <p className="text-xs text-slate-600">
                      Send images, videos, or documents with optional captions
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-900 mb-1">
                      Contact Card
                    </p>
                    <p className="text-xs text-slate-600">
                      Share contact information as a vCard
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
