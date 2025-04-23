import { ReactNode, useState, useEffect, Dispatch, SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Camera,
  Home,
  Bell,
  Settings,
  Users,
  Shield,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useThemeLanguage } from "../../contexts/ThemeLanguageContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogoutConfirmDialog } from "../LogoutConfirmDialog";

interface SidebarItemProps {
  icon: ReactNode;
  href: string;
  title?: string;
  active?: boolean;
  isCollapsed?: boolean;
}

function SidebarItem({ icon, href, title, active, isCollapsed }: SidebarItemProps) {
  const content = (
    <Link
      to={href}
      className={cn(
        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
        "hover:bg-security-800 hover:text-white",
        active
          ? "bg-security-700 text-white"
          : "text-gray-100",
        isCollapsed && "justify-center"
      )}
    >
      <span className="h-5 w-5 flex-shrink-0">{icon}</span>
      {!isCollapsed && title && (
         <span className={cn(
           "ml-3 transition-opacity duration-200",
         )}>
           {title}
         </span>
      )}
    </Link>
  );

  if (isCollapsed && title) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="right">
            {title}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}

export function Sidebar() {
  const location = useLocation();
  const { logout, isAdmin, user } = useAuth();
  const { t } = useThemeLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div 
      className={cn(
        "relative flex flex-col h-full bg-security-950 text-white transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center">
        <Shield className="h-6 w-6 flex-shrink-0" />
        <span className={cn(
          "ml-2 font-bold text-xl uppercase tracking-wide transition-all duration-300 whitespace-nowrap overflow-hidden",
          isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
        )}>
          AI Security
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-security-800 hover:bg-security-700 text-white z-10"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      <nav className={cn(
        "mt-6 px-3 flex-1 space-y-1",
        isCollapsed ? "px-2 space-y-2" : "px-3 space-y-1"
      )}>
        <SidebarItem
          icon={<Home />}
          href="/dashboard"
          title={t("dashboard")}
          active={isActive("/dashboard")}
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          icon={<Camera />}
          href="/cameras"
          title={t("cameras")}
          active={isActive("/cameras")}
          isCollapsed={isCollapsed}
        />
        <SidebarItem
          icon={<Bell />}
          href="/alerts"
          title={t("alerts")}
          active={isActive("/alerts")}
          isCollapsed={isCollapsed}
        />
        {isAdmin && (
          <SidebarItem
            icon={<Users />}
            href="/users"
            title={t("users")}
            active={isActive("/users")}
            isCollapsed={isCollapsed}
          />
        )}
        <SidebarItem
          icon={<Settings />}
          href="/settings"
          title={t("settings")}
          active={isActive("/settings")}
          isCollapsed={isCollapsed}
        />
      </nav>

      <div className={cn(
        "mt-auto pt-4 border-t border-security-800",
        isCollapsed ? "px-2" : "px-3"
      )}>
        <div className="flex items-center mb-4 h-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cn("flex items-center w-full overflow-hidden cursor-pointer rounded-md hover:bg-security-900 p-1", isCollapsed ? "justify-center" : "")}> 
                  <Avatar className={cn("h-8 w-8 flex-shrink-0", !isCollapsed && "mr-2")}>
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className={cn("flex flex-col ml-1 overflow-hidden")}> 
                      <span className="text-sm font-medium truncate">{user?.name}</span>
                      <span className="text-xs text-gray-400 truncate">{user?.email}</span>
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              {isCollapsed && user?.name && (
                <TooltipContent side="right">
                  <p>{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex flex-col gap-1 pb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size={isCollapsed ? "icon" : "default"}
                  onClick={() => setShowLogoutConfirm(true)}
                  className={cn(
                    "text-gray-300 hover:text-white hover:bg-security-800 w-full",
                    isCollapsed ? "justify-center" : "justify-start"
                  )}
                  aria-label={t("logout")}
                >
                  <LogOut className={cn("h-4 w-4 flex-shrink-0", !isCollapsed && "mr-2")} />
                  {!isCollapsed && (
                     <span className={cn("ml-2")}> 
                       {t("logout")}
                     </span>
                  )}
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  {t("logout")}
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <LogoutConfirmDialog
        open={showLogoutConfirm}
        onOpenChange={setShowLogoutConfirm}
        onConfirm={logout}
      />
    </div>
  );
}
