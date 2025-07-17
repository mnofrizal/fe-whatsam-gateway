"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Code,
  Send,
  Image,
  File,
  Mic,
  Video,
  User,
  MapPin,
  Copy,
  Play,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
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

export default function DocsPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [instanceData, setInstanceData] = useState(null);
  const [fetchingInstance, setFetchingInstance] = useState(true);
  const [payloads, setPayloads] = useState({});
  const [loading, setLoading] = useState({});
  const [responses, setResponses] = useState({});
  const [errors, setErrors] = useState({});

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

  // Initialize payload states with default values
  useEffect(() => {
    const initialPayloads = {};
    endpoints.forEach((endpoint) => {
      initialPayloads[endpoint.id] = JSON.stringify(endpoint.payload, null, 2);
    });
    setPayloads(initialPayloads);
  }, []);

  // Handle API request
  const handleTryApi = async (endpoint) => {
    if (!instanceData?.apiKey?.key) {
      setErrors((prev) => ({
        ...prev,
        [endpoint.id]: "Instance API key not available",
      }));
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, [endpoint.id]: true }));
      setErrors((prev) => ({ ...prev, [endpoint.id]: null }));
      setResponses((prev) => ({ ...prev, [endpoint.id]: null }));

      // Parse the payload
      let parsedPayload;
      try {
        parsedPayload = JSON.parse(payloads[endpoint.id]);
      } catch (parseError) {
        throw new Error("Invalid JSON payload");
      }

      const response = await fetch(buildApiUrl(endpoint.endpoint), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${instanceData.apiKey.key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedPayload),
      });

      const responseData = await response.json();

      setResponses((prev) => ({
        ...prev,
        [endpoint.id]: {
          status: response.status,
          data: responseData,
          success: response.ok,
        },
      }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [endpoint.id]: error.message,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [endpoint.id]: false }));
    }
  };

  // Handle payload change
  const handlePayloadChange = (endpointId, value) => {
    setPayloads((prev) => ({
      ...prev,
      [endpointId]: value,
    }));
  };

  const endpoints = [
    {
      id: "send-text",
      name: "Send Text Message",
      method: "POST",
      endpoint: MESSAGING_ENDPOINTS.SEND_TEXT,
      icon: Send,
      color: "bg-green-100 text-green-600",
      description: "Send a simple text message to any WhatsApp number",
      payload: {
        to: "628517991457",
        message: "Hello, this is a test message!",
      },
    },
    {
      id: "send-image",
      name: "Send Image Message",
      method: "POST",
      endpoint: MESSAGING_ENDPOINTS.SEND_IMAGE,
      icon: Image,
      color: "bg-purple-100 text-purple-600",
      description: "Send images with optional captions using imageUrl",
      payload: {
        to: "628517991457",
        imageUrl: "https://picsum.photos/800/600",
        caption: "Beautiful random image from API 📸",
      },
    },
    {
      id: "send-file",
      name: "Send File/Document",
      method: "POST",
      endpoint: MESSAGING_ENDPOINTS.SEND_FILE,
      icon: File,
      color: "bg-orange-100 text-orange-600",
      description: "Send files and documents with filename and caption",
      payload: {
        to: "628517991457",
        fileUrl:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        filename: "sample-document.pdf",
        caption: "Sample PDF document from API 📄",
      },
    },
    {
      id: "send-voice",
      name: "Send Voice Message",
      method: "POST",
      endpoint: MESSAGING_ENDPOINTS.SEND_VOICE,
      icon: Mic,
      color: "bg-green-100 text-green-600",
      description: "Send audio files as voice messages using audioUrl",
      payload: {
        to: "628517991457",
        audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
    },
    {
      id: "send-video",
      name: "Send Video Message",
      method: "POST",
      endpoint: MESSAGING_ENDPOINTS.SEND_VIDEO,
      icon: Video,
      color: "bg-red-100 text-red-600",
      description: "Send video files with optional captions using videoUrl",
      payload: {
        to: "628517991457",
        videoUrl:
          "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        caption: "Sample video from API 🎥",
      },
    },
    {
      id: "send-contact",
      name: "Send Contact Card",
      method: "POST",
      endpoint: MESSAGING_ENDPOINTS.SEND_CONTACT,
      icon: User,
      color: "bg-blue-100 text-blue-600",
      description: "Share contact information as a vCard",
      payload: {
        to: "628517991457",
        contactName: "John Doe",
        contactPhone: "+1234567890",
        contactEmail: "john@example.com",
        contactOrganization: "Acme Corporation",
      },
    },
    {
      id: "send-location",
      name: "Send Location Message",
      method: "POST",
      endpoint: MESSAGING_ENDPOINTS.SEND_LOCATION,
      icon: MapPin,
      color: "bg-teal-100 text-teal-600",
      description: "Share location with coordinates, name, and address",
      payload: {
        to: "628517991457",
        latitude: -6.2088,
        longitude: 106.8456,
        name: "Jakarta, Indonesia",
        address: "Jakarta, Special Capital Region of Jakarta, Indonesia",
      },
    },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (fetchingInstance) {
    return (
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-6 h-6 animate-spin mr-2" />
          <span>Loading instance data...</span>
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
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                API Documentation
              </h1>
              <p className="text-slate-600 mt-1">
                Complete reference for WhatsApp API endpoints for instance{" "}
                {params.id}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Code className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  Authentication
                </h3>
                <p className="text-blue-800 text-sm mb-2">
                  All API requests require authentication using your instance
                  API key in the Authorization header:
                </p>
                <div className="bg-blue-100 rounded p-2 font-mono text-sm text-blue-900">
                  Authorization: Bearer YOUR_API_KEY
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* API Endpoints */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Available Endpoints
          </h2>

          <div className="grid gap-6">
            {endpoints.map((endpoint, index) => {
              const IconComponent = endpoint.icon;
              return (
                <Card
                  key={index}
                  className="bg-white border border-slate-200/80 shadow-lg"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-lg flex items-center justify-center ${endpoint.color}`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {endpoint.name}
                          </h3>
                          <p className="text-sm text-slate-600 mt-1">
                            {endpoint.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono">
                          {endpoint.method}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            copyToClipboard(buildApiUrl(endpoint.endpoint))
                          }
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Endpoint URL */}
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        Endpoint URL
                      </label>
                      <div className="mt-1 p-3 bg-slate-50 rounded-lg font-mono text-sm text-slate-800">
                        {endpoint.method} {buildApiUrl(endpoint.endpoint)}
                      </div>
                    </div>

                    {/* Request Body */}
                    <div>
                      <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        Request Body (JSON) - Editable
                      </Label>
                      <Textarea
                        value={payloads[endpoint.id] || ""}
                        onChange={(e) =>
                          handlePayloadChange(endpoint.id, e.target.value)
                        }
                        className="mt-1 font-mono text-sm min-h-[120px] bg-slate-50"
                        placeholder="Edit the JSON payload..."
                      />
                    </div>

                    {/* API Response Section */}
                    {responses[endpoint.id] && (
                      <div>
                        <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                          API Response
                        </Label>
                        <Alert
                          className={`mt-1 ${
                            responses[endpoint.id].success
                              ? "border-green-200 bg-green-50"
                              : "border-red-200 bg-red-50"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {responses[endpoint.id].success ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-red-600" />
                            )}
                            <span className="font-medium text-sm">
                              Status: {responses[endpoint.id].status}
                            </span>
                          </div>
                          <pre className="text-sm overflow-x-auto text-slate-800">
                            <code>
                              {JSON.stringify(
                                responses[endpoint.id].data,
                                null,
                                2
                              )}
                            </code>
                          </pre>
                        </Alert>
                      </div>
                    )}

                    {/* Error Section */}
                    {errors[endpoint.id] && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <AlertDescription className="ml-2">
                          <strong>Error:</strong> {errors[endpoint.id]}
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Action buttons */}
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTryApi(endpoint)}
                        disabled={
                          loading[endpoint.id] || !instanceData?.apiKey?.key
                        }
                        className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                      >
                        {loading[endpoint.id] ? (
                          <RefreshCw className="w-3 w-3 mr-1 animate-spin" />
                        ) : (
                          <Play className="w-3 h-3 mr-1" />
                        )}
                        Try API
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          window.open(
                            `/dashboard/instance/${params.id}/playground`,
                            "_blank"
                          )
                        }
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Open Playground
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Response Format */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-slate-200/80 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-slate-600" />
                Response Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                All API endpoints return a consistent JSON response format:
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <pre className="text-sm text-slate-800 overflow-x-auto">
                  {`{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "messageId": "msg_1234567890",
    "status": "sent",
    "to": "628517991457",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Error Handling */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-slate-200/80 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-slate-600" />
                Error Handling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                When an error occurs, the API returns an error response with
                details:
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <pre className="text-sm text-slate-800 overflow-x-auto">
                  {`{
  "success": false,
  "message": "Invalid phone number format",
  "error": {
    "code": "INVALID_PHONE",
    "details": "Phone number must include country code"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </main>
  );
}
