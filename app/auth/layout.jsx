import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Authentication - WhatsApp API Gateway",
  description:
    "Sign in or create an account to access your WhatsApp API Gateway dashboard",
};

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">{children}</div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 z-10">
        <div className="text-center">
          <p className="text-xs text-slate-500">
            © 2025 WhatsApp API Gateway. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
