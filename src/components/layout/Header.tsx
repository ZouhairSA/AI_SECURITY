import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "../../contexts/AuthContext";
import { ThemeLanguageSwitcher } from "../ThemeLanguageSwitcher";
import { useThemeLanguage } from "../../contexts/ThemeLanguageContext";
import { useNavigate } from "react-router-dom";
import { AppLogo } from "../AppLogo";

interface HeaderProps {
  userName: string;
}

export function Header({ userName }: HeaderProps) {
  const { logout } = useAuth();
  const { t } = useThemeLanguage();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center">
        <h1 className="font-bold text-xl text-security-800 hidden sm:block tracking-wide uppercase dark:text-security-200">
          AI SECURITY
        </h1>
      </div>

      <div className="flex-1 mx-4 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder={t("searchUsers") + "..."}
            className="pl-8 bg-gray-50 dark:bg-gray-800"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <ThemeLanguageSwitcher />
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-sm"
            >
              <User className="h-5 w-5" />
              <span className="hidden md:inline-block font-medium">
                {userName}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("profile")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>{t("settings")}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>{t("logout")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
