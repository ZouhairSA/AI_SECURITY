
import { AppLayout } from "../components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "../hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account and application preferences
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="detection">Detection</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            {/* General Settings */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Manage your basic account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Profile Information</h3>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Your name" defaultValue="User Name" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="Your email" type="email" defaultValue="user@example.com" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Appearance</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="compact-mode">Compact Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Use compact view for camera displays
                          </p>
                        </div>
                        <Switch id="compact-mode" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="show-thumbnails">Show Thumbnails</Label>
                          <p className="text-sm text-muted-foreground">
                            Show thumbnail previews in camera lists
                          </p>
                        </div>
                        <Switch id="show-thumbnails" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Alert Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive alerts via email
                          </p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sms-notifications">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive alerts via SMS
                          </p>
                        </div>
                        <Switch id="sms-notifications" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications
                          </p>
                        </div>
                        <Switch id="push-notifications" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="fire-alerts">Fire Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications for fire detection
                          </p>
                        </div>
                        <Switch id="fire-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="crowd-alerts">Crowd Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications for crowd detection
                          </p>
                        </div>
                        <Switch id="crowd-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="weapon-alerts">Weapon Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications for weapon detection
                          </p>
                        </div>
                        <Switch id="weapon-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="violence-alerts">Violence Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications for violence detection
                          </p>
                        </div>
                        <Switch id="violence-alerts" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Detection Settings */}
            <TabsContent value="detection">
              <Card>
                <CardHeader>
                  <CardTitle>Detection Settings</CardTitle>
                  <CardDescription>
                    Configure AI detection models and sensitivity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Detection Models</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="enable-yolo">YOLOv8 Object Detection</Label>
                          <p className="text-sm text-muted-foreground">
                            Primary object detection model
                          </p>
                        </div>
                        <Switch id="enable-yolo" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="enable-fire">Fire Detection Model</Label>
                          <p className="text-sm text-muted-foreground">
                            Specialized model for fire detection
                          </p>
                        </div>
                        <Switch id="enable-fire" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="enable-violence">Violence Detection Model</Label>
                          <p className="text-sm text-muted-foreground">
                            Specialized model for detecting violent activity
                          </p>
                        </div>
                        <Switch id="enable-violence" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Detection Sensitivity</h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="fire-sensitivity">Fire Detection Threshold</Label>
                          <span className="text-sm">75%</span>
                        </div>
                        <Input
                          id="fire-sensitivity"
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          defaultValue="75"
                        />
                        <p className="text-xs text-muted-foreground">
                          Higher values reduce false positives but may miss some real events
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="crowd-sensitivity">Crowd Detection Threshold</Label>
                          <span className="text-sm">60%</span>
                        </div>
                        <Input
                          id="crowd-sensitivity"
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          defaultValue="60"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="weapon-sensitivity">Weapon Detection Threshold</Label>
                          <span className="text-sm">85%</span>
                        </div>
                        <Input
                          id="weapon-sensitivity"
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          defaultValue="85"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="violence-sensitivity">Violence Detection Threshold</Label>
                          <span className="text-sm">70%</span>
                        </div>
                        <Input
                          id="violence-sensitivity"
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          defaultValue="70"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
}
