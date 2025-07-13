import { SidebarManager } from "@/components/layout/sidebar-manager";

export default function ManagerLayout({ children }) {
  return (
    <div className="flex">
      <SidebarManager />
      <div className="flex-1 overflow-auto ml-64">{children}</div>
    </div>
  );
}