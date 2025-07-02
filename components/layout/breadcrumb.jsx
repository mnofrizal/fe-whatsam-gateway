"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { ChevronRight } from "lucide-react";

// Mock data - in a real app, this would come from a data store or API
const instanceData = {
  id: "1",
  name: "Semen",
};

const workerData = {
  id: "1",
  name: "Worker-01",
};

export function Breadcrumb() {
  const pathname = usePathname();
  const params = useParams();

  if (pathname.startsWith("/instance/")) {
    const segments = pathname.split("/").filter(Boolean);
    return (
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Link
          href={`/instance/${params.id}`}
          className="hover:text-slate-900 transition-colors"
        >
          {instanceData.name}
        </Link>
        {segments.length > 2 && (
          <>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-900 font-medium">
              {segments[2].charAt(0).toUpperCase() + segments[2].slice(1)}
            </span>
          </>
        )}
      </div>
    );
  }

  if (pathname.startsWith("/admin/worker/")) {
    const segments = pathname.split("/").filter(Boolean);
    return (
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Link href="/admin" className="hover:text-slate-900 transition-colors">
          Admin
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          href={`/admin/worker/${params.id}`}
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

  return null;
}
