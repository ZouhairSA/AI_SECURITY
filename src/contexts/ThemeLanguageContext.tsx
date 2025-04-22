import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

type Theme = "light" | "dark";
type Language = "en" | "fr" | "ar";

interface ThemeLanguageContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const ThemeLanguageContext = createContext<ThemeLanguageContextProps | undefined>(
  undefined
);

interface ThemeLanguageProviderProps {
  children: React.ReactNode;
}

const translations: Record<string, Record<string, string>> = {
  en: {
    theme: "Theme",
    language: "Language",
    french: "French",
    english: "English",
    arabic: "Arabic",
    light: "Light",
    dark: "Dark",
    // Camera details page
    liveVideoStream: "Live Video Stream",
    lastUpdate: "Last Update",
    fullScreen: "Full Screen",
    statistics: "Statistics",
    daily: "Daily",
    weekly: "Weekly",
    alerts: "Alerts",
    dailyActivity: "Daily Activity",
    weeklyActivity: "Weekly Activity",
    motionEvents: "Motion Events",
    alertEvents: "Alert Events",
    totalMotionEvents: "Total Motion Events",
    totalAlerts: "Total Alerts",
    uptime: "Uptime",
    last24Hours: "Last 24 Hours",
    fromYesterday: "from yesterday",
    weeklyTotal: "Weekly Total",
    fromLastWeek: "from last week",
    busyDay: "Busiest Day",
    quietDay: "Quietest Day",
    thursday: "Thursday",
    sunday: "Sunday",
    events: "events",
    alertsByType: "Alerts by Type",
    recentAlerts: "Recent Alerts",
    fire: "Fire",
    crowd: "Crowd",
    weapon: "Weapon",
    violence: "Violence",
    detected: "Detected",
    online: "Online",
    offline: "Offline",
    warning: "Warning",
    cameraNotFound: "Camera Not Found",
    cameraNotFoundDesc:
      "The requested camera could not be found or you don't have permission to view it.",
    backToCameras: "Back to Cameras",

    // Cameras page
    cameras: "Cameras",
    camerasDescription: "Manage and monitor your security cameras",
    addCamera: "Add Camera",
    status: "Status",
    filterByStatus: "Filter by status",
    allStatuses: "All Statuses",
    searchCameras: "Search cameras...",
    gridView: "Grid View",
    listView: "List View",
    camera: "Camera",
    location: "Location",
    lastAlert: "Last Alert",
    configure: "Configure",
    viewFeed: "View Feed",
    noCamerasFound: "No cameras found",
    adjustFilters: "Try adjusting your search filters",
    addCamerasToStart: "Add cameras to start monitoring",
    noCamerasMatchFilters: "No cameras match your filters",
    none: "None",
    view: "View",

    // Logout confirmation dialog
    confirmLogout: "Confirm Logout",
    logoutConfirmationMessage:
      "Are you sure you want to logout from the system? Any unsaved changes will be lost.",
    cancel: "Cancel",
    logout: "Logout",
    error: "Error",
    failedToLoadCameras: "Failed to load cameras",
  },
  fr: {
    theme: "Thème",
    language: "Langue",
    french: "Français",
    english: "Anglais",
    arabic: "Arabe",
    light: "Clair",
    dark: "Sombre",
    // Camera details page
    liveVideoStream: "Flux vidéo en direct",
    lastUpdate: "Dernière mise à jour",
    fullScreen: "Plein écran",
    statistics: "Statistiques",
    daily: "Quotidien",
    weekly: "Hebdomadaire",
    alerts: "Alertes",
    dailyActivity: "Activité quotidienne",
    weeklyActivity: "Activité hebdomadaire",
    motionEvents: "Événements de mouvement",
    alertEvents: "Événements d'alerte",
    totalMotionEvents: "Total des mouvements",
    totalAlerts: "Total des alertes",
    uptime: "Temps de fonctionnement",
    last24Hours: "Dernières 24 heures",
    fromYesterday: "par rapport à hier",
    weeklyTotal: "Total hebdomadaire",
    fromLastWeek: "par rapport à la semaine dernière",
    busyDay: "Jour le plus actif",
    quietDay: "Jour le moins actif",
    thursday: "Jeudi",
    sunday: "Dimanche",
    events: "événements",
    alertsByType: "Alertes par type",
    recentAlerts: "Alertes récentes",
    fire: "Incendie",
    crowd: "Foule",
    weapon: "Arme",
    violence: "Violence",
    detected: "Détecté",
    online: "En ligne",
    offline: "Hors ligne",
    warning: "Avertissement",
    cameraNotFound: "Caméra non trouvée",
    cameraNotFoundDesc:
      "La caméra demandée n'a pas pu être trouvée ou vous n'avez pas la permission de la voir.",
    backToCameras: "Retour aux caméras",

    // Cameras page
    cameras: "Caméras",
    camerasDescription: "Gérer et surveiller vos caméras de sécurité",
    addCamera: "Ajouter une caméra",
    status: "Statut",
    filterByStatus: "Filtrer par statut",
    allStatuses: "Tous les statuts",
    searchCameras: "Rechercher des caméras...",
    gridView: "Vue en grille",
    listView: "Vue en liste",
    camera: "Caméra",
    location: "Emplacement",
    lastAlert: "Dernière alerte",
    configure: "Configurer",
    viewFeed: "Voir le flux",
    noCamerasFound: "Aucune caméra trouvée",
    adjustFilters: "Essayez d'ajuster vos filtres de recherche",
    addCamerasToStart: "Ajoutez des caméras pour commencer à surveiller",
    noCamerasMatchFilters: "Aucune caméra ne correspond à vos filtres",
    none: "Aucune",
    view: "Voir",

    // Logout confirmation dialog
    confirmLogout: "Confirmer la déconnexion",
    logoutConfirmationMessage:
      "Êtes-vous sûr de vouloir vous déconnecter du système? Toutes les modifications non enregistrées seront perdues.",
    cancel: "Annuler",
    logout: "Déconnexion",
    error: "Erreur",
    failedToLoadCameras: "Échec du chargement des caméras",
  },
  ar: {
    theme: "مظهر",
    language: "لغة",
    french: "الفرنسية",
    english: "الإنجليزية",
    arabic: "العربية",
    light: "فاتح",
    dark: "داكن",
    // Camera details page
    liveVideoStream: "بث فيديو مباشر",
    lastUpdate: "آخر تحديث",
    fullScreen: "ملء الشاشة",
    statistics: "إحصائيات",
    daily: "يومي",
    weekly: "أسبوعي",
    alerts: "تنبيهات",
    dailyActivity: "النشاط اليومي",
    weeklyActivity: "النشاط الأسبوعي",
    motionEvents: "أحداث الحركة",
    alertEvents: "أحداث التنبيه",
    totalMotionEvents: "إجمالي أحداث الحركة",
    totalAlerts: "إجمالي التنبيهات",
    uptime: "وقت التشغيل",
    last24Hours: "آخر 24 ساعة",
    fromYesterday: "من الأمس",
    weeklyTotal: "المجموع الأسبوعي",
    fromLastWeek: "من الأسبوع الماضي",
    busyDay: "اليوم الأكثر نشاطًا",
    quietDay: "اليوم الأقل نشاطًا",
    thursday: "الخميس",
    sunday: "الأحد",
    events: "أحداث",
    alertsByType: "التنبيهات حسب النوع",
    recentAlerts: "التنبيهات الأخيرة",
    fire: "حريق",
    crowd: "حشد",
    weapon: "سلاح",
    violence: "عنف",
    detected: "تم الكشف",
    online: "متصل",
    offline: "غير متصل",
    warning: "تحذير",
    cameraNotFound: "الكاميرا غير موجودة",
    cameraNotFoundDesc:
      "تعذر العثور على الكاميرا المطلوبة أو ليس لديك إذن لمشاهدتها.",
    backToCameras: "العودة إلى الكاميرات",

    // Cameras page
    cameras: "الكاميرات",
    camerasDescription: "إدارة ومراقبة كاميرات الأمن الخاصة بك",
    addCamera: "إضافة كاميرا",
    status: "الحالة",
    filterByStatus: "تصفية حسب الحالة",
    allStatuses: "جميع الحالات",
    searchCameras: "البحث عن الكاميرات...",
    gridView: "عرض الشبكة",
    listView: "عرض القائمة",
    camera: "كاميرا",
    location: "الموقع",
    lastAlert: "آخر تنبيه",
    configure: "تكوين",
    viewFeed: "عرض البث",
    noCamerasFound: "لم يتم العثور على كاميرات",
    adjustFilters: "حاول تعديل مرشحات البحث",
    addCamerasToStart: "أضف كاميرات لبدء المراقبة",
    noCamerasMatchFilters: "لا توجد كاميرات تطابق المرشحات",
    none: "لا يوجد",
    view: "عرض",

    // Logout confirmation dialog
    confirmLogout: "تأكيد تسجيل الخروج",
    logoutConfirmationMessage:
      "هل أنت متأكد من رغبتك في تسجيل الخروج من النظام؟ سيتم فقدان أي تغييرات غير محفوظة.",
    cancel: "إلغاء",
    logout: "تسجيل الخروج",
    error: "خطأ",
    failedToLoadCameras: "فشل في تحميل الكاميرات",
  },
};

export function ThemeLanguageProvider({ children }: ThemeLanguageProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || "light"
  );
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem("language") as Language) || "en"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = useCallback(
    (key: string) => {
      return translations[language][key] || key;
    },
    [language]
  );

  const value: ThemeLanguageContextProps = {
    theme,
    setTheme,
    language,
    setLanguage,
    t,
  };

  return (
    <ThemeLanguageContext.Provider value={value}>
      {children}
    </ThemeLanguageContext.Provider>
  );
}

export function useThemeLanguage() {
  const context = useContext(ThemeLanguageContext);
  if (context === undefined) {
    throw new Error(
      "useThemeLanguage must be used within a ThemeLanguageProvider"
    );
  }
  return context;
}
