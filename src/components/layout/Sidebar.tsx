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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { LogoutConfirmDialog } from "../LogoutConfirmDialog";

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
  const { logout, isAdmin, user } = useAuth();
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

      <div className="mt-auto pt-4 border-t border-border/40">
        <div className="px-3 py-2">
          <div className="flex items-center mb-4">
            <Avatar>
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{user?.email}</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            <Link
              to="/settings"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full justify-start px-2",
                location.pathname === "/settings" && "bg-accent text-accent-foreground"
              )}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>{t("settings")}</span>
            </Link>
            
            <LogoutConfirmDialog />
          </nav>
        </div>
      </div>
    </div>
  );
}
