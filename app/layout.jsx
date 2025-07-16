import "./globals.css";
import { Inter } from "next/font/google";
import NextAuthSessionProvider from "@/components/providers/session-provider";
import { Navbar } from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WhatsApp API Gateway",
  description: "Manage your WhatsApp API instances and workers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NextAuthSessionProvider>
          <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="">{children}</main>
          </div>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
