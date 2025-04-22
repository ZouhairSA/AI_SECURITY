
import { useState, useEffect } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertType, Camera, getAlerts, getCameras } from "@/lib/camera-service";
import { Camera as CameraIcon, AlertCircle, Users, Eye } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  LineChart, 
  Line,
  CartesianGrid
} from "recharts";

// Alert type colors
const alertColors: Record<AlertType, string> = {
  fire: "#ef4444",
  crowd: "#f59e0b",
  weapon: "#8b5cf6",
  violence: "#ec4899",
};

// Status colors
const statusColors: Record<string, string> = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  warning: "bg-yellow-500",
  new: "bg-red-500",
  acknowledged: "bg-blue-500",
  resolved: "bg-green-500",
};

export default function Dashboard() {
  const { isAdmin } = useAuth();
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAlerts, setActiveAlerts] = useState(0);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const camerasData = await getCameras();
        setCameras(camerasData);
        
        const alertsData = await getAlerts();
        setActiveAlerts(alertsData.filter(a => a.status === "new").length);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Prepare analytics data
  const alertTypeData = [
    { name: "Fire", value: 12 },
    { name: "Crowd", value: 23 },
    { name: "Weapon", value: 8 },
    { name: "Violence", value: 15 },
  ];
  
  const COLORS = ["#ef4444", "#f59e0b", "#8b5cf6", "#ec4899"];

  const weeklyAlerts = [
    { day: "Mon", fire: 4, crowd: 7, weapon: 2, violence: 3 },
    { day: "Tue", fire: 2, crowd: 5, weapon: 1, violence: 4 },
    { day: "Wed", fire: 3, crowd: 6, weapon: 3, violence: 2 },
    { day: "Thu", fire: 5, crowd: 8, weapon: 2, violence: 3 },
    { day: "Fri", fire: 7, crowd: 9, weapon: 1, violence: 5 },
    { day: "Sat", fire: 2, crowd: 3, weapon: 0, violence: 1 },
    { day: "Sun", fire: 1, crowd: 2, weapon: 1, violence: 0 },
  ];

  const responseTimeData = [
    { name: "Week 1", time: 5.2 },
    { name: "Week 2", time: 4.8 },
    { name: "Week 3", time: 3.5 },
    { name: "Week 4", time: 3.2 },
  ];

  return (
    <AppLayout>
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          
          {/* Status Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Cameras</CardTitle>
                <CameraIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cameras.length}</div>
                <p className="text-xs text-muted-foreground">
                  {cameras.filter(c => c.status === "online").length} online
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeAlerts}</div>
                <p className="text-xs text-muted-foreground">
                  Requiring attention
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Detection Accuracy</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-muted-foreground">
                  Last 30 days
                </p>
              </CardContent>
            </Card>
            
            {isAdmin && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    3 clients, 2 admins
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Camera Status Section */}
          <h3 className="text-lg font-semibold mt-6">Camera Status</h3>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {cameras.map((camera) => (
              <Card key={camera.id} className={camera.lastAlert ? "border-l-4 border-l-danger-600" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{camera.name}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`${statusColors[camera.status]} text-white`}
                    >
                      {camera.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{camera.location}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                    <img 
                      src={camera.streamUrl} 
                      alt={camera.name} 
                      className="w-full h-full object-cover"
                    />
                    {camera.lastAlert && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className={`px-3 py-1 rounded bg-${alertColors[camera.lastAlert.type]} text-white animate-pulse-alert flex items-center space-x-1`}>
                          <AlertCircle className="h-4 w-4" />
                          <span className="font-medium">
                            {camera.lastAlert.type.charAt(0).toUpperCase() + camera.lastAlert.type.slice(1)} Detected
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline">View Feed</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Analytics Section */}
          <h3 className="text-lg font-semibold mt-6">Analytics</h3>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-md">Alert Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={alertTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {alertTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-md">Weekly Alert Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={weeklyAlerts}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="fire" name="Fire" fill="#ef4444" />
                      <Bar dataKey="crowd" name="Crowd" fill="#f59e0b" />
                      <Bar dataKey="weapon" name="Weapon" fill="#8b5cf6" />
                      <Bar dataKey="violence" name="Violence" fill="#ec4899" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-md">Average Response Time (minutes)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={responseTimeData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="time" 
                        name="Response Time" 
                        stroke="#0b77ea" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
