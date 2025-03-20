
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Container from "@/components/ui/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AdminDashboard from "@/components/admin/AdminDashboard";
import HackathonManagement from "@/components/admin/HackathonManagement";
import UserManagement from "@/components/admin/UserManagement";
import SettingsPanel from "@/components/admin/SettingsPanel";
import AdminNavigation from "@/components/admin/AdminNavigation";
import { motion } from "framer-motion";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes only - in a real app use proper authentication
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel",
        variant: "default",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Try admin/admin for demo",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <Container className="max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-center">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Use admin/admin for demo login
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container withoutPadding className="admin-panel">
      <div className="flex h-screen">
        <AdminNavigation />
        <div className="flex-grow p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="mb-8 w-full max-w-md mx-auto grid grid-cols-4">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard">
                <AdminDashboard />
              </TabsContent>
              
              <TabsContent value="hackathons">
                <HackathonManagement />
              </TabsContent>
              
              <TabsContent value="users">
                <UserManagement />
              </TabsContent>
              
              <TabsContent value="settings">
                <SettingsPanel />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

export default AdminPanel;
