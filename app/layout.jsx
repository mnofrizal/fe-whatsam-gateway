import "./globals.css";
import { Navbar } from "@/components/layout/navbar";

export const metadata = {
  title: "WhatsApp API Gateway",
  description: "Manage your WhatsApp API instances and workers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <main className="pt-16">{children}</main>
        </div>
      </body>
    </html>
  );
}
