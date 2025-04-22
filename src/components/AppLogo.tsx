
import { useThemeLanguage } from "../contexts/ThemeLanguageContext";
import { Camera, Shield } from "lucide-react";

export function AppLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const { theme } = useThemeLanguage();
  
  // Définition des tailles
  const sizes = {
    sm: {
      container: "h-8 w-8",
      icon: "h-5 w-5",
      text: "text-lg",
    },
    md: {
      container: "h-10 w-10",
      icon: "h-6 w-6",
      text: "text-xl",
    },
    lg: {
      container: "h-12 w-12",
      icon: "h-7 w-7",
      text: "text-2xl",
    },
  };
  
  return (
    <div className="flex items-center">
      <div className={`relative flex items-center justify-center rounded-lg bg-primary ${sizes[size].container}`}>
        <Camera className={`${sizes[size].icon} text-white`} />
        <Shield className={`${sizes[size].icon} text-white absolute opacity-40`} />
      </div>
      <div className={`ml-2 font-bold tracking-tight ${sizes[size].text} ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
        SecurView
      </div>
    </div>
  );
}
