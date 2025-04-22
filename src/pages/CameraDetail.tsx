
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Camera, getCamera } from "@/lib/camera-service";
import { useThemeLanguage } from "../contexts/ThemeLanguageContext";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ArrowLeft, AlertCircle, Settings2, Info } from "lucide-react";

// Couleurs pour les statuts
const statusColors: Record<string, string> = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  warning: "bg-yellow-500",
};

// Données simulées pour les graphiques
const activityData = [
  { time: "00:00", motion: 2, alerts: 0 },
  { time: "03:00", motion: 0, alerts: 0 },
  { time: "06:00", motion: 3, alerts: 0 },
  { time: "09:00", motion: 12, alerts: 1 },
  { time: "12:00", motion: 8, alerts: 0 },
  { time: "15:00", motion: 15, alerts: 2 },
  { time: "18:00", motion: 10, alerts: 1 },
  { time: "21:00", motion: 5, alerts: 0 },
];

const weeklyActivityData = [
  { day: "Lun", motion: 45, alerts: 2 },
  { day: "Mar", motion: 52, alerts: 3 },
  { day: "Mer", motion: 38, alerts: 1 },
  { day: "Jeu", motion: 62, alerts: 4 },
  { day: "Ven", motion: 55, alerts: 2 },
  { day: "Sam", motion: 30, alerts: 0 },
  { day: "Dim", motion: 25, alerts: 0 },
];

const alertTypeData = [
  { name: "Incendie", value: 4, color: "#ef4444" },
  { name: "Foule", value: 8, color: "#f59e0b" },
  { name: "Armes", value: 2, color: "#8b5cf6" },
  { name: "Violence", value: 6, color: "#ec4899" },
];

export default function CameraDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [camera, setCamera] = useState<Camera | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useThemeLanguage();
  
  useEffect(() => {
    const fetchCamera = async () => {
      try {
        if (!id) return;
        const cameraData = await getCamera(id);
        setCamera(cameraData);
      } catch (error) {
        console.error("Erreur lors du chargement de la caméra:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCamera();
  }, [id]);
  
  if (loading) {
    return (
      <AppLayout>
        <div className="flex h-full items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      </AppLayout>
    );
  }
  
  if (!camera) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold">{t("cameraNotFound")}</h2>
          <p className="text-muted-foreground mt-2">{t("cameraNotFoundDesc")}</p>
          <Button 
            className="mt-4"
            onClick={() => navigate('/cameras')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> {t("backToCameras")}
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/cameras')}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{camera.name}</h2>
              <p className="text-muted-foreground">
                {camera.location}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge 
              variant="outline" 
              className={`${statusColors[camera.status]} text-white`}
            >
              {camera.status === "online" ? t("online") : camera.status === "offline" ? t("offline") : t("warning")}
            </Badge>
            <Button variant="outline" size="icon">
              <Settings2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Flux de caméra principal */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50 py-3">
            <CardTitle className="text-sm flex items-center">
              <Info className="h-4 w-4 mr-2 text-muted-foreground" />
              {t("liveVideoStream")}
            </CardTitle>
          </CardHeader>
          <div className="relative aspect-video">
            <img 
              src={camera.streamUrl} 
              alt={camera.name} 
              className="w-full h-full object-cover"
            />
            {camera.lastAlert && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="px-3 py-1 rounded bg-red-500 text-white animate-pulse-alert flex items-center space-x-1">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-medium">
                    {t(camera.lastAlert.type)} {t("detected")}
                  </span>
                </div>
              </div>
            )}
          </div>
          <CardFooter className="p-3 bg-muted/20 flex justify-between">
            <div className="text-sm text-muted-foreground">
              {t("lastUpdate")}: {new Date().toLocaleTimeString(language === 'fr' ? 'fr-FR' : language === 'ar' ? 'ar-SA' : 'en-US')}
            </div>
            <Button size="sm" variant="secondary">
              {t("fullScreen")}
            </Button>
          </CardFooter>
        </Card>

        {/* Statistiques */}
        <h3 className="text-lg font-semibold mt-6">{t("statistics")}</h3>
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="daily">{t("daily")}</TabsTrigger>
            <TabsTrigger value="weekly">{t("weekly")}</TabsTrigger>
            <TabsTrigger value="alerts">{t("alerts")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-md">{t("dailyActivity")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={activityData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="motion" 
                        name={t("motionEvents")} 
                        stroke="#0ea5e9" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="alerts" 
                        name={t("alertEvents")} 
                        stroke="#ef4444" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{t("totalMotionEvents")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">55</div>
                  <p className="text-xs text-muted-foreground">+12% {t("fromYesterday")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{t("totalAlerts")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">-2% {t("fromYesterday")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{t("uptime")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">98.5%</div>
                  <p className="text-xs text-muted-foreground">{t("last24Hours")}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="weekly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-md">{t("weeklyActivity")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={weeklyActivityData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="motion" name={t("motionEvents")} fill="#0ea5e9" />
                      <Bar dataKey="alerts" name={t("alertEvents")} fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{t("weeklyTotal")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">307</div>
                  <p className="text-xs text-muted-foreground">+5% {t("fromLastWeek")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{t("busyDay")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{t("thursday")}</div>
                  <p className="text-xs text-muted-foreground">62 {t("events")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{t("quietDay")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{t("sunday")}</div>
                  <p className="text-xs text-muted-foreground">25 {t("events")}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">{t("alertsByType")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ChartContainer 
                      config={{
                        fire: { color: "#ef4444" },
                        crowd: { color: "#f59e0b" },
                        weapon: { color: "#8b5cf6" },
                        violence: { color: "#ec4899" },
                      }}
                    >
                      <PieChart>
                        <Pie
                          data={alertTypeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                          nameKey="name"
                        >
                          {alertTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">{t("recentAlerts")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: "crowd", time: "15:42", date: "2025-04-21", confidence: 0.92 },
                      { type: "violence", time: "11:23", date: "2025-04-20", confidence: 0.87 },
                      { type: "fire", time: "09:15", date: "2025-04-19", confidence: 0.95 },
                      { type: "weapon", time: "16:30", date: "2025-04-18", confidence: 0.83 },
                    ].map((alert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center">
                          <div className={`h-3 w-3 rounded-full mr-3 bg-${alert.type === "fire" ? "red" : alert.type === "crowd" ? "amber" : alert.type === "weapon" ? "purple" : "pink"}-500`}></div>
                          <div>
                            <div className="font-medium">{t(alert.type)}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(`${alert.date}T${alert.time}`).toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'ar' ? 'ar-SA' : 'en-US')} - {alert.time}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(alert.confidence * 100)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
