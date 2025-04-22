
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";
type Language = "fr" | "en" | "ar";

interface ThemeLanguageContextType {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  translations: Record<string, Record<Language, string>>;
  t: (key: string) => string;
}

const translations = {
  // Common
  "logout": {
    "fr": "Déconnexion",
    "en": "Logout",
    "ar": "تسجيل خروج"
  },
  "settings": {
    "fr": "Paramètres",
    "en": "Settings",
    "ar": "إعدادات"
  },
  "profile": {
    "fr": "Profil",
    "en": "Profile",
    "ar": "الملف الشخصي"
  },
  "save": {
    "fr": "Enregistrer",
    "en": "Save",
    "ar": "حفظ"
  },
  // Dashboard
  "dashboard": {
    "fr": "Tableau de bord",
    "en": "Dashboard",
    "ar": "لوحة القيادة"
  },
  "cameras": {
    "fr": "Caméras",
    "en": "Cameras",
    "ar": "الكاميرات"
  },
  "alerts": {
    "fr": "Alertes",
    "en": "Alerts",
    "ar": "إنذارات"
  },
  "users": {
    "fr": "Utilisateurs",
    "en": "Users",
    "ar": "المستخدمين"
  },
  // Users page
  "userManagement": {
    "fr": "Gestion des utilisateurs",
    "en": "User Management",
    "ar": "إدارة المستخدمين"
  },
  "addUser": {
    "fr": "Ajouter un utilisateur",
    "en": "Add User",
    "ar": "إضافة مستخدم"
  },
  "searchUsers": {
    "fr": "Rechercher des utilisateurs...",
    "en": "Search users...",
    "ar": "البحث عن المستخدمين..."
  },
  "user": {
    "fr": "Utilisateur",
    "en": "User",
    "ar": "مستخدم"
  },
  "role": {
    "fr": "Rôle",
    "en": "Role",
    "ar": "دور"
  },
  "assignedCameras": {
    "fr": "Caméras assignées",
    "en": "Assigned Cameras",
    "ar": "الكاميرات المعينة"
  },
  "actions": {
    "fr": "Actions",
    "en": "Actions",
    "ar": "إجراءات"
  },
  // Settings page
  "generalSettings": {
    "fr": "Paramètres généraux",
    "en": "General Settings",
    "ar": "الإعدادات العامة"
  },
  "notifications": {
    "fr": "Notifications",
    "en": "Notifications",
    "ar": "الإشعارات"
  },
  "detection": {
    "fr": "Détection",
    "en": "Detection",
    "ar": "الكشف"
  },
  "fullName": {
    "fr": "Nom complet",
    "en": "Full Name",
    "ar": "الاسم الكامل"
  },
  "email": {
    "fr": "Email",
    "en": "Email",
    "ar": "البريد الإلكتروني"
  },
  "appearance": {
    "fr": "Apparence",
    "en": "Appearance",
    "ar": "المظهر"
  },
  "language": {
    "fr": "Langue",
    "en": "Language",
    "ar": "اللغة"
  },
  "theme": {
    "fr": "Thème",
    "en": "Theme",
    "ar": "السمة"
  },
  "light": {
    "fr": "Clair",
    "en": "Light",
    "ar": "فاتح"
  },
  "dark": {
    "fr": "Sombre",
    "en": "Dark",
    "ar": "داكن"
  },
  "french": {
    "fr": "Français",
    "en": "French",
    "ar": "فرنسي"
  },
  "english": {
    "fr": "Anglais",
    "en": "English",
    "ar": "إنجليزي"
  },
  "arabic": {
    "fr": "Arabe",
    "en": "Arabic",
    "ar": "عربي"
  },
  "editUser": {
    "fr": "Modifier l'utilisateur",
    "en": "Edit User",
    "ar": "تعديل المستخدم"
  },
  "delete": {
    "fr": "Supprimer",
    "en": "Delete",
    "ar": "حذف"
  },
  "edit": {
    "fr": "Modifier",
    "en": "Edit",
    "ar": "تعديل"
  }
};

const ThemeLanguageContext = createContext<ThemeLanguageContextType | undefined>(undefined);

export function ThemeLanguageProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme as Theme) || "light";
  });
  
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as Language) || "fr";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    
    if (language === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = language;
    }
  }, [theme, language]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || key;
  };

  return (
    <ThemeLanguageContext.Provider value={{ 
      theme, 
      language, 
      setTheme, 
      setLanguage, 
      translations,
      t 
    }}>
      {children}
    </ThemeLanguageContext.Provider>
  );
}

export function useThemeLanguage() {
  const context = useContext(ThemeLanguageContext);
  if (context === undefined) {
    throw new Error("useThemeLanguage must be used within a ThemeLanguageProvider");
  }
  return context;
}
