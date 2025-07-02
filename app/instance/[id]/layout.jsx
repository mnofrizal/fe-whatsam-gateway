import { SidebarInstance } from "@/components/layout/sidebar-instance";

// Mock data - in real app this would come from API based on the ID
const instanceData = {
  id: "1",
  name: "Semen",
  displayName: "Aya",
  phoneNumber: "628517991457",
  status: "ERROR",
  active: "Yes",
  apiKey: "sk_test_1234567890abcdef1234567890abcdef",
  connectionState: "DISCONNECTED",
  connectionAttempts: 0,
  lastConnected: "7/1/2025, 2:10:32 PM",
  lastDisconnected: "7/1/2025, 2:12:15 PM",
  created: "7/1/2025, 7:50:56 AM",
  lastUpdated: "7/1/2025, 2:31:04 PM",
  createdBy: "Muhammad Naufal",
  apiKeyStatus: "Active",
  messageStats: 1,
  contacts: 4,
  reconnectAttempts: 0,
  qrAttempts: "0 / 3",
  lastError: {
    message: "Failed to initialize on startup; instanceId is not defined",
    timestamp: "7/1/2025, 2:31:04 PM",
  },
};

export default function InstanceLayout({ children }) {
  return (
    <div className="flex">
      <SidebarInstance instanceData={instanceData} />
      <div className="flex-1 overflow-auto pl-64">{children}</div>
    </div>
  );
}
