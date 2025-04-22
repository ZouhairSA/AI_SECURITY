
import { useState, useEffect } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertType, getAlerts, updateAlertStatus } from "@/lib/camera-service";
import { AlertCircle, Bell, CheckCircle, Search } from "lucide-react";
import { useToast } from "../hooks/use-toast";

// Alert type colors
const alertTypeColors: Record<AlertType, string> = {
  fire: "bg-red-500",
  crowd: "bg-amber-500",
  weapon: "bg-purple-500",
  violence: "bg-pink-500",
};

// Status colors
const statusColors: Record<string, string> = {
  new: "bg-red-500",
  acknowledged: "bg-blue-500",
  resolved: "bg-green-500",
};

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const data = await getAlerts();
      setAlerts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load alerts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateStatus = async (alertId: string, newStatus: "acknowledged" | "resolved") => {
    try {
      const success = await updateAlertStatus(alertId, newStatus);
      if (success) {
        // Update the local state
        setAlerts(alerts.map(alert => 
          alert.id === alertId 
            ? { ...alert, status: newStatus } 
            : alert
        ));
        
        toast({
          title: "Status updated",
          description: `Alert has been ${newStatus}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    // Apply status filter
    if (statusFilter !== "all" && alert.status !== statusFilter) {
      return false;
    }
    
    // Apply type filter
    if (typeFilter !== "all" && alert.type !== typeFilter) {
      return false;
    }
    
    // Apply search filter
    if (
      searchTerm &&
      !alert.cameraName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Alerts</h2>
          <p className="text-muted-foreground">
            View and manage security alerts from your cameras
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-2">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Select
              value={typeFilter}
              onValueChange={setTypeFilter}
            >
              <SelectTrigger id="type-filter">
                <SelectValue placeholder="Alert Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="fire">Fire</SelectItem>
                <SelectItem value="crowd">Crowd</SelectItem>
                <SelectItem value="weapon">Weapon</SelectItem>
                <SelectItem value="violence">Violence</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search camera name..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
          </div>
        ) : filteredAlerts.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredAlerts.map((alert) => (
              <Card 
                key={alert.id} 
                className={alert.status === "new" ? "border-l-4 border-l-danger-600" : ""}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base font-semibold flex items-center">
                        <Badge 
                          variant="outline" 
                          className={`${alertTypeColors[alert.type]} text-white mr-2`}
                        >
                          {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                        </Badge>
                        {alert.cameraName}
                      </CardTitle>
                      <CardDescription>
                        {new Date(alert.timestamp).toLocaleString()}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${statusColors[alert.status]} text-white`}
                    >
                      {alert.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded overflow-hidden">
                    <img 
                      src={alert.thumbnail} 
                      alt={`${alert.type} alert`} 
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">Confidence:</span>{" "}
                      <span className="font-mono">{(alert.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex space-x-2">
                      {alert.status === "new" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUpdateStatus(alert.id, "acknowledged")}
                        >
                          Acknowledge
                        </Button>
                      )}
                      {alert.status !== "resolved" && (
                        <Button 
                          size="sm"
                          onClick={() => handleUpdateStatus(alert.id, "resolved")}
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-md">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No alerts found</h3>
            <p className="mt-1 text-gray-500">
              {statusFilter !== "all" || typeFilter !== "all" || searchTerm
                ? "Try adjusting your search filters"
                : "All clear! No alerts to display"}
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
