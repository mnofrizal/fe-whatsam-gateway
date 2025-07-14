"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { SESSION_ENDPOINTS, buildApiUrl } from "@/lib/constants";

const workerData = {
  id: "1",
  name: "Worker-01",
};

export function Breadcrumb() {
  const pathname = usePathname();
  const params = useParams();
  const { data: session } = useSession();
  const [instanceData, setInstanceData] = useState(null);

  // Fetch instance data when on instance pages
  useEffect(() => {
    if (
      pathname.startsWith("/dashboard/instance/") &&
      session?.accessToken &&
      params.id
    ) {
      const fetchInstanceData = async () => {
        try {
          const response = await fetch(
            buildApiUrl(SESSION_ENDPOINTS.GET_BY_ID(params.id)),
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data?.session) {
              setInstanceData({
                id: data.data.session.id,
                name: data.data.session.name,
              });
            }
          }
        } catch (err) {
          console.error("Error fetching instance data for breadcrumb:", err);
          // Fallback to generic name
          setInstanceData({
            id: params.id,
            name: `Instance ${params.id}`,
          });
        }
      };

      fetchInstanceData();
    }
  }, [pathname, session, params.id]);

  if (pathname.startsWith("/dashboard/instance/")) {
    const segments = pathname.split("/").filter(Boolean);
    const instanceName = instanceData?.name || `Instance ${params.id}`;

    return (
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Link
          href="/dashboard"
          className="hover:text-slate-900 transition-colors"
        >
          <Home className="h-3 w-3" />
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/dashboard/instance/${params.id}`}
          className="hover:text-slate-900 transition-colors"
        >
          Instance
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/dashboard/instance/${params.id}`}
          className="hover:text-slate-900 transition-colors"
        >
          {instanceName}
        </Link>
        {segments.length > 3 && (
          <>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-900 font-medium">
              {segments[3] === "settings"
                ? "Settings"
                : segments[3] === "playground"
                ? "Playground"
                : segments[3].charAt(0).toUpperCase() + segments[3].slice(1)}
            </span>
          </>
        )}
      </div>
    );
  }

  if (pathname.startsWith("/dashboard/admin/worker/")) {
    const segments = pathname.split("/").filter(Boolean);
    return (
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Link
          href="/dashboard"
          className="hover:text-slate-900 transition-colors"
        >
          <Home className="h-3 w-3" />
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/dashboard/admin/worker/${params.id}`}
          className="hover:text-slate-900 transition-colors"
        >
          Worker
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/dashboard/admin/worker/${params.id}`}
          className="hover:text-slate-900 transition-colors"
        >
          {workerData.name}
        </Link>
        {segments.length > 3 && (
          <>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-900 font-medium">
              {segments[3].charAt(0).toUpperCase() + segments[3].slice(1)}
            </span>
          </>
        )}
      </div>
    );
  }

  if (pathname.startsWith("/dashboard/admin/manager")) {
    const segments = pathname.split("/").filter(Boolean);

    // If on main manager page
    if (pathname === "/dashboard/admin/manager") {
      return (
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Link
            href="/dashboard"
            className="hover:text-slate-900 transition-colors"
          >
            <Home className="h-3 w-3" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900 font-medium">Manager</span>
        </div>
      );
    }

    // If on manager sub-pages
    return (
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Link
          href="/dashboard"
          className="hover:text-slate-900 transition-colors"
        >
          <Home className="h-3 w-3" />
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href="/dashboard/admin/manager"
          className="hover:text-slate-900 transition-colors"
        >
          Manager
        </Link>
        {segments.length > 2 && (
          <>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-900 font-medium">
              {segments[2] === "users"
                ? "Manage Users"
                : segments[2] === "subscriptions"
                ? "Manage Subscriptions"
                : segments[2].charAt(0).toUpperCase() + segments[2].slice(1)}
            </span>
          </>
        )}
      </div>
    );
  }

  return null;
}
