
import { useState, useEffect } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import { Camera, getCameras } from "@/lib/camera-service";
import { AlertCircle, Camera as CameraIcon, Plus } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const statusColors: Record<string, string> = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  warning: "bg-yellow-500",
};

export default function Cameras() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const loadCameras = async () => {
      try {
        const data = await getCameras();
        setCameras(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load cameras",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadCameras();
  }, [toast]);

  const filteredCameras = cameras.filter((camera) => {
    // Apply status filter
    if (filter !== "all" && camera.status !== filter) {
      return false;
    }
    
    // Apply search filter
    if (
      searchTerm &&
      !camera.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !camera.location.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Cameras</h2>
            <p className="text-muted-foreground">
              Manage and monitor your security cameras
            </p>
          </div>
          <Button className="bg-security-800 hover:bg-security-700">
            <Plus className="mr-2 h-4 w-4" /> Add Camera
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="status-filter" className="shrink-0">Status:</Label>
            <Select
              value={filter}
              onValueChange={setFilter}
            >
              <SelectTrigger id="status-filter" className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative w-full">
            <CameraIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search cameras..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid" className="space-y-4">
            {loading ? (
              <div className="flex h-40 items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
              </div>
            ) : filteredCameras.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredCameras.map((camera) => (
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
                            <div className="px-3 py-1 rounded bg-red-500 text-white animate-pulse-alert flex items-center space-x-1">
                              <AlertCircle className="h-4 w-4" />
                              <span className="font-medium">
                                {camera.lastAlert.type.charAt(0).toUpperCase() + camera.lastAlert.type.slice(1)} Detected
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <Button size="sm" variant="outline">Configure</Button>
                        <Button size="sm">View Feed</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-md">
                <CameraIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No cameras found</h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm || filter !== "all" 
                    ? "Try adjusting your search filters" 
                    : "Add cameras to start monitoring"}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="list">
            <div className="rounded-md border">
              <div className="grid grid-cols-6 p-4 bg-muted/50 font-medium">
                <div className="col-span-2">Camera</div>
                <div>Location</div>
                <div className="text-center">Status</div>
                <div className="text-center">Last Alert</div>
                <div></div>
              </div>
              
              {filteredCameras.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No cameras match your filters
                </div>
              ) : (
                filteredCameras.map((camera) => (
                  <div key={camera.id} className="grid grid-cols-6 p-4 items-center border-t">
                    <div className="col-span-2 flex items-center">
                      <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center mr-3">
                        <CameraIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className="font-medium">{camera.name}</span>
                    </div>
                    <div>{camera.location}</div>
                    <div className="text-center">
                      <Badge 
                        variant="outline" 
                        className={`${statusColors[camera.status]} text-white`}
                      >
                        {camera.status}
                      </Badge>
                    </div>
                    <div className="text-center">
                      {camera.lastAlert ? (
                        <span className="text-sm">
                          {new Date(camera.lastAlert.timestamp).toLocaleTimeString()}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">None</span>
                      )}
                    </div>
                    <div className="text-right">
                      <Button size="sm">View</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
