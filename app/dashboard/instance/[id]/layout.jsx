"use client";

import { SidebarInstance } from "@/components/layout/sidebar-instance";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { SESSION_ENDPOINTS, buildApiUrl } from "@/lib/constants";
import { RefreshCw } from "lucide-react";

export default function InstanceLayout({ children }) {
  const params = useParams();
  const { data: session } = useSession();
  const [instanceData, setInstanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch instance data from API
  const fetchInstanceData = async () => {
    try {
      setLoading(true);

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
        const session = data.data.session;

        // Transform API data to match sidebar expectations
        const transformedData = {
          id: session.id,
          name: session.name,
          displayName: session.name,
          phoneNumber: session.phoneNumber,
          status: session.status,
          active: session.status === "CONNECTED" ? "Yes" : "No",
          apiKey:
            session.apiKey?.key || "sk_test_1234567890abcdef1234567890abcdef",
        };

        setInstanceData(transformedData);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching instance data:", err);

      // Fallback to basic data on error
      setInstanceData({
        id: params.id,
        name: "Instance " + params.id,
        displayName: "WhatsApp Instance",
        phoneNumber: "Not connected",
        status: "ERROR",
        active: "No",
        apiKey: "sk_test_1234567890abcdef1234567890abcdef",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount and when session changes
  useEffect(() => {
    if (session?.accessToken && params.id) {
      fetchInstanceData();
    }
  }, [session, params.id]);

  // Show loading state while fetching
  if (loading || !instanceData) {
    return (
      <div className="flex">
        <div className="fixed top-0 w-64 bg-white border-r border-slate-200/80 flex-shrink-0 min-h-screen z-[60]">
          <div className="h-16 flex items-center px-6 border-b border-slate-200/80">
            <h2 className="text-lg font-semibold text-slate-900">
              WhatsApp API Gateway
            </h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 animate-spin text-slate-600" />
                <span className="text-sm text-slate-600">Loading...</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto ml-64">{children}</div>
      </div>
    );
  }

  return (
    <div className="flex">
      <SidebarInstance instanceData={instanceData} />
      <div className="flex-1 overflow-auto ml-64">{children}</div>
    </div>
  );
}
