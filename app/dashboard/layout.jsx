import { Navbar } from "@/components/layout/navbar";
import React from "react";

export default function DashboardLayout({ children }) {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
}
