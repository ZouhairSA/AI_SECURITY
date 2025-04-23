
import { Copyright, Info } from "lucide-react";

export function Footer() {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between px-4 py-2 bg-security-900 text-gray-100 text-sm border-t border-border/30 mt-4">
      <div className="flex items-center space-x-2">
        <Copyright className="h-3 w-3 mr-1" />
        <span>2025 SABYOUD ZOHAIR</span>
      </div>
      <div className="flex items-center space-x-4 mt-1 md:mt-0">
        <span className="flex items-center"><Info className="h-3 w-3 mr-1" /> Security Monitoring System</span>
        <span className="flex items-center"><Info className="h-3 w-3 mr-1" /> Real-time Video Surveillance</span>
      </div>
    </footer>
  );
}
