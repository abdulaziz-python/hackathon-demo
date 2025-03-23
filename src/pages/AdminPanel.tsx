
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </div>
              <CardTitle className="text-center text-2xl font-display">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="credentials" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="credentials">Credentials</TabsTrigger>
                  <TabsTrigger value="demo">Demo Access</TabsTrigger>
                </TabsList>
                <TabsContent value="credentials">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="username" className="text-sm font-medium">Username</label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="rounded-lg h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">Password</label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="rounded-lg h-11 pr-10"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full rounded-lg h-11 mt-6 shadow-sm">
                      Sign In
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="demo">
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">Demo Credentials</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Username:</div>
                        <div className="font-mono bg-background px-2 py-1 rounded">admin</div>
                        <div>Password:</div>
                        <div className="font-mono bg-background px-2 py-1 rounded">admin</div>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setUsername("admin");
                        setPassword("admin");
                        handleLogin(new Event('submit') as any);
                      }}
                      className="w-full rounded-lg h-11 shadow-sm"
                    >
                      Use Demo Account
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
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
