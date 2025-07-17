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
  Mic,
  Video,
  File,
  MapPin,
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

  const [imageMessage, setImageMessage] = useState({
    to: "",
    imageUrl: "",
    caption: "",
  });

  const [fileMessage, setFileMessage] = useState({
    to: "",
    fileUrl: "",
    filename: "",
    caption: "",
  });

  const [voiceMessage, setVoiceMessage] = useState({
    to: "",
    audioUrl: "",
  });

  const [videoMessage, setVideoMessage] = useState({
    to: "",
    videoUrl: "",
    caption: "",
  });

  const [contactMessage, setContactMessage] = useState({
    to: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    contactOrganization: "",
  });

  const [locationMessage, setLocationMessage] = useState({
    to: "",
    latitude: "",
    longitude: "",
    name: "",
    address: "",
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
        case "image":
          endpoint = MESSAGING_ENDPOINTS.SEND_IMAGE;
          payload = {
            to: imageMessage.to,
            imageUrl: imageMessage.imageUrl,
            caption: imageMessage.caption || undefined,
          };
          break;
        case "file":
          endpoint = MESSAGING_ENDPOINTS.SEND_FILE;
          payload = {
            to: fileMessage.to,
            fileUrl: fileMessage.fileUrl,
            filename: fileMessage.filename,
            caption: fileMessage.caption || undefined,
          };
          break;
        case "voice":
          endpoint = MESSAGING_ENDPOINTS.SEND_VOICE;
          payload = {
            to: voiceMessage.to,
            audioUrl: voiceMessage.audioUrl,
          };
          break;
        case "video":
          endpoint = MESSAGING_ENDPOINTS.SEND_VIDEO;
          payload = {
            to: videoMessage.to,
            videoUrl: videoMessage.videoUrl,
            caption: videoMessage.caption || undefined,
          };
          break;
        case "contact":
          endpoint = MESSAGING_ENDPOINTS.SEND_CONTACT;
          payload = {
            to: contactMessage.to,
            contactName: contactMessage.contactName,
            contactPhone: contactMessage.contactPhone,
            ...(contactMessage.contactEmail && {
              contactEmail: contactMessage.contactEmail,
            }),
            ...(contactMessage.contactOrganization && {
              contactOrganization: contactMessage.contactOrganization,
            }),
          };
          break;
        case "location":
          endpoint = MESSAGING_ENDPOINTS.SEND_LOCATION;
          payload = {
            to: locationMessage.to,
            latitude: parseFloat(locationMessage.latitude),
            longitude: parseFloat(locationMessage.longitude),
            name: locationMessage.name,
            address: locationMessage.address,
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
                  <TabsList className="grid w-full grid-cols-7 text-xs">
                    <TabsTrigger value="text">Text</TabsTrigger>
                    <TabsTrigger value="image">Image</TabsTrigger>
                    <TabsTrigger value="file">File</TabsTrigger>
                    <TabsTrigger value="voice">Voice</TabsTrigger>
                    <TabsTrigger value="video">Video</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>

                  {/* Text Message Tab */}
                  <TabsContent value="text" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="text-endpoint">API Endpoint</Label>
                        <Input
                          id="text-endpoint"
                          value={`POST ${buildApiUrl(
                            MESSAGING_ENDPOINTS.SEND_TEXT
                          )}`}
                          disabled
                          className="bg-slate-100 text-slate-600 font-mono text-sm"
                        />
                      </div>
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

                  {/* Image Message Tab */}
                  <TabsContent value="image" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="image-endpoint">API Endpoint</Label>
                        <Input
                          id="image-endpoint"
                          value={`POST ${buildApiUrl(
                            MESSAGING_ENDPOINTS.SEND_IMAGE
                          )}`}
                          disabled
                          className="bg-slate-100 text-slate-600 font-mono text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="image-to">Phone Number</Label>
                        <Input
                          id="image-to"
                          placeholder="6281234567890"
                          value={imageMessage.to}
                          onChange={(e) =>
                            setImageMessage({
                              ...imageMessage,
                              to: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="image-url">Image URL</Label>
                        <Input
                          id="image-url"
                          placeholder="https://picsum.photos/800/600"
                          value={imageMessage.imageUrl}
                          onChange={(e) =>
                            setImageMessage({
                              ...imageMessage,
                              imageUrl: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="image-caption">
                          Caption (Optional)
                        </Label>
                        <Textarea
                          id="image-caption"
                          placeholder="Beautiful random image from API 📸"
                          rows={3}
                          value={imageMessage.caption}
                          onChange={(e) =>
                            setImageMessage({
                              ...imageMessage,
                              caption: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button
                        onClick={() => handleSendMessage("image")}
                        disabled={
                          loading || !imageMessage.to || !imageMessage.imageUrl
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
                            Send Image
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  {/* File Message Tab */}
                  <TabsContent value="file" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="file-endpoint">API Endpoint</Label>
                        <Input
                          id="file-endpoint"
                          value={`POST ${buildApiUrl(
                            MESSAGING_ENDPOINTS.SEND_FILE
                          )}`}
                          disabled
                          className="bg-slate-100 text-slate-600 font-mono text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="file-to">Phone Number</Label>
                        <Input
                          id="file-to"
                          placeholder="6281234567890"
                          value={fileMessage.to}
                          onChange={(e) =>
                            setFileMessage({
                              ...fileMessage,
                              to: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="file-url">File URL</Label>
                        <Input
                          id="file-url"
                          placeholder="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                          value={fileMessage.fileUrl}
                          onChange={(e) =>
                            setFileMessage({
                              ...fileMessage,
                              fileUrl: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="file-name">Filename</Label>
                        <Input
                          id="file-name"
                          placeholder="sample-document.pdf"
                          value={fileMessage.filename}
                          onChange={(e) =>
                            setFileMessage({
                              ...fileMessage,
                              filename: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="file-caption">Caption (Optional)</Label>
                        <Textarea
                          id="file-caption"
                          placeholder="Sample PDF document from API 📄"
                          rows={3}
                          value={fileMessage.caption}
                          onChange={(e) =>
                            setFileMessage({
                              ...fileMessage,
                              caption: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button
                        onClick={() => handleSendMessage("file")}
                        disabled={
                          loading ||
                          !fileMessage.to ||
                          !fileMessage.fileUrl ||
                          !fileMessage.filename
                        }
                        className="w-full bg-orange-600 hover:bg-orange-700"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <File className="mr-2 h-4 w-4" />
                            Send File
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Voice Message Tab */}
                  <TabsContent value="voice" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="voice-endpoint">API Endpoint</Label>
                        <Input
                          id="voice-endpoint"
                          value={`POST ${buildApiUrl(
                            MESSAGING_ENDPOINTS.SEND_VOICE
                          )}`}
                          disabled
                          className="bg-slate-100 text-slate-600 font-mono text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="voice-to">Phone Number</Label>
                        <Input
                          id="voice-to"
                          placeholder="6281234567890"
                          value={voiceMessage.to}
                          onChange={(e) =>
                            setVoiceMessage({
                              ...voiceMessage,
                              to: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="voice-url">Audio URL</Label>
                        <Input
                          id="voice-url"
                          placeholder="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
                          value={voiceMessage.audioUrl}
                          onChange={(e) =>
                            setVoiceMessage({
                              ...voiceMessage,
                              audioUrl: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button
                        onClick={() => handleSendMessage("voice")}
                        disabled={
                          loading || !voiceMessage.to || !voiceMessage.audioUrl
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
                            <Mic className="mr-2 h-4 w-4" />
                            Send Voice
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Video Message Tab */}
                  <TabsContent value="video" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="video-endpoint">API Endpoint</Label>
                        <Input
                          id="video-endpoint"
                          value={`POST ${buildApiUrl(
                            MESSAGING_ENDPOINTS.SEND_VIDEO
                          )}`}
                          disabled
                          className="bg-slate-100 text-slate-600 font-mono text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="video-to">Phone Number</Label>
                        <Input
                          id="video-to"
                          placeholder="6281234567890"
                          value={videoMessage.to}
                          onChange={(e) =>
                            setVideoMessage({
                              ...videoMessage,
                              to: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="video-url">Video URL</Label>
                        <Input
                          id="video-url"
                          placeholder="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
                          value={videoMessage.videoUrl}
                          onChange={(e) =>
                            setVideoMessage({
                              ...videoMessage,
                              videoUrl: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="video-caption">
                          Caption (Optional)
                        </Label>
                        <Textarea
                          id="video-caption"
                          placeholder="Sample video from API 🎥"
                          rows={3}
                          value={videoMessage.caption}
                          onChange={(e) =>
                            setVideoMessage({
                              ...videoMessage,
                              caption: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button
                        onClick={() => handleSendMessage("video")}
                        disabled={
                          loading || !videoMessage.to || !videoMessage.videoUrl
                        }
                        className="w-full bg-red-600 hover:bg-red-700"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Video className="mr-2 h-4 w-4" />
                            Send Video
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Contact Message Tab */}
                  <TabsContent value="contact" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="contact-endpoint">API Endpoint</Label>
                        <Input
                          id="contact-endpoint"
                          value={`POST ${buildApiUrl(
                            MESSAGING_ENDPOINTS.SEND_CONTACT
                          )}`}
                          disabled
                          className="bg-slate-100 text-slate-600 font-mono text-sm"
                        />
                      </div>
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
                      <div>
                        <Label htmlFor="contact-email">Email (Optional)</Label>
                        <Input
                          id="contact-email"
                          placeholder="john@example.com"
                          value={contactMessage.contactEmail}
                          onChange={(e) =>
                            setContactMessage({
                              ...contactMessage,
                              contactEmail: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact-organization">
                          Organization (Optional)
                        </Label>
                        <Input
                          id="contact-organization"
                          placeholder="Acme Corporation"
                          value={contactMessage.contactOrganization}
                          onChange={(e) =>
                            setContactMessage({
                              ...contactMessage,
                              contactOrganization: e.target.value,
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

                  {/* Location Message Tab */}
                  <TabsContent value="location" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="location-endpoint">API Endpoint</Label>
                        <Input
                          id="location-endpoint"
                          value={`POST ${buildApiUrl(
                            MESSAGING_ENDPOINTS.SEND_LOCATION
                          )}`}
                          disabled
                          className="bg-slate-100 text-slate-600 font-mono text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location-to">Phone Number</Label>
                        <Input
                          id="location-to"
                          placeholder="+628517991457"
                          value={locationMessage.to}
                          onChange={(e) =>
                            setLocationMessage({
                              ...locationMessage,
                              to: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="location-latitude">Latitude</Label>
                          <Input
                            id="location-latitude"
                            placeholder="-6.2088"
                            value={locationMessage.latitude}
                            onChange={(e) =>
                              setLocationMessage({
                                ...locationMessage,
                                latitude: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="location-longitude">Longitude</Label>
                          <Input
                            id="location-longitude"
                            placeholder="106.8456"
                            value={locationMessage.longitude}
                            onChange={(e) =>
                              setLocationMessage({
                                ...locationMessage,
                                longitude: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="location-name">Location Name</Label>
                        <Input
                          id="location-name"
                          placeholder="Jakarta, Indonesia"
                          value={locationMessage.name}
                          onChange={(e) =>
                            setLocationMessage({
                              ...locationMessage,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="location-address">Address</Label>
                        <Input
                          id="location-address"
                          placeholder="Jakarta, Special Capital Region of Jakarta, Indonesia"
                          value={locationMessage.address}
                          onChange={(e) =>
                            setLocationMessage({
                              ...locationMessage,
                              address: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button
                        onClick={() => handleSendMessage("location")}
                        disabled={
                          loading ||
                          !locationMessage.to ||
                          !locationMessage.latitude ||
                          !locationMessage.longitude ||
                          !locationMessage.name ||
                          !locationMessage.address
                        }
                        className="w-full bg-teal-600 hover:bg-teal-700"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <MapPin className="mr-2 h-4 w-4" />
                            Send Location
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
                      Image Message
                    </p>
                    <p className="text-xs text-slate-600">
                      Send images with optional captions using imageUrl
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-900 mb-1">
                      File/Document
                    </p>
                    <p className="text-xs text-slate-600">
                      Send files and documents with filename and caption
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-900 mb-1">
                      Voice Message
                    </p>
                    <p className="text-xs text-slate-600">
                      Send audio files as voice messages using audioUrl
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-900 mb-1">
                      Video Message
                    </p>
                    <p className="text-xs text-slate-600">
                      Send video files with optional captions using videoUrl
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
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-900 mb-1">
                      Location Message
                    </p>
                    <p className="text-xs text-slate-600">
                      Share location with coordinates, name, and address
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
