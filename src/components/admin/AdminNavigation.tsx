
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  LayoutDashboard, 
  Users, 
  Award, 
  Settings, 
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  PlusCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

interface AdminNavigationProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({ currentTab, setTab }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [unreadNotifications] = useState(3);

  const navItems = [
    { id: "dashboard", icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard", notifications: 0 },
    { id: "hackathons", icon: <Award className="h-5 w-5" />, label: "Hackathons", notifications: 2 },
    { id: "users", icon: <Users className="h-5 w-5" />, label: "Users", notifications: 1 },
    { id: "analytics", icon: <BarChart3 className="h-5 w-5" />, label: "Analytics", notifications: 0 },
    { id: "settings", icon: <Settings className="h-5 w-5" />, label: "Settings", notifications: 0 },
  ];

  return (
    <motion.div 
      className={`fixed left-0 top-0 h-screen bg-card/50 backdrop-blur-md border-r border-border/20 shadow-sm transition-all duration-300 ease-in-out z-50 ${
        collapsed ? "w-20" : "w-64"
      }`}
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 h-16 border-b border-border/20 flex items-center justify-between">
          <AnimatePresence initial={false} mode="wait">
            {!collapsed && (
              <motion.div
                key="full-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  H
                </div>
                <span className="font-display font-medium text-base">Admin Panel</span>
              </motion.div>
            )}
            {collapsed && (
              <motion.div
                key="small-logo"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="mx-auto"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  H
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 rounded-full"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-8 px-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <TooltipProvider key={item.id}>
                <Tooltip delayDuration={collapsed ? 100 : 1000}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setTab(item.id)}
                      className={`group relative w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
                        currentTab === item.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted text-foreground"
                      } ${collapsed ? "justify-center" : ""}`}
                    >
                      <div className="flex items-center justify-center">
                        {item.icon}
                      </div>
                      <AnimatePresence initial={false}>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-3 relative"
                          >
                            {item.label}
                            {item.notifications > 0 && (
                              <Badge 
                                variant="destructive" 
                                className="absolute -top-1 -right-6 h-5 min-w-5 flex items-center justify-center text-[10px]"
                              >
                                {item.notifications}
                              </Badge>
                            )}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {collapsed && item.notifications > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="absolute top-0 right-0 h-5 min-w-5 flex items-center justify-center text-[10px] translate-x-1 -translate-y-1"
                        >
                          {item.notifications}
                        </Badge>
                      )}
                    </button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}

            <Link to="/admin/add-hackathon">
              <TooltipProvider>
                <Tooltip delayDuration={collapsed ? 100 : 1000}>
                  <TooltipTrigger asChild>
                    <button
                      className={`group w-full mt-6 flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 bg-primary/10 text-primary font-medium hover:bg-primary/20 ${
                        collapsed ? "justify-center" : ""
                      }`}
                    >
                      <PlusCircle className="h-5 w-5" />
                      <AnimatePresence initial={false}>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-3"
                          >
                            New Hackathon
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      <p>New Hackathon</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-border/20">
          <div className="flex items-center justify-between">
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="leading-tight">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">admin@example.com</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex space-x-1">
              {collapsed && (
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              )}

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Bell className="h-5 w-5" />
                      {unreadNotifications > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center text-[10px]"
                        >
                          {unreadNotifications}
                        </Badge>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full">
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Log out</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminNavigation;
