
import React, { useState } from "react";
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
import AnalyticsPanel from "@/components/admin/AnalyticsPanel";
import { motion } from "framer-motion";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentTab, setCurrentTab] = useState("dashboard");

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
          <Card className="mt-24 overflow-hidden border-none shadow-md bg-card">
            <CardHeader className="pb-2">
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
                    className="rounded-lg h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-lg h-11"
                  />
                </div>
                <Button type="submit" className="w-full rounded-lg h-10 mt-4">
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

  const renderContent = () => {
    switch (currentTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "hackathons":
        return <HackathonManagement />;
      case "users":
        return <UserManagement />;
      case "analytics":
        return <AnalyticsPanel />;
      case "settings":
        return <SettingsPanel />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation currentTab={currentTab} setTab={setCurrentTab} />
      
      <motion.div
        key={currentTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="pl-28 pt-6 pr-6 pb-6 overflow-auto min-h-screen"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default AdminPanel;
