
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Search, UserPlus, Edit, Trash, Check, X } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "participant" | "judge" | "admin";
  status: "active" | "inactive";
  registeredDate: string;
  hackathons: number;
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "participant",
    status: "active",
    registeredDate: "2023-05-12",
    hackathons: 3,
  },
  {
    id: 2,
    name: "Maya Patel",
    email: "maya@example.com",
    role: "judge",
    status: "active",
    registeredDate: "2023-06-20",
    hackathons: 4,
  },
  {
    id: 3,
    name: "Sam Wilson",
    email: "sam@example.com",
    role: "admin",
    status: "active",
    registeredDate: "2023-01-05",
    hackathons: 0,
  },
  {
    id: 4,
    name: "Emma Torres",
    email: "emma@example.com",
    role: "participant",
    status: "inactive",
    registeredDate: "2023-07-15",
    hackathons: 1,
  },
  {
    id: 5,
    name: "Noah Kim",
    email: "noah@example.com",
    role: "participant",
    status: "active",
    registeredDate: "2023-08-02",
    hackathons: 2,
  },
  {
    id: 6,
    name: "Olivia Chen",
    email: "olivia@example.com",
    role: "judge",
    status: "active",
    registeredDate: "2023-04-18",
    hackathons: 5,
  },
  {
    id: 7,
    name: "Liam Rodriguez",
    email: "liam@example.com",
    role: "participant",
    status: "inactive",
    registeredDate: "2023-09-22",
    hackathons: 0,
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(sampleUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "participant" as "participant" | "judge" | "admin",
    status: "active" as "active" | "inactive",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term)
        )
      );
    }
  };

  const handleCreateUser = () => {
    setFormData({
      name: "",
      email: "",
      role: "participant",
      status: "active",
    });
    setEditingUser(null);
    setIsCreateDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsCreateDialogOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(
      searchTerm.trim() === ""
        ? updatedUsers
        : updatedUsers.filter(
            (user) =>
              user.name.toLowerCase().includes(searchTerm) ||
              user.email.toLowerCase().includes(searchTerm)
          )
    );
    
    toast({
      title: "User Deleted",
      description: "The user has been successfully removed",
      variant: "default",
    });
  };

  const handleToggleStatus = (id: number) => {
    const updatedUsers = users.map((user) =>
      user.id === id
        ? { ...user, status: user.status === "active" ? "inactive" : "active" as "active" | "inactive" }
        : user
    );
    
    setUsers(updatedUsers);
    setFilteredUsers(
      searchTerm.trim() === ""
        ? updatedUsers
        : updatedUsers.filter(
            (user) =>
              user.name.toLowerCase().includes(searchTerm) ||
              user.email.toLowerCase().includes(searchTerm)
          )
    );
    
    toast({
      title: "Status Updated",
      description: "User status has been updated successfully",
      variant: "default",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (editingUser) {
      // Update existing user
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              name: formData.name,
              email: formData.email,
              role: formData.role,
              status: formData.status,
            }
          : user
      );
      
      setUsers(updatedUsers);
      setFilteredUsers(
        searchTerm.trim() === ""
          ? updatedUsers
          : updatedUsers.filter(
              (user) =>
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
            )
      );
      
      toast({
        title: "User Updated",
        description: "The user has been successfully updated",
        variant: "default",
      });
    } else {
      // Create new user
      const newUser: User = {
        id: Math.max(...users.map((user) => user.id)) + 1,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        registeredDate: new Date().toISOString().split("T")[0],
        hackathons: 0,
      };
      
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      setFilteredUsers(
        searchTerm.trim() === ""
          ? updatedUsers
          : updatedUsers.filter(
              (user) =>
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm)
            )
      );
      
      toast({
        title: "User Created",
        description: "New user has been successfully created",
        variant: "default",
      });
    }
    
    setIsCreateDialogOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={handleCreateUser}>
          <UserPlus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <CardTitle>All Users</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Hackathons</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === "admin"
                          ? "destructive"
                          : user.role === "judge"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          user.status === "active" ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span>{user.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.hackathons}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleToggleStatus(user.id)}
                        title={user.status === "active" ? "Deactivate" : "Activate"}
                      >
                        {user.status === "active" ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? "Edit User" : "Add New User"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="participant">Participant</option>
                  <option value="judge">Judge</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingUser ? "Save Changes" : "Add User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default UserManagement;
