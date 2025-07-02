import { SidebarWorker } from "@/components/layout/sidebar-worker";

// Mock worker data
const workerData = {
  id: "1",
  name: "Worker-01",
  endpoint: "https://api.worker1.example.com",
  status: "Online",
  version: "v2.1.4",
  uptime: "7d 14h 32m",
  lastSeen: "2 minutes ago",
  region: "US-East-1",
  created: "6/25/2025, 10:30:00 AM",
};

export default function WorkerLayout({ children }) {
  return (
    <div className="flex">
      <SidebarWorker workerData={workerData} />
      <div className="flex-1 overflow-auto pl-64">{children}</div>
    </div>
  );
}
