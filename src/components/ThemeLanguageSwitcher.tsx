
import { useThemeLanguage } from "../contexts/ThemeLanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Moon, Sun } from "lucide-react";

export function ThemeLanguageSwitcher() {
  const { theme, language, setTheme, setLanguage, t } = useThemeLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => setLanguage("fr")}
            className={language === "fr" ? "bg-muted" : ""}
          >
            {t("french")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLanguage("en")}
            className={language === "en" ? "bg-muted" : ""}
          >
            {t("english")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLanguage("ar")}
            className={language === "ar" ? "bg-muted" : ""}
          >
            {t("arabic")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{t("theme")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className={theme === "light" ? "bg-muted" : ""}
          >
            <Sun className="h-4 w-4 mr-2" />
            {t("light")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className={theme === "dark" ? "bg-muted" : ""}
          >
            <Moon className="h-4 w-4 mr-2" />
            {t("dark")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
