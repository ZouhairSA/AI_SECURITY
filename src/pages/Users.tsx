
import { AppLayout } from "../components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, User } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useThemeLanguage } from "../contexts/ThemeLanguageContext";

// Mock users for display
const mockUsers = [
  { id: "1", name: "Admin User", email: "admin@guardian-eye.com", role: "admin", cameras: [] },
  { id: "2", name: "Client Demo", email: "client@example.com", role: "client", cameras: ["Main Entrance", "Parking Lot"] },
  { id: "3", name: "Building Manager", email: "manager@example.org", role: "client", cameras: ["Server Room", "Main Entrance"] },
  { id: "4", name: "Security Officer", email: "security@example.net", role: "client", cameras: ["Conference Room"] },
  { id: "5", name: "System Admin", email: "sysadmin@guardian-eye.com", role: "admin", cameras: [] },
];

export default function Users() {
  const { toast } = useToast();
  const { t } = useThemeLanguage();

  const handleAddUser = () => {
    toast({
      title: "User added",
      description: "New user has been created successfully",
    });
  };

  const handleUpdateUser = () => {
    toast({
      title: "User updated",
      description: "User information has been updated",
    });
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "User deleted",
      description: "User has been removed from the system",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{t("users")}</h2>
            <p className="text-muted-foreground">
              {t("userManagement")}
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-security-800 hover:bg-security-700">
                <Plus className="mr-2 h-4 w-4" /> {t("addUser")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("addUser")}</DialogTitle>
                <DialogDescription>
                  {t("userManagement")}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">{t("fullName")}</Label>
                  <Input id="name" placeholder={t("fullName")} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input id="email" type="email" placeholder="user@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">{t("role")}</Label>
                  <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder={t("role")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Initial Password</Label>
                  <Input id="password" type="password" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddUser}>{t("addUser")}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder={t("searchUsers")}
            className="pl-8"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("userManagement")}</CardTitle>
            <CardDescription>
              {t("userManagement")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-5 p-4 bg-muted/50 font-medium">
                <div className="col-span-2">{t("user")}</div>
                <div>{t("role")}</div>
                <div>{t("assignedCameras")}</div>
                <div className="text-right">{t("actions")}</div>
              </div>
              
              {mockUsers.map((user) => (
                <div key={user.id} className="grid grid-cols-5 p-4 items-center border-t">
                  <div className="col-span-2 flex items-center">
                    <div className="h-9 w-9 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <div>
                    <Badge variant={user.role === "admin" ? "default" : "outline"}>
                      {user.role === "admin" ? "Administrator" : "Client"}
                    </Badge>
                  </div>
                  <div>
                    {user.cameras.length > 0 ? (
                      <span>{user.cameras.length} cameras</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">All access</span>
                    )}
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">{t("edit")}</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t("editUser")}</DialogTitle>
                          <DialogDescription>
                            {t("userManagement")}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-name">{t("fullName")}</Label>
                            <Input id="edit-name" defaultValue={user.name} />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-email">{t("email")}</Label>
                            <Input id="edit-email" type="email" defaultValue={user.email} />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-role">{t("role")}</Label>
                            <Select defaultValue={user.role}>
                              <SelectTrigger id="edit-role">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Administrator</SelectItem>
                                <SelectItem value="client">Client</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" onClick={handleUpdateUser}>{t("save")}</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      {t("delete")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
