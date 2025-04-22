
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { useThemeLanguage } from "../contexts/ThemeLanguageContext";
import { useAuth } from "../contexts/AuthContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schéma de validation du formulaire
const userProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type UserProfileFormValues = z.infer<typeof userProfileSchema>;

export default function Settings() {
  const { toast } = useToast();
  const { t } = useThemeLanguage();
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Initialiser le formulaire avec les valeurs actuelles
  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
    },
  });

  const handleSave = (values: UserProfileFormValues) => {
    setIsUpdating(true);
    
    // Simuler une requête API
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
      setIsUpdating(false);
    }, 1000);
  };

  const handleFormSubmit = form.handleSubmit(handleSave);
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t("settings")}</h2>
          <p className="text-muted-foreground">
            {t("generalSettings")}
          </p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="general">{t("generalSettings")}</TabsTrigger>
            <TabsTrigger value="notifications">{t("notifications")}</TabsTrigger>
            <TabsTrigger value="detection">{t("detection")}</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            {/* Profile Settings */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>{t("profile")}</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("fullName")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("fullName")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("email")}</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+33 6 12 34 56 78" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St, City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" disabled={isUpdating}>
                        {isUpdating ? "Saving..." : t("save")}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* General Settings */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>{t("generalSettings")}</CardTitle>
                  <CardDescription>
                    Manage your basic account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t("appearance")}</h3>
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
                  <Button onClick={handleSaveSettings}>{t("save")}</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>{t("notifications")}</CardTitle>
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
                  <Button onClick={handleSaveSettings}>{t("save")}</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Detection Settings */}
            <TabsContent value="detection">
              <Card>
                <CardHeader>
                  <CardTitle>{t("detection")}</CardTitle>
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
                  <Button onClick={handleSaveSettings}>{t("save")}</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
}
