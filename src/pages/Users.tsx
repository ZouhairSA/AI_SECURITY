
import { useState } from "react";
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

type UserType = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "client";
  cameras: string[];
};

const initialUsers: UserType[] = [
  { id: "1", name: "Admin User", email: "admin@guardian-eye.com", role: "admin", cameras: [] },
  { id: "2", name: "Client Demo", email: "client@example.com", role: "client", cameras: ["Main Entrance", "Parking Lot"] },
  { id: "3", name: "Building Manager", email: "manager@example.org", role: "client", cameras: ["Server Room", "Main Entrance"] },
  { id: "4", name: "Security Officer", email: "security@example.net", role: "client", cameras: ["Conference Room"] },
  { id: "5", name: "System Admin", email: "sysadmin@guardian-eye.com", role: "admin", cameras: [] },
];

// Utility for generating a unique user ID
const generateId = () => Math.random().toString(36).substr(2, 9);

export default function Users() {
  const { toast } = useToast();
  const { t } = useThemeLanguage();

  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [searchValue, setSearchValue] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserType | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Add user - form states
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addRole, setAddRole] = useState<"admin" | "client" | "">("");
  const [addPassword, setAddPassword] = useState("");

  // Handle add user
  const handleAddUser = () => {
    if (!addName || !addEmail || !addRole) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }
    const newUser: UserType = {
      id: generateId(),
      name: addName,
      email: addEmail,
      role: addRole,
      cameras: [],
    };
    setUsers([...users, newUser]);
    setAddDialogOpen(false);
    // Clear form
    setAddName("");
    setAddEmail("");
    setAddRole("");
    setAddPassword("");
    toast({
      title: "User added",
      description: "New user has been created successfully",
    });
  };

  // Edit logic
  const handleEditUserOpen = (user: UserType) => {
    setEditUser(user);
    setEditDialogOpen(true);
  };

  const handleUpdateUser = () => {
    if (!editUser) return;
    setUsers(users =>
      users.map(u =>
        u.id === editUser.id
          ? { ...u, name: editUser.name, email: editUser.email, role: editUser.role }
          : u
      )
    );
    setEditDialogOpen(false);
    setEditUser(null);
    toast({
      title: "User updated",
      description: "User information has been updated",
    });
  };

  // Delete
  const handleDeleteUser = (userId: string) => {
    setUsers(users => users.filter(u => u.id !== userId));
    toast({
      title: "User deleted",
      description: "User has been removed from the system",
    });
  };

  // Search UX
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    u.email.toLowerCase().includes(searchValue.toLowerCase())
  );

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
          
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
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
                  <Input id="name" placeholder={t("fullName")} value={addName} onChange={e => setAddName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input id="email" type="email" placeholder="user@example.com" value={addEmail} onChange={e => setAddEmail(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">{t("role")}</Label>
                  <Select value={addRole} onValueChange={(value) => setAddRole(value as "admin" | "client")}>
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
                  <Input id="password" type="password" value={addPassword} onChange={e => setAddPassword(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleAddUser}>{t("addUser")}</Button>
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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
              
              {filteredUsers.map((user) => (
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
                    <Dialog open={editDialogOpen && editUser?.id === user.id} onOpenChange={(open) => {
                      setEditDialogOpen(open);
                      if (!open) setEditUser(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => handleEditUserOpen(user)}>{t("edit")}</Button>
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
                            <Input id="edit-name" value={editUser?.name || ""} onChange={e => setEditUser(editUser ? { ...editUser, name: e.target.value } : null)} />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-email">{t("email")}</Label>
                            <Input id="edit-email" type="email" value={editUser?.email || ""} onChange={e => setEditUser(editUser ? { ...editUser, email: e.target.value } : null)} />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-role">{t("role")}</Label>
                            <Select value={editUser?.role || "client"} onValueChange={(value) => setEditUser(editUser ? { ...editUser, role: value as "admin" | "client" } : null)}>
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
                          <Button type="button" onClick={handleUpdateUser}>{t("save")}</Button>
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
