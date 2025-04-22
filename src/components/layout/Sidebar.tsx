
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Camera,
  Home,
  Bell,
  Settings,
  Users,
  Shield,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useThemeLanguage } from "../../contexts/ThemeLanguageContext";

interface SidebarItemProps {
  icon: ReactNode;
  href: string;
  title: string;
  active?: boolean;
}

function SidebarItem({ icon, href, title, active }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active
          ? "bg-security-700 text-white"
          : "text-gray-100 hover:bg-security-800 hover:text-white"
      )}
    >
      <span className="mr-3 h-5 w-5">{icon}</span>
      <span>{title}</span>
    </Link>
  );
}

export function Sidebar() {
  const location = useLocation();
  const { logout, isAdmin } = useAuth();
  const { t } = useThemeLanguage();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-full w-64 bg-security-950 text-white">
      <div className="p-4">
        <h1 className="text-xl font-bold flex items-center uppercase tracking-wide">
          <Shield className="mr-2 h-6 w-6" />
          <span className="text-white">AI SECURITY</span>
        </h1>
      </div>

      <nav className="mt-6 px-3 flex-1 space-y-1">
        <SidebarItem
          icon={<Home />}
          href="/dashboard"
          title={t("dashboard")}
          active={isActive("/dashboard")}
        />
        
        <SidebarItem
          icon={<Camera />}
          href="/cameras"
          title={t("cameras")}
          active={isActive("/cameras")}
        />
        
        <SidebarItem
          icon={<Bell />}
          href="/alerts"
          title={t("alerts")}
          active={isActive("/alerts")}
        />
        
        {isAdmin && (
          <SidebarItem
            icon={<Users />}
            href="/users"
            title={t("users")}
            active={isActive("/users")}
          />
        )}

        <SidebarItem
          icon={<Settings />}
          href="/settings"
          title={t("settings")}
          active={isActive("/settings")}
        />
      </nav>

      <div className="p-4 border-t border-security-800">
        <button
          onClick={logout}
          className="flex w-full items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-security-800 hover:text-white transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span>{t("logout")}</span>
        </button>
      </div>
    </div>
  );
}
